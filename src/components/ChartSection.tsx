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
  const [points, setPoints] = useState(INITIAL_POINTS);
  const [stringPoints, setStringPoints] = useState(JSON.stringify(points));
  const [stringPointsError, setStringPointsError] = useState(false);
  const [smoothedPoints, setSmoothedPoints] = useState(chartSmoother(points));
  const [smoothIterations, setSmoothIterations] = useState(3);

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
    <div className="flex flex-col place-items-center mt-20">
      <div className="flex">
        <LineChart width={730} height={250}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" hide />
          <YAxis />
          <Tooltip />
          <Line
            type="linear"
            data={originalData}
            name="Original"
            dataKey="y"
            strokeWidth={2}
            style={
              {
                stroke: "var(--theme-destructive)",
                "--theme-destructive": "hsl(var(--destructive))",
              } as React.CSSProperties
            }
            activeDot={{
              r: 8,
              style: { fill: "#E71D36" },
            }}
          />
          <Legend />
        </LineChart>

        <LineChart width={730} height={250}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="x" hide />
          <YAxis />
          <Tooltip />
          <Line
            type="linear"
            data={smoothedData}
            dataKey="y"
            name="Smoothed"
            strokeWidth={2}
            style={
              {
                stroke: "var(--theme-primary)",
                "--theme-primary": "hsl(var(--primary))",
              } as React.CSSProperties
            }
            activeDot={{
              r: 8,
              style: { fill: "var(--theme-primary)" },
            }}
          />
          <Legend />
        </LineChart>
      </div>

      <div className="h-20" />

      <div className="w-96">
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
        <div className="w-96 mt-5">
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
