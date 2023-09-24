export const global_getBase64 = (file) => {
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

export const fileToBlob = async (file) =>
  new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });

export const commentStatusMessages = (status) => {
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
