/* eslint-disable react/jsx-no-duplicate-props */
import Container from "@mui/material/Container";
import "../styles/Register.css";
import Grid from "@mui/material/Grid";
import Logo from "../images/logo.png";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import CustomTextField from "../components/CustomTextField";
import CardWrap from "../components/CardWrap";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { API_Login } from "../services/APILogin";
import { useEffect, useState } from "react";
import { InputAdornment, IconButton } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useModalTransaction } from "../components/modalStartTransactionProvider/hooks";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import SelectorLanguage from "../components/SelectorLanguage";

const useStyles = makeStyles((theme) => ({
  titleSignStyle: {
    letterSpacing: "0.18px",
    color: "white",
    paddingTop: "20px",
    paddingBottom: "20px",
    fontFamily: "Crimson Text",
    fontSize: "30px",
  },
}));

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [isShowPassword, setIsShowPassword] = useState(false);
  const { block, unblock } = useModalTransaction();
  const [error, setError] = useState(false);
  const [seeError, setSeeError] = useState("");

  useEffect(() => {
    block(); // eslint-disable-next-line
  }, []);

  const changeVisualization = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    API_Login.postLogin(data)
      .then((response) => {
        unblock();
        localStorage.setItem("token", response.data.accessToken);
        history.push("/quotations");
      })

      .catch((error) => {
        if (!error.response) {
          setSeeError("error");
          setError(true);
          return;
        }
        if (error.response.data !== undefined) {
          setSeeError(error.response.data.error_msg);
          setError(true);
        }
      });
  };

  const handleInputChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  return (
    <Container disableGutters maxWidth={false} className="conteiner-color">
      <CardWrap
        style={{
          marginLeft: "140px",
          minHeight: "300px",
          marginRight: "140px",
          backgroundColor: "transparent",
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          wrap="nowrap"
        >
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            {" "}
            <div style={{ marginTop: "45px", marginLeft: "10px" }}>
              <SelectorLanguage />
            </div>
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <img src={Logo} className="logoRegister" alt="logo" />
          </Grid>{" "}
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",

              "& > :not(style)": {
                m: 1,
                width: 350,
                height: "auto",
              },
            }}
          >
            <Paper
              elevation={3}
              style={{
                background: "linear-gradient(to bottom, #071520, #194D78)",
                boxShadow: " 4px 4px 4px 4px rgba(0, 0, 0, 0.4)",
              }}
            >
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                >
                  <h1 className={classes.titleSignStyle}>{t("loginButton")}</h1>

                  <CustomTextField
                    type="text"
                    label={t("userLabel")}
                    defaultValue=""
                    name="username"
                    onChange={handleInputChange}
                    inputProps={{
                      autoComplete: "new-password",
                      form: {
                        autoComplete: "off",
                      },
                      minLength: 10,
                      maxLength: 30,
                    }}
                  />

                  <CustomTextField
                    type="password"
                    label={t("passwordLabel")}
                    defaultValue=""
                    name="password"
                    onChange={handleInputChange}
                    type={isShowPassword ? "text" : "password"}
                    data={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            style={{ padding: "0px" }}
                            onClick={changeVisualization}
                          >
                            {isShowPassword ? (
                              <VisibilityOffIcon
                                style={{
                                  color: "white",
                                }}
                              />
                            ) : (
                              <VisibilityIcon
                                style={{
                                  color: "white",
                                }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{
                      autoComplete: "new-password",
                      form: {
                        autoComplete: "off",
                      },
                      minLength: 1,
                    }}
                  />

                  <Button
                    type="submit"
                    variant="outlined"
                    style={{
                      background:
                        "linear-gradient(to bottom, #071520, #194D78)",
                      boxShadow: " 4px 4px 4px 4px rgba(0, 0, 0, 0.4)",
                      color: "white",
                      marginTop: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    {t("loginButton")}
                  </Button>
                  <Link to="/register" style={{ color: "white" }}>
                    {t("notAccount")}
                  </Link>

                  {error && (
                    <Alert
                      variant="filled"
                      severity="error"
                      style={{
                        height: "20x",
                        marginTop: "20px",
                        marginBottom: "20px",
                        width: "20x",
                      }}
                    >
                      <Typography>{t(seeError)}</Typography>
                    </Alert>
                  )}
                </Grid>
              </form>
            </Paper>
          </Box>
        </Grid>
      </CardWrap>
    </Container>
  );
};
export default Login;
