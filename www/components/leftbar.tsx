import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./navbar";
import { Button } from "./ui/button";
import { AlignLeftIcon } from "lucide-react";
import { DialogTitle } from "./ui/dialog";
import DocsMenu from "./docs-menu";

export function Leftbar() {
  return (
    <aside className="md:flex hidden flex-[1.5] min-w-[238px] sticky top-16 flex-col h-[93.75vh] overflow-y-auto">
      <div className="py-4">
        <DocsMenu />
      </div>
    </aside>
  );
}

export function SheetLeftbar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden flex">
          <AlignLeftIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-4 px-0" side="left">
        <DialogTitle className="sr-only">Menu</DialogTitle>
        <SheetHeader>
          <SheetClose className="px-5" asChild>
            <Logo />
          </SheetClose>
        </SheetHeader>
        <div className="flex flex-col gap-4 overflow-y-auto">
          <div className="mx-2 px-5">
            <DocsMenu isSheet />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
