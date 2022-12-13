import { useState } from "react";
import Details from "../components/editor/Details";
import { Tiptap } from "../components/editor/Tiptap";
import { useUser, useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { v4 as uuidv4 } from 'uuid';


const write = () => {

  const [description, setDescription] = useState("");

  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState(null)
  const [content, setContent] = useState(null)
  const [image, setImage] = useState(null)

  async function createArticle({ title, content, image }) {
    try {

      setLoading(true)

      const insert = {
        id_article: 4,
        created_at: new Date().toISOString(),
        image,
        title,
        content,
        id_user: user.id,
      }

      console.log(insert)

      let { error } = await supabase.from('articles').insert(insert)
      if (error) throw error
      alert('Article created!')
    } catch (error) {
      alert('Error inserting the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }


  return (
     <>
    {/* <div className="App">
      <Tiptap setDescription={setDescription} />
      <Details description={description} />
    </div> */}

    { <div className="b py-16 px-4 sm:px-6  w-screen flex justify-center items-center">
      <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-8 shadow">
        <div className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="titre" className="sr-only">
              Titre
            </label>
            <input
              type="text"
              name="titre"
              placeholder="Titre de l'article"
              className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2`}
              value={title || ''}
              onChange={(e) => setTitle(e.target.value)}
              />
          </div>

          <div>
            <label htmlFor="texte" className="sr-only">
              Texte
            </label>
            <textarea
              type="textarea"
              name="texte"
              placeholder="écrivez ici..."
              className={`block w-full  min-h-1/2 shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2`}
              value={content || ''}
              onChange={(e) => setContent(e.target.value)}
              />
          </div>
          <div className="flex justify-center">
          <button
              className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => createArticle({ title, content, image})}
          >
            Post
        </button>
          </div>
        </div>
      </div>
    </div> }

    </>

  );
}

export default write;

