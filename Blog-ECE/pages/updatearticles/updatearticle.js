import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from "next/link";

export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [title, setTitle] = useState([])

useEffect(() => {
    getArticle()
  }, [session])

  async function getArticle() {
    try {
        console.log(user.id)
        setLoading(true)

      let { data, error, status } = await supabase
        .from('articles')
        .select(`title,id_article`)
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

  return (
    <>
        {/* <div className="text-center items-center justify-center text-10xl font-bold">
         {title.map((titre) => (
                   <div key={titre.title}>
                             <Link href={`${titre.id_article}`}>{titre.title}</Link>
                   </div> 
                ))}
        </div> */}

      <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-8 shadow dark:bg-neutral-800 border-solid border-2 border-black w-100 rounded-md">
        <div className="text-center items-center justify-center text-10xl font-bold">
        <label>All the articles you have written {user.id}</label>
        {title.map((titre) => (
                    <div key={titre.title}>
                              <Link href={`${titre.id_article}`}>{titre.title}</Link>
                    </div> 
                  ))}
          </div>
      </div>

    </>

  );
}



