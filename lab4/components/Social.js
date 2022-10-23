import { Grid } from "@mui/material";
import styles from "../styles/Social.module.css";

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

const Social = ({ color }) => {
  const { instagram, facebook, github, twitter } = socialMedia;

  return (
    <Grid item container spacing={2} justifyContent="center">
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={twitter}
      >
        <TwitterIcon
          className={styles.snsIcon}
          sx={{
            color: "#AB47BC",
            "&:hover": {
              color: "#1DA1F2",
            },
          }}
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
          className={styles.snsIcon}
          sx={{
            color: "#AB47BC",
            "&:hover": {
              color: "#1877F2",
            },
          }}
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
          className={styles.snsIcon}
          sx={{
            color: "#AB47BC",
            "&:hover": {
              color: "#E4405F",
            },
          }}
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
          className={styles.snsIcon}
          sx={{
            color: "#AB47BC",
            "&:hover": {
              color: "#333",
            },
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Social;
