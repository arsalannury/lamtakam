import React from "react";
import { Routes, Route } from "react-router-dom";
import BlogCreateView from "./Components/admin/blog-create-view";
import Dashboard from "./Components/admin/dashboard";
import CategoryCreate from "./Components/admin/category-create";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/blog-create-view" element={<BlogCreateView />} />
        <Route path="/category-create" element={<CategoryCreate />} />
      </Routes>
    </>
  );
}

export default App;
