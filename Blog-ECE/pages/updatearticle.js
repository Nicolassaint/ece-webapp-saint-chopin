import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'


export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState(null)
  const [image, setImage] = useState(null)
  const [content, setContent] = useState(null)

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

  async function updateArticle({content,image }) {
    try {
      setLoading(true)
    
      const updates = {
        image,
        content,
      }
      
      console.log(image)
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

  return (

    <div className="form-widget">
      <div>
        <h1>{title}</h1>
      </div>
      
      <div>
        <label htmlFor="image">image</label>
        <input
          id="image"
          type="content"
          className="border-solid w-60"
          value={image || ''}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="content">content</label>
        <input
          id="content"
          type="content"
          className="border-solid w-60"
          value={content || ''}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>

      <div className='pt-4'>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block"
          onClick={() => updateArticle({content,image,})}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>
    </div>
  )
}