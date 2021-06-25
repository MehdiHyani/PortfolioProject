import ScaleLoader from "react-spinners/ScaleLoader";
import { css } from "@emotion/react";
import { Button, Container, Grid, createMuiTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ForwardSharpIcon from "@material-ui/icons/ForwardSharp";
import "./Home.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import FacebookIcon from "@material-ui/icons/Facebook";
import GitHubIcon from "@material-ui/icons/GitHub";
import TwitterIcon from "@material-ui/icons/Twitter";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import { Typography } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";

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
      width: "100%",
      height: "10vh",
      float: "left",
      padding: theme.spacing(3, 2),
      marginTop: "auto",
      backgroundColor:
        theme.palette.type === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
    },
    drawer: {
      gridArea: "drawer",
      backgroundColor: "#2B2D42",
      width: "auto",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
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

        gsap.registerPlugin(ScrollTrigger);
        setLoading(false);

        // eslint-disable-next-line no-lone-blocks
        {
          window.screen.width > 577
            ? gsap.to(".divdiv", {
                scrollTrigger: {
                  trigger: ".divdiv",
                  start: "top top",
                  pin: true,
                  toggleActions: "restart pause reverse reset",
                  scrub: true,
                  ease: "power3.out",
                  end: "bottom top",
                },
                x: -window.screen.width / 10,
                duration: 5,
                scale: 0,
              })
            : gsap.to(".divdiv", {
                scrollTrigger: {
                  trigger: ".divdiv",
                  start: "top 10%",
                  toggleActions: "restart pause reverse reset",
                  scrub: true,
                },
                opacity: 0,
                duration: 2,
              });
        }

        // eslint-disable-next-line

        // eslint-disable-next-line array-callback-return
        pre_data.data.projects.map((project, index) => {
          let __x = 10;
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
                    end: "center top",
                  },
                  x: __x,
                  opacity: 0,
                })
              : gsap.from(`.project${index + 1}`, {
                  scrollTrigger: {
                    trigger: `.project${index + 1}`,
                  },
                  duration: 1,
                  opacity: 0,
                });
          }
          __x = 0;
        });
        gsap.to(".drawer_one", {
          scrollTrigger: {
            trigger: ".first_container",
            start: "top top",
            end: "bottom center",
          },
          backgroundColor: "wheat",
        });
        if (window.screen.width > 570) {
          if (document.querySelector("#github")) {
            gsap.from("#github", {
              scrollTrigger: {
                scrub: true,
                trigger: "#github",
              },
              x: -100,
              opacity: 0,
            });
          }
          if (document.querySelector("#linkedin")) {
            gsap.from("#linkedin", {
              scrollTrigger: { scrub: true, trigger: "#github" },
              x: -200,
              opacity: 0,
            });
          }
          if (document.querySelector("#twitter")) {
            gsap.from("#twitter", {
              scrollTrigger: { scrub: true, trigger: "#twitter" },
              x: 100,
              opacity: 0,
            });
          }
          if (document.querySelector("#facebook")) {
            gsap.from("#facebook", {
              scrollTrigger: { scrub: true, trigger: "#github" },
              x: 200,
              opacity: 0,
            });
          }
        } else {
          if (document.querySelector("#github")) {
            gsap.from("#github", {
              scrollTrigger: {
                trigger: "#github",
              },
              duration: 1,
              x: -100,
              opacity: 0,
            });
          }
          if (document.querySelector("#linkedin")) {
            gsap.from("#linkedin", {
              scrollTrigger: { trigger: "#github" },
              x: -200,
              duration: 1,
              opacity: 0,
            });
          }
          if (document.querySelector("#twitter")) {
            gsap.from("#twitter", {
              scrollTrigger: { trigger: "#twitter" },
              x: 100,
              duration: 1,
              opacity: 0,
            });
          }
          if (document.querySelector("#facebook")) {
            gsap.from("#facebook", {
              scrollTrigger: { trigger: "#github" },
              x: 200,
              duration: 1,
              opacity: 0,
            });
          }
        }
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

  gsap.registerPlugin(ScrollTrigger);

  gsap.registerPlugin(ScrollToPlugin);

  document.addEventListener("DOMContentLoaded", function () {});
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
            height={window.screen.width > 700 ? 100 : 50}
            width={window.screen.width > 700 ? 20 : 10}
            radius={window.screen.width > 700 ? 30 : 15}
            margin={window.screen.width > 700 ? 10 : 5}
          />
        </div>
      ) : (
        <div
          className="HomeContainer"
          style={{ display: "flex", width: "100%", backgroundColor: "#2B2D42" }}
        >
          <div
            className="home"
            style={window.screen.width > 577 ? { width: "80%" } : {}}
          >
            <section id="section1">
              <div className="first_container">
                <div className="title">
                  <h1
                    style={
                      window.screen.width > 577
                        ? {
                            textAlign: "center",
                            color: "white",
                            fontSize: "5.5vh",
                            fontFamily: "Josefin Sans, sans-serif",
                          }
                        : {
                            textAlign: "center",
                            color: "white",
                            fontSize: "5.5vw",
                            fontFamily: "Josefin Sans, sans-serif",
                          }
                    }
                  >
                    {data.fullName}'s Portfolio
                  </h1>
                </div>
                <div id="image_div" className="image">
                  {pic ? (
                    <img
                      style={
                        window.screen.width > 577
                          ? {
                              width: "auto",
                            }
                          : { height: "50vh", width: "auto" }
                      }
                      src={pic}
                      height={window.screen.height / 2.3}
                      //height="100%"
                      alt={`${data.fullName}`}
                      title={`${data.fullName}`}
                      className="divdiv"
                    />
                  ) : (
                    <h3>Undefined</h3>
                  )}
                </div>
                <div className="info">
                  <h2
                    className="status"
                    style={
                      window.screen.width > 577
                        ? {
                            color: "whitesmoke",
                            fontSize: "4vh",
                            textAlign: "right",
                          }
                        : {
                            textAlign: "right",
                            marginTop: "5vh",
                            marginRight: "10vw",
                            color: "whitesmoke",
                            fontSize: "4vw",
                          }
                    }
                  >
                    {data.status},
                  </h2>
                  <h5
                    style={
                      window.screen.width > 577
                        ? {
                            fontFamily: "Source Code Pro, monospace",
                            color: "whitesmoke",
                            fontSize: "2vh",
                          }
                        : {
                            margin: "auto",
                            fontFamily: "Source Code Pro, monospace",
                            color: "whitesmoke",
                            fontSize: "3.5vw",
                          }
                    }
                  >
                    {data.bio}
                    <br />
                  </h5>
                </div>
              </div>
            </section>
            <section id="section2">
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
                          <ForwardSharpIcon
                            style={{ justifyContent: "center" }}
                          />
                        ) : (
                          <div></div>
                        )}
                        <Button
                          className="project_button"
                          href={`${project.projectLink}`}
                          style={
                            window.screen.width > 577
                              ? {
                                  marginLeft: "50px",
                                  color: "white",
                                  justifyContent: "flex-end",
                                  background: "none",
                                  border: "2px solid black",
                                  borderColor: "white",
                                }
                              : {
                                  fontSize: "3vh",
                                  fontFamily: "'Josefin Sans', sans-serif",
                                  margin: "auto",
                                  marginTop: "5vh",
                                  color: "White",
                                  justifyContent: "center",
                                  background: "none",
                                  border: "2px solid black",
                                  borderColor: "yellow",
                                  borderRadius: "20px",
                                }
                          }
                        >
                          {window.screen.width > 577
                            ? "Take me there !"
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
                      fontSize: "4.5vh",
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
            </section>
            <section id="section3">
              <div className="third_container">
                <div className="title3">
                  <h5
                    style={
                      window.screen.width > 570
                        ? {
                            fontFamily: "Josefin Sans, sans-serif",
                            color: "wheat",
                            fontSize: "4.5vh",
                            marginTop: "auto",
                            margin: "auto",
                            marginBottom: "auto",
                            textAlign: "center",
                            verticalAlign: "middle",
                          }
                        : {
                            fontFamily: "Josefin Sans, sans-serif",
                            color: "wheat",
                            fontSize: "5.5vw",
                            marginTop: "auto",
                            margin: "auto",
                            marginBottom: "auto",
                            textAlign: "center",
                            verticalAlign: "middle",
                          }
                    }
                  >
                    Send me a message!
                  </h5>
                </div>
                <div className="contact">
                  <Button
                    id="linkedin"
                    className="linkedin"
                    href={`${data.linkedIn}`}
                    startIcon={
                      window.screen.width > 577 ? <LinkedInIcon /> : <div></div>
                    }
                    style={
                      window.screen.width > 577
                        ? {
                            height: "70px",
                            width: "200px",
                            backgroundColor: "#0A66C2",
                            color: "white",
                            fontWeight: "bold",
                          }
                        : {
                            height: "50px",
                            width: "150px",
                            backgroundColor: "#0A66C2",
                            color: "white",
                            fontWeight: "bold",
                          }
                    }
                    color="primary"
                  >
                    LinkedIn
                  </Button>
                  <Button
                    id="github"
                    className="github"
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
                    id="twitter"
                    className="twitter"
                    href={`${data.twitter}`}
                    startIcon={
                      window.screen.width > 577 ? <TwitterIcon /> : <div></div>
                    }
                    style={
                      window.screen.width > 577
                        ? {
                            height: "70px",
                            width: "200px",
                            backgroundColor: "#1DA1F2",
                            color: "white",
                            fontWeight: "bold",
                          }
                        : {
                            height: "50px",
                            width: "150px",
                            backgroundColor: "#1DA1F2",
                            color: "white",
                            fontWeight: "bold",
                          }
                    }
                    color="primary"
                  >
                    Twitter
                  </Button>
                  <Button
                    id="facebook"
                    className="facebook"
                    href={`${data.facebook}`}
                    startIcon={
                      window.screen.width > 577 ? <FacebookIcon /> : <div></div>
                    }
                    style={
                      window.screen.width > 577
                        ? {
                            height: "70px",
                            width: "200px",
                            backgroundColor: "#4867AA",
                            color: "white",
                            fontWeight: "bold",
                          }
                        : {
                            height: "50px",
                            width: "150px",
                            backgroundColor: "#4867AA",
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
            </section>
          </div>
          {window.screen.width > 1040 ? (
            <Drawer
              className={classes.drawer}
              variant="permanent"
              anchor="right"
            >
              <div
                className="rotate drawer_one"
                style={{
                  color: "white",
                  backgroundColor: "#2B2D42",
                  height: "30%",
                }}
              >
                <a
                  href="#about"
                  onClick={() => {
                    gsap.to(window, {
                      scrollTo: ".first_container",
                      duration: 2,
                    });
                  }}
                >
                  <h3 className="progress animate_1">About me</h3>
                </a>
              </div>

              <div
                className="rotate drawer_two"
                style={{
                  height: "40%",
                  minWidth: "100%",
                  color: "white",
                  backgroundColor: "#2B2D42",
                }}
              >
                <a
                  href="#myprojects"
                  onClick={() => {
                    gsap.to(window, {
                      scrollTo: ".second_container",
                      duration: 2,
                    });
                  }}
                >
                  <h3 className="progress animate_2">My projects</h3>
                </a>
              </div>

              <div
                className="rotate drawer_three"
                style={{
                  color: "white",
                  backgroundColor: "#2B2D42",
                  height: "30%",
                }}
              >
                <a
                  href="#contact"
                  onClick={() => {
                    gsap.to(window, {
                      scrollTo: ".third_container",
                      duration: 2,
                    });
                  }}
                >
                  <h3 className="progress animate_3">Contact me</h3>
                </a>
              </div>
            </Drawer>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
