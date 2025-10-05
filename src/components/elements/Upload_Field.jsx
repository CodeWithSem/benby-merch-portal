import React, { useRef, useState } from "react";
import { Upload } from "lucide-react";

const Upload_Field = ({
  label,
  name,
  on_change,
  disabled = false,
  file_error,
  accept,
  required = false,
}) => {
  const [file_name, set_file_name] = useState("");
  const input_ref = useRef(null);

  const handle_click = () => {
    if (!disabled && input_ref.current) {
      input_ref.current.click();
    }
  };

  const handle_change = (e) => {
    const selected_file = e.target.files?.[0];
    set_file_name(selected_file ? selected_file.name : "");
    if (on_change) on_change(e);
  };

  const wrapper_class = `mt-1 flex rounded-md shadow-sm border text-sm overflow-hidden
    ${file_error ? "border-pink-500" : "border-slate-300"}
    ${
      disabled
        ? "bg-slate-50 text-slate-500 cursor-not-allowed"
        : "bg-white text-slate-700"
    }
    focus-within:ring-1 ${
      file_error
        ? "focus-within:ring-pink-500 focus-within:border-pink-500"
        : "focus-within:ring-sky-500 focus-within:border-sky-500"
    }`;

  const left_section_class = `inline-flex items-center px-3 border-r border-slate-300 bg-slate-100 text-slate-600 text-sm`;

  const input_display_class = `flex-1 bg-transparent border-0 focus:ring-0 px-3 py-2 placeholder-slate-400 text-sm truncate
    ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`;

  return (
    <div>
      {label && (
        <span className="block text-sm font-medium text-slate-700 mb-1">
          {label}
        </span>
      )}

      <div
        className={wrapper_class}
        style={{ userSelect: "none" }}
        onClick={handle_click}
      >
        {/* Left icon */}
        <div className={left_section_class}>
          <Upload size={16} className="mr-1" />
          Upload
        </div>

        {/* File name display */}
        <div className={input_display_class}>
          {file_name || "Choose a file..."}
        </div>

        {/* Hidden file input */}
        <input
          ref={input_ref}
          type="file"
          name={name}
          accept={accept}
          required={required}
          disabled={disabled}
          onChange={handle_change}
          className="hidden"
        />
      </div>

      {/* Error message */}
      {file_error && (
        <span className="block text-xs font-medium text-red-500 mt-1">
          {file_error}
        </span>
      )}
    </div>
  );
};

export default Upload_Field;
