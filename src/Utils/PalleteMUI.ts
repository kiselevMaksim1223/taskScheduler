import {createTheme} from "@mui/material";
import {purple} from "@mui/material/colors";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#11cb5f',
        },
        secondary:{
            main: purple[500]
        },
    },
})