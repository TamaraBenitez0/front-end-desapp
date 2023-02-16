import {colors,TextField} from "@mui/material";
import {makeStyles} from "@mui/styles";

import React, { useState } from "react";


const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: 41,
    marginBottom:"40px !important",
    width:300,
    height:56,
    background:"#071520 !important",
   
  },
  inputRoot: (props) => ({
    borderColor: props.value ? "264E6C !important" : "#2E6087 !important",
    borderRadius: 3.5,
    borderWidth: 1,
    borderStyle: "solid",
    color: "#FFFFFF !important"
  }),
  
  inputFocused: {
    borderColor: `${colors["cyan"][700]} !important`,
    boxShadow: `0 0 0 1px ${colors["cyan"][700]}`
    
  },
  inputNotchedOutline: {
    border: "none !important"
  },
  labelRoot: {
    color: "#FFFFFF !important"
  },
  labelShink: {
    color: `${colors["grey"][200]} !important`,
    backgroundColor: "#071520 !important",
    padding: "1px 10px",
    fontWeight: "bold"
  },
  labelFocused: {
    color: `${colors["grey"][50]} !important`,
    backgroundColor: colors["grey"][900]
  }
}));

const CustomTextField = ({
  data,
  defaultValue,
  onChange,
  ...props
},) => {
  const [inputValue, setInputValue] = useState(defaultValue);
  const classes = useStyles({ value: inputValue });
  const {endAdornment}=data?data:{endAdornment:''}
  return (
    <TextField
      {...props}
      className={classes.textField}
      defaultValue={inputValue}
      InputProps={{
        classes: {
          disabled: undefined,
          error: undefined,
          focused: classes.inputFocused,
          notchedOutline: classes.inputNotchedOutline,
          root: classes.inputRoot
        },
        endAdornment:endAdornment,
        }}
      InputLabelProps={{
        classes: {
          disabled: undefined,
          error: undefined,
          filled: undefined,
          focused: classes.labelFocused,
          root: classes.labelRoot,
          shrink: classes.labelShink
        }
      }}
      onChange={(e) => {
        setInputValue(e.currentTarget.value);
        if (onChange) onChange(e);
      }}
      variant="outlined"
    />
  );
};

export default CustomTextField;