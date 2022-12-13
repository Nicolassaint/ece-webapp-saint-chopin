import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from "../components/Avatar";
import { Tiptap } from "../components/editor/Tiptap";
import { v4 as uuidv4 } from 'uuid';

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState(null)
  const [image, setImage] = useState(null)
  const [content, setDescription] = useState("");

useEffect(() => {
    getArticle()
  }, [session])

  async function getArticle() {
    try {
        console.log(user.id)
        setLoading(true)

      let { data, error, status } = await supabase
        .from('articles')
        .select(`title,content,image`)
        .eq('id_user', user.id)

        console.log(user.id)
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setTitle(data[0].title)
        setDescription(data[0].content)
        setImage(data[0].image)
      }
      console.log(data)
      console.log(data[0].title)
      console.log(data[0].content)
      console.log(data[0].image)


    } catch (error) {
      alert('Error no articles!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateArticle({title,content,image }) {
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
    <>
      <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-8 shadow">
      <div className="flex items-center justify-center text-10xl font-bold">
          <label>{title}</label>
      </div>

      <div className="flex items-center justify-center">
        <Avatar
          uid={uuidv4()}
          url={image}
          size={150}
          onUpload={(url) => {
            setImage(url)
          }}
        />
      </div>
      </div>

      <div className="App">
        <Tiptap setDescription={setDescription} />
      </div>

      <div className="flex pb-20 justify-center">
        <button
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => updateArticle({ title, content, image })}
        >
          Update
        </button>
      </div>
    </>

  );
}