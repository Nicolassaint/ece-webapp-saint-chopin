import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from "next/link";

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState([])
  const [tittle, setTittle] = useState(null)

useEffect(() => {
    getArticle()
  }, [session])

  async function getArticle() {
    try {
      setLoading(true)
      let { data, error, status } = await supabase
        .from('articles')
        .select()
        .eq('id_user', user.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setTitle(data)
      }
    } catch (error) {
      alert('Error no articles!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteArticle({ tittle }) {
    try {
      setLoading(true)
      let { error } = await supabase.from('articles').delete().eq('title',tittle)
      console.log(tittle)
      if (error) throw error
      alert('Article deleted')
    } catch (error) {
      alert('Error delete article!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
     <div classname="mr-5 ml-5">
         {title.map((article) => (
                   <div key={article.id_article}>
                             <label className='text-center'>{article.title}</label>
                   </div>
                ))}

       <div className='pt-4 text-center'>
       <label >Tittle</label>
        <input type="text" className="border-solid border-2 border-black w-60 rounded-md dark:bg-slate-800" onChange={(e) => setTittle(e.target.value)}/>
      </div>


      <div className='pt-4'>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block"
          onClick={() => deleteArticle({tittle})}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}