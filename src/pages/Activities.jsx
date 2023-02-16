import Container from "@mui/material/Container";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import CardActivities from "../components/CardActivities";
import NavBar from "../components/NavBar";
import { API_Activities } from "../services/APIActivities";
import "../styles/welcome.css";
import { useTranslation } from "react-i18next";
import CardWrap from "../components/CardWrap";
import ModalCreateActivity from "../components/ModalCreateActivity";
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
const dayjs = require("dayjs");
const Activities = () => {

    const [activities, setActivities] = useState([]);
    const { type } = useParams();
    const { cripto } = useParams();
    const { t , i18n } = useTranslation();
    const [open,setOpen]= useState(false);

    useEffect(() => {
        i18n.changeLanguage(localStorage.getItem('languaje'));
        getActivities();
        // eslint-disable-next-line

    }, []);

    const getActivities = () => {
        API_Activities.getActivitiesByCriptoandType(type, cripto).then((response) => {

            setActivities(response.data)
        });
    }

    
    const handleOpen  = () => {
        setOpen(true);
    }      

    const handleClose = () => {
        setOpen(false);
    }
    
    return (

        <Container disableGutters maxWidth={false} className="conteiner-color">
            <NavBar />

            <div className="container-welcome">
                <span className="welcome"> {t("activities")} </span>
            </div>

           

            <div style={{ marginTop: "100px" }}>
               
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                sx={{marginBottom:"20px",marginLeft: "20px"}}
            > <Button sx={{color:"grey !important",backgroundColor:"black",border:'1px solid grey'}} onClick={handleOpen}><AddIcon/> {t("addActivity")}</Button></Grid> 
            <CardWrap
            style={{
            backgroundColor: "black",
            marginLeft: "20px",
            marginRight: "20px",
        }}
            >

        {activities.map((list) => (
            <CardActivities activityId={list.activityId}
            hour={dayjs(list.hour).format("HH:mm")}
            userId={list.userId}
            criptoName={list.criptoName}
            valueCripto={list.valueCripto}
            nominals={list.nominals}
            ars={list.amountInArs}
            username={list.username}
            lastName={list.lastName}
            operations={list.operations}
            reputation={list.reputation}/>))}


            </CardWrap> </div>
            <ModalCreateActivity isOpen={open} handleCancel={handleClose}/>
        </Container>

    )

}

export default Activities;