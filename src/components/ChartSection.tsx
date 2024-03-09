"use client";

import { chartSmoother } from "chart-smoother";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Label } from "./ui/label";
import { Skeleton } from "./ui/skeleton";
import { Slider } from "./ui/slider";
import { Textarea } from "./ui/textarea";

const INITIAL_POINTS = [
  [0, 0],
  [2, 2],
  [3, 3],
  [4, 1],
  [5, 0],
  [6, 0],
];

export default function ChartSection() {
  const [isClient, setIsClient] = useState(false);
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [stringPoints, setStringPoints] = useState(JSON.stringify(points));
  const [stringPointsError, setStringPointsError] = useState(false);
  const [smoothedPoints, setSmoothedPoints] = useState(chartSmoother(points));
  const [smoothIterations, setSmoothIterations] = useState(3);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const parsedPoints = handleStringPointsChange(
      stringPoints,
      setStringPointsError
    );
    if (parsedPoints) {
      setPoints(parsedPoints);
    }
  }, [stringPoints]);

  useEffect(() => {
    setSmoothedPoints(chartSmoother(points, smoothIterations));
  }, [points, smoothIterations]);

  const originalData: { x: number; y: number }[] = points.map((point) => ({
    x: point[0],
    y: point[1],
  }));

  const smoothedData: { x: number; y: number }[] = smoothedPoints.map(
    (point) => ({
      x: point[0],
      y: point[1],
    })
  );

  return (
    <div className="flex flex-col place-items-center mt-10 md:mt-20">
      {isClient ? (
        <div className="-ml-10 ">
          <div className="gap-4 md:hidden">
            <Chart
              title="Original"
              dataSet={originalData}
              variant="destructive"
              isMobile
            />

            <Chart
              title="Smoothed"
              dataSet={smoothedData}
              variant="primary"
              isMobile
            />
          </div>

          <div className="hidden md:flex">
            <Chart
              title="Original"
              dataSet={originalData}
              variant="destructive"
              isMobile={false}
            />

            <Chart
              title="Smoothed"
              dataSet={smoothedData}
              variant="primary"
              isMobile={false}
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:flex-row md:w-[1460px]">
          <Skeleton className="h-[197px] w-[350px] md:h-[250px] md:w-[700px] rounded-xl" />
          <Skeleton className="h-[197px] w-[350px] md:h-[250px] md:w-[700px] rounded-xl" />
        </div>
      )}

      <div className="h-6 md:h-20" />

      <div className="w-80 md:w-96">
        <div>
          <Label>Points</Label>

          <Textarea
            value={stringPoints}
            className={`${
              stringPointsError ? "border-destructive" : "border-grey"
            } my-2`}
            onChange={(event) => setStringPoints(event.target.value)}
          />
          <p
            className={`text-sm ${
              stringPointsError ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {stringPointsError
              ? "Invalid Input Format: Please input an array of arrays, with each internal array containing two numbers representing the x and y coordinates of a linear graph."
              : "[x, y] Array"}
          </p>
        </div>
        <div className="mt-5 mb-10">
          <div className="flex justify-between items-center">
            <Label>Iterations</Label>
            <p className="text-muted-foreground">{smoothIterations}</p>
          </div>

          <Slider
            className="mt-3"
            defaultValue={[3]}
            step={1}
            min={1}
            max={5}
            onValueChange={(v) => setSmoothIterations(v[0])}
          />
        </div>
      </div>
    </div>
  );
}

const Chart = ({
  title,
  dataSet,
  variant,
  isMobile,
}: {
  title: string;
  dataSet: {
    x: number;
    y: number;
  }[];
  variant: "primary" | "destructive";
  isMobile: boolean;
}) => {
  const width = isMobile ? 350 : 730;
  const height = isMobile ? 197 : 250;

  let style = {
    stroke: "var(--theme-primary)",
    "--theme-primary": "hsl(var(--primary))",
  } as React.CSSProperties;

  let activeDotStyle = {
    r: 8,
    style: { fill: "var(--theme-primary)" },
  };

  if (variant === "destructive") {
    style = {
      stroke: "var(--theme-destructive)",
      "--theme-destructive": "hsl(var(--destructive))",
    } as React.CSSProperties;

    activeDotStyle = {
      r: 8,
      style: { fill: "#E71D36" },
    };
  }

  return (
    <LineChart width={width} height={height}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" hide />
      <YAxis />
      <Tooltip />
      <Line
        type="linear"
        data={dataSet}
        dataKey="y"
        name={title}
        strokeWidth={2}
        style={style}
        activeDot={activeDotStyle}
      />
      <Legend />
    </LineChart>
  );
};

function handleStringPointsChange(
  stringPoints: string,
  setStringPointsError: Dispatch<SetStateAction<boolean>>
) {
  try {
    const points = JSON.parse(stringPoints);
    const pointsValidated = validatePoints(points);
    if (!pointsValidated) {
      setStringPointsError(true);
    } else {
      setStringPointsError(false);
    }

    return points;
  } catch (error) {
    setStringPointsError(true);
  }
}

function validatePoints(points: any) {
  if (!Array.isArray(points)) return false;

  for (const point of points) {
    if (!Array.isArray(point)) return false;

    if (point.length !== 2) return false;

    if (!point.every((num) => typeof num === "number")) return false;
  }

  return true;
}
