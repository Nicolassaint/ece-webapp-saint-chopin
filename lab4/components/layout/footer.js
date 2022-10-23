import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";

import Social from "../Social";

const Footer = () => {
  const router = useRouter();
  return (
    <Box
      className="bg-gray-700 w-full relative overflow-hidden mt-12 px-64"
      /*sx={{
        backgroundColor: "#32465C",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        marginTop: "6em",
        padding: "2em 0 ",
      }}*/
    >

      <Grid container spacing={1} justifyContent="center">
              <Box
              className="text-2xl fond-bold text-white mt-2"
                /*sx={{
                  fontSize: "0.8em",
                  color: "white",
                  "&:hover": {
                    color: "#c",
                  },
                }}*/
              >
          <h1>Our socials</h1>
                </Box>
      </Grid>
      <Grid container direction="column" style={{ margin: "1.2em 0" }}>
        <Social />
      </Grid>
      <Grid
        item
        container
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href="https://github.com/Nicolassaint"
        justifyContent="center"
        style={{
          textDecoration: "none",
        }}
      >
        <Box
        className="text-white text-lg font-bold"
          /*sx={{
            color: "#fff",
            fontSize: "1em",
            "&:hover": {
              color: "#3fad5d",
            },
          }}*/
        >
          <Typography>&copy;Nicolas Saint & Thomas Chopin</Typography>
        </Box>
      </Grid>
    </Box>
  );
};

export default Footer;
