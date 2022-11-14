import { useForm } from 'react-hook-form';
import axios from 'axios';

export default function Profile() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  async function onSubmitForm(values) {

    let config = {
      method: 'post',
      url: `http://localhost:3000/api/verifsignin`,
      headers: {
        'Content-Type': 'application/json'
      },
      data: values,
    };
    try {
      const reponse = await axios(config);
      console.log(reponse);
    }
    catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="b py-16 bg-gray-50 px-4 sm:px-6 h-screen w-screen flex justify-center items-center">
      <div className="mx-auto w-full max-w-2xl rounded-xl bg-white p-8 shadow">
        <form onSubmit={handleSubmit(onSubmitForm)} className="grid grid-cols-1 gap-y-6">
          <div>
            <label for="name" className="sr-only">
              Full name
            </label>
            <input
              type="text"
              name="name"
              {...register("name", {
                required: "You must enter your name",
              })}
              className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${errors.mail ? 'ring-2 ring-red-500' : null}`}
              placeholder="Full name"
            />
            <span className="text-red-400 text-sm py-2">{errors.name && errors.name.message}</span>

          </div>
          <div>
            <label for="email" className="sr-only">
              Email
            </label>
            <input
              name="email"
              type="text"
              {...register("mail", {
                required: "You must enter your mail",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+$/,
                  message: "invalid email address"
                }
              })}
              className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 ${errors.mail ? 'ring-2 ring-red-500' : null}`}
              placeholder="Email"
            />
            <span className="text-red-400 text-sm py-2">{errors.mail && errors.mail.message}</span>
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
  );
}