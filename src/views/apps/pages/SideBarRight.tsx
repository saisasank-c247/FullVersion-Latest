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
import { Card, CardContent, FormControl, MenuItem, SelectChangeEvent, Select } from '@mui/material'
import { Label } from 'recharts'
import { useFormik } from 'formik'
import React from 'react'
import CustomTextField from 'src/@core/components/mui/text-field'
import { SidebarRightType } from 'src/types/apps/pageTypes'

const SideBarRight = (props: any) => {
    const { submitForm } = props;
    const [status, setStatus] = React.useState(props.status || 'Draft');
    const [template, setTemplate] = React.useState(props.template || 'BlogSidebar');
    const [image, setImage] = React.useState(props.image || '');

    return (
        <div style={{ display: "flex", flexDirection: "column", justifyContent:"center",alignItems:"flex-end" }}>
            <Card sx={{ width: "100%" }} square>
                <CardContent>
                    <Typography variant='h6' sx={{ color: "darkblue" }}>Publish</Typography>
                    <Divider />
                    <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Button variant="contained" size="small" type="button" onClick={() => submitForm(status, template, image)} style={{ marginTop: "10px",  }} startIcon={<SaveIcon />}>Save & Exit</Button>
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
                        <img src={image?image:"https://www.freeiconspng.com/thumbs/photography-icon-png/photo-album-icon-png-14.png"} height="177px" width="179px" />
                    </div>
                    <div style={{
                        display: 'flex',
                        margin: 'auto',
                        flexWrap: 'wrap',
                    }}>

                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="contained-button-file"
                        />
                        <label htmlFor="contained-button-file">
                            <Button color="primary" component="span" sx={{ borderColor: "white", color: "#337ab7" }}>
                                Choose a file
                            </Button>
                        </label>

                    </div>
                </CardContent>
            </Card>
        </div>
    )
}


export default SideBarRight
