import { useState, useEffect } from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import parse from "html-react-parser";
import Loading from '../../components/Loading';


export default function Home() {

  const supabase = useSupabaseClient()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [avatarUrl, setAvatarUrl] = useState([])


  useEffect(() => {
    fetchPosts()
  }, [])


  function getYear(timestamp) {
    var date = new Date(timestamp);
    return date.getFullYear()
  }

  function getMonth(timestamp) {
    var date = new Date(timestamp);
    let month = date.getMonth() + 1;
    if (month === 1) { month = "Jan" }
    else if (month === 2) { month = "Feb" }
    else if (month === 3) { month = "Mar" }
    else if (month === 4) { month = "Apr" }
    else if (month === 5) { month = "May" }
    else if (month === 6) { month = "Jun" }
    else if (month === 7) { month = "Jul" }
    else if (month === 8) { month = "Aug" }
    else if (month === 9) { month = "Sep" }
    else if (month === 10) { month = "Oct" }
    else if (month === 11) { month = "Nov" }
    else if (month === 12) { month = "Dec" }

    return month;
  }

  function getDay(timestamp) {
    var date = new Date(timestamp);
    return date.getDate()
  }

  async function downloadImage(path, i) {
    try {
      console.log(path)
      const { data, error } = await supabase.storage.from('avatars').download(path)
      console.log(data)
      if (error) {
        throw error
      }
      const url = URL.createObjectURL(data)
      console.log("chemin : ", url)
      setAvatarUrl(avatarUrl => [...avatarUrl, url]);

    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }

  async function fetchPosts() {
    const { data, error } = await supabase
      .from('articles')
      .select()
    setPosts(data)
    setLoading(false)

    for (var i = 0; i < data.length; i++) {
      downloadImage(data[i].image, i)
      console.log("anciens posts: ", data)
    }
  }
  if (loading) return <Loading />
  if (!posts.length) return <p className="text-2xl">No posts.</p>


  return (
    <div className='grid-cols-2 bg-primary'>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2 text-center">All our articles</h1>
      {
        posts.map(post => (
          <div key={post.id_article} className='my-5 mx-5 flex justify-center '>
            <article className="flex bg-white transition hover:shadow-xl w-2/5">
              <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
                <time
                  datetime="2022-10-10"
                  className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
                >
                  <span>{getYear(post.created_at)}</span>
                  <span className="w-px flex-1 bg-gray-900/10"></span>
                  <span>{getMonth(post.created_at)} {getDay(post.created_at)}</span>
                </time>
              </div>
              <div className="hidden sm:block sm:basis-56">
                <img
                  alt="image_article"
                  // src={downloadImage(post.image) ? avatarUrl[0] : ""}
                  src='/react.svg'
                  className="aspect-square h-full w-full object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between">
                <div className="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                  <a href={`/articles/${post.id_article}`}>
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
                    href={`/articles/${post.id_article}`}
                    className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
                  >
                    Read Article
                  </a>
                </div>
              </div>
            </article>
            {/* <Article_cards article={post}/> */}
          </div>
        )
        )
      }
    </div>
  )
}