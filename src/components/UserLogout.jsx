import { IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import React from "react";
import { useHistory } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from "react-i18next";
import { MdExitToApp, MdLanguage , MdPeople ,MdOutlinePaid} from "react-icons/md";
import { createStyles, makeStyles } from "@mui/styles";


const userLogoutStyles = makeStyles((theme) =>
    createStyles({
        menu: {
            overflow: "hidden",
            backgroundColor: "black!important",
            borderRadius: "5px !important",
        },
        menuitem: {
            paddingTop: "8px",
            paddingBottom: "8px",
            backgroundColor:"grey",
            color: "white!important",
            "&:hover": {
                backgroundColor: "black",
                color: "grey!important",
            },
        },
        menuicon: {
            minWidth: "35px",
        },
        icon: {
            color: "grey",
            borderRadius: "5px",
            padding: "5px",

            "&:hover": {
                backgroundColor:"grey"
            },
        },
        arrow: {
            fontSize: "16px",
        },
        profile: {
            fontSize: "26px",
        },
    })
);


const UserLogout = () => {
    const classes = userLogoutStyles();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorLangEl, setAnchorLangEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const openLang = Boolean(anchorLangEl);
    const { t, i18n } = useTranslation();

    const handleClose = () => {
        setAnchorEl(null);
        setAnchorLangEl(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleLangMenu = (event) => {
        setAnchorEl(null);
        setAnchorLangEl(event.currentTarget);
    };

    const handleLanguageSelection = (lang) => {
        localStorage.setItem("languaje", lang);
        i18n.changeLanguage(lang);
        handleClose();
    };

    const handleCerrarSesion = () => {
                localStorage.removeItem("token");
                history.push("/login");
            };

    const handleUsers = () => {
        history.push("/users")
    }

    const handleQuotations = () => {

        history.push("/quotations")
    }

    return (
        <>
            <IconButton
                className={classes.icon}
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
            >
                <PersonIcon className={classes.profile} />
                <ExpandMoreIcon className={classes.arrow} />
            </IconButton>

            <Menu
                id='menu-appbar'
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                keepMounted
                open={open}
                onClose={handleClose}
                classes={{ paper: classes.menu }}
            >
                <MenuItem
                    className={classes.menuitem}
                    aria-label='language selection'
                    aria-controls='menu-language'
                    aria-haspopup='true'
                    onClick={handleLangMenu}
                >
                    <ListItemIcon classes={{ root: classes.menuicon }}>
                        <MdLanguage size='22' color= {"grey"} />
                    </ListItemIcon>
                    <Typography variant='inherit' noWrap>
                        {t("selectLanguage")}
                    </Typography>
                </MenuItem>
                <MenuItem className={classes.menuitem} onClick={handleCerrarSesion}>
                    <ListItemIcon classes={{ root: classes.menuicon }}>
                        <MdExitToApp size='22' color={"grey"} />
                    </ListItemIcon>
                    <Typography variant='inherit' noWrap>
                        {t("logout")}
                    </Typography>
                </MenuItem>

                <MenuItem className={classes.menuitem } onClick={handleUsers}>
                    <ListItemIcon classes={{ root: classes.menuicon }}>

                        <MdPeople size='22' color={"grey"}/>
                    </ListItemIcon>
                    <Typography variant='inherit' noWrap>
                    {t("users")}
                    </Typography>
                </MenuItem>

                <MenuItem className={classes.menuitem } onClick={handleQuotations}>
                    <ListItemIcon classes={{ root: classes.menuicon }}>

                        <MdOutlinePaid size='22' color={"grey"}/>
                    </ListItemIcon>
                    <Typography variant='inherit' noWrap>
                    {t("cotizations")}
                    </Typography>
                </MenuItem>

            </Menu>

            <Menu
                id='menu-language'
                anchorEl={anchorLangEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                keepMounted
                open={openLang}
                onClose={handleClose}
                classes={{ paper: classes.menu }}
            >
                <MenuItem className={classes.menuitem} onClick={() => handleLanguageSelection("es")}>
                    <ListItemIcon classes={{ root: classes.menuicon }}>
                        <MdLanguage size='22' color={"grey"} />
                    </ListItemIcon>
                    <Typography variant='inherit' noWrap>
                        {t("ES")}
                    </Typography>
                </MenuItem>

                <MenuItem className={classes.menuitem} onClick={() => handleLanguageSelection("en")}>
                    <ListItemIcon classes={{ root: classes.menuicon }}>
                        <MdLanguage size='22' color={"grey"} />
                    </ListItemIcon>
                    <Typography variant='inherit' noWrap>
                        {t("EN")}
                    </Typography>
                </MenuItem>

                

            </Menu>
        </>
    );
};

export default UserLogout;
