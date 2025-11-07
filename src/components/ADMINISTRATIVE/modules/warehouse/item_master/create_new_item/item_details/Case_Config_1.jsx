import Checkbox_Field from "assets/elements/Checkbox_Field";
import Date_Field from "assets/elements/Date_Field";
import Select_Field from "assets/elements/Select_Field";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";
import React from "react";

const Case_Config_1 = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700">
            Active Case Configurations
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field_Adorn
                label="Text Field Adorn"
                type="number"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                placeholder="0"
                adornment="PC / PC"
                adornment_position="right"
                adornment_width="w-[120px]"
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="Text Field Adorn"
                type="number"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                placeholder="0"
                adornment="PC / PAC"
                adornment_position="right"
                adornment_width="w-[120px]"
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="Text Field Adorn"
                type="number"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                placeholder="0"
                adornment="PC / IBX"
                adornment_position="right"
                adornment_width="w-[120px]"
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="Text Field Adorn"
                type="number"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                placeholder="0"
                adornment="PC / CS"
                adornment_position="right"
                adornment_width="w-[120px]"
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="Text Field Adorn"
                type="number"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                placeholder="0"
                adornment="# of PACS / CS"
                adornment_position="right"
                adornment_width="w-[120px]"
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="Text Field Adorn"
                type="number"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                placeholder="0"
                adornment="# of IBX / CS"
                adornment_position="right"
                adornment_width="w-[120px]"
              />
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700">
            Active Case Codes / Bardcodes
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div className="mt-[24px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
            <div className="mt-[24px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
            <div className="mt-[24px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
            <div className="mt-[24px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700">
            Inactive Case Configurations
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field_Adorn
                label="Text Field Adorn"
                type="number"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                adornment="PC / PC"
                adornment_position="right"
                adornment_width="w-[120px]"
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="Text Field Adorn"
                type="number"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                adornment="PC / PAC"
                adornment_position="right"
                adornment_width="w-[120px]"
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="Text Field Adorn"
                type="number"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                adornment="PC / IBX"
                adornment_position="right"
                adornment_width="w-[120px]"
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="Text Field Adorn"
                type="number"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                adornment="PC / CS"
                adornment_position="right"
                adornment_width="w-[120px]"
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="Text Field Adorn"
                type="number"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                adornment="# of PACS / CS"
                adornment_position="right"
                adornment_width="w-[120px]"
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                label="Text Field Adorn"
                type="number"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                adornment="# of IBX / CS"
                adornment_position="right"
                adornment_width="w-[120px]"
                disabled
              />
            </div>
          </div>
        </div>
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700">
            Inactive Case Codes / Bardcodes
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div className="mt-[24px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
            <div className="mt-[24px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
            <div className="mt-[24px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
            <div className="mt-[24px]">
              <Text_Field type={"text"} pattern="[0-9]{1,}" disabled />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Case_Config_1;
