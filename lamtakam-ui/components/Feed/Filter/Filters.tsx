"use client";
import React, { useEffect, useState } from "react";
import styles from "./filters.module.scss";
import Select from "react-select";
import { FilterCategoryStyles } from "../../helpers/Toast/CategoryOptions";
import { Category } from "@/types";

interface IProps {
  handleFilterData: (category: Category) => void;
  categories: any[];
}

const Filters: React.FC<IProps> = ({ categories, handleFilterData }) => {
  const [filterShow, setFilterShow] = useState(false);
  useEffect(() => {
    setFilterShow(true);
  }, []);

  return (
    <>
      <div className=" flex items-center justify-end">
        {filterShow && (
          <Select
            onChange={(event: any) => {
              handleFilterData(event);
            }}
            isClearable
            isRtl
            isSearchable
            // isMulti
            name="category"
            styles={FilterCategoryStyles}
            placeholder="دسته بندی"
            options={categories}
            className="basic-multi-select"
            classNamePrefix="select"
          />
        )}
      </div>
    </>
  );
};

export default Filters;
