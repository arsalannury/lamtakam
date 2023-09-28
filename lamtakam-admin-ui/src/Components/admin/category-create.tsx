import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import "../../styles/categoryStyles.scss";
import Header from "../Header/Header";
import { Spinner } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { renderHowToast } from "src/helpers/Toast/ToastNotif";
import { useGetCategories, usePostCategories } from "src/hooks/categories";

const CategoryCreate = () => {
  const [catVal, setCatVal] = useState("");

  const {
    data: categories,
    isLoading: categoryLoading,
    isFetching: categoryIsRefetch,
    refetch: cateogryRefetch,
  } = useGetCategories();
  const { mutate, isLoading: postCategoryLoading } = usePostCategories();

  const removeCategory = async (id: any) => {
    try {
      await fetch(`http://127.0.0.1:8000/categories/${id}`, {
        method: "DELETE",
      });
      renderHowToast("دسته بندی با موفقیت حذف شد", "success");
      cateogryRefetch();
    } catch (error: any) {
      renderHowToast("مشکلی در حذف دسته بندی پیش آمد", "error");
      throw new Error(error.message);
    }
  };

  return (
    <>
      <Toaster />
      <Header />
      <div className="container-div">
        {categoryLoading || categoryIsRefetch ? <Spinner style={{ margin: "auto" }} animation="border" variant="dark" /> :
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
            {postCategoryLoading ? "در حال ذخیره..." : "ذخیره"}
          </button>
        </div>
        <div className="container-fluid">
          {categories && categories.data.length > 0 ? (
            categories.data.map((category: any) => {
              console.log(category);

              return (
                <div className="category-name-container">
                  <img
                    className="remove-icon"
                    src="remove.png"
                    alt="remove"
                    onClick={() => removeCategory(category._id)}
                  />
                  <img className="edit-icon" src="edit.png" alt="edit" />
                  <p className="category-name">
                    {category && category.category && category.category.value}
                  </p>
                </div>
              );
            })
          ) : (
            <div className="spinner-container">
              <Spinner
                style={{ margin: "auto" }}
                animation="border"
                variant="dark"
              />
            </div>
          )}
        </div>
          </>
         }
      </div>
    </>
  );
};

export default CategoryCreate;
