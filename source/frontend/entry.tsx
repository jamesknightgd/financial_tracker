import * as React from "react"
import * as ReactDOM from "react-dom"
import { createMuiTheme, ThemeProvider, Theme, Grid, responsiveFontSizes, Box } from "@material-ui/core"

import colors from "./libraries/colors"

import WeekRow from "./components/week_row"
import FundsRemainingRow from "./components/funds_remaining_row"
import DateRow from "./components/date_row"
import IncomingOutgoingRow from "./components/incoming_outgoing_row"

let theme: Theme = createMuiTheme(
    {
        palette:
        {
            ...colors    
        },
    }
)
theme = responsiveFontSizes(theme)

interface Props
{
}
function ReactRoot(props: Props)
{

    return (
        <ThemeProvider theme={theme}>
            <Box bgcolor="primary.main" width="100%" height="100%" pt="4px">
                <Grid container direction="column" justify="flex-start" alignItems="stretch" style={{height: "100%", width: "100%"}}>

                    <Box bgcolor="primary.main" width="100%" height="25%" pt="4px"><DateRow/></Box>

                    <Box bgcolor="primary.main" width="100%" height="25%" pt="4px"><WeekRow/></Box>

                    <Box bgcolor="primary.main" width="100%" height="25%" pt="4px"><FundsRemainingRow/></Box>

                    <Box bgcolor="primary.main" width="100%" height="25%" pt="4px"><IncomingOutgoingRow/></Box>
                    
                </Grid>
            </Box>
        </ThemeProvider>
    )
}

ReactDOM.render(<ReactRoot></ReactRoot>, document.getElementById("react-root"))