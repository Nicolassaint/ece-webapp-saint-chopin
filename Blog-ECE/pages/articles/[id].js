import { useRouter } from 'next/router'
import { useState } from "react";
import parse from "html-react-parser";
import { supabase } from '../api/api'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Tiptap } from '../../components/editor/Tiptap';
import { v4 as uuidv4 } from 'uuid';

export default function Post({ article }) {

  const [description, setDescription] = useState("")
  const [idArticle,setidArticle] = useState(null)
  const [username,setUsername] = useState(null)
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  if (router.isFallback) {
    return <div>Loading...</div>
  }

  async function getUser(article){

    const { data } = await supabase
    .from('profiles')
    .select('username')
    .filter('id', 'eq', article.id_user)
    .single()

    setUsername(data.username)
    setidArticle(article.id_article)
  }

  async function createComment({ description }) {
    try {

      setLoading(true)

      const insert = {
        id_comment: uuidv4(),
        created_at: new Date().toISOString(),
        content: description,
        id_user: user.id,
        id_article: idArticle,
      }

      console.log("Insertion", insert)

      let { error } = await supabase.from('comments').insert(insert)
      if (error) throw error
      alert('Comment created!')
    } catch (error) {
      alert('Error inserting the data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className=''>
      <h1 className="text-5xl mt-4 font-semibold tracking-wide text-center">{article.title}</h1>
      <p className="text-sm font-light my-4 text-center">written by {getUser(article) ? username : "Anonyme"}</p>
      <div className="mt-8 mb-4 prose m-auto">
        {parse(article.content) }
      </div>
      <div className='App'>
      {user ? <h2 className='m-auto prose mb-4'>Post a comment here...</h2> : ""}
      {user ? <Tiptap setDescription={setDescription} setContent=""/> : <div className='prose'>You can't post comment if you're not logged in...</div>}
      </div>
      {user ? <div className="flex pb-20 justify-center">
        <button
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => createComment({ description })}
        >
          Post
        </button>
      </div> : ""}
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