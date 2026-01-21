import { discount_con_list } from "assets/data/discount_con_list";
import Button from "assets/elements/Button";
import Button_Action from "assets/elements/Button_Action";
import Select_Generic from "assets/elements/modals/Select_Generic";
import Select_Generic_v2 from "assets/elements/modals/Select_Generic_v2";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import { format_currency } from "assets/scripts/format";
import { CirclePlus, Trash } from "lucide-react";
import React, { useState } from "react";

const Pricing_Elements = ({ price_element_list, set_price_element_list }) => {
  const [display_modal, set_display_modal] = useState("");
  const [selected_discount_con, set_selected_discount_con] = useState({});
  const select_modal_configs = [
    {
      key: "select_discount_con",
      label: "Discount Condition",
      column: ["Discount Condition", "Amount", "Discount Type"],
      column_types: ["discount_con_code", "discount_value", "discount_type"],
      source_code: ["discount_con_code"],
      source_desc: ["discount_con_desc"],
      data_fields: ["discount_value", "discount_type"],
      list: discount_con_list,
      target: ["discount_con_code"],
      on_after_select: (row) => {
        console.log("Selected discount:", row);
      },
    },
  ];
  return (
    <React.Fragment>
      <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
        {/* + Item List */}
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4">
          <div className="flex flex-col gap-5 px-6 md:pl-6 md:pr-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-semibold text-gray-600 whitespace-nowrap">
                Pricing Elements
              </h1>
            </div>
          </div>
          {/* + Table */}
          <div className="max-w-full overflow-x-auto custom-scrollbar">
            <table className="min-w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50">
                <tr className="border-b border-t whitespace-nowrap text-xs">
                  <th className="px-5 py-4 font-semibold border-r">No.</th>
                  <th className="px-5 py-4 font-semibold border-r">Code</th>
                  <th className="px-5 py-4 font-semibold border-r">
                    Description
                  </th>
                  <th className="px-5 py-4 font-semibold border-r">Amount</th>
                  <th className="px-5 py-4 font-semibold border-r">Currency</th>
                  <th className="px-5 py-4"></th>
                </tr>
              </thead>

              <tbody className="divide-y bg-white">
                {price_element_list.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-gray-500">
                      No record found.
                    </td>
                  </tr>
                ) : (
                  price_element_list.map((item, index) => (
                    <tr key={item.id} className="hover:bg-gray-50/50">
                      <td className="px-5 py-4 border-r">{index + 1}</td>
                      <td className="px-5 py-4 border-r whitespace-nowrap">
                        {item.code}
                      </td>
                      <td className="px-5 py-4 border-r">{item.description}</td>
                      <td className="px-5 py-4 border-r">
                        {format_currency(item.amount || 0, 2, "")}
                      </td>
                      <td className="px-5 py-4 border-r">{item.currency}</td>
                      <td className="px-5 py-4">
                        <div className="flex gap-2">
                          <Button_Action
                            icon={Trash}
                            tooltip="Remove Item"
                            variant="danger"
                            size={20}
                            // on_click={() => handle_remove_item(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* - Item List */}
        {/* + Add Item */}
        <div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:p-6">
          <div className="grid grid-cols-1">
            {/* Item Code */}
            <div>
              <Text_Code_Field
                label="Discount Condition"
                code_width="150px"
                show_search_button={true}
                // code_value={new_price_con_data?.item_code}
                // text_value={get_description(
                //   new_price_con_data.item_code,
                //   item_master_list,
                //   "item_code",
                //   "item_desc",
                // )}
                on_click={() => set_display_modal("select_discount_con")}
                disabled
              />
            </div>
          </div>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div>
              <Text_Field
                label="Discount Type"
                type={"text"}
                // value={new_price_con_data?.price_con_code}
                disabled
              />
            </div>
            <div>
              <Text_Field
                label="Discount Value"
                type={"text"}
                // value={new_price_con_data?.price_con_code}
                disabled
              />
            </div>
            <div className="lg:mt-3 flex items-end">
              <Button
                variant="primary"
                // size="lg"
                class_name="h-[38px]"
                icon={CirclePlus}
                icon_position="left"
                // on_click={() => set_is_confirm_modal_open(true)}
              >
                Add Discount
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Select_Generic_v2
        is_open={display_modal === "select_discount_con"}
        on_close={() => set_display_modal("")}
        modal_label="Discount Condition"
        source_list={discount_con_list}
        primary_field={{
          code: "discount_con_code",
          desc: "discount_con_desc",
          label: "Discount Condition",
        }}
        data_columns={[
          { key: "discount_value", label: "Amount" },
          { key: "discount_type", label: "Discount Type" },
        ]}
        set_data={set_selected_discount_con}
        target_field="discount_con_code"
        on_after_select={(row) => {
          console.log("Selected:", row);
        }}
      />
    </React.Fragment>
  );
};

export default Pricing_Elements;
