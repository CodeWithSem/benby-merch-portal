import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../modules/dashboard/Dashboard";
import Excel_Conversion from "../modules/excel_conversion/Excel_Conversion";
import User_Management from "../modules/user_management/User_Management";
import { useToast } from "./Toast_Provider";
import { Use_App } from "../../../context/app_context";
import Button from "assets/elements/Button";
import MCP from "../modules/cloud_management/mcp/MCP";
import { LogOut, X } from "lucide-react";
import EP_History from "../modules/data_history/ep_history/EP_History";
import Audit_Survey from "../modules/cloud_management/audit_survey/Audit_Survey";
import AS_History from "../modules/data_history/audit_survey_history/AS_History";
import SOS from "../modules/cloud_management/share_of_shelf/SOS";
import SOS_History from "../modules/data_history/sos_history/SOS_History";
import Price_Survey from "../modules/cloud_management/price_survey/Price_Survey";
import Price_Surv_History from "../modules/data_history/price_survey_history/Price_Surv_History";
import RTV_History from "../modules/data_history/rtv_history/RTV_History";
import OSA_NC from "../modules/maintenance/osa_nc/OSA_NC";
import MCL from "../modules/maintenance/mcl/MCL";
import Store_Master from "../modules/maintenance/store_master/Store_Master";
import TDS_Tagging from "../modules/maintenance/tds_tagging/TDS_Tagging";
import SKU_Brand from "../modules/maintenance/sku_brand/SKU_brand";
import TDS_Database from "../modules/maintenance/tds_database/TDS_Database";
import Merch_Deployment from "../modules/cloud_management/merch_deployment/Merch_Deployment";
import Execution_Planner from "../modules/cloud_management/execution_planner/Execution_Planner";
import OSA_History from "../modules/data_history/osa_history/OSA_History";
import MD_History from "../modules/data_history/md_history/MD_History";
import Agency from "../modules/maintenance/agency/Agency";
import Merchandiser from "../modules/maintenance/merchandiser/Merchandiser";
import Training_Logs from "../modules/cloud_management/training_logs/Training_Logs";
import OSA_NC_Temp from "../modules/maintenance/osa_nc/OSA_NC_Temp";
import User_Timelog from "../modules/data_history/user_timelog/User_Timelog";

const Layout = () => {
  const { set_page, active_user } = Use_App();
  const { show_toast } = useToast();
  const [active_item, set_active_item] = useState(() => {
    return localStorage.getItem("active_item") || "Dashboard";
  });
  const [is_confirm_logout_open, set_is_confirm_logout_open] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("active_item")) {
      localStorage.setItem("active_item", "Dashboard");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("active_item", active_item);
  }, [active_item]);

  const [is_collapsed, set_is_collapsed] = useState(true);
  const [is_open, set_is_open] = useState(false);
  const [is_desktop, set_is_desktop] = useState(window.innerWidth >= 768);
  useEffect(() => {
    const handle_resize = () => {
      const is_now_desktop = window.innerWidth >= 768;
      set_is_desktop(is_now_desktop);
    };

    window.addEventListener("resize", handle_resize);
    return () => window.removeEventListener("resize", handle_resize);
  }, []);

  const toggle_sidebar = () => {
    set_is_collapsed((prev) => !prev);
    if (window.innerWidth <= 768) {
      set_is_open((prev) => !prev);
    }
  };

  const page_renderer = (active_item) => {
    switch (active_item) {
      // case "Auth-Edit Profile":
      //   return <Edit_Profile />;
      case "Dashboard":
        return (
          <Dashboard
            active_user={active_user}
            set_active_item={set_active_item}
          />
        );
      case "Excel Conversion":
        return <Excel_Conversion />;
      case "User Management":
        return <User_Management />;
      case "Cloud Management-MCP":
        return <MCP />;
      case "Cloud Management-Merch Deployment":
        return <Merch_Deployment />;
      case "Cloud Management-Execution Planner":
        return <Execution_Planner />;
      case "Cloud Management-Audit Survey":
        return <Audit_Survey />;
      case "Cloud Management-Share of Shelf":
        return <SOS />;
      case "Cloud Management-Price Survey":
        return <Price_Survey />;
      case "Cloud Management-Training Logs":
        return <Training_Logs />;
      case "Data History-OSA":
        return <OSA_History />;
      case "Data History-Merch Deployment":
        return <MD_History />;
      case "Data History-Execution Planner":
        return <EP_History />;
      case "Data History-Audit Survey":
        return <AS_History />;
      case "Data History-Share of Shelf":
        return <SOS_History />;
      case "Data History-Price Survey":
        return <Price_Surv_History />;
      case "Data History-Return to Vendor":
        return <RTV_History />;
      case "Data History-User Timelog":
        return <User_Timelog />;
      case "Maintenance-MCL":
        return <MCL />;
      case "Maintenance-Store Master":
        return <Store_Master />;
      case "Maintenance-OSA Not Carried":
        return <OSA_NC />;
      case "Maintenance-OSA NC Temp":
        return <OSA_NC_Temp />;
      case "Maintenance-TDS Tagging":
        return <TDS_Tagging />;
      case "Maintenance-SKU Brand":
        return <SKU_Brand />;
      case "Maintenance-TDS Database":
        return <TDS_Database />;
      case "Maintenance-Agency":
        return <Agency />;
      case "Maintenance-Merchandiser":
        return <Merchandiser />;
    }
  };

  const handle_sign_out = () => {
    localStorage.removeItem("active_user");
    show_toast({
      type: "success",
      title: "Signed Out",
      message: "You have been logged out successfully",
    });
    set_page("login"); // redirect to login page
  };

  const Confirm_Logout = () => {
    return (
      <React.Fragment>
        <div className="fixed inset-0 flex items-center justify-center z-[100] p-4">
          {/* Backdrop with improved blur */}
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md z-[101]"
            onClick={() => set_is_confirm_logout_open(false)}
          ></div>

          {/* Modal Card */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-[420px] w-full overflow-hidden z-[102] transform transition-all">
            {/* Header Accent / Close Button */}
            <div className="flex justify-end p-4 absolute right-0 top-0">
              <button
                onClick={() => set_is_confirm_logout_open(false)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-8 pt-10">
              {/* Warning Icon */}
              <div className="mx-auto w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <LogOut className="text-green-500 mr-1" size={32} />
              </div>

              {/* Text Content */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                  Sign Out?
                </h3>
                <p className="text-sm leading-relaxed text-slate-500 px-2">
                  Are you sure you want to logout your account?
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  width="w-full"
                  variant="primary"
                  class_name="py-3 rounded-xl"
                  on_click={handle_sign_out}
                >
                  Yes, Log out
                </Button>
                <Button
                  width="w-full"
                  variant="white"
                  class_name="py-3 rounded-xl"
                  on_click={() => set_is_confirm_logout_open(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  };

  // RETURN ORIGIN
  return (
    <React.Fragment>
      <div className="min-h-screen bg-gray-50">
        <div>
          <Sidebar
            active_item={active_item}
            set_active_item={set_active_item}
            is_desktop={is_desktop}
            is_collapsed={is_collapsed}
            is_open={is_open}
            toggle_sidebar={toggle_sidebar}
            set_is_confirm_logout_open={set_is_confirm_logout_open}
          />
        </div>
        <div
          className={`flex-1 transition-all duration-300 ease-in-out ${
            is_desktop ? (is_collapsed ? "md:ml-20" : "md:ml-64") : "ml-0"
          }`}
        >
          <Header
            toggle_sidebar={toggle_sidebar}
            set_active_item={set_active_item}
            set_is_confirm_logout_open={set_is_confirm_logout_open}
          />
          <div className="p-4 mx-auto max-w-screen-2xl md:px-6 pt-2 pb-6">
            {page_renderer(active_item)}
          </div>
        </div>
      </div>
      {is_confirm_logout_open && <Confirm_Logout />}
    </React.Fragment>
  );
};

const training_survey_data = [
  {
    iD: "1",
    code: "PMEHO01",
    storecode: "512173",
    survey: "Benby Product Familiarization ",
    module: "PRE DEPLOYMENT",
    rowNo: "1",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "2",
    code: "PMEHO01",
    storecode: "512173",
    survey: "Importance of Complete Price or Shelf Tag",
    module: "PRE DEPLOYMENT",
    rowNo: "2",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "3",
    code: "PMEHO01",
    storecode: "512173",
    survey: "Freshness / FEFO (First Expiry First Out)",
    module: "PRE DEPLOYMENT",
    rowNo: "3",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "4",
    code: "PMEHO01",
    storecode: "512173",
    survey: "Accurate Near Ex / Inventory Report",
    module: "PRE DEPLOYMENT",
    rowNo: "4",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "5",
    code: "PMEHO01",
    storecode: "512173",
    survey: "BENBY PRODUCT FAMILIARIZATION",
    module: "NEW DISERS EVALUATION",
    rowNo: "1",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "6",
    code: "PMEHO01",
    storecode: "512173",
    survey: "KPI (MAHUSAY)",
    module: "NEW DISERS EVALUATION",
    rowNo: "2",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "7",
    code: "PMEHO01",
    storecode: "512173",
    survey: "ORDER OF REFILLING (MASSARAPP)",
    module: "NEW DISERS EVALUATION",
    rowNo: "3",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "8",
    code: "PMEHO01",
    storecode: "512173",
    survey: "BENBY STANDARD (ASTIG)",
    module: "NEW DISERS EVALUATION",
    rowNo: "4",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "9",
    code: "PMEHO01",
    storecode: "512173",
    survey: "PLANOGRAM & MCL",
    module: "NEW DISERS EVALUATION",
    rowNo: "5",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "10",
    code: "PMEHO01",
    storecode: "512173",
    survey: "MAX CAPPING FOR MCL SKUs",
    module: "TRADE FINDINGS AUDIT",
    rowNo: "1",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "11",
    code: "PMEHO01",
    storecode: "512173",
    survey: "ALL DISPLAY AREAS - CLEAN & NO BO",
    module: "TRADE FINDINGS AUDIT",
    rowNo: "2",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "12",
    code: "PMEHO01",
    storecode: "512173",
    survey: "FEFO EXECUTED FOR ALL BENBY BRANDS",
    module: "TRADE FINDINGS AUDIT",
    rowNo: "3",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "13",
    code: "PMEHO01",
    storecode: "512173",
    survey:
      "PLANOGRAM EXECUTION FOCUS BRAND OF THE MONTH?-   (TOP TO BOTTOM DISPLAY OR IN DIAMOND AREA)",
    module: "TRADE FINDINGS AUDIT",
    rowNo: "4",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
  {
    iD: "14",
    code: "PMEHO01",
    storecode: "512173",
    survey: "ALL DISPLAYS AREAS COMPLETE WITH PRICE & PROMO TAGS",
    module: "TRADE FINDINGS AUDIT",
    rowNo: "5",
    answer: "",
    dateUpload: "2/26/2026 12:00:00 AM",
    uploadedBy: "110828",
  },
];
export default Layout;
