// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import Divider from '@mui/material/Divider'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import FormControlLabel from '@mui/material/FormControlLabel'
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import * as yup from "yup"
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// ** Third Party Imports
import DatePicker from 'react-datepicker'
// ** Icons Imports
import Icon from 'src/@core/components/icon'
// ** Types
import { ThemeColor } from 'src/@core/layouts/types'
// ** Styled Component
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { Card, CardContent, FormControl, MenuItem, SelectChangeEvent, Select, Modal } from '@mui/material'
import { Label } from 'recharts'
import { useFormik } from 'formik'
import React from 'react'
import CustomTextField from 'src/@core/components/mui/text-field'
import { SidebarRightType } from 'src/types/apps/pageTypes'
import axios from 'axios'
import AddImage from './AddImage'

const SideBarRight = (props: any) => {
    const { submitForm } = props;
    const [status, setStatus] = React.useState(props.status || 'Draft');
    const [template, setTemplate] = React.useState(props.template || 'BlogSidebar');
    const [image, setImage] = React.useState(props.image || '');

    const [openModal, setOpenModal] = React.useState(false);
    const handleInsertOpen = () => setOpenModal(true);
    const handleInsertClose = () => setOpenModal(false);
    const [activeSelectedItem, setActiveSelectedItem] = React.useState()
    const [editorimg, setEditorimg] = React.useState('');

    const dataInsert=(e : any)=>{
        setActiveSelectedItem(e); 
        handleInsertClose();
        setImage(e.url)
        console.log(e , image, "dskfb");
        
    let linkTag = "<a href='" + e.url + "'>" + e.url  + "</a>";
      let imgTag ="<img width='200px' src='" + e.url + "'/>"
        let code = e.type == "image/png" ? imgTag: linkTag
         setEditorimg(editorimg + code) 
      }
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
      const handleEditorChange = (e: any) => {
        setEditorimg(e);
       }
    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "flex-end" }}>
            <Card sx={{ width: "100%" }} square>
                <CardContent>
                    <Typography variant='h6' sx={{ color: "darkblue" }}>Publish</Typography>
                    <Divider />
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <Button variant="contained" size="small" type="button" onClick={() => submitForm(status, template, image)} style={{ marginTop: "10px", }} startIcon={<SaveIcon />}>Save & Exit</Button>
                    </div>
                </CardContent>
            </Card>
            <Card sx={{ width: "100%", marginTop: "10px" }} square>
                <CardContent>
                    <Box component={'span'} sx={{ width: "100%", display: "flex" }}>
                        <label style={{ color: "darkblue" }}>Status</label>
                        <span style={{ color: "red" }}>*</span>
                    </Box>
                    <Divider />
                    <Box>
                        <FormControl sx={{ m: 1, width: "100%", marginTop: "20px" }}>
                            <Select
                                value={status}
                                name="status"
                                onChange={(e) => setStatus(e.target.value)}
                                fullWidth
                                size="small"
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="" >
                                    <em >Published</em>
                                </MenuItem>
                                <MenuItem value={"Draft"}>Draft</MenuItem>
                                <MenuItem value={"Pending"}>Pending</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </CardContent>
            </Card>
            <Card sx={{ width: "100%", marginTop: "20px" }} square>
                <CardContent>
                    <Box component={'span'} sx={{ width: "100%", display: "flex" }}>
                        <label style={{ color: "darkblue" }}>Template</label>
                        <span style={{ color: "red" }}>*</span></Box>
                    <Box>
                        <Divider />
                        <FormControl sx={{ m: 1, width: "100%", marginTop: "15px" }}>
                            <Select
                                value={template}
                                name="template"
                                onChange={(e) => setTemplate(e.target.value)}
                                fullWidth
                                size="small"
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                            >
                                <MenuItem value="" >
                                    <em >Default</em>
                                </MenuItem>
                                <MenuItem value={"BlogSidebar"}>BlogSidebar</MenuItem>
                                <MenuItem value={"FullWidth"}>FullWidth</MenuItem>
                                <MenuItem value={"HomePage"}>HomePage</MenuItem>
                                <MenuItem value={"CommingSoon"}>CommingSoon</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </CardContent>
            </Card>
            <Card style={{ width: "100%", marginTop: "20px" }} square>
                <CardContent>
                    <label style={{ color: "darkblue", width: "100%", display: "flex", marginTop: "2px" }}>Image</label>
                    <Divider />
                    <div >
                    <img src={image ? image : "https://www.freeiconspng.com/thumbs/photography-icon-png/photo-album-icon-png-14.png"} height="177px" width="179px" value={editorimg} onChange={(e) => handleEditorChange(e)} />
                    </div>
                    <div style={{
                        display: 'flex',
                        margin: 'auto',
                        flexWrap: 'wrap',
                    }}>


                        <label htmlFor="contained-button-file">
                            <Button color="primary" component="span" sx={{ borderColor: "white", color: "#337ab7" }} onClick={handleInsertOpen}>
                                Choose a file
                            </Button>
                            <Modal
                                open={openModal}
                                onClose={handleInsertClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <AddImage activeSelectedItem={(e: any) => dataInsert(e)} />
                                </Box>
                            </Modal>
                        </label>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


export default SideBarRight
