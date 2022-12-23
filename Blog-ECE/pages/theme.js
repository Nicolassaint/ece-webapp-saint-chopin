import { useState, useEffect } from 'react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from "next/link";

export default function Theme({ session }) {
  const supabase = useSupabaseClient()
  const user = useUser()
  const [color, setColor] = useState([])

  useEffect(() => {
    getColor()
  }, [session])


  async function getColor() {
    try {
      let { data, error, status } = await supabase
        .from('profiles')
        .select(`color`)
        .eq('id', user.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setColor(data)
      }

    } catch (error) {
      alert('Error no color!')
      console.log(error)
    }
  }

  return (
    <>

      <div className="mx-auto w-full max-w-2xl mt-20 mb-64 bg-white p-8 shadow dark:bg-neutral-800 border-solid border-2 border-black w-100 rounded-xl">
        <div className="text-center items-center justify-center text-10xl font-bold">
          <label>Your favorite color</label>
          {color.map((couleur) => (
            <div key={couleur.color}>
              <Link href={`${couleur.color}`}>{couleur.color}</Link>
            </div>
          ))}
        </div>
      </div>

    </>
  );
}





