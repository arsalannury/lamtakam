export const global_getBase64 = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export const fileToBlob = async (file: File) =>
  new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });

export const commentStatusMessages = (status: string) => {
  switch (status) {
    case "accepted":
      return "تایید شده";
    case "notAccepted":
      return "تایید نشده";
    case "all":
      return "همه نظرات";
    default:
      return "---";
  }
};
