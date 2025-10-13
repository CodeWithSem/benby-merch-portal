import React, { useState } from "react";
import Text_Field from "../../../../elements/Text_Field";
import Date_Field from "../../../../elements/Date_Field";
import Select_Field from "../../../../elements/Select_Field";
import Textarea_Field from "../../../../elements/Textarea_Field";
import Checkbox_Field from "../../../../elements/Checkbox_Field";
import Password_Field from "../../../../elements/Password_Field";
import Button from "../../../../elements/Button";
import { useToast } from "../../../layout/Toast_Provider";
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

const Form_Receiver = () => {
  const { show_toast } = useToast();

  const handle_show_toast = (type, title, message) => {
    const icon =
      type === "success" ? (
        <CheckCircle2 size={21} className="text-green-500" />
      ) : type === "warning" ? (
        <AlertTriangle size={21} className="text-yellow-500" />
      ) : (
        <XCircle size={21} className="text-red-500" />
      );

    show_toast({
      type,
      title,
      message,
      icon,
      width: "300px",
      position: "top-right",
    });
  };

  const [form_state, set_form_state] = useState({
    title: "Sample Form",
    detail: "Sample Form Details",
    db_path: "",
    form_template: [
      {
        id: 1760088868969,
        columns: 1,
        fields: [
          {
            id: "1760088868969-0",
            label: "Text Field",
            key: "text_field",
            type: "text",
            options: [],
            checkboxes: [],
            required: true,
          },
        ],
      },
      {
        id: 1760088883257,
        columns: 1,
        fields: [
          {
            id: "1760088883257-0",
            label: "Password Field",
            key: "password_field",
            type: "password",
            options: [],
            checkboxes: [],
            required: true,
          },
        ],
      },
      {
        id: 1760089001217,
        columns: 1,
        fields: [
          {
            id: "1760089001217-0",
            label: "Textarea Field",
            key: "textarea_field",
            type: "textarea",
            options: [],
            checkboxes: [],
            required: true,
          },
        ],
      },
      {
        id: 1760089045497,
        columns: 1,
        fields: [
          {
            id: "1760089045497-0",
            label: "Select Field",
            key: "select_field",
            type: "select",
            options: ["OPTION1", "OPTION2", "OPTION3"],
            checkboxes: [],
            required: true,
          },
        ],
      },
      {
        id: 1760089097345,
        columns: 1,
        fields: [
          {
            id: "1760089097345-0",
            label: "Date Field",
            key: "date_field",
            type: "date",
            options: [],
            checkboxes: [],
            required: true,
          },
        ],
      },
      {
        id: 1760089113457,
        columns: 1,
        fields: [
          {
            id: "1760089113457-0",
            label: "Checkbox Field",
            key: "checkbox_field",
            type: "checkbox",
            options: [],
            checkboxes: [],
            required: true,
          },
        ],
      },
      {
        id: 1760089130153,
        columns: 1,
        fields: [
          {
            id: "1760089130153-0",
            label: "Checkbox Group",
            key: "checkbox_group",
            type: "checkbox-group",
            options: [],
            checkboxes: [
              {
                label: "Check 1",
                key: "check_1",
              },
              {
                label: "Check 2",
                key: "check_2",
              },
            ],
            required: true,
          },
        ],
      },
    ],
  });

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleValueChange = (fieldKey, newValue) => {
    if (!fieldKey) return;

    const field = form_state.form_template
      .flatMap((row) => row.fields)
      .find((f) => f.key === fieldKey);

    let formattedValue = newValue;

    if (field && field.type === "date" && newValue) {
      const date = new Date(newValue);
      if (!isNaN(date)) {
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        const yyyy = date.getFullYear();
        formattedValue = `${mm}/${dd}/${yyyy}`;
      }
    }

    setFormData((prev) => ({ ...prev, [fieldKey]: formattedValue }));

    // Clear error on change
    setErrors((prev) => ({ ...prev, [fieldKey]: "" }));
  };

  // ✅ Handle Submit with error messages
  const handleSubmit = () => {
    const newErrors = {};

    form_state.form_template.forEach((row) => {
      row.fields.forEach((field) => {
        if (field.required) {
          const value = formData[field.key];

          if (field.type === "checkbox-group") {
            if (!value || Object.values(value).every((v) => !v)) {
              newErrors[field.key] = `${field.label || field.key} is required`;
            }
          } else if (!value || value === "") {
            newErrors[field.key] = `${field.label || field.key} is required`;
          }
        }
      });
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handle_show_toast(
        "success",
        "Success",
        "You have successfully submitted the form."
      );
      //   alert("✅ Form submitted successfully!");
      //   console.log("Submitted Data:", formData);
    } else {
      handle_show_toast(
        "danger",
        "Invalid Data",
        "Please fill up all the required fields."
      );
    }
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Form Receiver</h1>
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
                  Forms
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Form Receiver</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="w-full flex flex-col gap-10">
        <div className="w-full bg-white rounded-lg border">
          <h1 className="w-full text-lg border-b p-5">
            {form_state.title || ""}
            <p className="mt-1 text-sm text-gray-500">
              {form_state.detail || ""}
            </p>
          </h1>

          <div className="p-6 flex flex-col gap-6">
            {form_state.form_template.length === 0 && (
              <p className="text-sm text-gray-500">
                The form preview will appear here once you add fields.
              </p>
            )}

            {form_state.form_template.map((row) => (
              <div
                key={row.id}
                className={`grid grid-cols-1 gap-5 md:gap-6 xl:grid-cols-${row.columns}`}
              >
                {row.fields.map((field) => {
                  const error_message = errors[field.key] || "";
                  const labelContent = (
                    <>
                      {field.label || "Untitled Field"}
                      {field.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </>
                  );

                  return (
                    <div key={field.id} className="w-full">
                      {field.type === "date" ? (
                        <Date_Field
                          label={labelContent}
                          name={field.key}
                          value={formData[field.key] || ""}
                          on_change={(e) =>
                            handleValueChange(field.key, e.target.value)
                          }
                          placeholder={
                            field.label
                              ? `Select ${field.label.toLowerCase()}`
                              : ""
                          }
                          error_message={error_message}
                        />
                      ) : field.type === "textarea" ? (
                        <Textarea_Field
                          label={labelContent}
                          name={field.key}
                          value={formData[field.key] || ""}
                          on_change={(e) =>
                            handleValueChange(field.key, e.target.value)
                          }
                          placeholder={
                            field.label
                              ? `Enter ${field.label.toLowerCase()}`
                              : ""
                          }
                          height="121px"
                          error_message={error_message}
                        />
                      ) : field.type === "select" ? (
                        <Select_Field
                          label={labelContent}
                          name={field.key}
                          value={formData[field.key] || ""}
                          on_change={(e) =>
                            handleValueChange(field.key, e.target.value)
                          }
                          options={field.options || []}
                          placeholder={
                            field.label
                              ? `Select ${field.label.toLowerCase()}`
                              : ""
                          }
                          error_message={error_message}
                        />
                      ) : field.type === "checkbox" ? (
                        <div className="mt-[32px] flex flex-col gap-2">
                          <Checkbox_Field
                            label={labelContent}
                            name={field.key}
                            checked={!!formData[field.key]}
                            on_change={(e) =>
                              handleValueChange(field.key, e.target.checked)
                            }
                            box_size={22}
                            icon_size={14}
                            error_message={error_message}
                          />
                        </div>
                      ) : field.type === "checkbox-group" ? (
                        <div className="flex flex-col gap-2">
                          <span className="block text-sm font-medium text-slate-700">
                            {labelContent}
                          </span>
                          {field.checkboxes?.map((cb, i) => {
                            const key = cb.key;
                            return (
                              <Checkbox_Field
                                key={i}
                                label={cb.label || `Checkbox ${i + 1}`}
                                name={key}
                                checked={formData[field.key]?.[key] || false}
                                disabled={!cb.label || !key}
                                on_change={(e) => {
                                  const checked = e.target.checked;
                                  setFormData((prev) => ({
                                    ...prev,
                                    [field.key]: {
                                      ...prev[field.key],
                                      [key]: checked,
                                    },
                                  }));
                                  setErrors((prev) => ({
                                    ...prev,
                                    [field.key]: "",
                                  }));
                                }}
                                box_size={22}
                                icon_size={14}
                              />
                            );
                          })}
                          {error_message && (
                            <p className="text-red-500 text-xs mt-1">
                              {error_message}
                            </p>
                          )}
                        </div>
                      ) : field.type === "password" ? (
                        <Password_Field
                          label={labelContent}
                          name={field.key}
                          value={formData[field.key] || ""}
                          on_change={(e) =>
                            handleValueChange(field.key, e.target.value)
                          }
                          placeholder={
                            field.label
                              ? `Enter ${field.label.toLowerCase()}`
                              : ""
                          }
                          error_message={error_message}
                        />
                      ) : (
                        <Text_Field
                          label={labelContent}
                          type="text"
                          value={formData[field.key] || ""}
                          on_change={(e) =>
                            handleValueChange(field.key, e.target.value)
                          }
                          placeholder={
                            field.label
                              ? `Enter ${field.label.toLowerCase()}`
                              : ""
                          }
                          error_message={error_message}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            ))}

            {/* ✅ Submit Button */}

            <div className="pt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Button
                on_click={handleSubmit}
                variant="primary"
                class_name="px-7"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        {/* ✅ OUTPUT DATA */}
        <div className="w-full bg-gray-100 border rounded-lg p-4">
          <h2 className="font-medium mb-2">Current Form Data</h2>
          <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-[500px]">
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form_Receiver;
