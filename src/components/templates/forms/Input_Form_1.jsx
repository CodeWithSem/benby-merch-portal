import React, { useState } from "react";
import Input_Field from "../../elements/Input_Field";
import Select_Field from "../../elements/Select_Field";
import Date_Field from "../../elements/Date_Field";
import Copy_Field from "../../elements/Copy_Field";
import Time_Field from "../../elements/Time_Field";
import Upload_Field from "../../elements/Upload_Field";
import Textarea_Field from "../../elements/Textarea_Field";

const Input_Form_1 = () => {
  // + For Input Field
  const [username, set_username] = useState("");
  const [username_error, set_username_error] = useState("");

  const handle_username_change = (e) => {
    const value = e.target.value;
    set_username(value);

    if (value.length > 16) {
      set_username_error("Username must be less than 16 characters.");
    } else {
      set_username_error("");
    }
  };
  // - For Input Field
  // + For Select Field
  const [role, set_role] = useState("");
  const [role_error, set_role_error] = useState("");

  const handle_role_change = (e) => {
    const selected = e.target.value;
    set_role(selected);
    set_role_error(selected ? "" : "Role is required.");
  };

  const roles = [
    { label: "Admin", value: "ADMIN" },
    { label: "Editor", value: "EDITOR" },
    { label: "Viewer", value: "VIEWER" },
  ];
  // - For Select Field
  // + For Date Field
  const [birth_date, set_birth_date] = useState("");
  const [birth_date_error, set_birth_date_error] = useState("");

  const handle_date_change = (e) => {
    const value = e.target.value;
    set_birth_date(value);

    if (!value) {
      set_birth_date_error("Date is required.");
    } else {
      set_birth_date_error("");
    }
  };
  // - For Date Field
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
  const [api_key, set_api_key] = useState("");

  const handle_change = (e) => {
    set_api_key(e.target.value);
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

  const submit = () => {
    if (username == "") {
      set_username_error("Username is required.");
    } else {
      alert("success");
    }
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <Textarea_Field
        label="Description"
        name="description"
        value={description}
        on_change={handle_textarea_change}
        placeholder="Enter your description..."
        required={true}
        textarea_error={description_error}
      />
      {/* <Upload_Field
        label="Upload resume"
        name="resume"
        on_change={handle_file_change}
        accept=".pdf,.doc,.docx,.xlsx"
        file_error={file_error}
        required
      /> */}
      {/* <Copy_Field
        label="API Key"
        name="api_key"
        value={api_key}
        on_change={handle_change}
        copy_button_label="Copy"
        disabled
      /> */}
      {/* <Time_Field
        label="Select Time"
        name="appointment_time"
        value={time}
        on_change={handle_time_change}
        required={true}
        min="09:00"
        max="17:00"
        step="900"
        error_message={time_error}
      /> */}
      {/* <Date_Field
        label="Date of Birth"
        name="birth_date"
        value={birth_date}
        on_change={handle_date_change}
        placeholder="Select your birth date"
        required
        min="1900-01-01"
        max="2025-12-31"
        error_message={birth_date_error}
      /> */}
      {/* <Select_Field
        label="User Role"
        name="role"
        value={role}
        on_change={handle_role_change}
        options={roles}
        placeholder=""
        error_message={role_error}
        required
      /> */}
      {/* <Input_Field
        label="Username"
        type={"text"}
        placeholder="Enter username"
        value={username}
        on_change={handle_username_change}
        pattern="[A-Za-z]{1,}"
        error_message={username_error}
      /> */}
      {/* <button onClick={submit}>submit</button> */}
    </React.Fragment>
  );
};

export default Input_Form_1;
