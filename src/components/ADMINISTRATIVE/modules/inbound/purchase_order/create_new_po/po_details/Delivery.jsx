import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Select_Field from "assets/elements/Select_Field";

const Delivery = () => {
  // + For Select Incoterms
  const [selected_incoterms, set_selected_incoterms] = useState("");
  const handle_select_incoterms = (e) => {
    const selected = e.target.value;
    set_selected_incoterms(selected);
  };

  const incoterms_option = [
    { label: "Data 1", value: "1" },
    { label: "Data 2", value: "2" },
    { label: "Data 3", value: "3" },
  ];
  // - For Select Incoterms
  // + For Select Payment Terms
  const [selected_payment_terms, set_selected_payment_terms] = useState("");
  const handle_select_payment_terms = (e) => {
    const selected = e.target.value;
    set_selected_payment_terms(selected);
  };

  const payment_terms_option = [
    { label: "Net 30", value: "1" },
    { label: "Net 60", value: "2" },
    { label: "Immediate / COD", value: "3" },
    { label: "Installment", value: "4" },
  ];
  // - For Payment Terms
  return (
    <React.Fragment>
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Select_Field
              label="Payment Terms"
              name="payment_terms"
              value={selected_payment_terms}
              on_change={handle_select_payment_terms}
              options={payment_terms_option}
              placeholder="Select Payment Terms"
            />
          </div>
          <div>
            <Select_Field
              label="Incoterms"
              name="incoterms"
              value={selected_incoterms}
              on_change={handle_select_incoterms}
              options={incoterms_option}
              placeholder="Select Incoterms"
            />
          </div>
          <div>
            <Text_Field
              label="Currency"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Exchange Rate"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Net Value"
              type={"text"}
              // value={}
              // on_change={handle_text_change}
              pattern="[A-Za-z]{1,}"
              disabled
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Delivery;
