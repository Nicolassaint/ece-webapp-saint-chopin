import { useRouter } from 'next/router'
import { useState} from 'react'
import { supabase } from '../api/api'
import { Tiptap } from "../../components/editor/Tiptap";






export default function Post({ article }) {
   
  const [title, setTitle] = useState([])
  const [loading, setLoading] = useState(true)
  const [description, setDescription] = useState([])
  const [idArticle,setidArticle] = useState([])
  const [username,setUsername] = useState([])
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  
  async function getUser(article){

    console.log(article.content)
    console.log(article.id_article)
    console.log(article.id_user)
    console.log(article.title)

    const { data } = await supabase
    .from('profiles')
    .select('username')
    .filter('id','eq',article.id_user)
    .single()

    console.log(data)

    setUsername(data.username)
    setidArticle(article.id_article)
  }

  async function updateArticle({title,description }) {
    try {
      setLoading(true)
    
      const updates = {
        title,
        content : description,
      }

      let { error } = await supabase.from('articles').update(updates).eq('title',article.title)
      if (error) throw error
      alert('Article update')
    } catch (error) {
      alert('Error update article!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  

  return (
    <div>
    <div className='text-center'>
    <p className="text-sm font-light my-4 text-center">This article was written by {getUser(article) ? username : "Anonyme"}</p>

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
      <div className="mt-8 prose m-auto App">
        <label>Content</label>
        <Tiptap setDescription={setDescription} setContent={article.content} />
      </div>

    </div>
    <div className=' text-center'>
        
        <button
          className="border-solid border-2 border-black w-60 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
          onClick={() => updateArticle({title,description})}
        >
          Update
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