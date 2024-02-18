import Github from "./icons/Github";
import Npm from "./icons/Npm";
import { Separator } from "./ui/separator";

export default function PageHeader() {
  return (
    <>
      <div className="h-16 bg-foreground flex justify-between px-24 items-center">
        <h1 className="text-secondary scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          chart-smoother
        </h1>

        <div className="w-72 flex justify-between items-center">
          <a href="/" className="text-secondary text-lg font-bold">
            Docs
          </a>
          <a href="/example" className="text-secondary text-lg font-bold">
            Example
          </a>
          <Separator className="h-10" orientation="vertical" />
          <Github />
          <Npm />
        </div>
      </div>
    </>
  );
}
