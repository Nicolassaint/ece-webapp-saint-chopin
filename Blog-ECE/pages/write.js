import { useState } from "react";
import Avatar from "../components/Avatar";
import { Tiptap } from "../components/editor/Tiptap";
import {
  useUser,
  useSupabaseClient,
  useSession,
} from "@supabase/auth-helpers-react";
import { v4 as uuidv4 } from "uuid";

export default function Write() {
  const [description, setDescription] = useState("");

  const supabase = useSupabaseClient();
  const user = useUser();
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState(null);
  const [image, setImage] = useState(null);

  async function createArticle({ title, description, image }) {

    try {
      setLoading(true);

      const insert = {
        id_article: uuidv4(),
        created_at: new Date().toISOString(),
        image,
        title,
        content: description,
        id_user: user.id,
      };

      console.log(insert);

      let { error } = await supabase.from("articles").insert(insert);
      if (error) throw error;
      alert("Article created!");

    } catch (error) {
      alert("Error inserting the data!");
      console.log(error);
    } finally {
      setLoading(false);
    }

  }

  return (
    <>
    <div className="bg-primary">
      <div className="mx-auto w-full max-w-2xl rounded-xl bg-primary p-8 shadow dark:bg-black-800">
        <div className="flex items-center justify-center">
          <Avatar
            uid={uuidv4()}
            url={image}
            size={150}
            onUpload={(url) => {
              setImage(url);
            }}
          />
        </div>
        <div>
          <input
            type="text"
            name="titre"
            placeholder="Titre de l'article"
            className={`block w-full shadow py-3 px-4 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md focus:outline-none focus:ring-2 dark:text-black`}
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      <div className="App">
        <Tiptap setDescription={setDescription} setContent="" />
      </div>

      <div className="flex pb-20 justify-center">
        <button
          className="inline-flex justify-center py-3 px-6 border border-transparent shadow text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={() => createArticle({ title, description, image })}
        >
          Post
        </button>
      </div>
      </div>
    </>
  );
};

