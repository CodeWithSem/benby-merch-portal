import React from "react";
import {
  Clock,
  ShieldAlert,
  Megaphone,
  User,
  Database,
  ClipboardList,
  Settings,
  History,
} from "lucide-react";
import { Use_App } from "context/app_context";

const Dashboard = ({ active_user, set_active_item }) => {
  // 1. Setup Permissions (Same logic as Sidebar)
  const allowed_modules = active_user?.module_access?.split(",") || [];
  const allowed_sub_modules = active_user?.sub_module_access?.split(",") || [];
  const show_all_modules = allowed_modules.includes("ALL");

  const date = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const all_actions = [
    // --- USER MANAGEMENT ---
    {
      title: "User Management",
      desc: "Manage system access and permissions",
      icon: <User className="text-green-600" />,
      color: "bg-green-50",
      module_code: "UM",
      sub_module_code: null,
      parent: null,
      target: "User Management",
    },

    // --- CLOUD MANAGEMENT (CM) ---
    // Icon: Database | Parent: Cloud Management | Target: Cloud Management-[Name]
    {
      title: "MCP",
      desc: "Management Control Panel",
      icon: <Database className="text-green-600" />,
      color: "bg-green-50",
      module_code: "CM",
      sub_module_code: "CM1",
      parent: "Cloud Management",
      target: "Cloud Management-MCP",
    },
    {
      title: "Merch Deployment",
      desc: "Active Merchandiser tracking",
      icon: <Database className="text-green-600" />,
      color: "bg-green-50",
      module_code: "CM",
      sub_module_code: "CM2",
      parent: "Cloud Management",
      target: "Cloud Management-Merch Deployment",
    },
    {
      title: "Execution Planner",
      desc: "Plan field execution tasks",
      icon: <Database className="text-green-600" />,
      color: "bg-green-50",
      module_code: "CM",
      sub_module_code: "CM3",
      parent: "Cloud Management",
      target: "Cloud Management-Execution Planner",
    },
    {
      title: "Trade Rental",
      desc: "Manage trade rental assets",
      icon: <Database className="text-green-600" />,
      color: "bg-green-50",
      module_code: "CM",
      sub_module_code: "CM4",
      parent: "Cloud Management",
      target: "Cloud Management-Trade Rental",
    },
    {
      title: "Audit Survey",
      desc: "Cloud-based audit management",
      icon: <Database className="text-green-600" />,
      color: "bg-green-50",
      module_code: "CM",
      sub_module_code: "CM5",
      parent: "Cloud Management",
      target: "Cloud Management-Audit Survey",
    },
    {
      title: "Share of Shelf",
      desc: "Monitor shelf space allocation",
      icon: <Database className="text-green-600" />,
      color: "bg-green-50",
      module_code: "CM",
      sub_module_code: "CM6",
      parent: "Cloud Management",
      target: "Cloud Management-Share of Shelf",
    },
    {
      title: "Price Survey",
      desc: "Market price benchmarking",
      icon: <Database className="text-green-600" />,
      color: "bg-green-50",
      module_code: "CM",
      sub_module_code: "CM7",
      parent: "Cloud Management",
      target: "Cloud Management-Price Survey",
    },
    {
      title: "Training Logs",
      desc: "Manage TDS training logs",
      icon: <Database className="text-green-600" />,
      color: "bg-green-50",
      module_code: "CM",
      sub_module_code: "CM9",
      parent: "Cloud Management",
      target: "Cloud Management-Training Logs",
    },

    // --- DATA HISTORY (DH) ---
    // Icon: ClipboardList | Parent: Data History | Target: Data History-[Name]
    {
      title: "OSA History",
      desc: "Historical shelf availability",
      icon: <ClipboardList className="text-green-600" />,
      color: "bg-green-50",
      module_code: "DH",
      sub_module_code: "DH1",
      parent: "Data History",
      target: "Data History-OSA",
    },
    {
      title: "MD History",
      desc: "Historical deployment logs",
      icon: <ClipboardList className="text-green-600" />,
      color: "bg-green-50",
      module_code: "DH",
      sub_module_code: "DH2",
      parent: "Data History",
      target: "Data History-Merch Deployment",
    },
    {
      title: "EP History",
      desc: "Review past execution plans",
      icon: <ClipboardList className="text-green-600" />,
      color: "bg-green-50",
      module_code: "DH",
      sub_module_code: "DH3",
      parent: "Data History",
      target: "Data History-Execution Planner",
    },
    {
      title: "Trade Rental History",
      desc: "View past audit surveys",
      icon: <ClipboardList className="text-green-600" />,
      color: "bg-green-50",
      module_code: "DH",
      sub_module_code: "DH4",
      parent: "Data History",
      target: "Data History-Trade Rental",
    },
    {
      title: "Audit Survey History",
      desc: "View past audit surveys",
      icon: <ClipboardList className="text-green-600" />,
      color: "bg-green-50",
      module_code: "DH",
      sub_module_code: "DH5",
      parent: "Data History",
      target: "Data History-Audit Survey",
    },
    {
      title: "Price Survey History",
      desc: "Historical price survey data",
      icon: <ClipboardList className="text-green-600" />,
      color: "bg-green-50",
      module_code: "DH",
      sub_module_code: "DH6",
      parent: "Data History",
      target: "Data History-Price Survey",
    },
    {
      title: "SOS History",
      desc: "Share of shelf history",
      icon: <ClipboardList className="text-green-600" />,
      color: "bg-green-50",
      module_code: "DH",
      sub_module_code: "DH7",
      parent: "Data History",
      target: "Data History-Share of Shelf",
    },
    {
      title: "Return to Vendor",
      desc: "RTV historical records",
      icon: <ClipboardList className="text-green-600" />,
      color: "bg-green-50",
      module_code: "DH",
      sub_module_code: "DH8",
      parent: "Data History",
      target: "Data History-Return to Vendor",
    },
    {
      title: "NERM Inventory",
      desc: "NERM historical records",
      icon: <ClipboardList className="text-green-600" />,
      color: "bg-green-50",
      module_code: "DH",
      sub_module_code: "DH11",
      parent: "Data History",
      target: "Data History-NERM Inventory",
    },
    {
      title: "User Timelog",
      desc: "User timelog historical records",
      icon: <ClipboardList className="text-green-600" />,
      color: "bg-green-50",
      module_code: "DH",
      sub_module_code: "DH9",
      parent: "Data History",
      target: "Data History-User Timelog",
    },
    {
      title: "Training Logs",
      desc: "Training logs historical records",
      icon: <ClipboardList className="text-green-600" />,
      color: "bg-green-50",
      module_code: "DH",
      sub_module_code: "DH10",
      parent: "Data History",
      target: "Data History-Training Logs",
    },

    // --- SCHEDULING (SC) ---
    {
      title: "Daily Transfer",
      desc: "Automated data transfer to internal database",
      icon: <History className="text-green-600" />,
      color: "bg-green-50",
      module_code: "SC",
      sub_module_code: "SC1",
      parent: "Scheduling",
      target: "Scheduling-Daily Transfer",
    },
    // --- MAINTENANCE (MT) ---
    // Icon: Settings | Parent: Maintenance | Target: Maintenance-[Name]
    {
      title: "MCL",
      desc: "Manage list of MCL",
      icon: <Settings className="text-green-600" />,
      color: "bg-green-50",
      module_code: "MT",
      sub_module_code: "MT1",
      parent: "Maintenance",
      target: "Maintenance-MCL",
    },
    {
      title: "MCL NERM",
      desc: "Manage list of MCL NERM",
      icon: <Settings className="text-green-600" />,
      color: "bg-green-50",
      module_code: "MT",
      sub_module_code: "MT10",
      parent: "Maintenance",
      target: "Maintenance-MCL NERM",
    },
    {
      title: "Store Master",
      desc: "Manage store database",
      icon: <Settings className="text-green-600" />,
      color: "bg-green-50",
      module_code: "MT",
      sub_module_code: "MT2",
      parent: "Maintenance",
      target: "Maintenance-Store Master",
    },
    {
      title: "OSA Not Carried",
      desc: "Exclusion list management",
      icon: <Settings className="text-green-600" />,
      color: "bg-green-50",
      module_code: "MT",
      sub_module_code: "MT3",
      parent: "Maintenance",
      target: "Maintenance-OSA Not Carried",
    },
    {
      title: "TDS Database",
      desc: "Technical Data System records",
      icon: <Settings className="text-green-600" />,
      color: "bg-green-50",
      module_code: "MT",
      sub_module_code: "MT4",
      parent: "Maintenance",
      target: "Maintenance-TDS Database",
    },
    {
      title: "TDS Tagging",
      desc: "Map TDS assignments",
      icon: <Settings className="text-green-600" />,
      color: "bg-green-50",
      module_code: "MT",
      sub_module_code: "MT5",
      parent: "Maintenance",
      target: "Maintenance-TDS Tagging",
    },
    {
      title: "SKU Brand",
      desc: "SKU and Brand master list",
      icon: <Settings className="text-green-600" />,
      color: "bg-green-50",
      module_code: "MT",
      sub_module_code: "MT6",
      parent: "Maintenance",
      target: "Maintenance-SKU Brand",
    },
  ];

  // 3. Filter actions based on permissions
  const filtered_actions = all_actions.filter((action) => {
    if (show_all_modules) return true;

    const has_module = allowed_modules.includes(action.module_code);
    // If it's a sub-module, check sub-module access too
    const has_sub_module = action.sub_module_code
      ? allowed_sub_modules.includes(action.sub_module_code)
      : true;

    return has_module && has_sub_module;
  });

  const handleNavigate = (action) => {
    set_active_item(action.target);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-5xl mx-auto mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
          Hey there,{" "}
          <span className="text-green-600">{active_user.first_name}</span>!
        </h1>
        <div className="flex items-center gap-2 mt-2 text-slate-500 text-sm">
          <Clock size={16} />
          <span>It's {date}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {/* --- NEW ANNOUNCEMENT SECTION --- */}
        <div className="mb-10 relative overflow-hidden bg-white border border-slate-200 rounded-2xl p-6">
          {/* --- TOP RIGHT ELEMENT --- */}
          <div className="absolute top-4 right-4 flex flex-col items-end gap-1">
            <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-100">
              <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center text-[8px] text-white font-black">
                S
              </div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tight">
                System Developer
              </span>
            </div>
            {/* <span className="text-[9px] text-slate-500 font-medium mr-1 tracking-wide">
              02-16-2026
            </span> */}
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <h3 className="text-xs font-bold text-green-600 uppercase tracking-widest">
                System Overview
              </h3>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-slate-800 mb-1">
                Welcome to the Benby Merch Portal
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                This centralized hub is designed to streamline your workflow
                across Cloud Management, Data History, and System Maintenance.
              </p>
            </div>
          </div>
        </div>
        {/* --- END ANNOUNCEMENT SECTION --- */}
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">
          Your Authorized Modules
        </h3>

        {filtered_actions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered_actions.map((action, index) => (
              <div
                key={index}
                onClick={() => handleNavigate(action)}
                className="group bg-white p-6 rounded-xl border border-slate-200 hover:border-green-500 transition-all cursor-pointer active:scale-95"
              >
                <div
                  className={`h-12 w-12 ${action.color} rounded-lg flex items-center justify-center mb-4 text-green-500 group-hover:bg-green-500 transition-all`}
                >
                  {React.cloneElement(action.icon, {
                    size: 24,
                    className: "group-hover:text-white transition-colors",
                  })}
                </div>
                <h4 className="font-bold text-slate-800 mb-1 group-hover:text-green-500">
                  {action.title}
                </h4>
                <p className="text-sm text-slate-500">{action.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-xl flex items-center gap-4 text-amber-700">
            <ShieldAlert size={40} />
            <div>
              <p className="font-bold">No Modules Assigned</p>
              <p className="text-sm">
                Please contact your administrator to assign permissions to your
                account.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
