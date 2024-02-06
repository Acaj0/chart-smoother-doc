import Head from "next/head";
import Github from "@/components/icons/Github";
import Npm from "@/components/icons/Npm";

export default function Home() {
  return (
    <>
      {" "}
      <Head>
        <title>test</title>
      </Head>{" "}
      <div className="h-16 bg-gray-900 flex justify-between px-24 text-3xl items-center">
        <h1 className="text-white">Chart-Smoother</h1>
        <div className="w-32 flex justify-between ">
          <Github />
          <Npm />
        </div>
      </div>
    </>
  );
}
