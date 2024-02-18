import Github from "./icons/Github";
import Npm from "./icons/Npm";

export default function PageHeader() {
  return (
    <>
      <div className="h-16 bg-foreground flex justify-between px-24 items-center">
        {/* <h1 className="text-secondary">chart-smoother</h1> */}
        <h1 className="text-secondary scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          chart-smoother
        </h1>
        <div className="w-32 flex justify-between ">
          <Github />
          <Npm />
        </div>
      </div>
    </>
  );
}
