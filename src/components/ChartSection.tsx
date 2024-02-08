"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

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

  useEffect(() => {
    const parsedPoints = handleStringPointsChange(
      stringPoints,
      setStringPointsError
    );
    if (parsedPoints) {
      setPoints(parsedPoints);
    }
  }, [stringPoints]);

  /**@todo: Validar stringsPoints. stringsPoints deve ser sempre um string de uma matriz de números */
  /**@todo: Em caso de erro na validação: altere o text field para modo "erro" ( vermelho e com aviso ) */

  return (
    <>
      <div>CHART</div>

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
    </>
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
