import React, { useState } from "react";
import { createPortal } from "react-dom";
import "../../styles/categoryStyles.scss";
import Header from "../Header/Header";
import { Spinner } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import {
  useDeleteCategory,
  useGetCategories,
  usePostCategories,
  useUpdateCategory,
} from "src/hooks/categories";

const CategoryCreate = () => {
  const [catVal, setCatVal] = useState<string>("");
  const [isUpdateMode, setIsUpdateMode] = useState<boolean>(false);

  const {
    data: categories,
    isLoading: categoryLoading,
    isFetching: categoryIsRefetch,
  } = useGetCategories();
  const { mutate: postCategoryMutate, isLoading: postCategoryLoading } =
    usePostCategories();
  const { mutate: deleteMutate } = useDeleteCategory();
  const { mutate: updateMutate } = useUpdateCategory();

  return (
    <>
      <Toaster />
      <Header />
      <div className="container-div shadow-lg">
        {categoryLoading || categoryIsRefetch ? (
          <Spinner
            style={{ margin: "auto" }}
            animation="border"
            variant="dark"
          />
        ) : (
          <>
            <div>
              <input
                onChange={(event) => setCatVal(event.target.value)}
                value={catVal}
                type="text"
                placeholder="عنوان"
                maxLength={40}
                className="input"
              />
              <button
                disabled={catVal.trim().length === 0}
                className="saveBtn"
                onClick={(event) => {
                  isUpdateMode
                    ? updateMutate(catVal)
                    : postCategoryMutate(catVal);
                  setCatVal("");
                  setIsUpdateMode(false);
                }}
              >
                {isUpdateMode ? "ویرایش" : "ذخیره"}
              </button>
              {isUpdateMode && (
                <img
                  onClick={() => {
                    setCatVal("");
                    setIsUpdateMode(false);
                  }}
                  className="cancel-icon"
                  src={"cancel.png"}
                  alt="cancel"
                  width={30}
                  height={30}
                />
              )}
            </div>
            <div className="container-fluid container-box">
              {/* {createPortal(
                <p className="position-absolute w-100 top-0 bottom-0 right-0 left-0 bg-secondary ">This child is placed in the document body.</p>,
                document.body
              )} */}
              {categories && categories.data.length > 0 ? (
                categories.data.map((category: any) => {
                  return (
                    <div key={category._id} className="category-name-container">
                      <img
                        className="remove-icon"
                        src="remove.png"
                        alt="remove"
                        onClick={() => {
                          deleteMutate(category._id);
                          setCatVal("");
                          setIsUpdateMode(false);
                        }}
                      />
                      <img
                        className="edit-icon"
                        src="edit.png"
                        alt="edit"
                        onClick={() => {
                          setCatVal(category.category.value);
                          setIsUpdateMode(true);
                        }}
                      />
                      <p className="category-name">
                        {category &&
                          category.category &&
                          category.category.value}
                      </p>
                    </div>
                  );
                })
              ) : (
                <p className="not-found-data">اطلاعاتی جهت نمایش یافت نشد</p>
              )}
            </div>
          </>
        )}
      </div>
      <img alt="wave" src="bottomWave.svg" className="bottom-wave" />
    </>
  );
};

export default CategoryCreate;
