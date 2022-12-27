import React from 'react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react'


const Article_cards = (article) => {

  console.log("article import : ", article)
  const supabase = useSupabaseClient()
  const [post, setPost] = useState([])
  const [avatarUrl, setAvatarUrl] = useState(null)

  useEffect(() => {
    setPost(article)
  }, [article])

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
      setAvatarUrl(url)

    } catch (error) {
      console.log('Error downloading image: ', error)
    }
  }
  return (
    <article class="flex bg-white transition hover:shadow-xl w-2/5">
      <div class="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <time
          datetime="2022-10-10"
          class="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
        >
          <span>{getYear(post.article.created_at)}</span>
          <span class="w-px flex-1 bg-gray-900/10"></span>
          <span>{getMonth(post.article.created_at)} {getDay(post.article.created_at)}</span>
        </time>
      </div>

      <div class="hidden sm:block sm:basis-56">
        <img
          alt="Guitar"
          src={downloadImage(post.article.image) ? avatarUrl : ""}

          class="aspect-square h-full w-full object-cover"
        />
      </div>

      <div class="flex flex-1 flex-col justify-between">
        <div class="border-l border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <a href={`/articles/${post.article.id_article}`}>
            <h3 class="font-bold uppercase text-gray-900">
              {post.article.title}
            </h3>
          </a>

          <p class="mt-2 text-sm leading-relaxed text-gray-700 line-clamp-3">
            {post.article.content}
          </p>
        </div>

        <div class="sm:flex sm:items-end sm:justify-end">
          <a
            href={`/articles/${post.article.id_article}`}
            class="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400"
          >
            Read Article
          </a>
        </div>
      </div>
    </article>


  )
}

export default Article_cards