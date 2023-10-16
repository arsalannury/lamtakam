"use client";

import Image from "next/image";
import styles from "./blogCard.module.scss";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Filters from "../Filter/Filters";
import { Category } from "@/types";

interface IProps {
  blogs: any[];
  categories: any[];
}

const BlogsCard: React.FC<IProps> = ({ blogs, categories }) => {
  // const [showBlogCard, setShowBlogCard] = useState<boolean>(false);
  const [filtrableData, setFilterableData] = useState<any[]>([]);

  const router = useRouter();
  const validCategory = categories && categories.map((obj) => obj.category);

  if (blogs && blogs.length === 0) {
    return (
      <>
        <h2 className="w-[100%] my-[90px] leading-[50px] text-center">
          من هنوز تو این دسته بندی بلاگی منتشر نکردم :(
        </h2>
      </>
    );
  }

  useEffect(() => {
    // setShowBlogCard(true);
    setFilterableData(blogs);
  }, []);

  const handleFilterData = (category: Category) => {
    if (category === null) {
      setFilterableData(blogs);
      return;
    }
    const copyData = [...blogs];
    const filterData = copyData.filter((blog) => {
      const blogCategory = blog.category;
      for (let index = 0; index < blogCategory.length; index++) {
        return blogCategory[index].label.includes(category.label);
      }
    });
    setFilterableData(filterData);
  };

  return (
    <>
      <Filters handleFilterData={handleFilterData} categories={validCategory} />
      <div className="flex items-center flex-wrap sm:justify-around p-5">
        {blogs &&
          blogs.map((blog) => {
            return (
              <>
                <div
                  className="sm:w-[456px] sm:max-w-[456px] mx-[30px]  rounded-[0.479rem] my-5
                  border-2 border-solid transition-all hover:shadow-lg"
                  key={blog._id}
                >
                  <Image
                    className="border-b-2 border-solid rounded-ss-md rounded-se-md"
                    style={{ color: "unset" }}
                    alt="blog-image"
                    width={452}
                    height={300}
                    quality={30}
                    src={blog.blogImg ? blog.blogImg : "/empty"}
                  />
                  <div>
                    <div className="flex items-center justify-between px-2">
                      <Link href={`/${blog._id}`}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-arrow-up-right-circle"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.854 10.803a.5.5 0 1 1-.708-.707L9.243 6H6.475a.5.5 0 1 1 0-1h3.975a.5.5 0 0 1 .5.5v3.975a.5.5 0 1 1-1 0V6.707l-4.096 4.096z"
                          />
                        </svg>
                      </Link>
                      <h3 className="italic text-[0.9em] break-all">
                        {blog.title}
                      </h3>
                    </div>
                    <p className="text-[0.9em] text-right px-2">
                      {new Date(blog.created_at).toLocaleString("fa")}{" "}
                      <span className="text-xs text-zinc-500">
                        :زمان انتشار
                      </span>
                    </p>
                    <div className="flex items-center justify-end flex-wrap mt-[25px]">
                      {blog &&
                        blog.category.map((cat: any) => (
                          <p className="m-[10px] py-[3px] px-[10px] inline w-auto text-[0.7em] rounded-[40px] border border-solid border-gray-700">
                            {cat.label}
                          </p>
                        ))}
                    </div>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default BlogsCard;
