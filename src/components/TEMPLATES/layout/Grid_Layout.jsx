import React from "react";

const Grid_Layout = () => {
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900 whitespace-nowrap">
        <h1 className="mb-5 font-semibold text-sky-700">Approval Roles</h1>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>{/* Grid 1 */}</div>
          <div>{/* Grid 2 */}</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Grid_Layout;
