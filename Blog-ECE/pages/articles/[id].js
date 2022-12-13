import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import parse from "html-react-parser";
import { supabase } from '../api/api'

export default function Post({ article }) {

  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div className=''>
      <h1 className="text-5xl mt-4 font-semibold tracking-wide text-center">{article.title}</h1>
      <p className="text-sm font-light my-4 text-center">written by {article.id_user}</p>
      <div className="mt-8 mb-4 prose m-auto">
        {/* <ReactMarkdown className='prose' children={article.content} /> */}
        {parse(article.content)}
      </div>
    </div>
  )
}

export async function getStaticPaths() {


  const { data, error } = await supabase
    .from('articles')
    .select('id_article')
  const paths = data.map(article => ({ params: { id: JSON.stringify(article.id_article) } }))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps({ params }) {


  const { id } = params
  const { data, error } = await supabase
    .from('articles')
    .select()
    .filter('id_article', 'eq', id)
    .single()

  // const { data2 } = await supabase
  // .from('profiles')
  // .select('username')
  // .filter('id', 'eq', data.id_user)
  // .single()

  return {
    props: {
      article: data,
      // user: data2
    }
  }
}