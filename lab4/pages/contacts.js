import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import mypic1 from "../public/nicolassaint.jpg";
import mypic2 from "../public/thomaschopin.jpg";
import { Grid } from "@mui/material";

const contacts = () => {
  return (
    <Box className="mt-6">
      <Grid item container justifyContent="center">
        <Grid xs={5}>
          <h1 className="ml-2 text-blod text-2xl">Contact 1 : Nicolas Saint</h1>
          <div classname="flex flex-wrap justify-center mt-24 w-2/12 overflow-hidden object-left">
            <Image
              src={mypic1}
              classname=" h-5 shadow-lg "
              alt="Nicolas Saint"
            />
          </div>
          <h3>Téléphone : 06 65 48 62 68</h3>
          <h3>Adresse : nicolas.saint78@gmail.com</h3>
        </Grid>
        <Grid>
          <h1 className="ml-2 text-blod text-2xl">Contact 2 : Thomas Chopin</h1>
          <div classname="flex flex-wrap justify-center mt-24 w-2/12 right-12 overflow-hidden">
            <Image
              classname=" h-5 shadow-lg "
              src={mypic2}
              alt="Thomas Chopin"
            />
          </div>
          <h3>Téléphone : 06 78 72 63 26</h3>
          <h3>Adresse : tomchopin91@gmail.com</h3>
        </Grid>
      </Grid>
    </Box>
  );
};

export default contacts;
