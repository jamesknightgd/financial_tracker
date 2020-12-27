import * as React from "react"
import {Box, Grid, Typography, Divider, makeStyles} from "@material-ui/core"

import colors from "../libraries/colors"

import BlockRow from "./blocks/row"
import TextBlock from "./blocks/text"

export default function DateRow() : JSX.Element
{
    const hasInitialized = React.useRef<boolean>(false)
    React.useEffect(()=>
    {
        if(hasInitialized.current) return

        hasInitialized.current = true
    })

    // get current funds remaining
    // get weeks until remaining ends (based on average )

    const currentDate : Date = new Date()

    return(
        <BlockRow margin="6px" margin_top="0px">

            <TextBlock width="100%" margin_left="0px" header={`📅 Date`} content={`${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`}/>

        </BlockRow>
    )
}