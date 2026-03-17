"use client";
import React from "react";
import { Button } from "../ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggler = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className="rounded-full"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Sun className="absolute h-10 w-10 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-10 w-10 rotate-90 scale-0 dark:-rotate-90 dark:scale-100" />
    </Button>
  );
};

export default ThemeToggler;
