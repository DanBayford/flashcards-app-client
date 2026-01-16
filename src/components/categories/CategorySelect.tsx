import { useSearchParams } from "react-router";
import Select, { type MultiValue } from "react-select";
import { useCategories } from "@/hooks";

export const CategorySelect = ({
  selectCallback,
  customStyles = {},
}: {
  selectCallback: (data: MultiValue<{ value: string; label: string }>) => void;
  customStyles?: object;
}) => {
  const [searchParams] = useSearchParams();
  const { categories, categoriesLoading } = useCategories();

  if (categoriesLoading) return null;

  // Available options
  const selectCategories = categories?.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  // Check URL for any already selected via URL state
  const categoryIds = searchParams.getAll("categoryId");
  const alreadySelected = selectCategories.filter(({ value }) =>
    categoryIds.includes(value)
  );

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
          boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
          "&:hover": {
            border: "1px solid black",
            boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
          },
          ...customStyles,
        }),
        // Dropdown menu
        menu: (baseStyles) => ({
          ...baseStyles,
          border: "1px solid black",
          boxShadow: "2px 2px 0px rgba(0, 0, 0, 1)",
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
