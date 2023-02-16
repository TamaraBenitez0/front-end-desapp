import * as React from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import ListItem from "@mui/material/ListItem";
import {FormattedNumber} from 'react-intl'
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";


const useStyles = makeStyles(theme=>({
  root: {
    backgroundColor: "#98FCEE",
  },
  adjustGrid: {
    position: "absolute",
    left: "80%",
    paddingRight: "30px",
    
    [theme.breakpoints.down(1189)]:{
      position: "absolute",
      left: "73%",
      paddingRight: "0px",
        },
    [theme.breakpoints.down(889)]:{
      position: "absolute",
      left: "65%",
      paddingRight: "2px",        
    },
    [theme.breakpoints.down(770)]:{
      position: "absolute",
      left: "55%",
      paddingRight: "2px",
        },    
    [theme.breakpoints.down(630)]:{
      position: "absolute",
      paddingRight: "30px",
      },    
    [theme.breakpoints.down(579)]:{
      position: "absolute", 
      paddingRight: "30px",
     },    
    [theme.breakpoints.down(430)]:{
      position: "relative",
      left: 0,
      padding: "0px !important",     
    },    

  },
}));

const CardQuotations = ({ symbol, hour, price }) => {  
  const classes = useStyles();
  const history = useHistory();
  const { t } = useTranslation();

  const handleBuy = () => {
    history.push(`activities/buy/cripto/${symbol}`)
  
  };

  const handleSell = () => {

    history.push(`activities/sell/cripto/${symbol}`)
  }
  
  const asoc ={
    BTC:"https://s2.coinmarketcap.com/static/img/coins/32x32/1.png",
    ETH:"https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png",
    BNB:"https://s2.coinmarketcap.com/static/img/coins/32x32/1839.png", 
    NEO:"https://s2.coinmarketcap.com/static/img/coins/32x32/1376.png",
    MATIC:"https://s2.coinmarketcap.com/static/img/coins/32x32/3890.png", 
    ATOM:"https://s2.coinmarketcap.com/static/img/coins/32x32/3794.png", 
    DOT:"https://s2.coinmarketcap.com/static/img/coins/32x32/6636.png", 
    AAVE:"https://s2.coinmarketcap.com/static/img/coins/32x32/7278.png",
    AXS:"https://s2.coinmarketcap.com/static/img/coins/32x32/6783.png", 
    CAKE:"https://s2.coinmarketcap.com/static/img/coins/32x32/7186.png",
    ALICE:"https://s2.coinmarketcap.com/static/img/coins/32x32/8766.png",
  }

  return (
    <div>
      <ListItem sx={{ backgroundColor: "black", border: "1px solid gray" }}>
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
            <img src={asoc[symbol]} alt="iconCrypt" width="20" height="20" style={{paddingRight: "10px"}} />
             {symbol}
          </Typography>
          <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography sx={{ color: "white" }} variant="h5" component="div">
              <FormattedNumber value={price} style="currency" currency="ARS"/>
            </Typography>
            <Grid
              container
              sx={{ width: "auto" }}
              className={classes.adjustGrid}
              direction="row"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Button
                sx={{
                  color: "gray",
                  border: "1px solid #2E6087",
                  width: "100px",
                }}
                onClick={handleBuy}
              >
                {t("buy")}
              </Button>
              <Button
                sx={{
                  color: "gray",
                  border: "1px solid #2E6087",
                  marginLeft: "10px",
                  width: "100px",
                }}
                onClick={handleSell}
              >
               {t("sell")}
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{ width: "auto" }}
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
          >
            <Typography
              sx={{
                color: "white",
                fontSize: "16px",
                marginTop: "10px",
                paddingRight: "100px",
              }}
              component="div"
            >
              {t("lastUpdate")} : {hour} hs
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    </div>
  );
};

export default CardQuotations;
