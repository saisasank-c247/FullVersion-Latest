import { Grid, Box, Typography, Select, FormControl, Modal } from "@mui/material";
import { Theme, useMediaQuery } from "@mui/material"
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Card from '@mui/material/Card';
import DoneIcon from '@mui/icons-material/Done';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import CustomTextField from "src/@core/components/mui/text-field";
import * as yup from 'yup';
import CardContent from '@mui/material/CardContent';
import { EditorState } from 'draft-js'
import Button from '@mui/material/Button'
import ReactDraftWysiwyg from "src/@core/components/react-draft-wysiwyg";
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import CodeIcon from '@mui/icons-material/Code';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WindowIcon from '@mui/icons-material/Window';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BungalowOutlinedIcon from '@mui/icons-material/BungalowOutlined';
import Link from '@mui/material/Link';
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded';
import AddImage from "./AddImage.tsx";
import 'react-quill/dist/quill.snow.css';
import dynamic from "next/dynamic";
import SideBarRight from "./SideBarRight";
import { addUser, getDetailsById, updateUser } from "src/pages/apps/createpage/CreatePageService.js";
import { useRouter } from 'next/router'

const ReactQuill = dynamic(import('react-quill'), { ssr: false })
const validationSchema = yup.object({
    name: yup.string().min(3, "It too short").required("This field is  required")
})

const shortcodeMenu = [
    { value: "ads", name: "Ads" },
    { value: "blogposts", name: "Blog Posts" },
    { value: "commingsoon", name: "Coming Soon" },
    { value: "contactform", name: "Contact Form" },
    { value: "contactinfoboxes", name: "Contact Info Boxes" },
    { value: "customhtml", name: "Custom HTML" },
    { value: "downloadapps", name: "Download Apps" },
    { value: "faqs", name: "FAQs" },
    { value: "featuredbrands", name: "Featured Brands" },
    { value: "featuredproductcategory", name: "Featured Product Categories" },
    { value: "featuredproduct", name: "Featured Products" },
    { value: "flashsale", name: "Flash Sale" },
    { value: "googlemap", name: "Google Map" },
    { value: "newsletter", name: "NewsLetter Form" },
    { value: "productcategory", name: "Product Category Products" },
    { value: "productcollection", name: "Product Collections" },
    { value: "recentlyviewed", name: "Customer Recently Viewed Products" },
    { value: "simpleslider", name: "Simple Slider" },
    { value: "sitefeatures", name: "Site features" },
    { value: "themeads", name: "Theme ads" },
    { value: "trendingproducts", name: "Trending Products" },
    { value: "youtubevideo", name: "Youtube video" },

]
const AdsMenu = [
    { value: "TopSliderImage1", name: "Top Slider Image 1" },
    { value: "TopSliderImage2", name: "Top Slider Image 2" },
    { value: "HomePageMiddle1", name: "Home Page Middle 1" },
    { value: "HomePageMiddle2", name: "HomePage Middle 2" },
    { value: "HomePageMiddle3", name: "HomePage Middle 3" },
    { value: "HomepageBig1", name: "Homepage Big 1" },
    { value: "HomePageBottomSmall", name: "Home Page Bottom Small" },
    { value: "ProductSidebar", name: "Product Sidebar" },
    { value: "HomepageBig2", name: "Homepage Big 2" },
]
const flashsaleMenu = [
    { value: "wintersale", name: "Winter Sale" },
]
const productcategoryproductsMenu = [
    { value: "Hotpromotions", name: "Hot Promotions" },
    { value: "Electronics", name: "Electronics" },
    { value: "Clothing", name: "Clothing" },
    { value: "Computers", name: "Computers" },
]
const selectasliderMenu = [
    { value: "Homeslider", name: "Home Slider" }
]
const sitefeaturesMenu = [
    { icon: <HomeOutlinedIcon />, value: "iconhome", name: "icon-home" },
    { icon: <BungalowOutlinedIcon />, value: "iconhome2", name: "icon-home2" },
    { icon: <HomeOutlinedIcon />, value: "iconhome3", name: "icon-home3" },
    { icon: <BungalowOutlinedIcon />, value: "iconhome4", name: "icon-home4" },
]

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '55%',
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "#FFF",
    border: '2px solid #000',
    boxShadow: "0px 10px 30px 0px rgba(47, 43, 61, 0.34)",
    padding: "1rem",
    height: "85vh",
};

const CreatePageEdit = (props: any) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
        console.log(event.currentTarget);
    };

    const [show, setShow] = useState(false)
    const [activeSelectedItem, setActiveSelectedItem] = React.useState()

    const [openModal, setOpenModal] = React.useState(false);
    const handleInsertOpen = () => setOpenModal(true);
    const handleInsertClose = () => setOpenModal(false);
    const [edit, setEdit] = useState(false)
    const router = useRouter()

    const currentDate = new Date();
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    // const formattedDate = currentDate.toLocaleDateString(undefined, options);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const [editorimg, setEditorimg] = React.useState('');
    const [sidebarForm, setSidebarForm] = useState({
        status: "",
        template: "",
        image: ""
    })
    const [numbr, setNumbr] = useState()
    const number = 120
    const [description, setDescription] = useState()
    const num = 300
    const [change, setChange] = useState("")
    const formik = useFormik({
        initialValues: {
            name: "",
            description: "",
            content: "",
            status: "",
            template: "",
            image: ""
        },
        onSubmit: (values: any) => {
            const query = new URLSearchParams(window.location.search);
            console.log(values, "props", props)
            let data = { ...values, content: editorimg, ...sidebarForm }
            console.log(data);
            updateUser(data, query.get('id')).then(res => {
                console.log(res)
                router.push("/apps/pages")
            }).catch(err => {
                console.error(err)
            })
        }
    });

    const submitForm = (status: any, template: any, image: any) => {
        console.log(status, template, image)
        setSidebarForm({
            status,
            template,
            image
        })
        formik.submitForm();
    }

    const [value, setValue] = useState(EditorState.createEmpty())
    const editorHide = () => {
        setShow(!show)
        console.log("hii", show);

    };

    const editHide = () => {
        setEdit(!edit)
        console.log("hie", edit);

    };
    useEffect(() => {
        const query = new URLSearchParams(window.location.search);
        getDetailsById(query.get('id')).then(res => {
            console.log({ res })
            formik.setValues(res);
            setSidebarForm({
                status: res.status,
                template: res.template,
                image: res.image
            })
            setEditorimg(res.content)
        })
    }, [])
    const [opens, setOpens] = useState(false)


    const handleEditorChange = (e: any) => {
        setEditorimg(e);
    }


    const dataInsert = (e: any) => {
        setActiveSelectedItem(e);
        handleInsertClose();
        let linkTag = "<a href='" + e.url + "'>" + e.url + "</a>";
        let imgTag = "<img width='200px' src='" + e.url + "'/>"
        let code = e.type == "image/png" ? imgTag : linkTag
        setEditorimg(editorimg + code)
    }

    const mdAbove = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
    const [leftSidebarOpen, setLeftSidebarOpen] = useState<boolean>(false)
    const [addEventSidebarOpen, setAddEventSidebarOpen] = useState<boolean>(false)
    const leftSidebarWidth = 300
    const addEventSidebarWidth = 400
    return (
        <>
            <div>
                <form onSubmit={formik.handleSubmit} style={{ display: "flex", width: "100%" }}>
                    <div style={{ "display": "flex", flexDirection: "column", marginRight: 10, width: "100%" }}>
                        <Card square >
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} lg={12} md={12} sm={12}>
                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <label>
                                                    Name
                                                </label>
                                                <span style={{ color: "red" }}>*</span>
                                            </Box>
                                            {numbr && <Box sx={{ fontSize: "12px" }}>
                                                ({number - numbr} character(s) remain)
                                            </Box>}
                                        </Box>

                                        <CustomTextField
                                            fullWidth
                                            name="name"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            placeholder="Enter Name"
                                            onInput={(e: any) => setNumbr(e.target.value.length)}
                                            inputProps={{
                                                maxLength: 120,
                                            }}
                                            error={
                                                formik.touched.name &&
                                                Boolean(formik.errors.name)
                                            }
                                        />

                                    </Grid>
                                    <Grid item xs={12} lg={12} md={12} sm={12}>
                                        <label>Permalink:</label>
                                        <span style={{ color: "red" }}>*</span>
                                        <Link href="#">http://shop.c247.website/{formik.values.name}</Link>

                                    </Grid>
                                    <Grid item xs={12} lg={12} md={12} sm={12}>

                                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                            <Box>
                                                <label>
                                                    Description
                                                </label>
                                            </Box>
                                            {description && <Box sx={{ fontSize: "12px" }}>
                                                ({num - description} character(s) remain)
                                            </Box>}
                                        </Box>
                                        <div>
                                            <CustomTextField
                                                fullWidth
                                                name="description"
                                                multiline
                                                minRows={4}
                                                maxRows={7}
                                                value={formik.values.description}
                                                placeholder="Short description"
                                                onChange={formik.handleChange}
                                                id='textarea-outlined-controlled'
                                                onInput={(e: any) => setDescription(e.target.value.length)}
                                                inputProps={{ maxLength: 300 }}

                                            />
                                        </div>
                                    </Grid>
                                    <Grid item lg={12}>
                                        <label>Content</label>
                                        <span style={{ color: "red" }}>*</span>
                                    </Grid>
                                </Grid>

                                <Button size="medium" variant='contained' style={{ marginTop: "5px", marginLeft: "10px", backgroundColor: "#4d97c1" }} onClick={handleInsertOpen} startIcon={<ImageOutlinedIcon />}>
                                    Add Media
                                </Button>
                                <Modal
                                    open={openModal}
                                    onChange={formik.handleChange}
                                    onClose={handleInsertClose}
                                    aria-labelledby="modal-modal-title"
                                    aria-describedby="modal-modal-description"
                                >
                                    <Box sx={style}>
                                        <AddImage activeSelectedItem={(e: any) => dataInsert(e)} />
                                    </Box>
                                </Modal>

                                {(!show) ? <Box style={{ marginTop: "5px" }}>

                                    <ReactQuill theme="snow" value={editorimg}
                                        onChange={(e) => handleEditorChange(e)} />
                                </Box> :
                                    <Grid item xs={12} lg={12} md={12} sm={12}>
                                        <div style={{ marginTop: "11px" }}>
                                            <CustomTextField
                                                fullWidth
                                                name="shortdescription"
                                                multiline
                                                minRows={4}
                                                maxRows={7}
                                                placeholder="Short description"
                                                onChange={formik.handleChange}
                                                id='textarea-outlined-controlled'
                                            />

                                        </div>

                                    </Grid>}

                            </CardContent>
                        </Card>

                    </div>
                    <React.Fragment>
                        <SideBarRight
                            sidebarForm={sidebarForm}
                            submitForm={submitForm}
                        />

                    </React.Fragment>
                </form>
            </div>

        </>
    )
}
export default CreatePageEdit;

