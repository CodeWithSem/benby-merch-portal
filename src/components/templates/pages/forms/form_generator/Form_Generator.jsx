import React, { useState } from "react";
import Text_Field from "../../../../elements/Text_Field";
import Date_Field from "../../../../elements/Date_Field";
import Select_Field from "../../../../elements/Select_Field";
import Textarea_Field from "../../../../elements/Textarea_Field";
import Checkbox_Field from "../../../../elements/Checkbox_Field";
import Password_Field from "../../../../elements/Password_Field"; // ✅ Added
import Button from "../../../../elements/Button";

const Form_Generator = () => {
  const [form_state, set_form_state] = useState({
    title: "",
    detail: "",
    db_path: "",
    form_template: [],
  });
  const [formData, setFormData] = useState({});

  // ✅ Update main details
  const handleStateChange = (key, value) => {
    set_form_state((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ Add new row
  const handleAddRow = (columns) => {
    if (columns < 1 || columns > 4) {
      alert("Columns per row must be between 1 and 4");
      return;
    }

    const newRow = {
      id: Date.now(),
      columns,
      fields: Array.from({ length: columns }).map((_, i) => ({
        id: `${Date.now()}-${i}`,
        label: "",
        key: "",
        type: "text",
        options: [],
        checkboxes: [], // for checkbox-group
        required: false,
      })),
    };

    set_form_state((prev) => ({
      ...prev,
      form_template: [...prev.form_template, newRow],
    }));
  };

  // ✅ Update field meta
  const handleFieldMetaChange = (rowId, fieldId, keyName, newValue) => {
    set_form_state((prev) => ({
      ...prev,
      form_template: prev.form_template.map((row) =>
        row.id === rowId
          ? {
              ...row,
              fields: row.fields.map((field) => {
                if (field.id === fieldId) {
                  if (keyName === "key") {
                    const oldKey = field.key;
                    const newKey = newValue.trim();
                    setFormData((prevData) => {
                      const newData = { ...prevData };
                      if (oldKey && oldKey in newData) {
                        const tempValue = newData[oldKey];
                        delete newData[oldKey];
                        if (newKey) newData[newKey] = tempValue;
                      }
                      return newData;
                    });
                  }
                  return { ...field, [keyName]: newValue };
                }
                return field;
              }),
            }
          : row
      ),
    }));
  };

  // ✅ Update select options
  const handleFieldOptionsChange = (rowId, fieldId, newOptions) => {
    set_form_state((prev) => ({
      ...prev,
      form_template: prev.form_template.map((row) =>
        row.id === rowId
          ? {
              ...row,
              fields: row.fields.map((field) =>
                field.id === fieldId ? { ...field, options: newOptions } : field
              ),
            }
          : row
      ),
    }));
  };

  // ✅ Update checkbox-group number
  const handleCheckboxGroupChange = (rowId, fieldId, count) => {
    const num = parseInt(count) || 0;
    set_form_state((prev) => ({
      ...prev,
      form_template: prev.form_template.map((row) =>
        row.id === rowId
          ? {
              ...row,
              fields: row.fields.map((field) => {
                if (field.id === fieldId) {
                  const current = field.checkboxes || [];
                  const newCheckboxes = Array.from({ length: num }).map(
                    (_, i) => current[i] || { label: "", key: "" }
                  );
                  return { ...field, checkboxes: newCheckboxes };
                }
                return field;
              }),
            }
          : row
      ),
    }));
  };

  // ✅ Update preview values
  const handleValueChange = (fieldKey, newValue) => {
    if (!fieldKey) return;

    // Find the field type from the form template
    const field = form_state.form_template
      .flatMap((row) => row.fields)
      .find((f) => f.key === fieldKey);

    let formattedValue = newValue;

    // ✅ If it's a date field, format it to mm/dd/yyyy
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
  };

  // ✅ Delete row
  const handleDeleteRow = (rowId) => {
    set_form_state((prev) => ({
      ...prev,
      form_template: prev.form_template.filter((row) => row.id !== rowId),
    }));

    const rowToDelete = form_state.form_template.find(
      (row) => row.id === rowId
    );
    if (rowToDelete) {
      setFormData((prevData) => {
        const newData = { ...prevData };
        rowToDelete.fields.forEach((field) => {
          if (field.key && field.key in newData) delete newData[field.key];
        });
        return newData;
      });
    }
  };

  return (
    <React.Fragment>
      <div className="w-full">
        <h1 className="w-full text-xl py-5">Form Generator</h1>
      </div>

      <div className="w-full flex flex-col gap-10">
        {/* FORM BUILDER */}
        <div className="w-full bg-white rounded-lg border">
          <h1 className="w-full text-lg border-b p-5 flex items-center justify-between">
            Form Builder
          </h1>

          <div className="p-6 flex flex-col gap-6">
            {/* Main Form Details */}
            <div className="relative bg-gray-100 p-4 pt-[50px] rounded-lg border border-gray-200 shadow-sm">
              <h1 className="absolute left-[18px] top-[15px] text-sm">
                Form Template Main Details
              </h1>
              <div className="grid grid-cols-1 gap-5">
                <div className="w-full border rounded-lg p-3 bg-white flex flex-col gap-5">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Form Title
                    </label>
                    <Text_Field
                      type="text"
                      value={form_state.title}
                      on_change={(e) =>
                        handleStateChange("title", e.target.value)
                      }
                      placeholder="Enter title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Form Detail
                    </label>
                    <Text_Field
                      type="text"
                      value={form_state.detail}
                      on_change={(e) =>
                        handleStateChange("detail", e.target.value)
                      }
                      placeholder="Enter detail"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Database Path
                    </label>
                    <Text_Field
                      type="text"
                      value={form_state.db_path}
                      on_change={(e) =>
                        handleStateChange("db_path", e.target.value)
                      }
                      placeholder="Enter path"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Field Rows */}
            {form_state.form_template.length === 0 && (
              <p className="text-sm text-gray-500">
                No rows yet. Add a new one above.
              </p>
            )}

            {form_state.form_template.map((row, index) => (
              <div
                key={row.id}
                className="relative bg-gray-100 p-4 pt-[50px] rounded-lg border border-gray-200 shadow-sm"
              >
                <h1 className="absolute left-[18px] top-[15px] text-sm">
                  Field Row {index + 1}
                </h1>
                <button
                  onClick={() => handleDeleteRow(row.id)}
                  className="absolute right-[16px] top-[15px] bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-xs"
                >
                  Delete Row
                </button>

                <div
                  className={`grid grid-cols-1 gap-5 md:gap-6 xl:grid-cols-${row.columns}`}
                >
                  {row.fields.map((field) => (
                    <div
                      key={field.id}
                      className="w-full border rounded-lg p-3 bg-white"
                    >
                      <label className="block text-sm font-medium mb-1">
                        Label for Field
                      </label>
                      <Text_Field
                        type="text"
                        value={field.label}
                        on_change={(e) =>
                          handleFieldMetaChange(
                            row.id,
                            field.id,
                            "label",
                            e.target.value
                          )
                        }
                        placeholder="Enter label name"
                      />

                      <label className="block text-sm font-medium mb-1 mt-5">
                        Key for Field
                      </label>
                      <Text_Field
                        type="text"
                        value={field.key}
                        on_change={(e) =>
                          handleFieldMetaChange(
                            row.id,
                            field.id,
                            "key",
                            e.target.value
                          )
                        }
                        placeholder="e.g. first_name"
                      />
                      <div className="mt-5 flex items-center gap-2">
                        <Checkbox_Field
                          label={"Is required"}
                          name={field.key}
                          checked={field.required || false}
                          on_change={(e) =>
                            handleFieldMetaChange(
                              row.id,
                              field.id,
                              "required",
                              e.target.checked
                            )
                          }
                          box_size={22}
                          icon_size={14}
                        />
                      </div>

                      <label className="block text-sm font-medium mb-1 mt-5">
                        Type of Field
                      </label>
                      <Select_Field
                        label=""
                        name={`type-${field.id}`}
                        value={field.type}
                        on_change={(e) =>
                          handleFieldMetaChange(
                            row.id,
                            field.id,
                            "type",
                            e.target.value
                          )
                        }
                        options={[
                          { label: "Text Field", value: "text" },
                          { label: "Password Field", value: "password" },
                          { label: "Textarea Field", value: "textarea" },
                          { label: "Select Field", value: "select" },
                          { label: "Date Field", value: "date" },
                          { label: "Checkbox Field", value: "checkbox" },
                          { label: "Checkbox Group", value: "checkbox-group" },
                        ]}
                        placeholder="Select field type"
                      />

                      {field.type === "select" && (
                        <div className="mt-5">
                          <label className="block text-sm font-medium mb-1">
                            Options (comma separated)
                          </label>
                          <Text_Field
                            type="text"
                            value={field.options.join(",")}
                            on_change={(e) =>
                              handleFieldOptionsChange(
                                row.id,
                                field.id,
                                e.target.value
                                  .split(",")
                                  .map((opt) => opt.trim())
                              )
                            }
                            placeholder="Option1, Option2, Option3"
                          />
                        </div>
                      )}

                      {field.type === "checkbox-group" && (
                        <div className="mt-5 border-t pt-5">
                          <label className="block text-sm font-medium mb-1">
                            Number of Checkboxes
                          </label>
                          <Text_Field
                            type="number"
                            min={1}
                            value={field.checkboxes?.length || ""}
                            on_change={(e) =>
                              handleCheckboxGroupChange(
                                row.id,
                                field.id,
                                e.target.value
                              )
                            }
                            placeholder="Enter number of checkboxes"
                          />

                          {field.checkboxes?.map((cb, idx) => (
                            <div
                              key={idx}
                              className="mt-3 border rounded p-3 flex flex-col gap-2 bg-gray-100"
                            >
                              <label className="block text-sm font-medium mb-1">
                                Label for Checkbox {idx + 1}
                              </label>
                              <Text_Field
                                type="text"
                                value={cb.label}
                                on_change={(e) => {
                                  const newLabel = e.target.value;
                                  set_form_state((prev) => ({
                                    ...prev,
                                    form_template: prev.form_template.map(
                                      (row2) =>
                                        row2.id === row.id
                                          ? {
                                              ...row2,
                                              fields: row2.fields.map((f2) =>
                                                f2.id === field.id
                                                  ? {
                                                      ...f2,
                                                      checkboxes:
                                                        f2.checkboxes.map(
                                                          (c, i2) =>
                                                            i2 === idx
                                                              ? {
                                                                  ...c,
                                                                  label:
                                                                    newLabel,
                                                                }
                                                              : c
                                                        ),
                                                    }
                                                  : f2
                                              ),
                                            }
                                          : row2
                                    ),
                                  }));
                                }}
                              />

                              <label className="block text-sm font-medium mb-1 mt-2">
                                Key for Checkbox {idx + 1}
                              </label>
                              <Text_Field
                                type="text"
                                value={cb.key}
                                on_change={(e) => {
                                  const newKey = e.target.value;
                                  set_form_state((prev) => ({
                                    ...prev,
                                    form_template: prev.form_template.map(
                                      (row2) =>
                                        row2.id === row.id
                                          ? {
                                              ...row2,
                                              fields: row2.fields.map((f2) =>
                                                f2.id === field.id
                                                  ? {
                                                      ...f2,
                                                      checkboxes:
                                                        f2.checkboxes.map(
                                                          (c, i2) =>
                                                            i2 === idx
                                                              ? {
                                                                  ...c,
                                                                  key: newKey,
                                                                }
                                                              : c
                                                        ),
                                                    }
                                                  : f2
                                              ),
                                            }
                                          : row2
                                    ),
                                  }));
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-center items-center gap-2 mt-4">
              {[1, 2, 3, 4].map((num) => (
                <Button
                  key={num}
                  on_click={() => handleAddRow(num)}
                  width="w-[120px]"
                  variant="primary"
                >
                  + {num} col
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* STATE VIEW */}
        <div className="w-full bg-gray-100 border rounded-lg p-4">
          <h2 className="font-medium mb-2">Form Template State</h2>
          <pre className="text-xs bg-white p-3 rounded border overflow-auto max-h-[500px]">
            {JSON.stringify(form_state, null, 2)}
          </pre>
        </div>

        {/* ✅ FORM PREVIEW */}
        <div className="w-full bg-gray-100 border rounded-lg p-4">
          <h2 className="font-medium mb-2">Form Preview</h2>

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
                  {row.fields.map((field) => (
                    <div key={field.id} className="w-full">
                      {field.type === "date" ? (
                        <Date_Field
                          label={field.label || "Untitled Date Field"}
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
                        />
                      ) : field.type === "textarea" ? (
                        <Textarea_Field
                          label={field.label || "Untitled Textarea Field"}
                          name={field.key}
                          value={formData[field.key] || ""}
                          on_change={(e) =>
                            handleValueChange(field.key, e.target.value)
                          }
                          placeholder={
                            field.label
                              ? `Enter ${(field.label || "").toLowerCase()}`
                              : ""
                          }
                          height="121px"
                        />
                      ) : field.type === "select" ? (
                        <Select_Field
                          label={field.label || "Untitled Select Field"}
                          name={field.key}
                          value={formData[field.key] || ""}
                          on_change={(e) =>
                            handleValueChange(field.key, e.target.value)
                          }
                          options={field.options || []}
                          placeholder={
                            field.label
                              ? `Select ${(field.label || "").toLowerCase()}`
                              : ""
                          }
                        />
                      ) : field.type === "checkbox" ? (
                        <div className="mt-[32px] flex flex-col gap-2">
                          <Checkbox_Field
                            label={field.label || "Untitled Checkbox"}
                            name={field.key}
                            checked={!!formData[field.key]}
                            on_change={(e) =>
                              handleValueChange(field.key, e.target.checked)
                            }
                            box_size={22}
                            icon_size={14}
                          />
                        </div>
                      ) : field.type === "checkbox-group" ? (
                        <div className="flex flex-col gap-2">
                          <span className="block text-sm font-medium text-slate-700">
                            {field.label}
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
                                      [key]: checked, // update the specific checkbox key
                                    },
                                  }));
                                }}
                                box_size={22}
                                icon_size={14}
                              />
                            );
                          })}
                        </div>
                      ) : field.type === "password" ? (
                        <Password_Field
                          label={field.label || "Untitled Password Field"}
                          name={field.key}
                          value={formData[field.key] || ""}
                          on_change={(e) =>
                            handleValueChange(field.key, e.target.value)
                          }
                          placeholder={
                            field.label
                              ? `Enter ${(field.label || "").toLowerCase()}`
                              : ""
                          }
                        />
                      ) : (
                        <Text_Field
                          label={field.label || "Untitled Text Field"}
                          type="text"
                          value={formData[field.key] || ""}
                          on_change={(e) =>
                            handleValueChange(field.key, e.target.value)
                          }
                          placeholder={
                            field.label
                              ? `Enter ${(field.label || "").toLowerCase()}`
                              : ""
                          }
                        />
                      )}
                    </div>
                  ))}
                </div>
              ))}
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

export default Form_Generator;
