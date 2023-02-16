import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Backdrop, Button, Fade, Grid, Modal, Input } from "@mui/material";
import { makeStyles, createStyles } from "@mui/styles";
import { useParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { API_Quotations } from "../services/APIListQuotation";
import { API_Activities } from "../services/APIActivities";
import toast from "react-hot-toast";

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
    styleInput: {
      marginBottom: "20px",
      "&.MuiInputBase-root": {
        color: "rgba(255, 255, 255, 0.87)",
        border: `solid 1px #121212`,
        borderBottomColor: "#81CECC",
        width: "328px",
        height: "36px",
        padding: "10px 16px 4px 16px",
      },
    },
  })
);

const ModalCreateActivity = ({ isOpen, handleCancel }) => {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const { type, cripto } = useParams();
  const [valueAmount, setValueAmount] = React.useState(0);
  const [quotation, setQuotation] = React.useState(0);
  const [nominals, setNominals] = React.useState(0);
  const [editing, setEditing] = React.useState(false);
  const intl = useIntl();

  useEffect(() => {
    quotationPrice(cripto);
  }, [type, cripto]);

  const handleChangeAmount = (event) => {
    setValueAmount(event.target.value);
  };

  const quotationPrice = (symbol) => {
    API_Quotations.getQuotationBySymbol(symbol).then((response) => {
      setQuotation(response.data.priceArs);
    });
  };

  const handleCreate = () => {
    const body = {
      criptoName: cripto,
      valueCripto: quotation,
      nominals: nominals,
      amountInArs: valueAmount,
      activityType: type,
    };
    toast.promise(
      API_Activities.createActivity(body),
      {
        loading: t("creatingActivity"),
        success: t("successfullyActivity"),
        error: t("errorCreateActivity"),
      },
      {
        style: {
          backgroundColor: "black",
          color: "white",
        },
      }
    );
    handleCancel();
  };

  const toggleEditting = () => {
    setEditing(!editing);
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
              <h3 className={classes.save}>{t("createNewActivity")}</h3>
            </Grid>

            <label style={{ color: "white" }}>{t("amountArs")}</label>
            {editing ? (
              <>
                <Input
                  defaultValue={``}
                  type="number"
                  placeholder={"Amount"}
                  value={valueAmount}
                  disableUnderline
                  onChange={handleChangeAmount}
                  className={classes.styleInput}
                  onBlur={toggleEditting}
                />
              </>
            ) : (
              <>
                <Input
                  defaultValue={"ARS"}
                  type="text"
                  placeholder={"Amount"}
                  value={intl.formatNumber(valueAmount,{style:"currency" ,currency:"ARS"})}
                  disableUnderline
                  onFocus={toggleEditting}
                  className={classes.styleInput}
                />
              </>
            )}

            <label style={{ color: "white" }}>{t("nominal")}</label>
            <Input
              defaultValue={0}
              type="number"
              placeholder={"Nominals"}
              disableUnderline
              className={classes.styleInput}
              onChange={(e) => setNominals(e.target.value)}
            />

            <label style={{ color: "white" }}>{t("actualQuotation")}</label>
            <Input
              type="currency"
              defaultValue={quotation}
              disableUnderline
              value={new Intl.NumberFormat(i18n.language, {
                style: "currency",
                currency: "ARS",
              }).format(quotation)}
              className={classes.styleInput}
              readOnly={true}
            />

            <label style={{ color: "white" }}>{t("operationType")}</label>
            <Input
              defaultValue={`${type}`}
              disableUnderline
              className={classes.styleInput}
              readOnly={true}
            />
            <label style={{ color: "white" }}>{t("ticket")}</label>
            <Input
              defaultValue={`${cripto}`}
              disableUnderline
              className={classes.styleInput}
              readOnly={true}
            />
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
            >
              <Button onClick={handleCreate} style={{ marginRight: "20px" }}>
               {t("createA")}
              </Button>
              <Button onClick={handleCancel}>{t("cancel")}</Button>
            </Grid>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalCreateActivity;
