"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Assassin {
  name: string;
  code: string;
}

export default function Home() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [assassins, setAssassins] = useState<Assassin[]>([]);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const res = await fetch("/api/users");
      const data = await res.json();
      setAssassins(data);
    };
    getUsers();
  }, []);

  return (
    <div className="flex flex-col min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="flex flex-col w-sm mb-4">
        <h1 className="text-lg font-semibold text-slate-700">UGA Assassin&apos;s Game</h1>
        <h2 className="text-md font-medium text-slate-500 mt-2 mb-1">Rules:</h2>
        <ul className="text-xs font-normal text-slate-400 list-disc list-inside space-y-1">
          <li>You will be assigned a unique target.</li>
          <li>
            You will <span className="font-medium">assassinate</span> this target by marking them with a marker.
          </li>
          <li>
            You will <span className="font-medium">inherit</span> the target from the person you just assassinated.
          </li>
          <li>
            Continue to <span className="font-medium">assassinate</span> until you are the last one standing.
          </li>
        </ul>
        <h2 className="text-md font-medium text-slate-500 mt-2 mb-1">Rewards:</h2>
        <ul className="text-xs font-normal text-slate-400 list-disc list-inside space-y-1">
          <li>
            <span className="font-medium">Most assassination:</span> KBBQ from JP
          </li>
          <li>
            <span className="font-medium">Last one standing:</span> KBBQ from JP
          </li>
        </ul>
      </div>
      <form className="w-full max-w-sm" onSubmit={(event) => event}>
        <div className="flex flex-col space-y-3">
          <Input id="name" type="text" onChange={(event) => setName(event.target.value)} value={name} placeholder="name" />
          <Input id="code" type="password" onChange={(event) => setCode(event.target.value)} value={code} placeholder="new code" />
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button className="w-full hover:bg-white hover:text-primary">Sign up</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-md">
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  By continuing you agree to all the risks associated with the game. Also, you cannot change the code once you register.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No, I&apos;m scared</AlertDialogCancel>
                <AlertDialogAction
                  type="submit"
                  onClick={async () => {
                    try {
                      await fetch("/api/users", {
                        method: "POST",
                        body: JSON.stringify({
                          name: name,
                          code: code,
                        }),
                      });
                    } catch (error) {
                      console.log(error);
                    }

                    setName("");
                    setCode("");
                  }}
                >
                  Yes, I&apos;m no coward
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
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
