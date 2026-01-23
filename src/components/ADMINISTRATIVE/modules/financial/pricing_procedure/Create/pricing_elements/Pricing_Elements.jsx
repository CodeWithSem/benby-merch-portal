import { discount_con_list } from "assets/data/discount_con_list";
import Button from "assets/elements/Button";
import Button_Action from "assets/elements/Button_Action";
import Select_Generic_v2 from "assets/elements/modals/Select_Generic_v2";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import Text_Field from "assets/elements/Text_Field";
import { format_currency } from "assets/scripts/format";
import { get_description } from "assets/scripts/functions/get_description";
import { CirclePlus, Trash } from "lucide-react";
import React, { useState } from "react";

/**
 * REQUIRED PROPS
 * - base_price: number
 * - discount_category_code: "RD" | "BD"
 */
const Pricing_Elements = ({
  price_element_list,
  set_price_element_list,
  base_price,
  discount_category_code,
}) => {
  const [display_modal, set_display_modal] = useState("");
  const [selected_discount_con, set_selected_discount_con] = useState({});

  // =========================================================
  // PRICING CALCULATION
  // =========================================================
  const recalculate_pricing = (price_elements) => {
    if (!price_elements || price_elements.length === 0) return [];

    const base_price_row = price_elements[0]; // first row is base price
    let running_price = base_price_row.amount;
    const output = [base_price_row]; // start with base price

    const discount_rows = price_elements.slice(1); // only discount rows

    discount_rows.forEach((item) => {
      let discount_result = 0;

      // ===== Percent Discount =====
      if (item.discount_type === "Percent") {
        if (discount_category_code === "RD") {
          discount_result = running_price * (item.discount_value / 100);
        } else if (discount_category_code === "BD") {
          discount_result = base_price_row.amount * (item.discount_value / 100);
        }
      }

      // ===== Amount Discount =====
      if (item.discount_type === "Amount") {
        discount_result = item.discount_value;
      }

      // Subtract from running price (for calculation only)
      running_price -= discount_result;

      // ---- Discount Row (show original discount_value from condition) ----
      output.push({
        ...item,
        discount_result, // internal calculation
        currency: item.discount_type === "Percent" ? "%" : "PHP",
        is_result: false,
      });

      // ---- Result Row ----
      output.push({
        id: `${item.id}-RESULT`,
        code: "RESULT",
        description: "Result",
        amount: running_price,
        currency: "PHP",
        is_result: true,
      });
    });

    return output;
  };

  // =========================================================
  // ADD DISCOUNT
  // =========================================================
  const handle_add_discount = () => {
    if (!selected_discount_con?.discount_con_code) return;

    const discounts_only = price_element_list.filter((item) => !item.is_result);

    const new_discount = {
      id: crypto.randomUUID(),
      code: selected_discount_con.discount_con_code,
      description: selected_discount_con.discount_con_desc,
      discount_type: selected_discount_con.discount_type,
      discount_value: selected_discount_con.discount_value,
    };

    set_price_element_list(
      recalculate_pricing([...discounts_only, new_discount]),
    );

    set_selected_discount_con({});
  };

  // =========================================================
  // REMOVE DISCOUNT
  // =========================================================
  const handle_remove_item = (id) => {
    const discounts_only = price_element_list
      .filter((item) => !item.is_result)
      .filter((item) => item.id !== id);

    set_price_element_list(recalculate_pricing(discounts_only));
  };

  // =========================================================
  // RENDER
  // =========================================================
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
                  price_element_list.map((item, index) => {
                    const rowNumber = index + 1;

                    if (item.is_result) {
                      return (
                        <tr
                          key={item.id}
                          className="hover:bg-green-50 bg-green-50/50"
                        >
                          <td className="px-5 py-4 border-r">{rowNumber}</td>
                          <td
                            colSpan={2}
                            className="px-5 py-4 border-r text-right"
                          >
                            {item.description} :
                          </td>
                          <td className="px-5 py-4 border-r">
                            {format_currency(item.amount || 0, 2, "")}
                          </td>
                          <td className="px-5 py-4 border-r">
                            {item.currency}
                          </td>
                          <td className="px-5 py-4"></td>
                        </tr>
                      );
                    }

                    // Discount row
                    return (
                      <tr key={item.id} className="hover:bg-gray-50/50">
                        <td className="px-5 py-4 border-r">{rowNumber}</td>
                        <td className="px-5 py-4 border-r">{item.code}</td>
                        <td className="px-5 py-4 border-r">
                          {item.description}
                        </td>
                        <td className="px-5 py-4 border-r">
                          {index === 0
                            ? format_currency(item.amount || 0, 2, "")
                            : item.discount_type === "Percent"
                              ? item.discount_value
                              : format_currency(
                                  item.discount_value || 0,
                                  2,
                                  "",
                                )}
                        </td>
                        <td className="px-5 py-4 border-r">
                          {item.discount_type === "Percent" ? "%" : "PHP"}
                        </td>
                        <td className="px-5 py-4">
                          {index !== 0 && (
                            <Button_Action
                              icon={Trash}
                              tooltip="Remove Item"
                              variant="danger"
                              size={20}
                              on_click={() => handle_remove_item(item.id)}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* + Add Discount */}
        <div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:p-6">
          <Text_Code_Field
            label="Discount Condition"
            code_width="150px"
            show_search_button
            code_value={selected_discount_con?.discount_con_code}
            text_value={get_description(
              selected_discount_con.discount_con_code,
              discount_con_list,
              "discount_con_code",
              "discount_con_desc",
            )}
            on_click={() => set_display_modal("select_discount_con")}
            disabled
          />

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-4">
            <Text_Field
              label="Discount Type"
              value={selected_discount_con?.discount_type}
              disabled
            />
            <Text_Field
              label="Discount Value"
              value={format_currency(
                selected_discount_con?.discount_value || 0,
                2,
                "",
              )}
              disabled
            />
            <div className="lg:mt-3 flex items-end">
              <Button
                variant="primary"
                className="h-[38px]"
                icon={CirclePlus}
                icon_position="left"
                on_click={handle_add_discount}
              >
                Add Discount
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* + Select Modal */}
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
          { key: "discount_type", label: "Discount Type" },
          { key: "discount_value", label: "Amount" },
        ]}
        set_data={set_selected_discount_con}
        target_field="discount_con_code"
        on_after_select={(row) => set_selected_discount_con(row)}
      />
    </React.Fragment>
  );
};

export default Pricing_Elements;
