import React from "react";

const Main_Layout = () => {
  return (
    <React.Fragment>
      <div className="w-full">
        {/* + Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Inbound</h1>
          {/* + Breadcrumb */}
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Template
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Layout</span>
              </li>
            </ol>
          </nav>
          {/* - Breadcrumb */}
        </div>
        {/* - Header */}
        <div className="w-full bg-white rounded-lg border">
          {/* + Title */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-5">
            <h1 className="text-lg">Title Here</h1>
            <div className="flex gap-2">
              <Button variant="primary" icon={PlusCircle} icon_position="left">
                Button 1
              </Button>
              <Button variant="primary" icon={FileUp} icon_position="left">
                Button 2
              </Button>
            </div>
          </div>
          {/* - Title */}
          {/* + Content */}
          <div className="p-5 sm:p-6 border-t"></div>
          {/* - Content */}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Main_Layout;
