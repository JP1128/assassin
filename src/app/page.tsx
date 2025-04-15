"use client";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [assassins, setAssassins] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setAssassins(data);
    };
    getUsers();
  }, []);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <form className="w-full max-w-sm" onSubmit={(event) => event}>
        <div className="flex flex-col space-y-3">
          <Input id="name" type="text" onChange={(event) => setName(event.target.value)} value={name} placeholder="name" />
          <Input id="password" type="code" onChange={(event) => setCode(event.target.value)} value={code} placeholder="new code" />
          <Button
            type="submit"
            onClick={async () => {
              try {
                const res = await fetch("/api/users", {
                  method: "POST",
                  body: JSON.stringify({
                    name: name,
                    code: code,
                  }),
                });

                toast("Successful Registration!", {
                  description: "JP will let you know when the game is ready!",
                });
              } catch (error) {
                console.log(error);
              }
            }}
            className="hover:bg-white hover:text-primary"
          >
            Sign up
          </Button>
        </div>
        <div className="flex flex-row mt-5 gap-2">
          {assassins.map((assassin, index) => (
            <Badge key={index} variant="outline">
              {assassin.name}
            </Badge>
          ))}
        </div>
      </form>
    </div>
  );
}
