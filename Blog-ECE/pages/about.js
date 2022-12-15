import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import mypic1 from "../public/nicolassaint.jpg";
import mypic2 from "../public/thomaschopin.jpg";


const contacts = () => {
  return (
    <div class="py-16 bg-white">
      <div class="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
        <div class="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">PDG: Nicolas Saint</h2>
            <Image src={mypic1} alt="Nicolas Saint" width="150px" height="150px" />
            <h3 className="text-2xl text-gray-900 md:text-2xl">Phone : 06 65 48 62 68</h3>
            <h3 className="text-2xl text-gray-900 md:text-2xl"> Email : nicolas.saint78@gmail.com</h3>
          </div>

          <div className="md:10/12 lg:w-6/12">
            <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">Assitant: Thomas Chopin</h2>
            <Image src={mypic2} alt="Nicolas Saint" width="150px" height="150px" />
            <h3 className="text-2xl text-gray-900 md:text-2xl">Phone : 06 65 48 62 68</h3>
            <h3 className="text-2xl text-gray-900 md:text-2xl"> Email : thomas.chopin@edu.ece.fr</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default contacts;