import { useState } from "react"

export default function MyForm() {
    const [data,setData] = useState({})
    const [data2,setData2] = useState({})
    const onSubmit = function(e) {
      e.preventDefault()
      console.log(data)
      console.log(data2)
    }
    return (
      <div className="b py-16 bg-gray-50 px-4 sm:px-6 h-screen w-screen flex justify-center items-center">
        <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-8 shadow">
          <form onSubmit={onSubmit} className="grid grid-cols-1 gap-y-6">
            <div>
              <label for="name" className="sr-only">
                Full name
              </label>
              <input
                type="text"
                name="name"
                className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2`}
                value={data.name}
                onChange={e => setData({...data, ...{name: e.target.value}})}
              />
            </div>

            <div>
                 <label for="email" className="sr-only">
                   Email
                 </label>
                 <input
                   type="text"
                   name="email"
                   className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2`}
                   value={data2.mail}
                   onChange={e => setData2({...data2, ...{mail: e.target.value}})}
                 />
            </div>
            <div>
                 <button
                   type="submit"
                   className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                   Submit
                  </button>
            </div>
          </form>
         </div>
       </div>
     )
   }

    