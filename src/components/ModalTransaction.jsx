import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { API_Transaction } from "../services/APITransaction";
import {
  Backdrop,
  Button,
  CircularProgress,
  Fade,
  Grid,
  Modal,
} from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "rgba(0,0,0,0.1)",
      "& .MuiButton-root": {
        border: "1px solid #1976d2",
        color: "#1976d2",
        "&:hover": {
          background: "black",
        },
      },
    },
    modalBackground: {
      "&:focus": {
        outline: "none",
      },
      width: "350px",
      backgroundColor: theme.palette.grey[900],
      borderRadius: "4px",
      border: `1px solid black`,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      zIndex: "1301",

    },
    closeColorIcon: {
      position: "absolute",
      color: "grey",
      left: "700%",
    },
    buttonDistance: {
      marginRight: "17px!important",
    },
    save: {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "16px",
      lineHeight: "24px",
      letterSpacing: "0.15px",
      color: "white",
    },

    delete: {
      fontStyle: "normal",
      fontWeight: "normal",
      fontSize: "14px",
      lineHeight: "20px",
      letterSpacing: "0.25px",
      color: "grey",
    },
  })
);

const ModalTransaction = ({ isOpen,setOpen,blockExec }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [dataTransaction, setDataTransaction] = useState();

  useEffect(() => {
    if(!blockExec && !isOpen){
    const interval = setInterval(() => {
      checkInitTransaction();
    }, 5000);
    return () => clearInterval(interval);
  }});

  const checkInitTransaction = () => {
    API_Transaction.checkInitTransaction()
      .then((response) => {
        setOpen(response.data.active)
        setLoading(!response.data.active);
        setDataTransaction(response.data);
      })
      .catch((error) => {
      });
  };



  const startTransaction = () => {
    setOpen(false)
    history.push(
      `/transactions/negociate/${dataTransaction.id}/activity/${dataTransaction.activityId}`
    );
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isOpen}
        onClose={() => {}}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.modalBackground} tabIndex={0}>
            <Grid
              container
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              {(loading && (
                <h3 className={classes.save}>Check for users</h3>
              )) || <h3 className={classes.save}>{t("foundUserT")}</h3>}
            </Grid>
            {!loading && (
              <>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <Button onClick={startTransaction}>{t("startTransaction")}</Button>
                </Grid>
              </>
            )}

            {loading && (
              <>
                <Grid
                  container
                  direction="column"
                  justify="center"
                  alignItems="center"
                >
                  <CircularProgress />
                </Grid>
              </>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalTransaction;
