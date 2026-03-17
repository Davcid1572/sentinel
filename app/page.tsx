import { Button } from "@/components/ui/button";
import React from "react";
import ThemeToggler from "@/components/HelperComponent/ThemeToggler";

const page = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-white dark:bg-amber-900 transition-all duration-300">
      <div className="max-w-3xl text-center space-y-10">
        <h1 className="text-3xl font-semibold">Dark Mode</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          delectus nam nulla officiis fugit, reprehenderit perspiciatis natus
          iste neque, distinctio asperiores numquam est itaque explicabo
          voluptatem eaque earum repellat omnis?
        </p>
        <div className="space-x-3">
          <Button>Button 1</Button>
          <Button variant={"secondary"}>Button 1</Button>
        </div>
        <ThemeToggler />
      </div>
    </div>
  );
};

export default page;
