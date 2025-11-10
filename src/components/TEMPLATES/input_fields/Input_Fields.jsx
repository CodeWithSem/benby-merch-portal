import React, { useState } from "react";
import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import { Copy, Search } from "lucide-react";
import Icon_Field from "assets/elements/Icon_Field";
import Password_Field from "assets/elements/Password_Field";
import Select_Field from "assets/elements/Select_Field";
import Date_Field from "assets/elements/Date_Field";
import Date_Range_Field from "assets/elements/Date_Range_Field";
import Time_Field from "assets/elements/Time_Field";
import Payment_Field from "assets/elements/Payment_Field";
import Upload_Field from "assets/elements/Upload_Field";
import Copy_Field from "assets/elements/Copy_Field";
import Find_Field from "assets/elements/Find_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Verify_Field from "assets/elements/Verify_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import Textarea_Field from "assets/elements/Textarea_Field";
import Quantity_Field from "assets/elements/Quantity_Field";
import Checkbox_Field from "assets/elements/Checkbox_Field";
import Toggle_Switch from "assets/elements/Toggle_Switch";
import Radio_Button from "assets/elements/Radio_Button";

const Input_Fields = () => {
  const [search_query, set_search_query] = useState("");
  const [quantity, set_quantity] = useState(1);
  const [check, set_check] = useState(false);
  const [toggle, set_toggle] = useState(false);
  const [radio, set_radio] = useState(false);
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
          `<Password_Field
          label="Password"
          name="password"
          placeholder="Enter your password" />`
        ),
    },
    {
      id: "select_field",
      title: "Select Field",
      element: (
        <Select_Field
          label="Select Field"
          // value={selected_data}
          // on_change={handle_option_change}
          // options={options}
          placeholder="Select Option"
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Select_Field
          label="Select Field"
          // value={selected_data}
          // on_change={handle_option_change}
          // options={options}
          placeholder="Select Option" />`
        ),
    },
    {
      id: "date_field",
      title: "Date Field",
      element: (
        <Date_Field
          label="Date Field"
          // value={selected_data}
          on_change={(e) => alert(e.target.value)}
          placeholder="Select Date"
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Date_Field
          label="Date Field"
          // value={selected_data}
          on_change={(e) => alert(e.target.value)}
          placeholder="Select Date" />`
        ),
    },
    {
      id: "date_range_field",
      title: "Date Range Field",
      element: (
        <Date_Range_Field
          label="Select Date"
          // ref={date_range_ref}
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Date_Range_Field
          label="Select Date"
          // ref={date_range_ref} />`
        ),
    },
    {
      id: "time_field",
      title: "Time Field",
      element: (
        <Time_Field
          label="Select Time"
          // value={time}
          // on_change={handle_time_change}
          // min="09:00"
          // max="17:00"
          // step="900"
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Time_Field
          label="Select Time"
          // value={time}
          // on_change={handle_time_change}
          // min="09:00"
          // max="17:00"
          // step="900" />`
        ),
    },
    {
      id: "payment_field",
      title: "Payment Field",
      element: (
        <Payment_Field
          label={"Payment Field"}
          // value={data}
          // on_change={handle_data_change}
          placeholder="1234 5678 9012 3456"
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Payment_Field
          label={"Payment Field"}
          // value={data}
          // on_change={handle_data_change}
          placeholder="1234 5678 9012 3456" />`
        ),
    },
    {
      id: "icon_field",
      title: "Icon Field",
      element: (
        <Icon_Field
          label="Icon Field"
          // value={data}
          // on_change={(e) => handle_data_change(e.target.value)}
          placeholder="Search..."
          icon={Search}
          icon_position="left"
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Icon_Field
          label="Icon Field"
          // value={data}
          // on_change={(e) => handle_data_change(e.target.value)}
          placeholder="Search..."
          icon={Search}
          icon_position="left" />`
        ),
    },
    {
      id: "upload_field",
      title: "Upload Field",
      element: (
        <Upload_Field
          label="Upload Field"
          // on_change={handle_file_change}
          accept=".pdf,.doc,.docx,.xlsx"
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Upload_Field
          label="Upload Field"
          // on_change={handle_file_change}
          accept=".pdf,.doc,.docx,.xlsx" />`
        ),
    },
    {
      id: "copy_field",
      title: "Copy Field",
      element: (
        <Copy_Field
          label="Copy Field"
          // value={data}
          // on_change={handle_data_change}
          copy_button_label="Copy"
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Copy_Field
          label="Copy Field"
          // value={data}
          // on_change={handle_data_change}
          copy_button_label="Copy" />`
        ),
    },
    {
      id: "find_field",
      title: "Find Field",
      element: (
        <Find_Field
          label="Find Field"
          // value={data}
          // on_change={handle_data_change}
          // on_click={handle_find_click}
          disabled
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Find_Field
          label="Find Field"
          // value={data}
          // on_change={handle_data_change}
          // on_click={handle_find_click}
          disabled />`
        ),
    },
    {
      id: "text_code_field",
      title: "Text Code Field",
      element: (
        <Text_Code_Field
          label="Text Code Field"
          // code_value={code_data}
          // on_code_change={handle_code_data_change}
          // text_value={text_data}
          // on_text_change={handle_text_data_change}
          code_width="150px"
          show_search_button={true}
          disabled
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Text_Code_Field
          label="Text Code Field"
          // code_value={code_data}
          // on_code_change={handle_code_data_change}
          // text_value={text_data}
          // on_text_change={handle_text_data_change}
          code_width="150px"
          show_search_button={true}
          disabled />`
        ),
    },
    {
      id: "verify_field",
      title: "Verify Field",
      element: (
        <Verify_Field
          label="Verify Field"
          placeholder="Enter text"
          // value={data}
          // on_change={(e) => {
          //   set_text_verify(e.target.value);
          //   set_verify_status("");
          // }}
          show_find_button={true}
          // on_find={handle_find}
          // on_verify={handle_verify}
          // verify_status={verify_status}
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Verify_Field
          label="Verify Field"
          placeholder="Enter text"
          // value={data}
          // on_change={(e) => {
          //   set_text_verify(e.target.value);
          //   set_verify_status("");
          // }}
          show_find_button={true}
          // on_find={handle_find}
          // on_verify={handle_verify}
          // verify_status={verify_status} />`
        ),
    },
    {
      id: "text_field_adorn",
      title: "Text Field Adorn",
      element: (
        <Text_Field_Adorn
          label="Text Field Adorn"
          type="text"
          // value={data}
          // on_change={(e) => handle_data_change(e.target.value)}
          placeholder="Enter text"
          adornment="PHP"
          adornment_position="right"
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Text_Field_Adorn
          label="Text Field Adorn"
          type="text"
          // value={data}
          // on_change={(e) => handle_data_change(e.target.value)}
          placeholder="Enter text"
          adornment="PHP"
          adornment_position="right" />`
        ),
    },
    {
      id: "textarea_field",
      title: "Textarea Field",
      element: (
        <Textarea_Field
          label="Textarea Field"
          // value={data}
          // on_change={(e) => handle_data_change(e.target.value)}
          placeholder="Enter your description..."
          height="120px"
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Textarea_Field 
          label="Textarea Field" 
          // value={data} 
          // on_change={(e) => handle_data_change(e.target.value)} 
          placeholder="Enter your description..." height="120px" />`
        ),
    },
    {
      id: "quantity_field",
      title: "Quantity Field",
      element: (
        <Quantity_Field
          label="Quantity"
          value={quantity}
          min={1}
          // max={10}
          on_change={set_quantity}
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Quantity_Field 
          label="Quantity" 
          value={quantity} 
          min={1} 
          // max={10} 
          // on_change={set_quantity} />`
        ),
    },
    {
      id: "checkbox_field",
      title: "Checkbox Field",
      element: (
        <Checkbox_Field
          label="Checkbox Field"
          box_size={24}
          icon_size={14}
          checked={check}
          on_change={(e) => set_check(e.target.checked)}
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Checkbox_Field 
          label="Checkbox Field" 
          box_size={24} 
          icon_size={14} 
          checked={check} 
          on_change={(e) => set_check(e.target.checked)} />`
        ),
    },
    {
      id: "toggle_switch",
      title: "Toggle Switch",
      element: (
        <Toggle_Switch
          id="example-toggle"
          label="Toggle Switch"
          checked={toggle}
          on_change={(e) => set_toggle(e.target.checked)}
          width={46}
          height={26}
          knob_size={21}
          gap={3}
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Toggle_Switch 
          id="example-toggle" 
          label="Toggle Switch" 
          checked={toggle} 
          on_change={(e) => set_toggle(e.target.checked)} 
          width={46} 
          height={26} 
          knob_size={21} 
          gap={3} />`
        ),
    },
    {
      id: "radio_button",
      title: "Radio Button",
      element: (
        <Radio_Button
          label="Radio Button"
          name="radio_button"
          checked={radio === "radio_button"}
          on_change={(e) => set_radio(e.target.name)}
        />
      ),
      copyFunction: () =>
        navigator.clipboard.writeText(
          `<Radio_Button 
          label="Radio Button" 
          name="radio_button" 
          checked={radio === "radio_button"} 
          on_change={(e) => set_radio(e.target.name)} />`
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
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {filtered_fields.length > 0 ? (
          filtered_fields.map((field) => (
            <div key={field.id} className="w-full bg-white rounded-lg border">
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
                <div className="w-full bg-white rounded-lg">
                  {field.element}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-10">
            No matching input fields found.
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default Input_Fields;
