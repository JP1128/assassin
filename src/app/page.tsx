"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <form className="w-full max-w-sm" onSubmit={(event) => event}>
        <div className="flex flex-col space-y-3">
          <Input id="name" type="text" onChange={(event) => setName(event.target.value)} value={name} placeholder="name" />
          <Input id="password" type="code" onChange={(event) => setCode(event.target.value)} value={code} placeholder="new code" />
          <Button
            type="submit"
            onClick={() =>
              toast("Successful Registration!", {
                description: "JP will let you know when the game is ready!",
              })
            }
            className="hover:bg-white hover:text-primary"
          >
            Sign up
          </Button>
        </div>
      </form>
    </div>
  );
}
