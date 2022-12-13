import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from "next/link";

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState(null)

useEffect(() => {
    getArticle()
  }, [session])

  async function getArticle() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('articles')
        .select(`title`)
        .eq('id_user', user.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setTitle(data)
      }
      console.log(data)
      console.log(title[0].title)
    } catch (error) {
      alert('Error no articles!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function deleteArticle({ title }) {
    try {
      setLoading(true)
      let { error } = await supabase.from('articles').delete().eq('title',title)
      console.log(title)
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

    <div className="form-widget">
        {title.map((titre) => (
                  <div
                    key={titre.title}
                  >
                  <label>{titre.title}</label>
                  </div>
                  
                ))}
      
      <div>
      <label htmlFor="titre">Title</label>
        <input
          id="titre"
          type="text"
          value={title || ''}
          className="border-solid border-2 border-black w-60 rounded-md"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className='pt-4'>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block"
          onClick={() => deleteArticle({title})}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Delete'}
        </button>
      </div>
    </div>
  )
}