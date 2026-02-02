import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Button from "assets/elements/Button";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { X } from "lucide-react";
import { get_description } from "assets/scripts/functions/get_description";
import { so_type_list } from "assets/data/so_type_list";
import { sales_org_list } from "assets/data/sales_org_list";
import { customer_master_list } from "assets/data/customer_master_list";
import { customer_sh_list } from "assets/data/customer_sh_list";
import Confirm_Modal from "assets/elements/modals/Confirm_Modal";

const Delete_SO = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  delete_so_data,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);
  const [delete_loading, set_delete_loading] = useState(false);

  const handle_delete_so = () => {
    set_delete_loading(true);
    alert("Only Admin can Delete SO");
    set_is_confirm_modal_open(false);
    set_delete_loading(false);
  };

  // RETURN ORIGIN
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
        {/* + Blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
        {/* - Blur */}
        {/* + Modal Content */}
        <div
          className={`relative bg-white rounded-lg shadow-xl ${width} w-full p-10 m-5 z-[99]`}
        >
          <button
            className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
            onClick={on_close}
          >
            <X size={20} />
          </button>
          <div className="text-lg md:text-xl font-bold mb-5">
            Delete Sales Order
          </div>
          {/* + Modal Body */}
          <div className="w-full pl-1 p-4 overflow-y-auto h-[500px] scrollbar-custom">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <h1 className="text-lg">Sales Order Details</h1>

                  <div className="flex gap-2">
                    <div className="text-gray-500 text-sm tracking-wider">
                      {delete_so_data?.creation_date}
                    </div>
                  </div>
                </div>
                <div className="p-5 sm:p-6 border-t">
                  <div className="w-full">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="col-span-full">
                          <Text_Field
                            label="SO Number"
                            type={"text"}
                            value={delete_so_data?.so_number}
                            disabled
                          />
                        </div>
                        <div className="col-span-full">
                          <Text_Field
                            label="PO Number"
                            type={"text"}
                            value={delete_so_data?.po_number}
                            disabled
                          />
                        </div>
                        <div className="col-span-full">
                          <Text_Code_Field
                            label="SO Type"
                            code_width="150px"
                            show_search_button={false}
                            code_value={delete_so_data?.so_type_code}
                            text_value={get_description(
                              delete_so_data.so_type_code,
                              so_type_list,
                              "so_type_code",
                              "so_type_desc",
                            )}
                            bg_dis_color="bg-slate-50"
                            text_dis_color="text-slate-500"
                            disabled
                          />
                        </div>
                        <div className="col-span-full">
                          <Text_Code_Field
                            label="Sales Organization"
                            code_width="150px"
                            show_search_button={false}
                            code_value={delete_so_data?.sales_org_code}
                            text_value={get_description(
                              delete_so_data.sales_org_code,
                              sales_org_list,
                              "sales_org_code",
                              "sales_org_desc",
                            )}
                            bg_dis_color="bg-slate-50"
                            text_dis_color="text-slate-500"
                            disabled
                          />
                        </div>
                        <div className="col-span-full">
                          <Text_Code_Field
                            label="Sold to Party / Address"
                            show_search_button={false}
                            code_width="150px"
                            code_value={delete_so_data.customer_code}
                            text_value={get_description(
                              delete_so_data.customer_code,
                              customer_master_list,
                              "customer_code",
                              "customer_desc",
                            )}
                            bg_dis_color="bg-slate-50"
                            text_dis_color="text-slate-500"
                            disabled
                          />
                        </div>
                        <div className="col-span-full">
                          <Text_Code_Field
                            label="Ship to Party / Address"
                            show_search_button={false}
                            code_width="150px"
                            code_value={delete_so_data.customer_sh_code}
                            text_value={get_description(
                              delete_so_data.customer_sh_code,
                              customer_sh_list,
                              "customer_sh_code",
                              "customer_sh_desc",
                            )}
                            bg_dis_color="bg-slate-50"
                            text_dis_color="text-slate-500"
                            disabled
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* - Modal Body */}
          {/* + Modal Footer */}
          <div className="flex justify-end gap-2 mt-5">
            <Button
              width="w-[100px]"
              variant="danger"
              on_click={() => set_is_confirm_modal_open(true)}
            >
              Delete
            </Button>
            <Button width="w-[100px]" variant="white" on_click={on_close}>
              Close
            </Button>
          </div>
          {/* - Modal Footer */}
        </div>

        {/* - Modal Content */}
      </div>
      <Confirm_Modal
        is_open={is_confirm_modal_open}
        confirm_variant="danger"
        title="Delete Sales Order"
        description_1="You are about to delete this Sales Order."
        description_2="Please review all the details before proceeding."
        description_3="Are you sure you want to continue?"
        on_confirm={handle_delete_so}
        on_cancel={() => set_is_confirm_modal_open(false)}
        confirm_loading={delete_loading}
      />
    </React.Fragment>
  ) : null;
};

export default Delete_SO;
