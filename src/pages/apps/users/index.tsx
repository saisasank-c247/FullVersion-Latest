import { Box, Theme, useMediaQuery } from "@mui/material"
import { useEffect, useState } from "react"
import { useSettings } from "src/@core/hooks/useSettings"
import CalendarWrapper from "src/@core/styles/libs/fullcalendar"
import { CalendarColors } from "src/types/apps/imagegeneratorTypes"
import { AddUserSidebar } from "src/views/apps/users/AddUserSidebar"
import SidebarLeft from "src/views/apps/users/sidebarleft"
import UsersTable from "src/views/apps/users/UsersTable"
import { addUserData, loadUserData } from "./users.service"
import { EditUserSidebar } from "src/views/apps/users/EditUserSidebar"

const calendarsColor: CalendarColors = {
    Personal: 'error',
    Business: 'primary',
    Family: 'warning',
    Holiday: 'success',
    ETC: 'info'
}
const AppCalendar = (props: any) => {
    const leftSidebarWidth = 300
    const addEventSidebarWidth = 400
    const editEventSidebarWidth = 400
    const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
    const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
    const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)
    const [editEventSidebarOpen, setEditEventSidebarOpen] = useState<boolean>(false)
    const [editValue,setEditValue] = useState(null)
    const [calenderEvents, setCalenderEvents] = useState(null)
    const [userParams, setUserParams] = useState([])
    const { settings } = useSettings()
    const { skin, direction } = settings
    const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)
    const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)
    const handleEditEventSidebarToggle = () => setEditEventSidebarOpen(!editEventSidebarOpen)

    console.log(userParams, "asa");

    const userHandle = (e: any) => {
        console.log(e, "ee");
        e["id"] = userParams.length + 1;

        let users: any = [...userParams, e]
        console.log("users", users);
        setUserParams(users)
        // userParams.push(users).toString();
        // setUserParams({...userParams, users})
    }
    const addEventFunction = (event: any) => {
        console.log(event);
        let newData = {
            name: event.name,
            from_date: event.start,
            to_date: event.end
        }
        console.log(newData);
        addUserData(newData);
        calendarDataAPI();
    }
    const editEventFunction = (event: any) => {
        console.log(event);
        let editData = {
            id:event.id,
            name: event.name,
            from_date: event.start,
            to_date: event.end
        }
        console.log(editData);
        addUserData(editData);
        calendarDataAPI();
    }
    const handleEditUser= (id: any) => {
        console.log(id, "e");
        console.log(userParams,"userParams");
        
        let result = userParams.filter((e :any) => e.id === id)[0];
        handleEditEventSidebarToggle();
        setEditValue(result);
        

    }

    const calendarDataAPI = () => {
        let result: any = loadUserData();
        result.then((res: any) =>
            setCalenderEvents(res))
    }
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

            {userParams && <UsersTable handleEditUser={handleEditUser} user={userParams} userData={calenderEvents} />}
            <AddUserSidebar
                drawerWidth={addEventSidebarWidth}
                addEventSidebarOpen={addEventSidebarOpen}
                addUser={addEventFunction}
                handleAddEventSidebarToggle={handleAddEventSidebarToggle}
                dataGet={(e: any) => userHandle(e)}
            />
                 <EditUserSidebar
                drawerWidth={editEventSidebarWidth}
                editEventSidebarOpen={editEventSidebarOpen}
                editUser={editEventFunction}
                editValue={editValue}
                handleEditEventSidebarToggle={handleEditEventSidebarToggle}
                dataGet={(e: any) => userEditHandle(e)}
            />
        </CalendarWrapper>
    )
}

export default AppCalendar
