import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
const supabase = useSupabaseClient()

export default function Post({ post }) {

  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <h1 className="text-5xl mt-4 font-semibold tracking-wide">{post.title}</h1>
      <p className="text-sm font-light my-4">by {post.user_email}</p>
      <div className="mt-8">
        <ReactMarkdown className='prose' children={post.content} />
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const supabase = useSupabaseClient()

  const { data, error } = await supabase
    .from('articles')
    .select('id_article')
  const paths = data.map(article => ({ params: { id: JSON.stringify(article.id) }}))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params }) {
  const supabase = useSupabaseClient()

  const { id_article } = params
  const { data } = await supabase
    .from('articles')
    .select()
    .filter('id_article', 'eq', id_article)
    .single()
  return {
    props: {
      articles: data
    }
  }
}