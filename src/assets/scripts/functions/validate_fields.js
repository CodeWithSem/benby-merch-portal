import { CircleX } from "lucide-react";

export const validate_required_fields = ({
  data,
  fields,
  show_toast,
  title = "Invalid",
}) => {
  for (const field of fields) {
    const fieldName = typeof field === "string" ? field : field.name;
    const label = typeof field === "string" ? field : field.label;

    const value = data[fieldName];

    const isEmpty =
      value === undefined ||
      value === null ||
      (typeof value === "string" && value.trim() === "");

    if (isEmpty) {
      show_toast({
        type: "danger",
        title,
        message: `${label} is required`,
        icon: <CircleX size={21} className="text-red-500" />,
      });

      return false;
    }
  }

  return true;
};
