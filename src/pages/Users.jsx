import { useEffect, useState } from "react";
import { API_Users } from "../services/APIUsers";
import Container from "@mui/material/Container";
import CardWrap from "../components/CardWrap";
import Navbar from "../components/NavBar";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Counter from "../images/acuerdo.png";
import Reputation from "../images/reputation.png";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 345,
    marginLeft: "30px!important",
    marginTop: "30px!important",
    border: "1px solid grey!important",
    backgroundColor: "black!important",
    [theme.breakpoints.down("810")]: {
      width: "90%",
    },
    [theme.breakpoints.down("579")]: {
      width: "85%",
    },
    [theme.breakpoints.down("385")]: {
      marginTop: "10px!important",
      marginLeft: "15px!important",
      width: "90%",
    },
  },
}));

const Users = () => {
  const [users, setUsers] = useState([]);
  const { t } = useTranslation();
  const classes = useStyles();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    API_Users.getUsers().then((response) => {
      setUsers(response.data);
    });
  };

  return (
    <Container disableGutters maxWidth={false} className="conteiner-color">
      <Navbar />

      <div className="container-welcome">
        <span className="welcome"> Users </span>
      </div>

      <div style={{ marginTop: "100px" }}>
        <CardWrap
          style={{
            backgroundColor: "black",
            marginLeft: "20px",
            marginRight: "20px",
          }}
        >
          {" "}
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            {users.map((user) => (
              <Card variant="outlined" className={classes.card}>
                <CardHeader
                  avatar={<Avatar>{user.name[0]}</Avatar>}
                  title={`${user.name} ${user.lastName}`}
                  style={{ color: "white", fontFamily: "italic" }}
                />
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{ marginLeft: 15, marginBottom: 5 }}
                >
                  {" "}
                  <img src={Counter} width="40" alt="" />{" "}
                  <div style={{ marginLeft: 12, color: "white" }}>
                    {" "}
                    {user.operations} {t("operations")}{" "}
                  </div>{" "}
                </Grid>

                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  style={{ marginLeft: 15, marginBottom: 10 }}
                >
                  <img src={Reputation} width="40" alt="" />{" "}
                  <div style={{ marginLeft: 12, color: "white" }}>
                    {" "}
                    {user.reputation} {t("reputation")}{" "}
                  </div>
                </Grid>
              </Card>
            ))}{" "}
          </Grid>
        </CardWrap>
      </div>
    </Container>
  );
};

export default Users;
