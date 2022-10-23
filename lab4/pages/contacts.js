import React from "react";
import { Box } from "@mui/material";
import Image from "next/image";
import mypic1 from "../public/nicolassaint.jpg";
import mypic2 from "../public/thomaschopin.jpg";
import { Grid } from "@mui/material";

const contacts = () => {
  return (
    <Box
    className="mt-6"
    /*sx={{
      marginTop: "6.5px",
    }}*/>
      <Grid item container justifyContent="center">
        <Grid xs={5}>
          <h1>Contact 1</h1>
          <h2>Nicolas Saint</h2>
          <Image
            src={mypic1}
            alt="Nicolas Saint"
            width="150px"
            height="150px"
          />

          <h3>Téléphone : 06 65 48 62 68</h3>
          <h3>Adresse : nicolas.saint78@gmail.com</h3>
        </Grid>
        <Grid >
        <h1>Contact 2</h1>
        <h2>Thomas Chopin</h2>
        <Image src={mypic2} alt="Thomas Chopin" width="150px" height="150px" />
        <h3>Téléphone : 06 78 72 63 26</h3>
        <h3>Adresse : tomchopin91@gmail.com</h3>
      </Grid>
      </Grid>
    </Box>
  );
};

export default contacts;
