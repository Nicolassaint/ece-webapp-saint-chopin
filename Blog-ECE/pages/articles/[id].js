import { useRouter } from 'next/router'
import { useState } from "react";
import parse from "html-react-parser";
import { supabase } from '../api/api'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Tiptap } from '../../components/editor/Tiptap';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../../components/Loading';

export default function Post({ article }) {

  const [description, setDescription] = useState("")
  const [idArticle, setidArticle] = useState(null)
  const [username, setUsername] = useState(null)
  const [comments, setComments] = useState([])
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const router = useRouter()


  if (router.isFallback) {
    return (
      <Loading />
    )
  }
  async function getUser(article) {

    const { data } = await supabase
      .from('profiles')
      .select('username')
      .filter('id', 'eq', article.id_user)
      .single()

    setUsername(data.username)
    setidArticle(article.id_article)

    console.log("idArticle : ", article.id_article)
    try{
    const { data2 , error} = await supabase
      .from('comments')
      .select()
      .filter('id_article', 'eq', article.id_article)

      setComments(data2)
      console.log("commentaires :",data2)
    } catch(error){alert("problem collecting comments"); console.log(error)}

  }

  async function getData(article) {

    const { data } = await supabase
      .from('profiles')
      .select('username')
      .filter('id', 'eq', article.id_user)
      .single()

    setUsername(data.username)
    setidArticle(article.id_article)

    console.log("idArticle : ", article.id_article)

    const { data2 , error} = await supabase
      .from('comments')
      .select()
      .filter('id_article', 'eq', article.id_article)
      .single()

      console.log("commentaires :",data2)
      setComments(data2)

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
      <p className="text-sm font-light my-4 text-center">written by {getData(article) ? username : "Anonyme"}</p>
      <div className="mt-8 mb-4 prose m-auto">
        {parse(article.content)}
      </div>
      {/* {
        comments.map(comment => ( <div class="flex justify-center relative top-1/3">

        <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
            <div class="relative flex gap-4">
                <img src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png" class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy"/>
                <div class="flex flex-col w-full">
                    <div class="flex flex-row justify-between">
                        <p class="relative text-xl whitespace-nowrap truncate overflow-hidden">COMMENTOR</p>
                        <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
                    </div>
                    <p class="text-gray-400 text-sm">{comment.created_at}</p>
                </div>
            </div>
            <p class="-mt-4 text-gray-500">{parse(comment.content)}</p>
        </div>
        </div>
        ) )
        } */}
      <div className='App'>
        {user ? <h2 className='m-auto prose mb-4'>Post a comment here...</h2> : ""}
        {user ? <Tiptap setDescription={setDescription} setContent="" /> : <div className='prose'>You can't post comment if you're not logged in...</div>}
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