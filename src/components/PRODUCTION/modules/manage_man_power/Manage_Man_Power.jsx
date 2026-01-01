import React, { useEffect, useState } from "react";
import { ChevronLeft, Plus, User, X } from "lucide-react";
import Spinner from "assets/elements/Spinner";
import Button from "assets/elements/Button";
import Input_Monitor from "../prod_operation/modals/Input_Monitor";
import {
  api_get_prod_plan_by_id_rtdb_realtime,
  api_add_man_power_to_prod_plan,
  api_update_man_power_status,
  api_remove_man_power_from_prod_plan,
} from "api/real_time_db/production/production_plan/tbl_production_plan_api";

const Manage_Man_Power = ({
  plan_id,
  selected_prod_index,
  show_toast,
  set_monitor_page,
}) => {
  const [man_power_list, set_man_power_list] = useState([]);
  const [loading, set_loading] = useState(false);
  const [show_input, set_show_input] = useState(false);

  /* -------------------- FETCH REALTIME -------------------- */
  useEffect(() => {
    if (!plan_id && plan_id !== 0) return;

    set_loading(true);

    const unsubscribe = api_get_prod_plan_by_id_rtdb_realtime(
      plan_id,
      show_toast,
      (res) => {
        if (res.success) {
          const selected_prod =
            res.data?.selected_prod_plan_list?.[selected_prod_index];

          set_man_power_list(selected_prod?.man_power_list || []);
        } else {
          set_man_power_list([]);
        }

        set_loading(false);
      }
    );

    return () => unsubscribe && unsubscribe();
  }, [plan_id, selected_prod_index, show_toast]);

  /* -------------------- ADD MAN POWER -------------------- */
  const handle_add_man_power = () => set_show_input(true);

  const handle_add_success = async (crew_name) => {
    const payload = { name: crew_name, man_power_status: "Active" };

    await api_add_man_power_to_prod_plan({
      plan_id,
      selected_prod_index,
      payload,
      show_toast,
    });
  };

  /* -------------------- STATUS CHANGE -------------------- */
  const handle_status_change = async (crew_name, new_status) => {
    // Optimistic UI update
    set_man_power_list((prev) =>
      prev.map((crew) =>
        crew.name === crew_name
          ? { ...crew, man_power_status: new_status }
          : crew
      )
    );

    const res = await api_update_man_power_status({
      plan_id,
      selected_prod_index,
      crew_name,
      new_status,
      show_toast,
    });

    if (!res.success) {
      // rollback if API fails
      set_man_power_list((prev) =>
        prev.map((crew) =>
          crew.name === crew_name
            ? {
                ...crew,
                man_power_status:
                  crew.man_power_status === "Active" ? "Idle" : "Active",
              }
            : crew
        )
      );
    }
  };

  const handle_remove_crew = async (crew_index) => {
    const res = await api_remove_man_power_from_prod_plan({
      plan_id,
      selected_prod_index,
      crew_index,
      show_toast,
    });

    if (res.success) {
      set_man_power_list(res.data); // update local state
    }
  };

  /* -------------------- NAVIGATION -------------------- */
  const handle_go_back = () => set_monitor_page("prod_operation");

  /* -------------------- RENDER -------------------- */
  return (
    <React.Fragment>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="white"
          icon={ChevronLeft}
          icon_size={20}
          icon_position="left"
          width="w-[45px] h-[50px]"
          on_click={handle_go_back}
        />

        <div className="text-xl font-bold text-gray-700">Manage Man Power</div>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center pt-10">
          <Spinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Man Power Cards */}
          {man_power_list.map((crew, idx) => (
            <div
              key={idx}
              className="relative bg-white rounded-lg border p-6 flex flex-col justify-between"
            >
              <button
                className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-100 transition"
                onClick={() => handle_remove_crew(idx)}
              >
                <X className="text-gray-500" size={18} />
              </button>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-sky-100">
                  <User className="text-sky-600" size={20} />
                </div>

                <div>
                  <p className="text-xs text-gray-500">Crew Name</p>
                  <p className="text-base font-semibold text-gray-800">
                    {crew.name}
                  </p>
                </div>
              </div>

              {/* Status Buttons */}
              <div className="mt-4 flex gap-2">
                <button
                  className={`w-[80px] outline-none px-3 py-2 rounded-full text-xs font-medium border transition-colors ${
                    crew.man_power_status === "Active"
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-green-50"
                  }`}
                  onClick={() => handle_status_change(crew.name, "Active")}
                >
                  Active
                </button>

                <button
                  className={`w-[80px] outline-none px-3 py-2 rounded-full text-xs font-medium border transition-colors ${
                    crew.man_power_status === "Idle"
                      ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                      : "bg-white text-gray-800 border-gray-300 hover:bg-yellow-50"
                  }`}
                  onClick={() => handle_status_change(crew.name, "Idle")}
                >
                  Idle
                </button>
              </div>
            </div>
          ))}

          {/* Add Man Power Card */}
          <div
            onClick={handle_add_man_power}
            className="bg-transparent rounded-lg border-2 border-sky-600 cursor-pointer p-6 flex flex-col justify-center items-center hover:bg-sky-50 transition"
          >
            <div className="p-3 rounded-full border-2 border-sky-600">
              <Plus className="text-sky-600" size={26} />
            </div>

            <p className="mt-4 text-sky-600 font-semibold text-sm">
              Add Man Power
            </p>
          </div>
        </div>
      )}

      {/* Input Modal */}
      <Input_Monitor
        is_open={show_input}
        on_close={() => set_show_input(false)}
        show_toast={show_toast}
        on_success={handle_add_success}
        max_length={32}
      />
    </React.Fragment>
  );
};

export default Manage_Man_Power;
