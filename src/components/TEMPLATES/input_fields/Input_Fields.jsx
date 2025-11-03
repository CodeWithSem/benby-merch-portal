import React, { useState } from "react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import { Copy, Search } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Password_Field from "assets/elements/Password_Field";

const Input_Fields = () => {
  const [search_query, set_search_query] = useState("");
  const field_components = [
    {
      id: "text",
      title: "Text_Field (Text)",
      element: (
        <Text_Field
          label="Text Field"
          type={"text"}
          placeholder="Enter text"
          pattern="[A-Za-z]{1,}"
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Text_Field label="Text Field" type={"text"} placeholder="Enter number" pattern="[0-9]{1,}" />`
        ),
    },
    {
      id: "number",
      title: "Text_Field (Number)",
      element: (
        <Text_Field
          label="Number Field"
          type={"number"}
          placeholder="Enter number"
          pattern="[0-9]{1,}"
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Text_Field label="Number Field" type={"number"} placeholder="Enter number" pattern="[0-9]{1,}" />`
        ),
    },
    {
      id: "password_field",
      title: "Password Field",
      element: (
        <Password_Field
          label="Password"
          name="password"
          placeholder="Enter your password"
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Password_Field label="Password" name="password" placeholder="Enter your password" />`
        ),
    },
  ];

  const filtered_fields = field_components.filter((f) =>
    f.title.toLowerCase().includes(search_query.toLowerCase())
  );

  return (
    <React.Fragment>
      {/* Header / Breadcrumb */}
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Input Fields</h1>
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a className="text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Templates
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Input Fields</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* 🔎 Search bar */}
      <div className="w-full mb-5">
        <Icon_Field
          name="search"
          placeholder="Search..."
          icon={Search}
          icon_position="left"
          value={search_query}
          on_change={(e) => {
            set_search_query(e.target.value);
          }}
        />
      </div>

      {/* 🧩 Render filtered components */}
      {filtered_fields.length > 0 ? (
        filtered_fields.map((field) => (
          <div
            key={field.id}
            className="w-full bg-white rounded-lg border mb-6"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 p-5">
              <h1 className="text-lg">{field.title}</h1>
              <div className="flex gap-2">
                <Button
                  variant="white"
                  icon={Copy}
                  icon_position="left"
                  on_click={field.copyFunction}
                >
                  Copy Code
                </Button>
              </div>
            </div>
            <div className="p-8 border-t">
              <div className="w-full bg-white rounded-lg">{field.element}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400 py-10">
          No matching input fields found.
        </div>
      )}
    </React.Fragment>
  );
};

export default Input_Fields;
