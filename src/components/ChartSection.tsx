export default function ChartSection() {
  return (
    <>
      <div>CHART DIV</div>

      <div>
        <label className="flex flex-col text-[#7C7C7C] font-semibold text-lg">
          Dataset
          <input
            className="border-grey border-2 rounded-lg h-20"
            name="myInput"
          />
        </label>
      </div>
    </>
  );
}
