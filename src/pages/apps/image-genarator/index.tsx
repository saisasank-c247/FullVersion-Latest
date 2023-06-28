import { Box, Theme, useMediaQuery } from "@mui/material"
import { useState } from "react"
import { useSettings } from "src/@core/hooks/useSettings"
import CalendarWrapper from "src/@core/styles/libs/fullcalendar"
import { CalendarColors } from "src/types/apps/imagegeneratorTypes"
import { AddEventSidebar } from "src/views/apps/image-generator/AddEventSidebar"
import ImageGenerator from "src/views/apps/image-generator/ImageGenerator"
import SidebarLeft from "src/views/apps/image-generator/sidebarleft"


const calendarsColor: CalendarColors = {
    Personal: 'error',
    Business: 'primary',
    Family: 'warning',
    Holiday: 'success',
    ETC: 'info'
}
const AppCalendar = () => {
    const leftSidebarWidth = 300
    const addEventSidebarWidth = 400
    const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
    const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
    const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)
    const [imageParams, setImageParams] = useState()
    const { settings } = useSettings()
    const { skin, direction } = settings
    const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
    const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)
    console.log(imageParams, "asa");

    return (
        <CalendarWrapper
            className='app-calendar'
            sx={{
                boxShadow: skin === 'bordered' ? 0 : 6,
                ...(skin === 'bordered' && { border: (theme: any) => `1px solid ${theme.palette.divider}` })
            }}
        >
            <SidebarLeft
                mdAbove={mdAbove}
                leftSidebarOpen={leftSidebarOpen}
                leftSidebarWidth={leftSidebarWidth}
                handleLeftSidebarToggle={handleLeftSidebarToggle}
                handleAddEventSidebarToggle={handleAddEventSidebarToggle}
            />
            <Box
                sx={{
                    p: 6,
                    pb: 0,
                    flexGrow: 1,
                    borderRadius: 1,
                    boxShadow: 'none',
                    backgroundColor: 'background.paper',
                    ...(mdAbove ? { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 } : {})
                }}
            >
                <ImageGenerator imageParam={imageParams}/>
            </Box>
            <AddEventSidebar
                drawerWidth={addEventSidebarWidth}
                addEventSidebarOpen={addEventSidebarOpen}
                handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                dataGet={(e: any) => setImageParams(e)}
            />
        </CalendarWrapper>
    )
}

export default AppCalendar
