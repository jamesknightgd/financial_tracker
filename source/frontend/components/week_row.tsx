import * as React from "react"
import {Box, Grid, Typography, Divider, makeStyles} from "@material-ui/core"

import colors from "./../libraries/colors"

import BlockRow from "./../components/blocks/row"
import TextBlock from "./../components/blocks/text"
import ChartBlock from "./../components/blocks/chart"

export default function WeekRow() : JSX.Element
{
    const hasInitialized = React.useRef<boolean>(false)
    React.useEffect(()=>
    {
        if(hasInitialized.current) return

        hasInitialized.current = true
    }) 

    function cWeeksUntilGCAP() : number
    {
        const dateOfGCAP : Date = new Date()
        dateOfGCAP.setFullYear(2021, 10, 1)
        
        const today : Date = new Date()

        return Math.floor( (dateOfGCAP.getTime() - today.getTime())/(1000*60*60*24*7) )
    }

    function cWeeksSinceProjectStart() : number
    {
        const today              : Date = new Date()
        const dateOfProjectStart : Date = new Date()
        dateOfProjectStart.setFullYear(2020, 10, 5) // change this to real start date 

        return Math.floor( (today.getTime() - dateOfProjectStart.getTime())/(1000*60*60*24*7) )
    }

    return(
        <BlockRow margin="6px" margin_top="0px">

            <TextBlock width="50%" margin_left="0px" header={`⏳ Time Spent In Project`} content={`${cWeeksSinceProjectStart()} weeks`}/>

            <TextBlock width="50%" margin_left="2px" header={`⏳ Time Remaining until GCAP`} content={`${cWeeksUntilGCAP()} weeks`}/>

        </BlockRow>
    )
}