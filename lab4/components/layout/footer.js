import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/material";

import Social from "../Social";

const Footer = () => {
  const router = useRouter();
  return (
    <Box className="bg-gray-700 w-full relative overflow-hidden mt-36 px-64">
      <Grid container spacing={1} justifyContent="center">
        <Box className="text-2xl fond-bold text-white mt-2">
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
        <Box className="text-white text-lg font-bold">
          <Typography>&copy;Nicolas Saint & Thomas Chopin</Typography>
        </Box>
      </Grid>
    </Box>
  );
};

export default Footer;
