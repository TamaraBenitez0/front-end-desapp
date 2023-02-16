import InputAdornment from '@mui/material/InputAdornment';
import { MenuItem,TextField } from '@mui/material'
import React, { useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { makeStyles , createStyles,Theme } from "@mui/styles";
import LanguageIcon from '@mui/icons-material/Language';

const useStyles = makeStyles((theme) =>
createStyles({
    root: {
      marginTop:10,
      marginLeft:10,
      width: 165,
      backgroundColor:"#071520",
      "& .MuiOutlinedInput-input": {
        color: theme.palette.grey[50],
        backgroundColor: "#071520",
       
       
      },
      "& .MuiInputLabel-root": {
        color: theme.palette.grey[50]
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.dark
      },
      "&:hover .MuiOutlinedInput-input": {
        color: theme.palette.grey[50]
      },
      "&:hover .MuiInputLabel-root": {
        color: "none"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "none"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input": {
        color: theme.palette.grey[50]
      },
      "& .MuiInputLabel-root.Mui-focused": {
        color: theme.palette.grey[50]
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: theme.palette.primary.dark
      }
    } ,

    languageIcon: {

       "&.MuiSvgIcon-root" : {

            color:theme.palette.grey[50],backgroundColor:"#071520"
       }
    } ,

    backgroundDiv: {

      backgroundColor: '#010510'
    }
    


  }));

  const SelectorLanguage = () => {
    const classes = useStyles();
    const [age, setAge] = React.useState(localStorage.getItem("languaje"));
    const {t, i18n} = useTranslation()

useEffect(()=>{i18n.changeLanguage(age)},[age])

    const handleChange = (event) => {
        setAge(event.target.value);
        localStorage.setItem("languaje",event.target.value)
        i18n.changeLanguage(event.target.value)

      };

return (

    <div className={classes.backgroundDiv}> 
        
        
        <TextField style={{marginTop:"10px"}}
        className={classes.root}
        value={age}
        onChange={handleChange}
        variant="outlined"
        label={t("selectLanguage")}
        size= "small"
        InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LanguageIcon className={classes.languageIcon}/>
              </InputAdornment>
            ),
          }}
        select
      
      >

    <MenuItem value="es" selected className="MenuItem">ES</MenuItem>
    <MenuItem value="en" selected className="MenuItem">EN</MenuItem>
    
    
    </TextField>
     </div>

)

}

export default SelectorLanguage;