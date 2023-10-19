import dynamic from "next/dynamic";
import Title from "../components/Feed/Title/Title.comp";

// fix this error => react-dom.development.js:31321 Uncaught Error: Text content does not match server-rendered HTML. with dynamic import
const BlogsCard = dynamic(() => import("../components/Feed/Blogs/BlogsCard"), {
  ssr: false,
});

export default async function Home() {
  const blogsData = await fetch(
    "https://lamtakam-server.iran.liara.run/blogs",
    {
      cache: "no-cache",
    }
  );
  const validJsonData = await blogsData.json();

  const categoryData = await fetch(
    "https://lamtakam-server.iran.liara.run/categories",
    {
      cache: "no-cache",
    }
  );
  const validCatJsonData = await categoryData.json();

  return (
    <>
      <main id="outer-container">
        <Title />
        <div className="">
          <BlogsCard
            blogs={validJsonData.data}
            categories={validCatJsonData.data}
          />
        </div>
      </main>
    </>
  );
}
