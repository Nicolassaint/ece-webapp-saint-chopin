import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'


export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [tittle, setTitle] = useState(null)

useEffect(() => {
    getArticle()
  }, [session])

  async function getArticle() {
    try {
        console.log(user.id)
        setLoading(true)

      let { data, error, status } = await supabase
        .from('articles')
        .select(`title`)
        .eq('id_user', user.id)

        console.log(user.id)
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setTitle(data[0].title)
      }
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
      <div>
        <h1>{tittle}</h1>
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