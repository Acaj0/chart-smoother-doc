import Github from "./icons/Github";
import Npm from "./icons/Npm";

export default function PageHeader() {
  return (
    <>
      <div className="h-16 bg-blue flex justify-between px-24 text-3xl items-center">
        <h1 className="text-white">Chart-Smoother</h1>
        <div className="w-32 flex justify-between ">
          <Github />
          <Npm />
        </div>
      </div>
    </>
  );
}
