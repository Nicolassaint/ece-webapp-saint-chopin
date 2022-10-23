//import styles from "../../styles/Articles.module.css";
import Link from "next/link";
import { Box } from "@mui/material";

export const getStaticProps = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  return {
    props: { articles: data },
  };
};

const Articles = ({ articles }) => {
  return (
    <Box>
      <h1 className="ml-2 text-blod text-2xl">All Articles</h1>
      {articles.map((article) => (
      <Link href={"/articles/" + article.id} key={article.id}>
        <a className="pr-50 pt-15 bg-white block mr-5 mt-7 border-2  border-gray-100 hover: hover:bg-gray-200">
          <h2>{article.name}</h2>
        </a>
    </Link>
))}
    </Box>
  );
};

export default Articles;



