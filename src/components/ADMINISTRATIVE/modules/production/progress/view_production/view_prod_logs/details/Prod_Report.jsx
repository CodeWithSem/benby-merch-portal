import React from "react";

const Prod_Report = ({ report }) => {
  if (!report) {
    return (
      <div className="p-6 text-sm text-gray-400">
        No production report available.
      </div>
    );
  }

  const Item = ({ label, value, unit = "" }) => (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-gray-400">{label}</span>
      <span className="text-sm font-semibold text-gray-700">
        {value ?? 0} {unit}
      </span>
    </div>
  );

  return (
    <div className="w-full bg-white p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-700">Production Report</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <Item label="Standard PPM" value={report.std_ppm} />
        <Item label="Actual PPM" value={report.actual_ppm} />
        <Item label="Production Hours" value={report.prod_hours} unit="hrs" />
        <Item label="Down Time" value={report.down_time} unit="hrs" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <Item label="Target Output" value={report.target_output} />
        <Item label="Actual Output" value={report.actual_output} />
        <Item label="Efficiency" value={report.efficiency} unit="%" />
        <Item label="Production Rate (Pcs / Min)" value={report.prod_rate} />
      </div>

      <div className="border-t pt-5">
        <h3 className="text-sm font-medium text-gray-600 mb-3">
          Waste Summary
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <Item label="RM Wasted" value={report.rm_wasted} />
          <Item label="Operator Splice" value={report.optr_splice} />
          <Item
            label="Waste Percentage"
            value={report.waste_percent}
            unit="%"
          />
          <Item label="Balance" value={report.balance} />
        </div>
      </div>

      <div className="border-t pt-5">
        <h3 className="text-sm font-medium text-gray-600 mb-3">
          Reprocess Details
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <Item label="Good" value={report.reprocess_good} />
          <Item label="Generated" value={report.reprocess_gen} />
          <Item label="Waste" value={report.reprocess_waste} />
          <Item
            label="Reprocess Percentage"
            value={report.reprocess_percent}
            unit="%"
          />
        </div>
      </div>
    </div>
  );
};

export default Prod_Report;
