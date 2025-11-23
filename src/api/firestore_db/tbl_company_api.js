import { firestore_db } from "assets/scripts/firebase";
import { format_date_1, get_date_now } from "assets/scripts/format";
import { collection, doc, setDoc } from "firebase/firestore";

export const api_create_company = async (company_data, user) => {
  try {
    const tbl_company_ref = collection(
      firestore_db,
      "DB1_ERP_SYSTEM",
      "TBL_COMPANY",
      "DATA"
    );

    const final_company_data = {
      ...company_data,
      creation_date: format_date_1(get_date_now()),
      created_by: user || "N/A",
    };

    const doc_ref = doc(tbl_company_ref, String(company_data.id));

    await setDoc(doc_ref, final_company_data);
    return {
      success: true,
      message: "Company created successfully",
      id: doc_ref.id,
      data: final_company_data,
    };
  } catch (error) {
    console.error("Error adding company: ", error);
    return {
      success: false,
      message: error.message || "Failed to create company",
    };
  }
};
