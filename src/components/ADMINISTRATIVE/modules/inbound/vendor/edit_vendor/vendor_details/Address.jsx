import React from "react";
import { get_description } from "assets/scripts/functions/get_description";
import { handle_text_change_function } from "assets/scripts/functions/input_functions";
import Find_Field from "assets/elements/Find_Field";
import Text_Field from "assets/elements/Text_Field";
import Select_Generic from "../../modals/select_generic/Select_Generic";
import Text_Code_Field from "assets/elements/Text_Code_Field";

const Address = ({
  display_modal,
  set_display_modal,
  edit_vendor_data,
  set_edit_vendor_data,
  city_list,
  district_list,
  region_list,
  country_list,
  city_h_list,
  trans_zone_list,
  language_list,
}) => {
  const select_modal_configs = [
    {
      key: "select_city",
      label: "City Hierarchy",
      width: "max-w-[1200px]",
      list: city_h_list,
      column: ["City", "District", "Region", "Country"],
      code: ["city_code", "district_code", "region_code", "country_code"],
      desc: ["city_desc", "district_desc", "region_desc", "country_desc"],
      lookup: [city_list, district_list, region_list, country_list],
      target: [
        "ad_city_code",
        "ad_district_code",
        "ad_region_code",
        "ad_country_code",
      ],
    },
    {
      key: "select_trans_zone",
      label: "Transportation Zone",
      width: "max-w-[800px]",
      list: trans_zone_list,
      column: ["Transportation Zone"],
      code: ["trans_zone_code"],
      desc: ["trans_zone_desc"],
      lookup: [trans_zone_list],
      target: ["ad_trans_zone_code"],
    },
    {
      key: "select_language",
      label: "Transportation Zone",
      width: "max-w-[800px]",
      list: language_list,
      column: ["Language"],
      code: ["language_code"],
      desc: ["language_desc"],
      lookup: [language_list],
      target: ["ad_language_code"],
    },
  ];
  const handle_text_change = handle_text_change_function(set_edit_vendor_data);

  // RETURN ORIGIN
  return (
    <React.Fragment>
      {/* + Section 1 */}
      <div className="rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">Address Information</h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Text_Field
              label="House # / Street Address"
              type={"text"}
              placeholder={"Enter house no. / street address"}
              value={edit_vendor_data.ad_street} //--> ad_street
              on_change={handle_text_change("ad_street")}
            />
          </div>
          <div>
            <Text_Field
              label="Postal Code"
              type={"text"}
              placeholder={"Enter postal code"}
              value={edit_vendor_data.ad_postal_code} //--> ad_postal_code
              on_change={handle_text_change("ad_postal_code")}
            />
          </div>
          <div>
            <Find_Field
              label="City"
              value={get_description(
                edit_vendor_data.ad_city_code,
                city_list,
                "city_code",
                "city_desc"
              )} //--> ad_city_code
              on_click={() => set_display_modal("select_city")}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="District"
              type={"text"}
              value={get_description(
                edit_vendor_data.ad_district_code,
                district_list,
                "district_code",
                "district_desc"
              )} //--> ad_city_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Region"
              type={"text"}
              value={get_description(
                edit_vendor_data.ad_region_code,
                region_list,
                "region_code",
                "region_desc"
              )} //--> ad_region_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Country"
              type={"text"}
              value={get_description(
                edit_vendor_data.ad_country_code,
                country_list,
                "country_code",
                "country_desc"
              )} //--> ad_country_code
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Code_Field
              label="Transportation Zone"
              code_width="150px"
              show_search_button={true}
              code_value={edit_vendor_data.ad_trans_zone_code}
              text_value={get_description(
                edit_vendor_data.ad_trans_zone_code,
                trans_zone_list,
                "trans_zone_code",
                "trans_zone_desc"
              )} //--> ad_country_code
              on_click={() => set_display_modal("select_trans_zone")}
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 1 */}
      {/* + Section 2 */}
      <div className="mt-5 rounded-lg border border-sky-50/50 bg-sky-50/50 p-4 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="mb-5 font-semibold text-sky-700">
          Communication Details
        </h1>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Find_Field
              label="Language"
              value={get_description(
                edit_vendor_data.ad_language_code,
                language_list,
                "language_code",
                "language_desc"
              )} //--> ad_language_code
              on_click={() => set_display_modal("select_language")}
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Telephone"
              type={"text"}
              placeholder={"Enter telephone"}
              value={edit_vendor_data.ad_telephone} //--> ad_telephone
              on_change={handle_text_change("ad_telephone")}
            />
          </div>
          <div>
            <Text_Field
              label="Fax"
              type={"text"}
              placeholder={"Enter fax"}
              value={edit_vendor_data.ad_fax} //--> ad_fax
              on_change={handle_text_change("ad_fax")}
            />
          </div>
          <div>
            <Text_Field
              label="Mobile"
              type={"text"}
              placeholder={"Enter mobile"}
              value={edit_vendor_data.ad_mobile} //--> ad_mobile
              on_change={handle_text_change("ad_mobile")}
            />
          </div>
          <div className="col-span-full">
            <Text_Field
              label="Email"
              type={"text"}
              placeholder={"Enter email"}
              value={edit_vendor_data.ad_email} //--> ad_email
              on_change={handle_text_change("ad_email")}
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
      {/* + Modals */}
      {select_modal_configs.map((cfg) => (
        <Select_Generic
          key={cfg.key}
          is_open={display_modal === cfg.key}
          on_close={() => set_display_modal("")}
          // width="max-w-[1000px]"
          width={cfg.width}
          height="max-h-[600px]"
          modal_label={cfg.label}
          column_names={cfg.column}
          source_list={cfg.list}
          source_code={cfg.code}
          source_desc={cfg.desc}
          lookup_lists={cfg.lookup}
          target_field={cfg.target}
          set_data={set_edit_vendor_data}
        />
      ))}
      {/* - Modals */}
    </React.Fragment>
  );
};

export default Address;
