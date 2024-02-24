import Github from "./icons/Github";
import Npm from "./icons/Npm";
import { Separator } from "./ui/separator";

export default function PageHeader() {
  return (
    <>
      <div className="h-16 bg-foreground flex justify-between px-24 items-center">
        <a href="/">
          <h1 className="text-secondary font-extrabold tracking-tight text-2xl">
            chart-smoother
          </h1>
        </a>

        <div className="w-72 flex justify-between items-center">
          <a href="/playground" className="text-secondary text-lg font-bold">
            Playground
          </a>
          <Separator className="h-10" orientation="vertical" />
          <Github />
          <Npm />
        </div>
      </div>
    </>
  );
}
