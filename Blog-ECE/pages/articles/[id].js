import { useRouter } from 'next/router'
import { useState, useEffect } from "react";
import parse from "html-react-parser";
import { supabase } from '../api/api'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { Tiptap } from '../../components/editor/Tiptap';
import { v4 as uuidv4 } from 'uuid';
import Loading from '../../components/Loading';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Post({ article }) {

  useEffect(() => {
    if (article) {
      getComment(article);
      getUser(article)
      if (user) { getCommentator(); }
    }
  }, [article])


  const [description, setDescription] = useState("")
  const [idArticle, setidArticle] = useState(null)
  const [username, setUsername] = useState("Anonyme")
  const [titre, setTitre] = useState(null)
  const [comments, setComments] = useState([])
  const [commentator, setCommentator] = useState("Anonyme")
  const [supprimer, setDelete] = useState(null)
  const [update, setUpdate] = useState(false)
  const [nouveauCom, setnouveauCom] = useState("")
  const [nouveauID, setnouveauID] = useState("")
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const router = useRouter()


  useEffect(() => {
    if (supprimer) {
      deleteComment()
    }
  }, [supprimer])

  // useEffect(() => {
  //   if (update) {
  //     setnouveauID(!nouveauID)
  //   }
  // }, [update])

  if (router.isFallback) {
    return (
      <Loading />
    )
  }

  function getDate(timestamp) {
    var dateFormat = new Date(timestamp);
    var newDate = dateFormat.getDate() +
      "/" + (dateFormat.getMonth() + 1) +
      "/" + dateFormat.getFullYear() +
      " " + dateFormat.getHours() +
      ":" + dateFormat.getMinutes();

    return newDate
  }

  async function getComment(article) {

    const { data } = await supabase
      .from('comments')
      .select()
      .filter('id_article', 'eq', article.id_article)

    setComments(data)
    setTitre(article.title)

  }


  async function getIDcomment() {

    const { data } = await supabase
      .from('comments')
      .select('id_comment')
      .filter('id', 'eq', user.id)
      .single()

    if (data) { setnouveauID(data.username) }
  }

  async function getCommentator() {

    const { data } = await supabase
      .from('profiles')
      .select('username')
      .filter('id', 'eq', user.id)
      .single()

    if (data) { setCommentator(data.username) }
  }

  async function getUser(article) {

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
        name: commentator,
        id_article: idArticle,
      }

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

  async function deleteComment() {
    try {
      setLoading(true)
      let { error } = await supabase.from('comments').delete().eq('id_comment', supprimer)
      if (error) throw error
      alert('Article deleted')
    } catch (error) {
      alert('Error delete article!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateComment() {
    try {
      setLoading(true)

      const updates = {
        content: nouveauCom
      }
      console.log(updates.content)

      let { error } = await supabase.from('comments').update(updates).eq('id_comment', nouveauID)
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
      <h1 className="text-5xl mt-4 font-semibold tracking-wide text-center">{titre}</h1>
      <p className="text-sm font-light my-4 text-center">written by {username}</p>
      <div className="mt-8 mb-10 prose m-auto">
        {parse(article.content)}
      </div>
      {
        comments.map(comment => (<div key={comment.id_comment} class="flex justify-center relative top-1/3">

          <div class="relative grid grid-cols-1 gap-4 p-4 mb-8 border rounded-lg bg-white shadow-lg">
            <div class="relative flex gap-4">
              <img src="https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png" class="relative rounded-lg -top-8 -mb-4 bg-white border h-20 w-20" alt="" loading="lazy" />
              <div class="flex flex-col w-full">
                <div class="flex flex-row justify-between">
                  <p class="relative text-xl whitespace-nowrap truncate overflow-hidden dark:text-black">{comment.name}</p>
                  {commentator === comment.name ? <div>
                    <buton className="ml-2 dark:text-black" onClick={() => { setUpdate(!update); setnouveauID(comment.id_comment); }}><EditIcon /></buton>
                    <buton onClick={() => setDelete(comment.id_comment)}><DeleteIcon sx={{ color: "red" }} /></buton>
                  </div> : ""}
                  <a class="text-gray-500 text-xl" href="#"><i class="fa-solid fa-trash"></i></a>
                </div>
                <p class="text-gray-400 text-sm">{getDate(comment.created_at)}</p>
              </div>
            </div>
            <p class="-mt-4 text-gray-500">{parse(comment.content)}</p>
          </div>
          {(update && comment.id_comment === nouveauID) ? <div className="ml-10">
            <Tiptap setDescription={setnouveauCom} setContent={comment.content} />
            <buton onClick={() => updateComment()} className=' mt-2 inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'>
              Modify
            </buton>
          </div> : ""}
        </div>
        ))
      }
      <div className='App'>
        <label>{update}</label>
        {user ? <h2 className='m-auto prose mb-4'>Post a comment here...</h2> : ""}
        {user ? <Tiptap setDescription={setDescription} setContent={""} /> : <div className='prose'>You can&apos;t post comment if you&apos;re not logged in...</div>}
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