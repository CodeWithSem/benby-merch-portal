import React, { useState } from "react";
import Text_Field from "../../../../elements/Text_Field";
import Verify_Field from "../../../../elements/Verify_Field";
import Select_Field from "../../../../elements/Select_Field";
import Textarea_Field from "../../../../elements/Textarea_Field";
import { Eye, Info, Save, Search, SquarePen, Trash2 } from "lucide-react";
import Icon_Field from "../../../../elements/Icon_Field";
import Quantity_Field from "../../../../elements/Quantity_Field";
import Button from "../../../../elements/Button";

const Create_Invoice = () => {
  // + For Input Field (Text)
  const [text, set_text] = useState("");
  const [text_error, set_text_error] = useState("");

  const handle_text_change = (e) => {
    const value = e.target.value;
    set_text(value);
  };

  const [product_name, set_product_name] = useState("");
  const [product_name_error, set_product_name_error] = useState("");

  const handle_product_name_change = (e) => {
    const value = e.target.value;
    set_product_name(value);
  };
  // - For Input Field (Text)
  // + For Verify Field
  const [text_verify, set_text_verify] = useState("");
  const [verify_status, set_verify_status] = useState("");

  const handle_find = () => {
    alert("Searching for: " + text_verify);
  };

  const handle_verify = () => {
    // simulate verification
    if (text_verify === "12345") set_verify_status("check");
    else set_verify_status("error");
  };
  // - For Verify Field
  // + For Select Field
  const [payment_condition, set_payment_condition] = useState("");
  const [payment_condition_error, set_payment_condition_error] = useState("");

  const handle_payment_condition_change = (e) => {
    const selected = e.target.value;
    set_payment_condition(selected);
    set_payment_condition_error(selected ? "" : "Role is required.");
  };

  const payment_conditions = [
    { label: "Net 7 Days", value: "NET 7 DAYS" },
    { label: "Net 15 Days", value: "NET 15 DAYS" },
    { label: "Net 30 Days", value: "NET 30 DAYS" },
    { label: "Net 60 Days", value: "NET 60 DAYS" },
    { label: "Net 90 Days", value: "NET 90 DAYS" },
    { label: "Due on Receipt", value: "DUE ON RECEIPT" },
    { label: "Cash on Delivery (COD)", value: "COD" },
  ];
  const [currency, set_currency] = useState("");
  const [currency_error, set_currency_error] = useState("");

  const handle_currency_change = (e) => {
    const selected = e.target.value;
    set_currency(selected);
    set_currency_error(selected ? "" : "Role is required.");
  };

  const currencies = [
    { label: "Philippine Peso (PHP)", value: "PESO" },
    { label: "United State Dollar (USD)", value: "USD" },
  ];

  const [discount, set_discount] = useState("");
  const [discount_error, set_discount_error] = useState("");

  const handle_discount_change = (e) => {
    const selected = e.target.value;
    set_discount(selected);
    set_discount_error(selected ? "" : "Role is required.");
  };

  const discount_options = [
    { label: "0%", value: "0" },
    { label: "10%", value: "10" },
    { label: "20%", value: "20" },
    { label: "30%", value: "30" },
    { label: "40%", value: "40" },
    { label: "50%", value: "50" },
  ];
  // - For Select Field
  // + For Textarea Field
  const [additional_info, set_additional_info] = useState("");
  const [additional_info_error, set_additional_info_error] = useState("");

  const handle_textarea_change = (event) => {
    const input_value = event.target.value;
    set_additional_info(input_value);

    if (input_value.length > 200) {
      set_additional_info_error("Description can't exceed 200 characters.");
    } else {
      set_additional_info_error("");
    }
  };
  // - For Textarea Field
  // + For Quantity Field
  const [quantity, set_quantity] = useState(1);
  // - For Quantity Field
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 py-5">
          <h1 className="text-xl">Create Invoice</h1>
          <nav>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Home
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <a className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-sky-500 cursor-pointer">
                  Templates
                </a>
              </li>
              <li className="flex items-center gap-1.5 text-sm text-gray-500">
                <span>/</span>
                <span className="text-gray-800">Create Invoice</span>
              </li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="w-full bg-white rounded-lg border">
        <h1 className="w-full text-lg border-b p-5">Invoice Details</h1>
        {/* + Invoice Details */}
        <div className="p-5 sm:p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div>
                <Verify_Field
                  label="Invoice Number"
                  placeholder="Enter invoice"
                  value={text_verify}
                  on_change={(e) => {
                    set_text_verify(e.target.value);
                    set_verify_status("");
                  }}
                  on_find={handle_find}
                  on_verify={handle_verify}
                  verify_status={verify_status}
                  show_find_button={false}
                />
              </div>
              <div>
                <Text_Field
                  label="Customer"
                  type={"text"}
                  placeholder="Enter customer"
                  value={text}
                  on_change={handle_text_change}
                  pattern="[A-Za-z]{1,}"
                  error_message={text_error}
                />
              </div>
              <div className="col-span-full">
                <Text_Field
                  label="Address"
                  type={"text"}
                  placeholder="Enter address"
                  value={text}
                  on_change={handle_text_change}
                  pattern="[A-Za-z]{1,}"
                  error_message={text_error}
                />
              </div>
              <div>
                <Select_Field
                  label="Payment Condition"
                  name="payment_condition"
                  value={payment_condition}
                  on_change={handle_payment_condition_change}
                  options={payment_conditions}
                  placeholder="Select Payment Condition"
                  error_message={payment_condition_error}
                  required
                />
              </div>
              <div>
                <Select_Field
                  label="Currency"
                  name="currency"
                  value={currency}
                  on_change={handle_currency_change}
                  options={currencies}
                  placeholder="Select Currency"
                  error_message={currency_error}
                  required
                />
              </div>
              <div className="col-span-full">
                <Textarea_Field
                  label="Additional Info"
                  name="additional_info"
                  value={additional_info}
                  on_change={handle_textarea_change}
                  placeholder="Receipt Info (optional)"
                  height="121px"
                  required={true}
                  textarea_error={additional_info_error}
                />
              </div>
            </div>
          </div>
        </div>
        {/* - Invoice Details */}
        {/* + Product Section */}
        <div className="flex flex-col gap-5 border-t p-5 sm:p-6">
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
            <div className="flex flex-col gap-5 px-6 md:pl-6 md:pr-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="font-semibold text-gray-600 whitespace-nowrap">
                  List of Products
                </h1>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center md:w-[500px]">
                <div className="w-full">
                  <Icon_Field
                    name="search"
                    placeholder="Search..."
                    icon={Search}
                    icon_position="left"
                  />
                </div>
              </div>
            </div>
            <div className="max-w-full overflow-x-auto custom-scrollbar">
              <table className="min-w-full text-left text-sm text-gray-700 dark:border-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr className="border-b border-t border-gray-100 whitespace-nowrap dark:border-gray-800 text-sm">
                    <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                      No.
                    </th>
                    <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Product
                    </th>
                    <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Quantity
                    </th>
                    <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Unit Cost
                    </th>
                    <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Discount
                    </th>
                    <th className="px-5 py-4 font-semibold whitespace-nowrap text-gray-700 dark:text-gray-400">
                      Total
                    </th>
                    <th className="relative px-5 py-4 whitespace-nowrap text-gray-700 dark:text-gray-400"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-800 dark:bg-white/[0.03]">
                  <tr className="text-sm">
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      1
                    </td>
                    <td className="px-5 py-4 font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                      Macbook pro 13"
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      5
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      P 100,000.00
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      0%
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      P 500,000.00
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center justify-center hover:text-sky-500 cursor-pointer">
                          <SquarePen size={20} />
                        </div>
                        <div className="flex items-center justify-center hover:text-red-500 cursor-pointer pb-[1px]">
                          <Trash2 size={20} />
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr className="text-sm">
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      2
                    </td>
                    <td className="px-5 py-4 font-medium whitespace-nowrap text-gray-800 dark:text-white/90">
                      iPhone 15 Pro max
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      1
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      P 60,000.00
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      0%
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      P 60,000.00
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap text-gray-500 dark:text-gray-400">
                      <div className="flex items-center justify-center gap-2">
                        <div className="flex items-center justify-center hover:text-sky-500 cursor-pointer">
                          <SquarePen size={20} />
                        </div>
                        <div className="flex items-center justify-center hover:text-red-500 cursor-pointer pb-[1px]">
                          <Trash2 size={20} />
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-5 rounded-lg border border-gray-100 bg-gray-50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-12">
              <div className="w-full lg:col-span-3">
                <Text_Field
                  label="Product Name"
                  type={"text"}
                  placeholder="Enter product name"
                  value={product_name}
                  on_change={handle_product_name_change}
                  pattern="[A-Za-z]{1,}"
                  error_message={product_name_error}
                />
              </div>
              <div className="w-full lg:col-span-3">
                <Text_Field
                  label="Price"
                  type={"number"}
                  placeholder="0"
                  value={text}
                  on_change={handle_text_change}
                  pattern="[A-Za-z]{1,}"
                  error_message={text_error}
                />
              </div>
              <div className="w-full lg:col-span-2">
                <Quantity_Field
                  label="Quantity"
                  value={quantity}
                  on_change={set_quantity}
                  placeholder="0"
                />
              </div>
              <div className="w-full lg:col-span-2">
                <Select_Field
                  label="Discount"
                  name="discount"
                  value={discount}
                  on_change={handle_discount_change}
                  options={discount_options}
                  // placeholder="Select Payment Condition"
                />
              </div>
              <div className="flex w-full items-end pb-[1px] lg:col-span-2">
                <button className="w-full h-[37px] bg-sky-600 text-white text-sm rounded-md hover:bg-sky-700 focus:ring-sky-500 disabled:bg-sky-300 disabled:cursor-not-allowed">
                  Add Product
                </button>
              </div>
            </div>
            <div className="mt-5 flex max-w-2xl items-center gap-2 text-gray-500">
              <Info size={18} />
              <p className="text-sm dark:text-gray-400">
                After filling in the product details, please make sure all the
                products that you have listed is correct.
              </p>
            </div>
          </div>
          <div className="flex flex-wrap justify-between sm:justify-end">
            <div className="mt-6 w-full space-y-1 text-right sm:w-[270px]">
              <p className="mb-4 text-left text-sm font-medium text-gray-800 dark:text-white/90">
                Order summary
              </p>
              <ul className="space-y-2">
                <li className="flex justify-between gap-5">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Sub Total
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    492,800.00
                  </span>
                </li>
                <li className="flex justify-between gap-5">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Vat (12%)
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-400">
                    67,200.00
                  </span>
                </li>
                <li className="flex justify-between gap-5">
                  <span className="font-medium text-gray-700 dark:text-gray-400">
                    Total
                  </span>
                  <span className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    560,000.00
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* - Product Section */}
        <div className="p-4 sm:p-8 border-t">
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <Button
              variant="white"
              size="lg"
              // width="w-[100px]"
              icon={Eye}
              icon_position="left"
            >
              Preview Invoice
            </Button>
            <Button
              variant="primary"
              size="lg"
              // width="w-[100px]"
              icon={Save}
              icon_position="left"
            >
              Save Invoice
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Create_Invoice;
