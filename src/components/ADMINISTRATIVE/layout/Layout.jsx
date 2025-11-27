import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Dashboard from "../modules/dashboard/Dashboard";
import Form_Elements from "assets/templates/pages/forms/form_elements/Form_Elements";
import Purchase_Order from "../modules/inbound/purchase_order/Purchase_Order";
import Tabs from "assets/templates/pages/ui_elements/tabs/Tabs";
import Create_Invoice from "assets/templates/pages/templates/create_invoice/Create_Invoice";
import Basic_Tables from "assets/templates/pages/tables/basic_tables/Basic_Tables";
import Data_Tables from "assets/templates/pages/tables/data_tables/Data_Tables";
import Goods_Receipt from "../modules/inbound/goods_receipt/Goods_Receipt";
import Batch from "../modules/inbound/batch/Batch";
import Input_Fields from "components/TEMPLATES/input_fields/Input_Fields";
import Stock_Transfer from "../modules/warehouse/stock_transfer/Stock_Transfer";
import Inventory_Master from "../modules/warehouse/inventory_master/Inventory_Master";
import Item_Master from "../modules/warehouse/item_master/Item_Master";
import General_Structure from "../modules/maintenance/general_structure/General_Structure";
import Financial from "../modules/maintenance/financial/Financial";
import Vendor_Maint from "../modules/maintenance/vendor/Vendor_Maint";
import Purchase_Order_Maint from "../modules/maintenance/purchase_order/Purchase_Order_Maint";
import Sales_Order from "../modules/outbound/sales_order/Sales_Order";
import Goods_Issue from "../modules/outbound/goods_issue/Goods_Issue";
import Shipment from "../modules/outbound/shipment/Shipment";
import Customer from "../modules/outbound/customer/Customer";
import Truck from "../modules/outbound/truck/Truck";
import Data_Assignment from "../modules/maintenance/data_assignment/Data_Assignment";
import Vendor from "../modules/inbound/vendor/Vendor";
import Item from "../modules/maintenance/item/Item";
import Warehouse_Maint from "../modules/maintenance/warehouse/Warehouse_Maint";

const Layout = () => {
  const [active_item, set_active_item] = useState(() => {
    return localStorage.getItem("active_item") || "Dashboard";
  });

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
        return <Dashboard />;
      case "Inbound-Purchase Order":
        return <Purchase_Order />;
      case "Inbound-Goods Receipt":
        return <Goods_Receipt />;
      case "Inbound-Batch":
        return <Batch />;
      case "Inbound-Vendor":
        return <Vendor />;
      case "Outbound-Sales Order":
        return <Sales_Order />;
      case "Outbound-Goods Issue":
        return <Goods_Issue />;
      case "Outbound-Shipment":
        return <Shipment />;
      case "Outbound-Customer":
        return <Customer />;
      case "Outbound-Truck":
        return <Truck />;
      case "Warehouse-Stock Transfer":
        return <Stock_Transfer />;
      case "Warehouse-Inventory Master":
        return <Inventory_Master />;
      case "Warehouse-Item Master":
        return <Item_Master />;
      case "Maintenance-General Structure":
        return <General_Structure />;
      case "Maintenance-Financial":
        return <Financial />;
      case "Maintenance-Item":
        return <Item />;
      case "Maintenance-Vendor":
        return <Vendor_Maint />;
      case "Maintenance-Warehouse":
        return <Warehouse_Maint />;
      case "Maintenance-Purchase Order":
        return <Purchase_Order_Maint />;
      case "Maintenance-Data Assignment":
        return <Data_Assignment />;
      case "Templates-Form Elements":
        return <Form_Elements />;
      case "Templates-Tabs":
        return <Tabs />;
      case "Templates-Create Invoice":
        return <Create_Invoice />;
      case "Templates-Basic Tables":
        return <Basic_Tables />;
      case "Templates-Data Tables":
        return <Data_Tables />;
      case "Templates-Input Fields":
        return <Input_Fields />;
    }
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
          />
          <div className="p-4 mx-auto max-w-screen-2xl md:px-6 pt-2 pb-6">
            {page_renderer(active_item)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Layout;
