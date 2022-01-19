// import Link from "components/Link";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";

import { Container, Grid, Typography } from "@material-ui/core";

// import { routes } from "data/routes";
// import Social from "components/Social";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#333',
    width: `100%`,
    position: "block",
    overflow: "hidden",
    // marginTop: "6em",
    padding: "2em 0 ",
    bottom:'0'
    
  },
  link: {
    fontSize: "1.25em",
    color: "#fff",
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
  copylight: {
    color: "#fff",
    fontSize: "1em",
    "&:hover": {
      color: theme.palette.info.main,
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
//   const path = routes;
  const router = useRouter();
  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
 
        <Grid
          item
          container
          component={"a"}
          target="_blank"
          rel="noreferrer noopener"
          href="https://slideX.com"
          justify="center"
          style={{
            textDecoration: "none",
          }}
        >
          <Typography className={classes.copylight}>
            &copy;slideX
          </Typography>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;