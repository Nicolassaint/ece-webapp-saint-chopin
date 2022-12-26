import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Avatar from './Avatar'
import Link from "next/link"
import FormatColorResetIcon from '@mui/icons-material/FormatColorReset';



export default function Account({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [color, setColor] = useState(null)
  const [selectedValue, setSelectedValue] = useState(null);

  function handleChange(event) {
    setSelectedValue(event.target.value);
  }

  useEffect(() => {
    getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url,color`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setColor(data.color)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile({ username, website, avatar_url, selectedValue }) {
    try {
      setLoading(true)
      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
        color: selectedValue,
      }
      let { error } = await supabase.from('profiles').upsert(updates)
      if (error) throw error
      alert('Profile updated!')
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (

    <div>
      <div className="flex items-center justify-center">
        <Avatar
          uid={user.id}
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url)
            updateProfile({ username, website, avatar_url: url })
          }}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={session.user.email} disabled className='dark:border-solid dark:border-2 border-black w-80 rounded-md dark:bg-slate-800' />
      </div>

      <div>
        <label htmlFor="username">Username</label>
      </div>

      <div className='flex justify-between'>
        <input
          id="username"
          type="text"
          value={username || ''}
          className="border-solid border-2 border-black w-60 rounded-md dark:bg-slate-800"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Link href="/deletearticle">
          <button className="border-solid border-2 border-black w-50 rounded-md bg-green-500 hover:bg-green-700 text-white">
            Delete Articles
          </button>
        </Link>
      </div>

      <label htmlFor="website">Website</label>

      <div className='flex justify-between'>
        <input
          id="website"
          type="website"
          className="border-solid border-2 border-black w-60 rounded-md dark:bg-slate-800"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <Link href="/updatearticles/updatearticle">
          <button className="border-solid border-2 border-black w-50 rounded-md bg-green-500 hover:bg-green-700 text-white">
            Update Articles
          </button>
        </Link>

      </div>
      <div className='dark:text-white lg:flex mt-4 mb-2'>

        <button
          value="null"
          name="group"
          onClick={handleChange}
          className="text-black border-black border-solid bg-white-500 mr-2 dark:text-black dark:bg-white dark:border-white"
        >RESET <FormatColorResetIcon/></button>

        <button
          value="white"
          name="group"
          onClick={handleChange}
          className="text-black border-black border-solid bg-white-500 mr-2 dark:text-black dark:bg-white dark:border-white"
        >White </button>

        <button
          value="red"
          name="group"
          onClick={handleChange}
          className="text-white bg-red-500 mr-2"
        >Red </button>

        <button
          value="blue"
          name="group"
          onClick={handleChange}
          className="text-white bg-blue-500 mr-2"
        >Blue </button>

        <button
          value="pink"
          name="group"
          onClick={handleChange}
          className="text-white bg-pink-500 mr-2"
        >Pink </button>

        <button
          value="purple"
          name="group"
          onClick={handleChange}
          className="text-white bg-purple-500 mr-2"
        >purple </button>

        <button
          value="green"
          name="group"
          onClick={handleChange}
          className="text-white bg-green-500"
        >Green </button>

      </div>
      <p className='font-bold'>Selected theme : {selectedValue}</p>

      <div className='pt-4'>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block"
          onClick={() => updateProfile({ username, website, avatar_url, selectedValue }) && window.location.reload() && document.documentElement.style.setProperty('--primary-color', selectedValue)}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div className='pt-4'>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded block" onClick={() => {supabase.auth.signOut(); document.documentElement.style.setProperty('--primary-color', null);}}>
          Sign Out
        </button>
      </div>
    </div>
  )
}
