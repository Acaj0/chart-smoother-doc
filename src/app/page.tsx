import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <PageHeader />

      <div className="px-3 md:px-24 text-center mt-10 md:mt-20 mb-20">
        <div>
          <h1 className="font-extrabold tracking-tight text-4xl md:text-6xl">
            chart-smoother
          </h1>
          <p className="mt-1 text-muted-foreground">
            A package for smoothing datasets of linear charts
          </p>
          <div className="flex flex-col md:flex-row md:justify-center gap-10 md:gap-3 mt-10 md:mt-6">
            <a href="/playground">
              <Button className="w-24">Playground</Button>
            </a>
            <a href="https://github.com/Murilo-Luciano/chart-smoother">
              <Button className="w-24" variant="outline">
                Github
              </Button>
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="px-6 md:px-24 pb-10 md:w-[800px]">
          <section>
            <a
              id="installation"
              href="#installation"
              className="font-bold tracking-tight text-lg"
            >
              Installation
            </a>
            {/* <CodeBlock codeText="npm install chart-smoother" /> */}
          </section>

          <section className="mt-5 md:mt-10">
            <a
              id="usage"
              href="#usage"
              className="font-bold tracking-tight text-lg"
            >
              Usage
            </a>
            <p className="text-wrap">
              The{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                chart-smoother
              </code>{" "}
              module exports a single function,{" "}
              <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
                chartSmoother(points, iterations)
              </code>
              , which takes an array of points and the number of smoothing
              iterations to perform. The function uses the Chaikin's algorithm
              to smooth the points.
            </p>
          </section>

          <section className="mt-10">
            <a
              id="chaikin-algorithm"
              href="#chaikin-algorithm"
              className="font-bold tracking-tight text-lg"
            >
              Chaikin's Algorithm
            </a>
            <p className="text-wrap">
              <a
                href="https://www.cs.unc.edu/~dm/UNC/COMP258/LECTURES/Chaikins-Algorithm.pdf"
                rel="nofollow"
                className="text-[#1f6feb] underline"
              >
                Chaikin's algorithm
              </a>{" "}
              is an iterative procedure for curve smoothing. Given a set of
              points, the algorithm successively replaces each straight line
              segment connecting consecutive points with two new points, offset
              from the original line by a fraction of the line's length. The
              result is a smooth curve that approximates the original set of
              points.
              <br />
              <br />
              Here's an example of how to use the chart-smoother module:
            </p>
            <br />
            {/* <CodeBlock codeText={usageSnippet} /> */}
          </section>
        </div>
      </div>
    </>
  );
}

const usageSnippet = `const chartSmoother = require("chart-smoother");

// [x,y] array
const points = [
  [0, 0],
  [2, 2],
  [3, 3],
  [4, 1],
  [5, 0],
  [6, 0],
];
const iterations = 2;

const smoothedPoints = chartSmoother(points, iterations);

console.log(smoothedPoints);`;
