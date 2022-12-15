import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from "next/link";

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState([])
  const [titre, setTitre] = useState(null)

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

  async function deleteArticle({ titre }) {
    try {
      setLoading(true)
      let { error } = await supabase.from('articles').delete().eq('title', titre)
      console.log(titre)
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
    //  <div classname="mr-5 ml-5">
    //      {title.map((article) => (
    //                <div key={article.id_article}>
    //                          <label className='text-center'>{article.title}</label>
    //                </div>
    //             ))}
    //   </div>
    <div>
      <div className="mx-auto w-full max-w-2xl rounded-xl mt-20 bg-white p-8 shadow dark:bg-neutral-800 border-solid border-2 border-black w-100">
        <div className="text-center items-center justify-center text-10xl font-bold">
          <label>All the articles you have written {user.id}</label>
          {title.map((article) => (
            <div key={article.title}>
              <button onClick={() => setTitre(article.title)}>{article.title}</button>
            </div>
          ))}
        </div>
      </div>
      <div className='pt-2 text-center mb-48'>
        <button
          className="border-solid border-2 border-black w-60 rounded-md bg-blue-500 hover:bg-blue-700 text-white"
          onClick={() => deleteArticle({ titre })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}

