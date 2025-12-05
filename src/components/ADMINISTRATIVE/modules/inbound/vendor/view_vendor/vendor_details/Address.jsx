import React from "react";
import { get_description } from "assets/scripts/functions/get_description";
import Text_Field from "assets/elements/Text_Field";
import Text_Code_Field from "assets/elements/Text_Code_Field";

const Address = ({
  view_vendor_data,
  city_list,
  district_list,
  region_list,
  country_list,
  trans_zone_list,
  language_list,
}) => {
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
              value={view_vendor_data.ad_street} //--> ad_street
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Postal Code"
              type={"text"}
              value={view_vendor_data.ad_postal_code} //--> ad_postal_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="City"
              type={"text"}
              value={get_description(
                view_vendor_data.ad_city_code,
                city_list,
                "city_code",
                "city_desc"
              )} //--> ad_city_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="District"
              type={"text"}
              value={get_description(
                view_vendor_data.ad_district_code,
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
                view_vendor_data.ad_region_code,
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
                view_vendor_data.ad_country_code,
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
              show_search_button={false}
              bg_dis_color="bg-slate-50"
              text_dis_color="text-slate-500"
              code_value={view_vendor_data.ad_trans_zone_code}
              text_value={get_description(
                view_vendor_data.ad_trans_zone_code,
                trans_zone_list,
                "trans_zone_code",
                "trans_zone_desc"
              )} //--> ad_country_code
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
            <Text_Field
              label="Language"
              type={"text"}
              value={get_description(
                view_vendor_data.ad_language_code,
                language_list,
                "language_code",
                "language_desc"
              )} //--> ad_language_code
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Telephone"
              type={"text"}
              value={view_vendor_data.ad_telephone} //--> ad_telephone
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Fax"
              type={"text"}
              value={view_vendor_data.ad_fax} //--> ad_fax
              disabled
            />
          </div>
          <div>
            <Text_Field
              label="Mobile"
              type={"text"}
              value={view_vendor_data.ad_mobile} //--> ad_mobile
              disabled
            />
          </div>
          <div className="col-span-full">
            <Text_Field
              label="Email"
              type={"text"}
              value={view_vendor_data.ad_email} //--> ad_email
              disabled
            />
          </div>
        </div>
      </div>
      {/* - Section 2 */}
    </React.Fragment>
  );
};

export default Address;
