import Github from "./icons/Github";
import Npm from "./icons/Npm";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

export default function PageHeader() {
  return (
    <>
      <div className="h-16 bg-foreground flex justify-between px-3 md:px-24 items-center">
        <a href="/">
          <h1 className="text-secondary font-extrabold tracking-tight text-2xl">
            chart-smoother
          </h1>
        </a>

        <div className="hidden md:flex">
          <MainNav />
        </div>

        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </>
  );
}

const MainNav = () => {
  return (
    <div className="w-72 flex justify-between items-center">
      <a href="/playground" className="text-secondary text-lg font-bold">
        Playground
      </a>
      <Separator className="h-10" orientation="vertical" />
      <Github />
      <Npm />
    </div>
  );
};

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="outline">
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.5 3C1.22386 3 1 3.22386 1 3.5C1 3.77614 1.22386 4 1.5 4H13.5C13.7761 4 14 3.77614 14 3.5C14 3.22386 13.7761 3 13.5 3H1.5ZM1 7.5C1 7.22386 1.22386 7 1.5 7H13.5C13.7761 7 14 7.22386 14 7.5C14 7.77614 13.7761 8 13.5 8H1.5C1.22386 8 1 7.77614 1 7.5ZM1 11.5C1 11.2239 1.22386 11 1.5 11H13.5C13.7761 11 14 11.2239 14 11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>chart-smoother</SheetTitle>
        </SheetHeader>

        <div className="mt-10 flex flex-col gap-6 text-base font-semibold">
          <a href="/">Homepage</a>
          <a href="/playground">Playground</a>
          <a href="https://github.com/Murilo-Luciano/chart-smoother">GitHub</a>
          <a href="https://www.npmjs.com/package/chart-smoother?activeTab=readme">
            Npm
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
};
