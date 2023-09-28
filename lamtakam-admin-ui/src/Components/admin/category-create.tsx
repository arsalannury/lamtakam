import React, {
  useState,
  useRef,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import "../../styles/categoryStyles.scss";
import Header from "../Header/Header";
import { CategoryAction, CategoryState } from "src/types";
import { Spinner } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { renderHowToast } from "src/helpers/Toast/ToastNotif";

const reducer = (state: CategoryState, action: CategoryAction) => {
  switch (action.type) {
    case "FETCHED":
      return {
        ...state,
        categories: action.payload,
      };
    case "ERROR":
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

const CategoryCreate = () => {
  const [save, setSave] = useState(false);
  const [catVal, setCatVal] = useState("");
  const categoryRef = useRef(null);
  const initialState: any = {
    categories: [],
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const createCategory = async (value: string) => {
    if (!value || (value && value.trim().length <= 0)) return;
    setSave(true);
    try {
      await fetch("http://127.0.0.1:8000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: { value: value, label: value } }),
      });
      setSave(false);
      setCatVal("");
      getCategories();
      (categoryRef!.current as any).focus();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const getCategories = useCallback(async () => {
    try {
      const request = await fetch("http://127.0.0.1:8000/categories");
      const requestResponse = await request.json();
      dispatch({ type: "FETCHED", payload: requestResponse.data });
    } catch (error: any) {
      dispatch({ type: "ERROR", payload: [] });
      throw new Error(error.message);
    }
  }, []);

  const removeCategory = async (id: any) => {
    try {
      await fetch(`http://127.0.0.1:8000/categories/${id}`, {
        method: "DELETE",
      });
      renderHowToast("دسته بندی با موفقیت حذف شد", "success");
      getCategories();
    } catch (error: any) {
      renderHowToast("مشکلی در حذف دسته بندی پیش آمد", "error");
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <Toaster />
      <Header />
      <div className="container-div">
        <div>
          <input
            onChange={(event) => setCatVal(event.target.value)}
            value={catVal}
            type="text"
            placeholder="عنوان"
            maxLength={40}
            className="input"
            ref={categoryRef}
          />
          <button
            className="saveBtn"
            onClick={(event) => createCategory(catVal)}
          >
            {save ? "در حال ذخیره..." : "ذخیره"}
          </button>
        </div>
        <div className="container-fluid">
          {state.categories && state.categories.length > 0 ? (
            state.categories.map((category: any) => (
              <div className="category-name-container">
                <img
                  className="remove-icon"
                  src="remove.png"
                  alt="remove"
                  onClick={() => removeCategory(category._id)}
                />
                <img className="edit-icon" src="edit.png" alt="edit" />
                <p className="category-name">
                  {category.category && category.category.value}
                </p>
              </div>
            ))
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
      </div>
    </>
  );
};

export default CategoryCreate;
