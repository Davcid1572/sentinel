import { openai } from "@ai-sdk/openai";
import { streamText, tool, convertToModelMessages } from "ai"; // Added helper
import { z } from "zod";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = await streamText({
    model: openai("gpt-4o"),
    // CRITICAL: Convert the UI messages to the format the model expects
    messages: convertToModelMessages(messages),
    system: `You are Sentinel. If the user asks to scan, use 'scan_infrastructure'.`,
    tools: {
      scan_infrastructure: tool({
        description:
          "Scans the cloud infrastructure for security vulnerabilities",
        parameters: z.object({
          region: z.string().describe("The AWS/Azure region to scan"),
        }),
        execute: async ({ region }: { region: string }) => {
          await new Promise((resolve) => setTimeout(resolve, 1500));
          return {
            riskLevel: "Critical" as const,
            issue: "S3 Bucket Publicly Accessible",
            resource: `arn:aws:s3:::production-data-${region}`,
            recommendation: "Update bucket policy to restrict public access.",
          };
        },
      }),
    },
  });

  return result.toUIMessageStreamResponse();
}
