import Select, { type MultiValue } from "react-select";
import { useCategories } from "@/hooks";

export const CategorySelect = ({
  selectCallback,
  alreadySelectedIds = [],
  customControlStyles = {},
  customMenuStyles = {},
  customMultiValueStyles = {},
}: {
  selectCallback: (data: MultiValue<{ value: string; label: string }>) => void;
  customControlStyles?: object;
  alreadySelectedIds?: string[];
  customMenuStyles?: object;
  customMultiValueStyles?: object;
}) => {
  const { categories, categoriesLoading } = useCategories();

  if (categoriesLoading) return null;

  // All available options
  const selectCategories = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // Pre selected options
  const alreadySelected = categories
    .filter((c) => alreadySelectedIds?.includes(c.id))
    .map((category) => ({
      value: category.id,
      label: category.name,
    }));

  return (
    <Select
      options={selectCategories}
      onChange={selectCallback}
      defaultValue={alreadySelected}
      placeholder="Select categories"
      isMulti
      styles={{
        // Main select control
        control: (baseStyles) => ({
          ...baseStyles,
          padding: "4px",
          borderRadius: "20px",
          border: "1px solid black",
          "&:hover": {
            cursor: "pointer",
          },
          ...customControlStyles,
        }),
        // Dropdown menu
        menu: (baseStyles) => ({
          ...baseStyles,
          border: "1px solid black",
          boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
          ...customMenuStyles,
        }),
        option: (baseStyles, state) => ({
          ...baseStyles,
          backgroundColor: state.isFocused ? "#f8cb46" : "transparent",
          cursor: "pointer",
        }),
        // Pill body
        multiValue: (baseStyles) => ({
          ...baseStyles,
          paddingLeft: "4px",
          backgroundColor: "transparent",
          border: "1px solid black",
          borderRadius: "16px",
          boxShadow: "2px 2px 0 rgba(0,0,0,1)",
          ...customMultiValueStyles,
        }),
        // Pill label
        multiValueLabel: (baseStyles) => ({
          ...baseStyles,
          color: "black",
          fontWeight: 500,
        }),
        // Pill remove cross
        multiValueRemove: (baseStyles) => ({
          ...baseStyles,
          color: "#black",
          cursor: "pointer",
          borderRadius: "0px 16px 16px 0px",
          ":hover": {
            backgroundColor: "#f8cb46",
            color: "black",
          },
        }),
      }}
    />
  );
};
