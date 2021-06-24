import ScaleLoader from "react-spinners/PacmanLoader";
import { css } from "@emotion/react";
import { Button, Container, Grid, createMuiTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ForwardSharpIcon from "@material-ui/icons/ForwardSharp";
import "./Home.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";

const axios = require("axios");

const Home = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [pro, setPro] = useState([]);
  const [pic, setPic] = useState("");

  function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary">
        Copyright © BuildMyFolio {new Date().getFullYear()}.
      </Typography>
    );
  }

  const theme = createMuiTheme({
    spacing: 4,
    palette: {
      primary: {
        main: "#007bff",
      },
    },
  });

  const useStyles = makeStyles(() => ({
    footer: {
      padding: theme.spacing(3, 2),
      marginTop: "auto",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    },
  }));

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const pre_data = await axios.get(
          `https://eu-central-1.aws.webhooks.mongodb-realm.com/api/client/v2.0/app/build-my-folio-ydwtc/service/get/incoming_webhook/getfolio?id=${id}`
        );

        setPro(pre_data.data.projects);
        setData(pre_data.data);
        document.title = `${pre_data.data.fullName}'s Portfolio`;

        const img = pre_data.data.profilePic;

        setPic(img);

        setLoading(false);

        gsap.registerPlugin(ScrollTrigger);

        // eslint-disable-next-line no-lone-blocks
        {
          window.screen.width > 577
            ? gsap.to(".divdiv", {
                scrollTrigger: {
                  trigger: ".divdiv",
                  start: "top 10%",
                  pin: true,
                  toggleActions: "restart pause reverse reset",
                  scrub: true,
                },
                rotationY: 90,
                duration: 2,
              })
            : gsap.to(".divdiv", {
                scrollTrigger: {
                  trigger: ".divdiv",
                  start: "top 10%",
                  pin: true,
                  toggleActions: "restart pause reverse reset",
                  scrub: 1,
                  immediateRender: false,
                  ease: "power3.out",
                },
                y: -window.screen.width,
                opacity: 0,
                duration: 2,
              });
        }

        // eslint-disable-next-line array-callback-return
        pre_data.data.projects.map((project, index) => {
          let __x = 500 / (index + 1);
          // eslint-disable-next-line no-lone-blocks
          {
            // eslint-disable-next-line no-self-assign
            (index + 1) % 2 === 0 ? (__x = __x) : (__x = -__x);
          }

          // eslint-disable-next-line no-lone-blocks
          {
            window.screen.width > 577
              ? gsap.to(`.project${index + 1}`, {
                  scrollTrigger: {
                    trigger: `.projects`,
                    start: "top 20%",
                    pin: true,
                    toggleActions: "restart pause reverse reset",
                    scrub: 1,
                  },
                  x: __x,
                  opacity: 0,
                })
              : gsap.to(`.project${index + 1}`, {
                  scrollTrigger: {
                    trigger: `.projects`,
                    start: "top 20%",
                    toggleActions: "restart pause reverse reset",
                    scrub: true,
                    immediateRender: false,
                    end: "bottom top",
                  },
                  x: __x,
                  y: 400,
                  opacity: 0,
                });
          }
          __x = 0;
        });
      } catch (error) {
        //window.location.href = "/error";
      }
    }
    fetchData();
    window.addEventListener("DOMContentLoaded", (event) => {});
    // eslint-disable-next-line
  }, []);

  const override = css`
    display: block;
    margin: auto;
    border-color: green;
  `;

  const classes = useStyles();

  return (
    <div>
      {loading ? (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <ScaleLoader
            color="#EF233C"
            loading={loading}
            css={override}
            height={100}
            width={20}
            radius={30}
            margin={10}
          />
        </div>
      ) : (
        <div className="home">
          <div className="first_container">
            <div className="title">
              <h1
                style={
                  window.screen.width > 577
                    ? {
                        textAlign: "center",
                        color: "white",
                        fontSize: "75px",
                        fontFamily: "'Josefin Sans', sans-serif",
                      }
                    : {
                        textAlign: "center",
                        color: "white",
                        fontSize: "35px",
                        fontFamily: "'Josefin Sans', sans-serif",
                      }
                }
              >
                {data.fullName}'s Portfolio
              </h1>
            </div>
            <div id="image_div" className="image">
              <img
                onLoad={(e) => console.log(e)}
                src={pic}
                height="100%"
                alt={`${data.fullName}`}
                title={`${data.fullName}`}
                className="divdiv"
              />
            </div>
            <div className="info">
              <h2
                style={
                  window.screen.width > 577
                    ? {
                        fontFamily: "'Source Code Pro', monospace",
                        color: "whitesmoke",
                        fontSize: "60px",
                      }
                    : {
                        fontFamily: "'Source Code Pro', monospace",
                        color: "whitesmoke",
                        fontSize: "25px",
                      }
                }
              >
                About me
              </h2>
              <h5
                style={
                  window.screen.width > 577
                    ? {
                        fontFamily: "'Source Code Pro', monospace",
                        color: "whitesmoke",
                        fontSize: "35px",
                      }
                    : {
                        fontFamily: "'Source Code Pro', monospace",
                        color: "whitesmoke",
                        fontSize: "18px",
                      }
                }
              >
                {data.bio}
              </h5>
            </div>
          </div>
          <div className="second_container">
            <div className="projects">
              {pro.map((project, index) => (
                <Grid container key={`${project}_${index}`}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "auto",
                      fontFamily: "'Josefin Sans', sans-serif",
                      color: "whitesmoke",
                      fontSize: "30px",
                    }}
                    className={`project${index + 1}`}
                  >
                    <p
                      style={{
                        justifyContent: "flex-start",
                        marginRight: "30px",
                      }}
                    >
                      {window.screen.width < 577
                        ? ""
                        : `${project.projectName}`}
                    </p>
                    {window.screen.width > 577 ? (
                      <ForwardSharpIcon style={{ justifyContent: "center" }} />
                    ) : (
                      <div></div>
                    )}
                    <Button
                      href={`${project.projectLink}`}
                      style={
                        window.screen.width > 577
                          ? {
                              marginLeft: "50px",
                              color: "blue",
                              justifyContent: "flex-end",
                              backgroundColor: "white",
                            }
                          : {
                              fontSize: "17px",
                              fontFamily: "'Josefin Sans', sans-serif",
                              margin: "auto",
                              color: "blue",
                              justifyContent: "center",
                              backgroundColor: "white",
                            }
                      }
                    >
                      {window.screen.width > 577
                        ? "Go to project"
                        : `${project.projectName}`}
                    </Button>
                  </div>
                </Grid>
              ))}
            </div>
            <div className="title2" style={{ marginTop: "75px" }}>
              <h1
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  color: "whitesmoke",
                  fontSize: "45px",
                  textAlign: "center",
                }}
              >
                My projects
              </h1>
            </div>
            <div className="next"></div>
            <div className="arrow1"></div>
            <div className="arrow2"></div>
          </div>
          <div className="third_container">
            <div className="title3">
              <h1
                style={{
                  fontFamily: "'Josefin Sans', sans-serif",
                  color: "red",
                  fontSize: "70px",
                  marginTop: "auto",
                  margin: "auto",
                  marginBottom: "auto",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <br />
                Contact Me!
              </h1>
            </div>
            <div className="contact">
              <Button
                href={`${data.linkedIn}`}
                startIcon={
                  window.screen.width > 577 ? <LinkedInIcon /> : <div></div>
                }
                style={
                  window.screen.width > 577
                    ? {
                        height: "70px",
                        width: "200px",
                        backgroundColor: "skyblue",
                        color: "white",
                        fontWeight: "bold",
                      }
                    : {
                        height: "50px",
                        width: "150px",
                        backgroundColor: "skyblue",
                        color: "white",
                        fontWeight: "bold",
                      }
                }
                color="primary"
              >
                LinkedIn
              </Button>
              <Button
                href={`${data.github}`}
                startIcon={
                  window.screen.width > 577 ? <GitHubIcon /> : <div></div>
                }
                style={
                  window.screen.width > 577
                    ? {
                        height: "70px",
                        width: "200px",
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "bold",
                      }
                    : {
                        height: "50px",
                        width: "150px",
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "bold",
                      }
                }
                color="primary"
              >
                Github
              </Button>
              <Button
                href={`${data.twitter}`}
                startIcon={
                  window.screen.width > 577 ? <TwitterIcon /> : <div></div>
                }
                style={
                  window.screen.width > 577
                    ? {
                        height: "70px",
                        width: "200px",
                        backgroundColor: "skyblue",
                        color: "white",
                        fontWeight: "bold",
                      }
                    : {
                        height: "50px",
                        width: "150px",
                        backgroundColor: "skyblue",
                        color: "white",
                        fontWeight: "bold",
                      }
                }
                color="primary"
              >
                Twitter
              </Button>
              <Button
                href={`${data.facebook}`}
                startIcon={
                  window.screen.width > 577 ? <FacebookIcon /> : <div></div>
                }
                style={
                  window.screen.width > 577
                    ? {
                        height: "70px",
                        width: "200px",
                        backgroundColor: "blue",
                        color: "white",
                        fontWeight: "bold",
                      }
                    : {
                        height: "50px",
                        width: "150px",
                        backgroundColor: "blue",
                        color: "white",
                        fontWeight: "bold",
                      }
                }
                color="primary"
              >
                Facebook
              </Button>
            </div>
          </div>

          <footer className={classes.footer}>
            <Container maxWidth="xs">
              <Typography variant="body1">
                <Link color="inherit" href="#">
                  Build your portfolio today&nbsp;&nbsp;&nbsp;
                </Link>
                {"|"}
                <Link color="inherit" href="/about">
                  &nbsp;&nbsp;&nbsp;About us
                </Link>
              </Typography>
              <Copyright />
            </Container>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Home;
