import { makeStyles } from "@material-ui/core/styles";
import { Box, Grid } from "@material-ui/core";

import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";

const socialMedia = {
  instagram: "https://www.instagram.com/juniorjeece/",
  facebook: "https://www.facebook.com/JEECE.JE",
  github: "https://github.com/Nicolassaint",
  twitter: "https://twitter.com/juniorjeece",
};

const useStyles = makeStyles((theme) => ({
  snsIcon: {
    width: "40px",
    height: "40px",

    "&:hover": {
      color: theme.palette.info.main,
    },
  },
}));

const Social = ({ color }) => {
  const classes = useStyles();

  const { instagram, facebook, github, twitter } = socialMedia;

  return (
      <Grid item container spacing={2} justify="center">
        <Grid
          item
          component={"a"}
          target="_blank"
          rel="noreferrer noopener"
          href={twitter}
        >
          <TwitterIcon
            className={classes.snsIcon}
            color={color ? "primary" : "secondary"}
          />
        </Grid>
        <Grid
          item
          component={"a"}
          target="_blank"
          rel="noreferrer noopener"
          href={facebook}
        >
          <FacebookIcon
            className={classes.snsIcon}
            color={color ? "primary" : "secondary"}
          />
        </Grid>
        <Grid
          item
          component={"a"}
          target="_blank"
          rel="noreferrer noopener"
          href={instagram}
        >
          <InstagramIcon
            className={classes.snsIcon}
            color={color ? "primary" : "secondary"}
          />
        </Grid>
        <Grid
          item
          component={"a"}
          target="_blank"
          rel="noreferrer noopener"
          href={github}
        >
          <GitHubIcon
            className={classes.snsIcon}
            color={color ? "primary" : "secondary"}
          />
        </Grid>
      </Grid>
  );
};

export default Social;
