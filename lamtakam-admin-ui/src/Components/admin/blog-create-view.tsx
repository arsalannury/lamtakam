import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { renderHowToast } from "../../helpers/Toast/ToastNotif";
import Select from "react-select";
import { CategoryStyles } from "../../helpers/Toast/CategoryOptions";
import { global_getBase64 } from "../../helpers/index";
import "../../styles/createBlogStyles.scss";

const BlogCreateView = () => {
  const editorRef: any = useRef();
  const { CKEditor, ClassicEditor,Editor } = editorRef.current || {};
  const [editorLoad, setEditorLoad] = useState(false);
  const [blogContent, setBlogContent] = useState("<p></p>");
  const [category, setCategory] = useState([]);
  const [blogImg, setBlogImg] = useState("");
  const [title, setTitle] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [fileUploaded, setFileUploaded] = useState(null);
  const [fileName, setFileName] = useState("");
  const [validCategory, setValidCategory] = useState([]);

  const getCategories = async () => {
    const getCategories = await fetch(
      "https://lamtakam-server.iran.liara.run/categories"
    );
    const validCats = await getCategories.json();
    const mapCategoryObj =
      validCats && validCats.data.map((obj: any) => obj.category);
    setValidCategory(mapCategoryObj);
  };

  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor,
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
      // Editor: require("ckeditor5-custom-build/build/ckeditor") as any,
    };
    setEditorLoad(true);

    getCategories();
    return () => {};
  }, []);

  async function createBlog() {
    setSaveLoading(true);
    if (blogContent === "<p></p>" || blogContent.trim().length === 0) {
      renderHowToast("متنی برای انتشار نوشته نشده است", "error");
      setSaveLoading(false);
      return;
    }

    if (category && category.length === 0) {
      renderHowToast("دسته بندی بلاگ انتخاب نمایید", "error");
      setSaveLoading(false);
      return;
    }

    try {
      await fetch("https://lamtakam-server.iran.liara.run/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: blogContent,
          category: category,
          blogImg: blogImg,
          title: title,
          created_at: new Date(),
        }),
      });
      renderHowToast("بلاگ با موفقیت ثبت شد", "success");
      setBlogContent("<p></p>");
      setCategory([]);
      setBlogImg("");
      setTitle("");
      setSaveLoading(false);
      setFileName("");
      setFileUploaded(null);
    } catch (error) {
      renderHowToast(
        "در ایجاد بلاگ مشکلی پیش آمد لطفا دوباره تلاش نمایید",
        "error"
      );
      setSaveLoading(false);
    }
  }

  const getFileSizeInValidFormat = (file: File) => {
    const validSize =
      file.size == 0 ? 0 : Math.floor(Math.log(file.size) / Math.log(1024));

    return (
      ((file.size / Math.pow(1024, validSize)) as any).toFixed(2) * 1 +
      " " +
      ["B", "kB", "MB", "GB", "TB"][validSize]
    );
  };

  const getFileBlob = async (file: File) => {
    if (file.size > 5000000) {
      setBlogImg("");
      setFileName("حجم فایل انتخابی نمیتواند از 5mb بیشتر باشد");
      setFileUploaded(null);
      return;
    }
    const toBase64: any = await global_getBase64(file);
    setBlogImg(toBase64);
    setFileName(file.name);
  };

  return (
    <>
      <div
        test-id="save-wait"
        className={
          saveLoading ? "blogCreateBackdrop" : "blogCreateBackdropHidden"
        }
      >
        داره ذخیره میشه صبر کن لطفا...
      </div>
      <Toaster position="top-center" />
      <div
        className="container-lg shadow-lg p-5 my-5 overflow-auto container-blog"
        style={{ maxHeight: "700px" }}
      >
        <Form.Group className=" mt-5 mb-2 w-50 " controlId="formBasicEmail">
          <Form.Control
            size="sm"
            value={title}
            onChange={(event: any) => {
              setTitle(event.target.value);
            }}
            type="email"
            placeholder="عنوان بلاگ"
          />
        </Form.Group>
        {editorLoad ? (
          <>
            <CKEditor
              title="editor"
              config={{
                image: {
                  toolbar: [
                    "imageTextAlternative",
                    "toggleImageCaption",
                    "imageStyle:inline",
                    "imageStyle:block",
                    "imageStyle:side",
                  ],
                },
              }}
              editor={ClassicEditor}
              // editor={Editor}
              data={blogContent}
              onReady={(editor: any) => {
                // console.log("CKEditor5 React Component is ready to use!", editor);
              }}
              onChange={(event: any, editor: any) => {
                const data = editor.getData();
                setBlogContent(data);
                // console.log({ event, editor, data });
              }}
            />
            <Select
              onChange={(event: any) => {
                setCategory(event);
              }}
              value={category}
              isClearable
              isRtl
              isSearchable
              isMulti
              name="category"
              styles={CategoryStyles}
              placeholder="دسته بندی"
              options={validCategory}
              className="basic-multi-select my-2"
              classNamePrefix="select"
            />
            <div title="file-upload-wrapper" className="fileUploadWrapper">
              <label title="file-upload-label" className="fileUploadLabel">
                {fileName && fileName.length > 0 ? fileName : "انتخاب عکس بلاگ"}
                <input
                  title="input-upload"
                  onChange={(event: any) => {
                    setFileUploaded(event.target.files[0]);
                    getFileBlob(event.target.files[0]);
                  }}
                  type="file"
                  name="blog-image"
                />
              </label>
              <p>
                حجم فایل بارگزاری شده:{" "}
                {fileUploaded ? getFileSizeInValidFormat(fileUploaded) : "0"}
              </p>
            </div>
            <div className="blogCategoryWrapper">
              <Button
                className="sendBtn"
                onClick={createBlog}
                variant="outline-success"
                title="send-btn"
              >
                {saveLoading ? "در حال ثبت" : "ارسال بلاگ"}
              </Button>
            </div>
          </>
        ) : (
          <h1 style={{ textAlign: "center", margin: "100px" }}></h1>
        )}
      </div>
      <img alt="wave" src="bottomWave.svg" className="bottom-wave" />
    </>
  );
};

export default BlogCreateView;
