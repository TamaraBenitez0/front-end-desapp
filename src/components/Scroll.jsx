import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
    root: {
        overflow:"auto",
        marginRight: "8px",
        
        "&::-webkit-scrollbar-track":
        {
            webkitBoxShadow: "inset 0 0 6px rgba(0,0,0,0.3)",
            borderRadius: "10px",
            backgroundColor:"#272625",
        },
        
        "&::-webkit-scrollbar":
        {
            borderRadius:"10px",
            width: "6px",
            backgroundColor: "#272625",
        },
        
        "&::-webkit-scrollbar-thumb":{
            borderRadius: "10px",
            webkitBoxShadow: "inset 0 0 2px rgba(0,0,0,.3)",
            backgroundColor: "#392255",
        },
        },

});


const Scroll=({children,height})=>{
    const classes=useStyles()
    
    return(
    <div className={classes.root} style={{height:height}}>
    {children}
    </div>
    )
}
export default Scroll