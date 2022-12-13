import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import Article_cards from '../../components/Article_cards'
import parse from "html-react-parser";


export default function Home() {

  const supabase = useSupabaseClient()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('articles')
      .select()
    setPosts(data)
    setLoading(false)
  }
  if (loading) return <p className="text-2xl">Loading ...</p>
  if (!posts.length) return <p className="text-2xl">No posts.</p>


  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Posts</h1>
      {
        posts.map(post => (
          <Link key={post.id_article} href={`/articles/${post.id_article}`}>
            <div className='my-5 mx-5'>
              <article className="flex bg-white transition hover:shadow-xl w-2/5">
                <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                  <time
                    datetime="2022-10-10"
                    className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                  >
                    <span>2022</span>
                    <span className="w-px flex-1 bg-gray-900/10"></span>
                    <span>Oct 10</span>
                  </time>
                </div>

                <div className="hidden sm:block sm:basis-56">
                  <img
                    alt="Guitar"
                    src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                    className="aspect-square h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                    <a href="#">
                      <h3 className="font-bold uppercase text-gray-900">
                        {post.title}
                      </h3>
                    </a>

                    <p className="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3">
                      {parse(post.content)}
                    </p>
                  </div>

                  <div className="sm:flex sm:items-end sm:justify-end">
                    <a
                      href="#"
                      className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                    >
                      Read Blog
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </Link>
        )
        )
      }
    </div>
  )
}