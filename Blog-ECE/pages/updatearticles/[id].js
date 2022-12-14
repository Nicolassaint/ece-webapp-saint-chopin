import { useRouter } from 'next/router'
import { useState} from 'react'
import ReactMarkdown from 'react-markdown'
import parse from "html-react-parser";
import { supabase } from '../api/api'


async function updateArticle({title,content }) {
    try {
      setLoading(true)
    
      const updates = {
        title,
        content,
      }
      
      console.log(title)
      console.log(content)

      let { error } = await supabase.from('articles').update(updates).eq('title',title)
      if (error) throw error
      alert('Article update')
    } catch (error) {
      alert('Error update article!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }




export default function Post({ article }) {
   
  const [title, setTitle] = useState([])
  const [loading, setLoading] = useState(true)
  const [content, setContent] = useState([])
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  return (
    <div>
    <div className='text-center'>
    <p className="text-sm font-light my-4 text-center">This article was written by {article.id_user}</p>
    
      <div classname='text-center'>
        <label>Title</label>
        <input
          id="title"
          type="text"
          placeholder={article.title || ''}
          className="border-solid border-2 border-black w-60 rounded-md dark:bg-slate-800"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mt-8 mb-2 prose m-auto">
        <label>Content</label>
      </div>

      <div className=" mb-4 prose m-auto">
        {parse(article.content)}
        <input
          id="title"
          type="text"
          value={content || ''}
          className="border-solid border-2 border-black w-60 rounded-md dark:bg-slate-800"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
    <div className='pt-4'>
        
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block"
          onClick={() => updateArticle({title,content})}
          disabled={loading}
        >
          Delete
        </button>
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

  return {
    props: {
      article: data,
    }
  }
}