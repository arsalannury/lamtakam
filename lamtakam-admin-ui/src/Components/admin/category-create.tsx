import React, { useState } from "react";
import "../../styles/categoryStyles.scss";
import Header from "../Header/Header";
import { Spinner } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import {
  useDeleteCategory,
  useGetCategories,
  usePostCategories,
} from "src/hooks/categories";

const CategoryCreate = () => {
  const [catVal, setCatVal] = useState("");

  const {
    data: categories,
    isLoading: categoryLoading,
    isFetching: categoryIsRefetch,
  } = useGetCategories();
  const { mutate, isLoading: postCategoryLoading } = usePostCategories();
  const { mutate: deleteMutate } = useDeleteCategory();

  return (
    <>
      <Toaster />
      <Header />
      <div className="container-div">
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
                className="saveBtn"
                onClick={(event) => {
                  mutate(catVal);
                  setCatVal("");
                }}
              >
                ذخیره
              </button>
            </div>
            <div className="container-fluid">
              {categories && categories.data.length > 0 ? (
                categories.data.map((category: any) => {
                  return (
                    <div className="category-name-container">
                      <img
                        className="remove-icon"
                        src="remove.png"
                        alt="remove"
                        onClick={() => deleteMutate(category._id)}
                      />
                      <img className="edit-icon" src="edit.png" alt="edit" />
                      <p className="category-name">
                        {category &&
                          category.category &&
                          category.category.value}
                      </p>
                    </div>
                  );
                })
              ) : (
              
                  <p className='not-found-data'>اطلاعاتی جهت نمایش یافت نشد</p>
               
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default CategoryCreate;
