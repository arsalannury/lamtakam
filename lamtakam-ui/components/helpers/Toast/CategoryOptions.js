export const CategoryOptions = [
  { value: "سیاسی", label: "سیاسی" },
  { value: "اجتماعی", label: "اجتماعی" },
  { value: "ورزشی", label: "ورزشی" },
  { value: "فرهنگی", label: "فرهنگی" },
  { value: "مالی", label: "مالی" },
  { value: "سرگرمی", label: "سرگرمی" },
  { value: "بازی", label: "بازی" },
  { value: "تکنولوژی", label: "تکنولوژی" },
  { value: "بدون دسته بندی مشخص", label: "بدون دسته بندی مشخص" },
];

export const CategoryStyles = {
  control: (styles) => ({
    ...styles,
    width: "400px",
    "@media screen and (max-width: 517px)": {
      width: "250px",
    },
  }),
};

export const FilterCategoryStyles = {
  control: (styles) => ({
    ...styles,
    width: "200px",
  }),
};
