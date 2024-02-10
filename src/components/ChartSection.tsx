"use client";

import { Slider } from "@mui/material";
import { chartSmoother } from "chart-smoother";
import {
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

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
    console.log(smoothedPoints);
    console.log("points", points);
  }, [points, smoothedPoints]);

  /**@todo: Validar stringsPoints. stringsPoints deve ser sempre um string de uma matriz de números */
  /**@todo: Em caso de erro na validação: altere o text field para modo "erro" ( vermelho e com aviso ) */

  const originalX = points.map((p) => p[1]);
  const originalY = points.map((p) => p[0]);

  const smoothedX = smoothedPoints.map((p) => p[1]);
  const smoothedY = smoothedPoints.map((p) => p[0]);

  return (
    <div className="px-24">
      <div className="flex justify-between">
        <div className="w-[1000px]">
          <Line
            options={{
              animation: false,
              scales: {
                x: {
                  display: false, // Hide X axis labels
                },
              },
            }}
            data={{
              labels: originalY,
              datasets: [
                {
                  label: "Original",
                  data: originalX,
                  borderColor: "#E71D36",
                  backgroundColor: "#E71D36",
                },
              ],
            }}
          />
        </div>

        <div className="w-[1000px]">
          <Line
            options={{
              animation: false,
              scales: {
                x: {
                  display: false, // Hide X axis labels
                },
              },
            }}
            data={{
              labels: smoothedY,
              datasets: [
                {
                  label: "Smoothed",
                  data: smoothedX,
                  borderColor: "#011627",
                  backgroundColor: "#011627",
                },
              ],
            }}
          />
        </div>
      </div>

      <div>
        <label className="flex flex-col text-[#7C7C7C] font-semibold text-lg">
          Points
          <input
            className={`${
              stringPointsError ? "border-red" : "border-grey"
            } border-2 rounded-lg h-20 w-96`}
            name="myInput"
            value={stringPoints}
            onChange={(event) => setStringPoints(event.target.value)}
          />
          {/**@todo: Add a help text ? Ex: [x,y] array */}
        </label>
        {stringPointsError ? "ERRO" : ""}
      </div>
      <div className="w-96">
        <label className="flex flex-col text-[#7C7C7C] font-semibold text-lg">
          Iterations
        </label>
        <Slider
          defaultValue={3}
          valueLabelDisplay="auto"
          step={1}
          marks
          min={1}
          max={5}
          onChange={(e, v) => {
            setSmoothIterations(v as number);
          }}
        />
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
