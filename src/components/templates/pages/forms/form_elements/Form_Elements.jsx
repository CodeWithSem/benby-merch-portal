import React, { useRef, useState } from "react";
import { Search } from "lucide-react";
import Text_Field from "../../../../elements/Text_Field";
import Select_Field from "../../../../elements/Select_Field";
import Date_Field from "../../../../elements/Date_Field";
import Time_Field from "../../../../elements/Time_Field";
import Copy_Field from "../../../../elements/Copy_Field";
import Upload_Field from "../../../../elements/Upload_Field";
import Textarea_Field from "../../../../elements/Textarea_Field";
import Checkbox_Field from "../../../../elements/Checkbox_Field";
import Toggle_Switch from "../../../../elements/Toggle_Switch";
import Radio_Button from "../../../../elements/Radio_Button";
import Payment_Field from "../../../../elements/Payment_Field";
import Password_Field from "../../../../elements/Password_Field";
import Icon_Field from "../../../../elements/Icon_Field";
import Button from "../../../../elements/Button";
import Date_Range_Field from "../../../../elements/Date_Range_Field";

const Form_Elements = () => {
  // + For Input Field (Text)
  const [text, set_text] = useState("");
  const [text_error, set_text_error] = useState("");

  const handle_text_change = (e) => {
    const value = e.target.value;
    set_text(value);

    if (value.length > 16) {
      set_text_error("Username must be less than 16 characters.");
    } else {
      set_text_error("");
    }
  };
  // - For Input Field (Text)
  // + For Input Field (Number)
  const [number, set_number] = useState("");
  const [number_error, set_number_error] = useState("");

  const handle_number_change = (e) => {
    const value = e.target.value;
    set_number(value);

    if (value.length > 16) {
      set_number_error("Username must be less than 16 characters.");
    } else {
      set_number_error("");
    }
  };
  // - For Input Field (Number)
  // + For Select Field
  const [select_option, set_select_option] = useState("");
  const [select_option_error, set_select_option_error] = useState("");

  const handle_select_option_change = (e) => {
    const selected = e.target.value;
    set_select_option(selected);
    set_select_option_error(selected ? "" : "Role is required.");
  };

  const select_options = [
    { label: "Admin", value: "ADMIN" },
    { label: "Editor", value: "EDITOR" },
    { label: "Viewer", value: "VIEWER" },
  ];
  // - For Select Field
  // + For Date Field
  // const [date, set_date] = useState("");
  // const [date_error, set_date_error] = useState("");

  // const handle_date_change = (e) => {
  //   const value = e.target.value;
  //   set_date(value);

  //   if (!value) {
  //     set_date_error("Date is required.");
  //   } else {
  //     set_date_error("");
  //   }
  // };
  const [form, setForm] = useState({
    start_date: null,
    date_range: [], // 👈 For range mode, store as array [start, end]
  });

  // Generic handler that works for both single and range
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [form1, setForm1] = useState({
    start_date: null,
    date_range: [], // 👈 For range mode, store as array [start, end]
  });

  // Generic handler that works for both single and range
  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setForm1((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // - For Date Field
  // + For Date Range Field
  const dateRangeRef = useRef(null);

  const [date_range_data, set_date_range_data] = useState({
    start_date: "",
    end_date: "",
  });
  const handleGetDate = () => {
    if (dateRangeRef.current) {
      const selectedDates = dateRangeRef.current.flatpickr.selectedDates;

      set_date_range_data({
        start_date: selectedDates[0] || "",
        end_date: selectedDates[1] || "",
      });

      console.log("Stored in state:", {
        start_date: selectedDates[0] || "",
        end_date: selectedDates[1] || "",
      });
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${mm}/${dd}/${yyyy}`;
  };

  // - For Date Range Field
  // + For Time Field
  const [time, set_time] = useState("");
  const [time_error, set_time_error] = useState("");

  const handle_time_change = (e) => {
    const value = e.target.value;
    set_time(value);

    if (!value) {
      set_time_error("Please select a time.");
    } else {
      set_time_error("");
    }
  };
  // - For Time Field
  // + For Copy Field
  const [copy, set_copy] = useState("");

  const handle_copy_change = (e) => {
    set_copy(e.target.value);
  };
  // - For Copy Field
  // + For Upload Field
  const [file, set_file] = useState(null);
  const [file_error, set_file_error] = useState("");

  const handle_file_change = (e) => {
    const selected_file = e.target.files?.[0];

    if (selected_file && selected_file.size > 5 * 1024 * 1024) {
      // Example: max 5MB
      set_file_error("File must be smaller than 5MB.");
      set_file(null);
    } else {
      set_file_error("");
      set_file(selected_file);
    }
  };
  // - For Upload Field
  // + For Textarea Field
  const [description, set_description] = useState("");
  const [description_error, set_description_error] = useState("");

  const handle_textarea_change = (event) => {
    const input_value = event.target.value;
    set_description(input_value);

    if (input_value.length > 200) {
      set_description_error("Description can't exceed 200 characters.");
    } else {
      set_description_error("");
    }
  };
  // - For Textarea Field
  // + For Checkbox Field
  const [check, set_check] = useState(false);
  // - For Checkbox Field
  // + For Toggle Switch
  const [toggle, set_toggle] = useState(false);
  // - For Toggle Switch
  // + For Radio Button
  const [radio, set_radio] = useState("option1");

  const handle_radio_change = (e) => {
    set_radio(e.target.name);
  };
  // - For Radio Button
  // + For Payment Field
  const [card_number, set_card_number] = useState("");
  const [card_number_error, set_card_number_error] = useState("");

  const handle_card_number_change = (e) => {
    const value = e.target.value;
    set_card_number(value);

    // // Simple validation example: must be 16 digits (only numbers and spaces allowed)
    // const cleaned_value = value.replace(/\s+/g, "");
    // if (
    //   cleaned_value.length > 0 &&
    //   (!/^\d*$/.test(cleaned_value) || cleaned_value.length !== 16)
    // ) {
    //   set_card_number_error("Card number must be 16 digits.");
    // } else {
    //   set_card_number_error("");
    // }
  };
  // - For Payment Field
  // + For Password Field
  const [password, set_password] = useState("");
  const [error_message, set_error_message] = useState("");

  const handle_password_change = (e) => {
    set_password(e.target.value);
    if (e.target.value.length < 4) {
      set_error_message("Password must be at least 4 characters");
    } else {
      set_error_message("");
    }
  };
  // - For Password Field
  // + For Icon Field
  const [search_term, set_search_term] = useState("");
  // - For Icon Field

  const [loading, set_loading] = useState(false);
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <h1 className="w-full text-xl py-5">Form Elements</h1>
      </div>
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">Default Inputs</h1>
        <div className="flex flex-col md:flex-row gap-5 p-6">
          <div className="w-full">
            <div className="w-full">
              <Text_Field
                label="Text"
                type={"text"}
                placeholder="Enter text"
                value={text}
                on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                error_message={text_error}
              />
            </div>
            <div className="w-full mt-5">
              <Text_Field
                label="Weight (kg)"
                type={"number"}
                placeholder="Enter weight"
                value={number}
                on_change={handle_number_change}
                pattern="[A-Za-z]{1,}"
                error_message={number_error}
              />
            </div>
            <div className="w-full mt-5">
              <Password_Field
                label="Password"
                name="password"
                value={password}
                on_change={handle_password_change}
                placeholder="Enter your password"
                error_message={error_message}
                required={true}
              />
            </div>
            <div className="w-full mt-5">
              <Select_Field
                label="Option"
                name="option"
                value={select_option}
                on_change={handle_select_option_change}
                options={select_options}
                placeholder="Select Option"
                error_message={select_option_error}
                required
              />
            </div>
            <div className="w-full mt-5">
              <Date_Field
                label="Select Date"
                name="date_range"
                value={form1.date_range}
                on_change={handleInputChange1}
                placeholder="Select Date"
                // mode="range"
                // required
                // min="1900-01-01"
                // max="2025-12-31"
                // error_message={date_error}
              />
            </div>
            <div className="w-full mt-5">
              <Date_Range_Field label="Select Date" ref={dateRangeRef} />
            </div>
            <div className="w-full mt-5">
              <Time_Field
                label="Select Time"
                name="appointment_time"
                value={time}
                on_change={handle_time_change}
                required={true}
                min="09:00"
                max="17:00"
                step="900"
                error_message={time_error}
              />
            </div>
            <div className="w-full mt-5">
              <Payment_Field
                label={"Card Number"}
                name="card_number"
                value={card_number}
                on_change={handle_card_number_change}
                placeholder="1234 5678 9012 3456"
                error_message={card_number_error}
              />
            </div>
            <div className="w-full mt-5">
              <Icon_Field
                label="Search"
                name="search"
                value={search_term}
                on_change={(e) => set_search_term(e.target.value)}
                placeholder="Search..."
                icon={Search}
                icon_position="right"
              />
            </div>
          </div>
          <div className="w-full">
            <div className="w-full">
              <Upload_Field
                label="Upload File"
                name="resume"
                on_change={handle_file_change}
                accept=".pdf,.doc,.docx,.xlsx"
                file_error={file_error}
                required
              />
            </div>
            <div className="w-full mt-5">
              <Copy_Field
                label="Copy Field"
                name="copy"
                value={copy}
                on_change={handle_copy_change}
                copy_button_label="Copy"
              />
            </div>
            <div className="w-full mt-5">
              <Textarea_Field
                label="Description"
                name="description"
                value={description}
                on_change={handle_textarea_change}
                placeholder="Enter your description..."
                height="121px"
                required={true}
                textarea_error={description_error}
              />
            </div>
            <div className="w-full flex md:mt-[52px] mt-[20px] gap-4">
              <div>
                <Checkbox_Field
                  label="Checkbox"
                  name="terms"
                  box_size={24}
                  icon_size={14}
                  checked={check}
                  on_change={(e) => set_check(e.target.checked)}
                />
              </div>
              <div>
                <Toggle_Switch
                  id="example-toggle"
                  checked={toggle}
                  on_change={(e) => set_toggle(e.target.checked)}
                  label="Toggle Switch"
                  disabled={false}
                  width={46}
                  height={26}
                  knob_size={21}
                  gap={3}
                />
              </div>
              <div className="flex gap-4">
                <Radio_Button
                  label="Option 1"
                  name="option1"
                  checked={radio === "option1"}
                  on_change={handle_radio_change}
                />
                <Radio_Button
                  label="Option 2"
                  name="option2"
                  checked={radio === "option2"}
                  on_change={handle_radio_change}
                />
              </div>
            </div>
            <div className="w-full mt-[20px] md:mt-[46px]">
              <div className="flex gap-4">
                <Button on_click={() => alert("Clicked!")}>Submit</Button>
                <Button
                  on_click={() => set_loading(!loading)}
                  width="w-[120px]"
                  variant="danger"
                  loading={loading}
                >
                  Delete
                </Button>
                <Button
                  on_click={() => set_loading(false)}
                  width="w-[120px]"
                  variant="white"
                  // loading={loading}
                >
                  Cancel
                </Button>
                <Button
                  on_click={handleGetDate}
                  width="w-[120px]"
                  variant="white"
                  // loading={loading}
                >
                  Get Date
                </Button>
              </div>
            </div>
            <div className="w-full mt-5">
              <div className="text-sm">
                <p>
                  Start Date: {formatDate(date_range_data.start_date) || "N/A"}
                </p>
                <p>End Date: {formatDate(date_range_data.end_date) || "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form_Elements;
