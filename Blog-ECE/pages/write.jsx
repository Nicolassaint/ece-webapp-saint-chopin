import { useState } from "react";
import Details from "../components/editor/Details";
import { Tiptap } from "../components/editor/Tiptap";

const write = () => {
  const [description, setDescription] = useState("");

  return (
    <form>
    <div className="App">
      <Tiptap setDescription={setDescription} />
      {/* <Details description={description} /> */}
    </div>
    </form>
  );
}

export default write;

