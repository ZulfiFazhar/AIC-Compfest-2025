import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import Image from "next/image";

const TopMenu = [
  { name: "Features", href: "#features" },
  { name: "Pricing", href: "#pricing" },
  { name: "FAQ", href: "#faq" },
];

const Logo = () => {
  return (
    <Link href="/" className="flex space-x-2 py-3 items-center">
      <h1 className="text-xl font-bold flex items-center gap-2">
        <Image
          src="/globe.svg"
          alt="StarterKitPro Blocks"
          width={24}
          height={24}
        />
        Raksha.ai
      </h1>
    </Link>
  );
};

export default function Header() {
  return (
    <header className="sticky top-5 z-50 flex justify-center w-full sm:px-0 px-5">
      <div className="w-full sm:w-1/2 border rounded-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-1 px-4">
        <nav className="hidden justify-between md:flex">
          <div className="flex items-center gap-6">
            <Logo />
          </div>
          <div className="items-center flex gap-6">
            <div className="flex items-center">
              {TopMenu.map((menu, idx) => (
                <Link
                  key={idx}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    navigationMenuTriggerStyle
                  )}
                  href={menu.href}
                >
                  {menu.name}
                </Link>
              ))}
            </div>
            <Suspense>{/* <ModeToggle /> */}</Suspense>
          </div>
          <div className="flex items-center">
            <Link href="/auth">
              <Button className="rounded-full">Get Started</Button>
            </Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div className="block md:hidden">
          <div className="flex items-center justify-between">
            <Logo />

            <Sheet>
              <div className="flex gap-3 items-center">
                <Suspense>{/* <ModeToggle /> */}</Suspense>
                <SheetTrigger asChild>
                  <Menu className="size-6" />
                  {/* <Button variant={"outline"} size={"icon"}>
                  </Button> */}
                </SheetTrigger>
              </div>
              <SheetContent side="bottom" className="overflow-y-auto pt-0 pb-5">
                <SheetHeader className="pb-0">
                  <SheetTitle>
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-0 flex flex-col gap-0 px-4">
                  {TopMenu.map((menu, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="font-semibold text-lg py-2"
                    >
                      {menu.name}
                    </a>
                  ))}
                </div>
                <div className="border-t pt-4 px-4">
                  <div className="mt-2 flex flex-col gap-2">
                    <Link
                      href="/auth"
                      className={cn(
                        buttonVariants({ variant: "default" }),
                        "py-5"
                      )}
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
