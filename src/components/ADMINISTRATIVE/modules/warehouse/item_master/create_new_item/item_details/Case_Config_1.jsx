import React from "react";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";

const Case_Config_1 = () => {
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* + Section 1 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700">
            Active Case Configurations
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field_Adorn
                type="number"
                placeholder="0"
                adornment="PC / PC"
                adornment_position="right"
                adornment_width="w-[120px]"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
              />
            </div>
            <div>
              <Text_Field_Adorn
                type="number"
                placeholder="0"
                adornment="PC / PAC"
                adornment_position="right"
                adornment_width="w-[120px]"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
              />
            </div>
            <div>
              <Text_Field_Adorn
                type="number"
                placeholder="0"
                adornment="PC / IBX"
                adornment_position="right"
                adornment_width="w-[120px]"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
              />
            </div>
            <div>
              <Text_Field_Adorn
                type="number"
                placeholder="0"
                adornment="PC / CS"
                adornment_position="right"
                adornment_width="w-[120px]"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
              />
            </div>
            <div>
              <Text_Field_Adorn
                type="number"
                placeholder="0"
                adornment="# of PACS / CS"
                adornment_position="right"
                adornment_width="w-[120px]"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
              />
            </div>
            <div>
              <Text_Field_Adorn
                type="number"
                placeholder="0"
                adornment="# of IBX / CS"
                adornment_position="right"
                adornment_width="w-[120px]"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* - Section 1 */}
        {/* + Section 2 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700">
            Active Case Codes / Barcodes
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div className="mt-[4px]">
              <Text_Field type={"text"} disabled />
            </div>
            <div className="mt-[4px]">
              <Text_Field type={"text"} disabled />
            </div>
            <div className="mt-[4px]">
              <Text_Field type={"text"} disabled />
            </div>
            <div className="mt-[4px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
        </div>
        {/* - Section 2 */}
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* + Section 3 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700">
            Inactive Case Configurations
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div>
              <Text_Field_Adorn
                type="number"
                adornment="PC / PC"
                adornment_position="right"
                adornment_width="w-[120px]"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                type="number"
                adornment="PC / PAC"
                adornment_position="right"
                adornment_width="w-[120px]"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                type="number"
                adornment="PC / IBX"
                adornment_position="right"
                adornment_width="w-[120px]"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                type="number"
                adornment="PC / CS"
                adornment_position="right"
                adornment_width="w-[120px]"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                type="number"
                adornment="# of PACS / CS"
                adornment_position="right"
                adornment_width="w-[120px]"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                disabled
              />
            </div>
            <div>
              <Text_Field_Adorn
                type="number"
                adornment="# of IBX / CS"
                adornment_position="right"
                adornment_width="w-[120px]"
                // value={data}
                // on_change={(e) => handle_data_change(e.target.value)}
                disabled
              />
            </div>
          </div>
        </div>
        {/* - Section 3 */}
        {/* + Section 4 */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700">
            Inactive Case Codes / Barcodes
          </h1>
          <div className="grid grid-cols-1 gap-5">
            <div className="mt-[4px]">
              <Text_Field type={"text"} disabled />
            </div>
            <div className="mt-[4px]">
              <Text_Field type={"text"} disabled />
            </div>
            <div className="mt-[4px]">
              <Text_Field type={"text"} disabled />
            </div>
            <div className="mt-[4px]">
              <Text_Field type={"text"} disabled />
            </div>
          </div>
        </div>
        {/* - Section 4 */}
      </div>
    </React.Fragment>
  );
};

export default Case_Config_1;
