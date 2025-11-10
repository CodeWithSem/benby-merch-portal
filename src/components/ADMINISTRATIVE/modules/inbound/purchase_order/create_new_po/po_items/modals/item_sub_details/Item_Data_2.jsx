import React, { useState } from "react";
import Text_Field from "assets/elements/Text_Field";
import Text_Field_Adorn from "assets/elements/Text_Field_Adorn";

const Item_Data_2 = () => {
  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* + Order Quantities */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700 text-sm">
            Order Quantities
          </h1>
          <div className="grid grid-cols-1 gap-5">
            {/* + PO Quantity in KG */}
            <div>
              <Text_Field_Adorn
                label="PO Quantity in KG"
                // value={1000}
                // on_change={(e) => setPrice(e.target.value)}
                adornment="KG"
                adornment_position="right"
                disabled
              />
            </div>
            {/* - PO Quantity in KG */}
            {/* + PO Quantity in PC */}
            <div>
              <Text_Field_Adorn
                label="PO Quantity in PC"
                // value={1000}
                // on_change={(e) => setPrice(e.target.value)}
                adornment="PC"
                adornment_position="right"
                disabled
              />
            </div>
            {/* - PO Quantity in PC */}
          </div>
        </div>
        {/* - Order Quantities */}
        {/* + Conversions */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700 text-sm">
            Conversions
          </h1>
          <div className="grid grid-cols-1 gap-5">
            {/* + KG Per Piece */}
            <div>
              <Text_Field
                label="KG Per Piece"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - KG Per Piece */}
            {/* + Piece */}
            <div>
              <Text_Field
                label="Piece"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - Piece */}
          </div>
        </div>
        {/* - Conversions */}
        {/* + Weights Per Case */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700 text-sm">
            Weights Per Case
          </h1>
          <div className="grid grid-cols-1 gap-5">
            {/* + Net Weight */}
            <div>
              <Text_Field
                label="Net Weight"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - Net Weight */}
            {/* + Gross Weight */}
            <div>
              <Text_Field
                label="Gross Weight"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - Gross Weight */}
            {/* + Volume */}
            <div>
              <Text_Field
                label="Volume"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - Volume */}
          </div>
        </div>
        {/* - Weights Per Case */}
        {/* + Weights Per Piece */}
        <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
          <h1 className="mb-5 font-semibold text-sky-700 text-sm">
            Weights Per Piece
          </h1>
          <div className="grid grid-cols-1 gap-5">
            {/* + Net Weight */}
            <div>
              <Text_Field
                label="Net Weight"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - Net Weight */}
            {/* + Gross Weight */}
            <div>
              <Text_Field
                label="Gross Weight"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - Gross Weight */}
            {/* + Volume */}
            <div>
              <Text_Field
                label="Volume"
                type={"text"}
                // value={}
                // on_change={handle_text_change}
                pattern="[A-Za-z]{1,}"
                disabled
              />
            </div>
            {/* - Volume */}
          </div>
        </div>
        {/* - Weights Per Piece */}
      </div>
    </React.Fragment>
  );
};

export default Item_Data_2;
