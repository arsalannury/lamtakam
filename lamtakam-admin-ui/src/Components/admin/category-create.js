import React, { useState, useRef } from "react";

const CategoryCreate = () => {
  return <></>
  // const [save, setSave] = useState(false);
  // const [catVal, setCatVal] = useState("");
  // const categoryRef = useRef(null);

  // const createCategory = async (value) => {
  //   if (!value || (value && value.trim().length <= 0)) return;
  //   setSave(true);
  //   try {
  //     await fetch("https://lamtakam-server.iran.liara.run//categories", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ category: { value: value, label: value } }),
  //     });
  //     setSave(false);
  //     setCatVal("");
  //     categoryRef.current.focus();
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // };

  // return (
  //   <>
  //     <div className={styles.container}>
  //       <label className={styles.label}>ایجاد دسته بندی</label>
  //       <input
  //         onChange={(event) => setCatVal(event.target.value)}
  //         value={catVal}
  //         type="text"
  //         maxLength={40}
  //         className={styles.input}
  //         ref={categoryRef}
  //       />
  //       <button
  //         className={styles.saveBtn}
  //         onClick={(event) => createCategory(catVal)}
  //       >
  //         {save ? "در حال ذخیره..." : "ذخیره"}
  //       </button>
  //     </div>
  //   </>
  // );
};

export default CategoryCreate;