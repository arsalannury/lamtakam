import Image from "next/image";

const loading = () => {
  return (
    <div className="h-[100vh] bg-white">
      <Image
        src="/mainlogo.svg"
        alt="logo"
        width={150}
        className="absolute"
        height={140}
      />

      <div className="animate-pulse text-center w-[100%] h-[700px] overflow-y-hidden bg-[#e7e7e7] overflow-hidden text-xl text-white flex items-center justify-center max-sm:text-sm">
        درحال بارگذاری محتوی هستیم لطفا چند لحظه صبر کنید
      </div>
    </div>
  );
};

export default loading;
