import React, { useState, useRef } from "react";
import "../../styles/categoryStyles.scss";
import Header from "../Header/Header";

const CategoryCreate = () => {
  const [save, setSave] = useState(false);
  const [catVal, setCatVal] = useState("");
  const categoryRef = useRef(null);

  const createCategory = async (value: string) => {
    if (!value || (value && value.trim().length <= 0)) return;
    setSave(true);
    try {
      await fetch("https://lamtakam-server.iran.liara.run/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: { value: value, label: value } }),
      });
      setSave(false);
      setCatVal("");
      (categoryRef!.current as any).focus();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="container-div">
        <input
          onChange={(event) => setCatVal(event.target.value)}
          value={catVal}
          type="text"
          placeholder="عنوان"
          maxLength={40}
          className="input"
          ref={categoryRef}
        />
        <button className="saveBtn" onClick={(event) => createCategory(catVal)}>
          {save ? "در حال ذخیره..." : "ذخیره"}
        </button>
      </div>
    </>
  );
};

export default CategoryCreate;
