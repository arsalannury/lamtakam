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

  const getCategories = useCallback(async () => {
    try {
      const request = await fetch(
        "https://lamtakam-server.iran.liara.run/categories"
      );
      const requestResponse = await request.json();
      dispatch({ type: "FETCHED", payload: requestResponse });
    } catch (error: any) {
      dispatch({ type: "ERROR", payload: [] });
      throw new Error(error.message);
    }
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
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
          {state.categories &&
            state.categories.map((category: any) => (
              <>
                <p>{category.category.value}</p>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default CategoryCreate;
