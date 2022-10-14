import Link from "../Links";
import { useRouter } from "next/router";
import { Grid, Typography } from "@material-ui/core";
import { Box } from "@mui/material";

import Social from "../Social";

const path = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
];

const Footer = () => {
  //const classes = useStyles();
  const router = useRouter();
  return (
    <Box
      sx={{
        backgroundColor: "#32465C",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        marginTop: "6em",
        padding: "2em 0 ",
      }}
    >
      <Grid container spacing={3} justify="center">
        {path.map(({ name, link }) => (
          <Grid item key={link}>
            <Link href={link}>
              <Box
                sx={{
                  fontSize: "1.25em",
                  color: "black",
                  "&:hover": {
                    color: "#3fad5d",
                  },
                }}
              >
                <Typography
                  style={{
                    fontWeight: router.pathname === link && "bold",
                    borderBottom:
                      router.pathname === link && "1px solid #757ce8",
                  }}
                >
                  {name}
                </Typography>
              </Box>
            </Link>
          </Grid>
        ))}
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
        justify="center"
        style={{
          textDecoration: "none",
        }}
      >
        <Box
          sx={{
            color: "#fff",
            fontSize: "1em",
            "&:hover": {
              color: "#3fad5d",
            },
          }}
        >
          <Typography>&copy;Nicolas Saint & Thomas Chopin</Typography>
        </Box>
      </Grid>
    </Box>
  );
};

export default Footer;
