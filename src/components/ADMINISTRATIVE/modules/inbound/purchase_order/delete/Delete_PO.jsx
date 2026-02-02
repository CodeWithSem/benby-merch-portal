import React, { useState } from "react";
import { X } from "lucide-react";

import Button from "assets/elements/Button";
import Text_Field from "assets/elements/Text_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";
import { get_description } from "assets/scripts/functions/get_description";
import { po_type_list } from "assets/data/po_type_list";
import { vendor_master_list } from "assets/data/vendor_master_list";
import { plant_list } from "assets/data/plant_list";
import { warehouse_list } from "assets/data/warehouse_list";
import { sloc_list } from "assets/data/sloc_list";

const Delete_PO = ({
  is_open,
  on_close,
  width = "max-w-[700px]",
  delete_po_data,
}) => {
  const [is_confirm_modal_open, set_is_confirm_modal_open] = useState(false);

  const handle_delete_po = () => {
    alert("Delete PO");
  };

  const Confirm_Modal = () => {
    return (
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center z-[100]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[101]"></div>
          <div className="relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-10 m-5 z-[102]">
            <div className="w-full flex justify-center items-center text-lg md:text-xl font-bold mb-4">
              Delete Purchase Order
            </div>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              You are about to delete this Purchase Order.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 pt-4">
              This action is permanent and cannot be undone. All related data
              such as item details, amounts, and supplier information will also
              be removed from the system.
            </p>
            <p className="w-full text-center text-sm leading-6 text-gray-500 dark:text-gray-400 py-4">
              Are you sure you want to continue?
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Button
                width="w-[100px]"
                variant="danger"
                on_click={handle_delete_po}
              >
                Yes
              </Button>
              <Button
                width="w-[100px]"
                variant="white"
                on_click={() => set_is_confirm_modal_open(false)}
              >
                No
              </Button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  // RETURN ORIGIN
  return is_open ? (
    <React.Fragment>
      <div className="fixed inset-0 flex items-center justify-center z-[97] px-4">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
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
            Delete Purchase Order
          </div>

          <div className="w-full pl-1 p-4 overflow-y-auto max-h-[500px] scrollbar-custom">
            <div className="w-full">
              <div className="w-full bg-white rounded-lg border">
                <div className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <h1 className="text-lg">Purchase Order Details</h1>
                  <div className="flex gap-2">
                    <div className="text-gray-500 text-sm tracking-wider">
                      MM-DD-YYYY
                    </div>
                  </div>
                </div>

                <div className="p-5 sm:p-6 border-t">
                  <div className="w-full">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className="col-span-full">
                          <Text_Field
                            label="PO Number"
                            type="text"
                            value={delete_po_data?.po_number}
                            disabled
                          />
                        </div>

                        <div className="col-span-full">
                          <Text_Code_Field
                            label="PO Type"
                            code_width="150px"
                            show_search_button={false}
                            code_value={delete_po_data?.po_type_code}
                            text_value={get_description(
                              delete_po_data.po_type_code,
                              po_type_list,
                              "po_type_code",
                              "po_type_desc",
                            )}
                            bg_dis_color="bg-slate-50"
                            text_dis_color="text-slate-500"
                            disabled
                          />
                        </div>

                        <div className="col-span-full">
                          <Text_Code_Field
                            label="Vendor"
                            code_width="150px"
                            show_search_button={false}
                            code_value={delete_po_data?.vendor_code}
                            text_value={get_description(
                              delete_po_data.vendor_code,
                              vendor_master_list,
                              "vendor_code",
                              "vendor_desc",
                            )}
                            bg_dis_color="bg-slate-50"
                            text_dis_color="text-slate-500"
                            disabled
                          />
                        </div>
                        <div className="col-span-full">
                          <Text_Code_Field
                            label="Plant"
                            code_width="150px"
                            show_search_button={false}
                            code_value={delete_po_data?.plant_code}
                            text_value={get_description(
                              delete_po_data.plant_code,
                              plant_list,
                              "plant_code",
                              "plant_desc",
                            )}
                            bg_dis_color="bg-slate-50"
                            text_dis_color="text-slate-500"
                            disabled
                          />
                        </div>
                        <div className="col-span-full">
                          <Text_Code_Field
                            label="Warehouse"
                            code_width="150px"
                            show_search_button={false}
                            code_value={delete_po_data?.warehouse_code}
                            text_value={get_description(
                              delete_po_data.warehouse_code,
                              warehouse_list,
                              "warehouse_code",
                              "warehouse_desc",
                            )}
                            bg_dis_color="bg-slate-50"
                            text_dis_color="text-slate-500"
                            disabled
                          />
                        </div>
                        <div className="col-span-full">
                          <Text_Code_Field
                            label="SLOC"
                            code_width="150px"
                            show_search_button={false}
                            code_value={delete_po_data?.sloc_code}
                            text_value={get_description(
                              delete_po_data.sloc_code,
                              sloc_list,
                              "sloc_code",
                              "sloc_desc",
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
        </div>
      </div>

      {is_confirm_modal_open && <Confirm_Modal />}
    </React.Fragment>
  ) : null;
};

export default Delete_PO;
