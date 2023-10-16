"use client";

import { getProviders, signIn } from "next-auth/react";
import styles from "../../styles/signIn.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function SignIn() {
  const [nextAuthProvider, setNextAuthProvider] = useState<any>(null);

  const getProvidersFromNextAuth = async () => {
    const providers = await getProviders();
    setNextAuthProvider(providers);
    console.log(providers);
  };

  useEffect(() => {
    getProvidersFromNextAuth();
  }, []);

  return (
    <div className="h-[100vh] bg-white">
      <Image
        src="/mainlogo.svg"
        alt="logo"
        width={150}
        className="absolute"
        height={140}
      />
      {nextAuthProvider &&
        Object.values(nextAuthProvider).map((provider: any) => (
          <>
            <div
              className={
                "flex justify-around items-center flex-col h-[600px] overflow-y-hidden bg-[gold]"
              }
              key={provider.name}
            >
              <button
                className={`mt-[100px] px-3 py-5 outline-none font-bold cursor-pointer bg-white rounded-sm border-dashed`}
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: "http://localhost:3000",
                  })
                }
              >
                Sign in with {provider.name}
              </button>
              <p className={"mt-[100px] text-center"}>www.lamTaKam.com</p>
            </div>
          </>
        ))}
    </div>
  );
}
