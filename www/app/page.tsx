'use client'
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import React, { useState } from "react";

const Page = () => {
    return (
        <main className="w-screen min-h-screen bg-backgroundi grid grid-rows-[auto_1fr] p-8 gap-8">
            <header className="ml-auto w-fit flex gap-2 items-center">
                <Button variant="ghost" className="rounded-full text-xl font-bold">Docs</Button>
                <Button variant="ghost" size="icon" className="text-3xl rounded-full h-12 w-12 p-2.5"><Icon icon="github"/></Button>
            </header>
            <div className="max-w-screen-md w-full mx-auto px-8 grid grid-rows-[auto_auto_1fr] justify-items-center gap-8">
                <CopyCommand/>
                <p className="text-balance text-center leading-6 text-foreground/65 tracking-normal font-medium mt-4 text-lg">
                    Skip the complicated Turborepo setup. With <span className="text-foreground">create super turbo</span>, you get a fully configured React, Next.js, and Express stack in seconds. 
                    Tailored with the most popular tools, so you can focus on development, not setup.
                </p>
                <div className="terminalContainer bg-white/10 backdrop-blur-sm w-full h-full overflow-hidden rounded-3xl pl-6">
                    <pre id="terminal"></pre>
                </div>
            </div>
        </main>
    );
};

function CopyCommand () {
    const [isCopied, setIsCopied] = useState(false);
    const COMMAND = `npx create-super-turbo@latest`;

    const handleCopy = () =>{
         if (isCopied) return;
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 1000);
        navigator.clipboard.writeText(COMMAND);
    };

    return (
        <div className="p-1 bg-gradient-to-r from-slate-200 via-slate-500 to-neutral-700 rounded-sm" title="copy this command to get started">
            <button onClick={handleCopy} className="flex items-center font-semibold font-sans gap-2 text-xl bg-background rounded px-5 py-3">
                {COMMAND}
                {!isCopied && <Icon icon="copy"/>}
                {isCopied && <Icon icon="check"/>}
            </button>
        </div>
    )
}

export default Page;
