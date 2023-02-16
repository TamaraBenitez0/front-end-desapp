import React from "react";
import {makeStyles} from "@mui/styles";
import {Card,Fade} from '@mui/material';

const useStyles = makeStyles(theme=>({
    root: {
      minWidth: 275,
      minHeight: 469,
      borderRadius: "4px",
      marginLeft:"8px",
      marginRight:"8px",
      [theme.breakpoints.down(768)]:{
        marginLeft:"90px!important",
        marginRight:"90px!important"
      },
      [theme.breakpoints.down(725)]:{
        marginLeft:"70px!important",
        marginRight:"70px!important" 
      },
      [theme.breakpoints.down(579)]:{
        marginLeft:"40px!important",
        marginRight:"40px!important",      
      },
      [theme.breakpoints.down(550)]:{
        marginLeft:"20px!important",
        marginRight:"20px!important",
      },
      [theme.breakpoints.down(472)]:{
        marginLeft:"20px!important",
        marginRight:"20px!important",
      },
      [theme.breakpoints.down(401)]:{
        marginLeft:"0px!important",
        marginRight:"0px!important",
      },
    },
    bullet: {
      display: "inline-block",
    },
  }));
  
  
  
  const CardWrap = ({ children, style }) => {
    const classes = useStyles();
  
    return (
      <Fade timeout={1000} in={true}>
        <Card className={classes.root} style={style}>
          {children}
        </Card>
      </Fade>
    );
  };
  
  export default CardWrap;
  