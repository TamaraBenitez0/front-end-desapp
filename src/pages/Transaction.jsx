/* eslint-disable react/style-prop-object */
import CardWrap from "../components/CardWrap";
import Navbar from "../components/NavBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API_Transaction } from "../services/APITransaction";
import ModalTransactionCanceled from "../components/ModalTransactionCanceled";
import ModalTransactionCompleted from "../components/ModalTransactionCompleted";
import ModalSendAmountNotify from "../components/ModalSendAmountNotify";
import { useModalTransaction } from "../components/modalStartTransactionProvider/hooks";
import toast from "react-hot-toast";
import { FormattedNumber } from "react-intl";
import ModalConfirmCancel from "../components/ModalConfirmCancel";
import { CircularProgress, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";
const dayjs = require("dayjs");

const useStyles = makeStyles((theme) => ({
  button: {
    color: "white!important",
    backgroundColor: "#392255!important",
    "&:hover": {
      backgroundColor: "#392255!important",
    },
  },
  disabledButton: {
    "&.MuiButton-root.Mui-disabled": {
      background: "grey!important",
      color: "white!important",
    },
  },
  typographyStyle: {
    color: "white",
    fontSize: "16px",
    marginTop: "10px",
    paddingRight: "100px",
  },
  alignLoader: {
    paddingTop: "200px",
  },
}));

const Transaction = () => {
  const classes = useStyles();
  const { userId, activityId } = useParams();
  const [transactionData, setTransactionData] = useState();
  const [activeTransaction, setActiveTransaction] = useState(false);
  const [modalCancelOpen, setModalCancelOpen] = useState(false);
  const [sended, setSended] = useState(false);
  const [completeSend, setCompleteSend] = useState(false);
  const [render, setRender] = useState(true);
  const history = useHistory();
  const { block, unblock } = useModalTransaction();
  const [open, setOpen] = useState(false);
  const [notified, setNotified] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    block();
    i18n.changeLanguage(localStorage.getItem("languaje"));
    getDataUserTransationToTransfer();
    userConnectedTransaction();
    return () => unblock();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (transactionData === undefined && !modalCancelOpen) {
        getDataUserTransationToTransfer();
      }
      if (!activeTransaction) {
        userConnectedTransaction();
      }
      if (!sended || !completeSend) {
        checkCompleteSend();
      }
    }, 5000);
    return () => clearInterval(interval);
  });

  const checkCompleteSend = () => {
    API_Transaction.checkCompleteSend(userId)
      .then((res) => {
        setCompleteSend(res.data.active);
      })
      .catch((err) => {
        setModalCancelOpen(true);
      });
  };

  const userConnectedTransaction = () => {
    API_Transaction.checkInitTransaction()
      .then((response) => {
        setActiveTransaction(response.data.active);
      })
      .catch((error) => {});
  };

  const getDataUserTransationToTransfer = () => {
    API_Transaction.startTransaction(activityId, userId)
      .then((response) => {
        setTransactionData(response.data);
      })
      .catch((error) => {});
  };

  const sendAmount = () => {
    API_Transaction.sendAmount();
  };

  const handleClickSendAmount = () => {
    API_Transaction.checkCompleteSend(userId)
      .then((response) => {
        sendAmount();
        setNotified(true);
        toast.success(t("notifySend"));
      })
      .catch((error) => setModalCancelOpen(true));
  };

  const handleCancelTransaction = () => {
    toast.error(t("canceledTransaction"));
    API_Transaction.cancelTransaction();
    history.push("/quotations");
  };

  const handleCompleteAndSendCripto = () => {
    API_Transaction.finishTransaction(activityId, userId).then((response) => {
      setSended(true); /*se ha completado la transaccion con exito modal  */
    });
  };

  const isBuy = () => {
    return transactionData?.addrOrCvu?.length > 8;
  };

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  return (
    <Container disableGutters maxWidth={false} className="conteiner-color">
      <Navbar />

      <div style={{ marginTop: "50px" }}>
        <CardWrap
          style={{
            backgroundColor: "black",
            marginLeft: "20px",
            marginRight: "20px",
            height: "100px",
          }}
        >
          {(!activeTransaction || transactionData === undefined) && (
            <>
              <Grid
                container
                className={classes.alignLoader}
                direction="column"
                alignItems="center"
                justifyContent="center"
              >
                <CircularProgress />
                <label style={{ color: "grey", marginTop: 10 }}>
                  {t("waitUser")}
                </label>
              </Grid>
            </>
          )}
          <div style={{ marginLeft: "30px", marginTop: 30 }}>
            {activeTransaction && transactionData !== undefined && (
              <>
                <Typography className={classes.typographyStyle} component="div">
                  {t("hour")}: {dayjs(transactionData.hour).format("HH:mm")} hs
                </Typography>
                <Typography className={classes.typographyStyle} component="div">
                  {t("criptoName")}:{transactionData.criptoName}
                </Typography>
                <Typography className={classes.typographyStyle} component="div">
                  {t("nominal")}: {transactionData.nominals}
                </Typography>
                <Typography className={classes.typographyStyle} component="div">
                  {t("valueCripto")}:{" "}
                  <FormattedNumber
                    value={transactionData.cotization}
                    style={"currency"}
                    currency="ARS"
                  />
                </Typography>
                <Typography className={classes.typographyStyle} component="div">
                  {t("amountNegociate")}:{" "}
                  <FormattedNumber
                    value={transactionData.amountInArs}
                    style={"currency"}
                    currency="ARS"
                  />
                </Typography>
                <Typography className={classes.typographyStyle} component="div">
                  {t("nameAndLastName")}: {transactionData.username}{" "}
                  {transactionData.lastName}
                </Typography>
                <Typography className={classes.typographyStyle} component="div">
                  {t("operations")}: {transactionData.operations}
                </Typography>

                <Typography className={classes.typographyStyle} component="div">
                  {t("reputation")}: {transactionData.reputation}
                </Typography>

                {(isBuy() && (
                  <>
                    {" "}
                    <Typography
                      className={classes.typographyStyle}
                      component="div"
                    >
                      CVU :{transactionData.addrOrCvu}
                    </Typography>
                    <Button
                      variant="outlined"
                      style={{
                        background:
                          "linear-gradient(to bottom, #071520, #194D78)",
                        boxShadow: " 4px 4px 4px 4px rgba(0, 0, 0, 0.4)",
                        color: "white",
                        marginTop: 15,
                      }}
                      className={classes.button}
                      classes={{ disabled: classes.disabledButton }}
                      onClick={handleClickSendAmount}
                      disabled={notified}
                    >
                      {t("notify")}
                    </Button>
                  </>
                )) || (
                  <>
                    <Typography
                      className={classes.typographyStyle}
                      component="div"
                    >
                      {t("addrW")}: {transactionData.addrOrCvu}
                    </Typography>
                    <Button
                      variant="outlined"
                      style={{
                        background:
                          "linear-gradient(to bottom, #071520, #194D78)",
                        boxShadow: " 4px 4px 4px 4px rgba(0, 0, 0, 0.4)",
                        color: "white",
                        marginTop: 15,
                      }}
                      className={classes.button}
                      classes={{ disabled: classes.disabledButton }}
                      onClick={handleCompleteAndSendCripto}
                      disabled={!completeSend}
                    >
                      {t("releaseCripto")}
                    </Button>
                  </>
                )}

                <div style={{ paddingTop: "10px" }}></div>

                <Button
                  variant="outlined"
                  style={{
                    background: "linear-gradient(to bottom, #071520, #194D78)",
                    boxShadow: " 4px 4px 4px 4px rgba(0, 0, 0, 0.4)",
                    color: "white",
                  }}
                  className={classes.button}
                  onClick={openModal}
                >
                  {t("cancelT")}
                </Button>
              </>
            )}
          </div>
        </CardWrap>
      </div>
      <ModalTransactionCanceled
        isOpen={modalCancelOpen && !sended & !completeSend}
        handleBack={() => history.push("/quotations")}
        userCancelledName={transactionData?.username}
      />
      <ModalTransactionCompleted
        isOpen={isBuy() ? completeSend : sended}
        handleBack={() => {
          unblock();
          history.push("/quotations");
        }}
      />
      <ModalConfirmCancel
        isOpen={open}
        handleCancelTransaction={handleCancelTransaction}
        handleCancel={closeModal}
      />
      {render && (
        <ModalSendAmountNotify
          isOpen={isBuy() ? false : completeSend}
          handleBack={() => {
            setRender(false);
          }}
          userCancelledName={transactionData?.username}
        />
      )}
    </Container>
  );
};

export default Transaction;
