"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ErrorType } from "@/types";
import Image from "next/image";

const Error = ({ error, reset }: ErrorType) => {
    const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <div className="h-[100vh] bg-white">
        <Image
          src="/mainlogo.svg"
          alt="logo"
          width={150}
          className="absolute"
          height={140}
        />
        <div
          className={
            "flex justify-around items-center flex-col h-[700px] overflow-y-hidden bg-[#b42e2e] "
          }
        >
          <p className="text-white text-lg font-bold mt-[100px] max-sm:text-sm max-sm:px-3 max-sm:text-right ">
            خطایی در نمایش محتوی بوجود آمده لطفا موارد زیر را بررسی نمایید در
            غیر این صورت با ایمیل زیر در ارتباط باشید{" "}
          </p>
          <ul className="list-none flex items-center justify-between flex-col text-justify text-white">
            <li>اتصال خود به اینترنت را بررسی نمایید</li>
            <li>صفحه را دوباره بروز رسانی کنید</li>
            <li>مشکل پیش آمده را به پشتیبانی اطلاع دهید</li>
            <li>support.lamtakam@gmail.com</li>
          </ul>
          <p className="my-4 text-white font-bold">{error.message}</p>
          <p
            className="border-none mt-[100px] px-7 py-5 outline-none cursor-pointer bg-white rounded-sm shadow-lg transition-all hover:opacity-[.8]"
            onClick={() => router.refresh()}
          >
            بروز رسانی صفحه
          </p>
        </div>
      </div>
    </>
  );
};

export default Error;
