import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Input_Field from "../../../elements/Input_Field";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Button from "../../../elements/Button";

const Calendar = () => {
  const calendarRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedRangeDisplay, setSelectedRangeDisplay] = useState(null);
  const [selectedColor, setSelectedColor] = useState("primary");
  const [currentTitle, setCurrentTitle] = useState("");

  const bgColorMap = {
    primary: "#bae6fd",
    success: "#d1fae5",
    warning: "#fef9c3",
    danger: "#fee2e2",
  };

  const dotColorMap = {
    primary: "#0ea5e9",
    success: "#22c55e",
    warning: "#eab308",
    danger: "#ef4444",
  };

  // Update month/year label whenever view changes
  useEffect(() => {
    if (!calendarRef.current) return;

    const calendarApi = calendarRef.current.getApi();
    setCurrentTitle(calendarApi.view.title);

    const handleDatesSet = () => setCurrentTitle(calendarApi.view.title);
    calendarApi.on("datesSet", handleDatesSet);

    return () => calendarApi.off("datesSet", handleDatesSet);
  }, [calendarRef]);

  const handlePrev = () => calendarRef.current.getApi().prev();
  const handleNext = () => calendarRef.current.getApi().next();
  // Go to today
  const handleToday = () => {
    calendarRef.current.getApi().today();
    setCurrentTitle(calendarRef.current.getApi().view.title);
  };

  const handleSelect = (info) => {
    setSelectedRangeDisplay({
      start: info.startStr,
      end: info.endStr,
    });

    setSelectedRange({
      start: info.startStr,
      end: info.endStr,
    });

    setSelectedColor("primary");
    setShowModal(true);
  };

  const handleAddEvent = () => {
    if (!newEventTitle.trim()) return;

    setEvents((prev) => [
      ...prev,
      {
        title: newEventTitle,
        start: selectedRange.start,
        end: selectedRange.end,
        color: bgColorMap[selectedColor],
        dotColor: dotColorMap[selectedColor],
      },
    ]);

    setNewEventTitle("");
    setShowModal(false);
  };

  return (
    <div className="w-full">
      {/* Page Header */}
      <h1 className="w-full text-xl py-5">Calendar Scheduler</h1>

      {/* Calendar Container */}
      <div className="w-full bg-white rounded-lg">
        {/* Custom Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b-0 border border-gray-200 rounded-t-lg p-5">
          <h2 className="text-lg font-medium">{currentTitle}</h2>
          <div className="flex gap-2">
            <Button on_click={handlePrev} variant="white" width="w-[40px]">
              <ChevronLeft size={24} />
            </Button>
            <Button
              on_click={handleToday} // function to go to today
              variant="white"
              width="w-[70px]"
            >
              Today
            </Button>
            <Button on_click={handleNext} variant="white" width="w-[40px]">
              <ChevronRight size={24} />
            </Button>
          </div>
        </div>

        {/* Calendar Body */}
        <div className="overflow-hidden">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            selectable={true}
            selectMirror={true}
            select={handleSelect}
            events={events}
            headerToolbar={false} // hide default header
            eventContent={renderEventContent}
          />
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-[97]">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-[98]"></div>
          <div
            className={`relative bg-white rounded-lg shadow-xl max-w-[500px] w-full p-7 m-5 z-[99]`}
          >
            <button
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-400 hover:text-gray-500"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold mb-2">Add Event</h2>
            <p className="text-sm text-gray-500 mb-4">
              {selectedRangeDisplay?.start} → {selectedRangeDisplay?.end}
            </p>

            <Input_Field
              label="Event Title"
              type="text"
              placeholder=""
              value={newEventTitle}
              on_change={(e) => setNewEventTitle(e.target.value)}
            />

            {/* Color selector */}
            <div className="flex gap-2 my-4">
              {["primary", "success", "warning", "danger"].map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-7 h-7 rounded-full flex items-center border-2 border-white justify-center
                    ${
                      selectedColor === color
                        ? "ring-2 ring-gray-400"
                        : "ring-0"
                    }`}
                  style={{ backgroundColor: dotColorMap[color] }}
                />
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-4">
              <Button
                on_click={handleAddEvent}
                width="w-[100px]"
                variant="primary"
              >
                Proceed
              </Button>
              <Button
                width="w-[100px]"
                variant="white"
                on_click={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;

function renderEventContent(eventInfo) {
  const { start, end } = eventInfo.event;
  const isSingleDay =
    start &&
    end &&
    new Date(end).getTime() - new Date(start).getTime() === 24 * 60 * 60 * 1000;

  return (
    <div className="flex p-[10px] items-center gap-1 text-sm text-gray-800">
      {isSingleDay && (
        <span
          className={`w-[5px] h-[20px] rounded-full inline-block mx-[5px]`}
          style={{ backgroundColor: eventInfo.event.extendedProps.dotColor }}
        />
      )}
      <i className="flex-1 truncate">{eventInfo.event.title}</i>
    </div>
  );
}
