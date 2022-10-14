import styles from "../../styles/Articles.module.css";
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
      <h1 className={styles.h1}>All Articles</h1>
      {articles.map((article) => (
        <Link href={"/articles/" + article.id} key={article.id}>
          <a className={styles.single}>
            <h3>{article.name}</h3>
          </a>
        </Link>
      ))}
    </Box>
  );
};

export default Articles;
