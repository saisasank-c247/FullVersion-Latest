import { Theme, Typography, useMediaQuery } from "@mui/material"
import { useSettings } from 'src/@core/hooks/useSettings'
import React, { useState } from "react"
import CalendarWrapper from "src/@core/styles/libs/fullcalendar"
import { Box } from "@mui/system"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Button from '@mui/material/Button'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import CreatePage from "src/views/apps/pages/CreatePage"
import RevisionHistory from "src/views/apps/pages/RevisionHistory"
import SideBarRight from "src/views/apps/pages/SideBarRight"

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}

const Page = () => {
    const [createpage, setCreatepage] = useState(false)
    const [revisionhistory, setRevisionhistory] = useState(false)

    function TabPanel(props: TabPanelProps) {
        const { children, value, index, ...other } = props;
        return (

            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    //hooks
    const { settings } = useSettings()
    // const dispatch = useDispatch<AppDispatch>()
    // const store = useSelector((state: RootState) => state.calendar)
    const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
    const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)
    const [submit, setSubmit] = useState(0);
    const [sideItems,setSideItems]=useState({})
    const leftSidebarWidth = 300
    const addEventSidebarWidth = 400
    const { skin, direction } = settings
    const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

    const handleLeftSidebarToggle = () => setLeftSidebarOpen(!leftSidebarOpen)

    const handleAddEventSidebarToggle = () => setAddEventSidebarOpen(!addEventSidebarOpen)
    const validatonFunction = (status:any,template:any) => {
        setSideItems({status,template})
        setSubmit(submit + 1)
    }


    return (
        <>
            <div role="presentation">
                <Breadcrumbs aria-label="breadcrumb" style={{ marginBottom: "25px" }}>
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="medium" />
                        Dashboard
                    </Link>
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                    >
                        Pages
                    </Link>
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="text.primary"
                    >
                        Create new Page
                    </Typography>
                </Breadcrumbs>

            </div>
            <CalendarWrapper
                className='app-calendar'
                sx={{
                    boxShadow: skin === 'bordered' ? 0 : 6,
                    // ...(skin === 'bordered' && { border: (theme: any) => `1px solid ${theme.palette.divider}` })
                }}
            >


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
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab label="Detail" {...a11yProps(0)} />
                                <Tab label="Revision History" {...a11yProps(1)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <CreatePage submit={submit} sideItems={sideItems}/>
                        </TabPanel>
                        {/* 
                        <TabPanel value={value} index={1}>
                            <RevisionHistory />
                        </TabPanel> */}
                        {/* <TabPanel value={value} index={2}>
                            <Fileupload />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <ListPage />
                        </TabPanel> */}
                    </Box>
                </Box>
                
            </CalendarWrapper>
  

        </>

    )
}
export default Page