/* eslint-disable react/style-prop-object */
import ListItem from "@mui/material/ListItem";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { FormattedNumber } from "react-intl";
import { API_Transaction } from "../services/APITransaction";
import toast from "react-hot-toast";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "flex-start",
  color: theme.palette.common.white,
  backgroundColor: "black",
}));

const CardActivities = ({
  activityId,
  hour,
  userId,
  criptoName,
  valueCripto,
  nominals,
  ars,
  username,
  lastName,
  operations,
  reputation,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  const asoc = {
    BTC: "https://s2.coinmarketcap.com/static/img/coins/32x32/1.png",
    ETH: "https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png",
    BNB: "https://s2.coinmarketcap.com/static/img/coins/32x32/1839.png",
    NEO: "https://s2.coinmarketcap.com/static/img/coins/32x32/1376.png",
    MATIC: "https://s2.coinmarketcap.com/static/img/coins/32x32/3890.png",
    ATOM: "https://s2.coinmarketcap.com/static/img/coins/32x32/3794.png",
    DOT: "https://s2.coinmarketcap.com/static/img/coins/32x32/6636.png",
    AAVE: "https://s2.coinmarketcap.com/static/img/coins/32x32/7278.png",
    AXS: "https://s2.coinmarketcap.com/static/img/coins/32x32/6783.png",
    CAKE: "https://s2.coinmarketcap.com/static/img/coins/32x32/7186.png",
    ALICE: "https://s2.coinmarketcap.com/static/img/coins/32x32/8766.png",
  };

  const checkTransactionInProgress = (userId, activityId) => {
    API_Transaction.checkTransactionInProgress(userId).then((res) => {
      if (res.data.active) {
        toast.error("this user is in transaction , try again later");
      } else {
        history.push(
          `/transactions/negociate/${userId}/activity/${activityId}`
        );
      }
    });
  };

  const handleStartTransaction = () => {
    API_Transaction.checkInitTransaction().then((res) => {
      if (res.data.active) {
        toast.error("you have 1 active transaction");
      } else {
        checkTransactionInProgress(userId, activityId);
      }
    });
  };

  return (
    <>
      <ListItem sx={{ backgroundColor: "black", border: "1px solid grey" }}>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
        >
          <Typography
            sx={{ color: "white", marginBottom: "15px", marginTop: "0px" }}
            variant="h5"
            component="div"
          >
            <img
              src={asoc[criptoName]}
              alt="iconCrypt"
              width="20"
              height="20"
              style={{ paddingRight: "10px" }}
            />
            {criptoName}
          </Typography>

          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={6}>
              <Item>
                {t("hour")} : {hour} hs
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                {t("valueCripto")} :{" "}
                <FormattedNumber
                  value={valueCripto}
                  style="currency"
                  currency="ARS"
                />
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                {t("nominal")} : {nominals}
              </Item>
            </Grid>
            <Grid item xs={6}>
              <Item>
                {t("amountArs")} :{" "}
                <FormattedNumber value={ars} style="currency" currency="ARS" />
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item>
                {t("user")} : {username} {lastName}
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item>
                {t("operations")} :{" "}
                {operations === 0 ? t("operationsNull") : operations}
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Item>
                {t("reputation")} : {reputation}
              </Item>
            </Grid>

            <Grid item xs={6}>
              <Button
                sx={{
                  color: "green",
                }}
                onClick={handleStartTransaction}
              >
                {t("startTransaction")}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </ListItem>
    </>
  );
};

export default CardActivities;
