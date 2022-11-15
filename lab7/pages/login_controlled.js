import { useState } from "react"
import LoggedIn from "../components/LoggedIn.js"

export default function MyForm() {
  const [data, setData] = useState({})


  const onSubmit = function (e) {
    e.preventDefault()
    console.log(data)
  }

  return (
    <div className="b py-16 px-4 sm:px-6  w-screen flex justify-center items-center">
      <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-8 shadow">
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-y-6">
          <div>
            <label htmlFor="name" className="sr-only">
              Full name
            </label>
            <input
              type="text"
              name="name"
              placeholder="username"
              className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2`}
              value={data.name}
              onChange={e => setData({ ...data, ...{ name: e.target.value } })}
            />
          </div>

          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="email"
              className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2`}
              value={data.mail}
              onChange={e => setData({ ...data, ...{ mail: e.target.value } })}
            />
          </div>
          <div className="flex justify-center">
            <LoggedIn username={data.name}/>
          </div>
        </form>
      </div>
    </div>
  )
}

