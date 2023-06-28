import { TextField, Select, Box, Drawer } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid/Grid";
import React, { Fragment, useCallback, useState } from "react";
import * as yup from "yup";
import MenuItem from '@mui/material/MenuItem'
import { AddEventSidebarType } from 'src/types/apps/imagegeneratorTypes'
import { Controller, useForm } from "react-hook-form";
import CustomTextField from "src/@core/components/mui/text-field";
import axios from "axios";
import Icon from 'src/@core/components/icon'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { Label } from "recharts";
import Button from '@mui/material/Button'
import OptionsMenu from "src/@core/components/option-menu";
import { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack';
import { useFormik } from "formik";


interface DefaultStateType {
    name: string
    email: string

}
const defaultState: DefaultStateType = {
    name: 'test',
    email: 'uyeug',

}
const validationSchema = yup.object({
    name: yup.string().min(3, "it is too short").required("Enter your Name"),
    email: yup.string().required("Email is required")
})

export const AddUserSidebar = (props: AddEventSidebarType) => {
    const {
        drawerWidth,
        addEventSidebarOpen,
        handleAddEventSidebarToggle,
        addUser,
        dataGet
    } = props


    const {
        control,
        setValue,
        reset,
        clearErrors,
        handleSubmit,
        formState: { errors }

    } = useForm({ defaultValues: { name: '' } })
    const [values, setValues] = React.useState<DefaultStateType>(defaultState)
    const [error, setError] = React.useState("")
    const [showError, setShowError] = React.useState(false)
    const handleSidebarClose = async () => {
        setValues(defaultState)
        clearErrors()
        handleAddEventSidebarToggle()
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            email: ""
        },
        validationSchema: validationSchema,
        onSubmit: (values: any) => {
            console.log(values);
            setShowError(false)
            dataGet(values)
            // addUser(values)
            resetToEmptyValues()
            handleSidebarClose()
        }
    })
    // const onSubmit = (data: { name: string, email: string }, e: any) => {
    //     const modifiedEvent = {
    //         "name": data.name,
    //         "email": data.email,
    //     }
    //     console.log(modifiedEvent, "djhfkjghfk")



    // }
    const handleSidebarToggleSidebar = () => {
        handleAddEventSidebarToggle()
        // dispatch(handleSelectEvent(null))
    }


    const resetToEmptyValues = () => {
        // reset({ formik.initialValue.name: '', email: '' });
    }

    return (
        <>
            <Drawer
                anchor='right'
                open={addEventSidebarOpen}
                onClose={handleSidebarClose}
                ModalProps={{ keepMounted: true }}
                sx={{ '& .MuiDrawer-paper': { width: ['100%', drawerWidth] } }}
            >

                <Box
                    className='sidebar-header'
                    sx={{
                        p: 6,
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}
                >
                    <Typography variant='h5'>
                        Add User
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <IconButton
                            size='small'
                            onClick={handleSidebarClose}
                            sx={{
                                p: '0.375rem',
                                borderRadius: 1,
                                color: 'text.primary',
                                backgroundColor: 'action.selected',
                                '&:hover': {
                                    backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
                                }
                            }}
                        >
                            <Icon icon='tabler:x' fontSize='1.25rem' />
                        </IconButton>
                    </Box>
                </Box>
                <form onSubmit={formik.handleSubmit}>
                    <Box className='sidebar-body' sx={{ p: theme => theme.spacing(0, 6, 6) }}>

                        {/* <Controller
                            name='name'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    label='Name'
                                    value={value}
                                    sx={{ mb: 4 }}
                                    onChange={onChange}
                                    placeholder='Enter Name'
                                />
                            )}
                        /> */}
                        <label>Name</label>
                        <TextField type="text" size="small" sx={{ mb: 4 }} fullWidth name="name" value={formik.values.name} onChange={formik.handleChange} helperText={formik.touched.name && formik.errors.name} error={formik.touched.name && Boolean(formik.errors.name)} placeholder="Enter Name" />
                        <label>Email</label>  
                        <TextField type="email" sx={{ mb: 4 }} size="small" name="email" value={formik.values.email} onChange={formik.handleChange} helperText={formik.touched.email && formik.errors.email} error={formik.touched.email && Boolean(formik.errors.email)} fullWidth placeholder="Enter Email" />

                        {/* <Controller
                            name='email'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    label='Email'
                                    value={value}
                                    sx={{ mb: 4 }}
                                    type="text"
                                    onChange={onChange}
                                    placeholder='Enter Email'
                                />
                            )}
                        /> */}



                        {/* <Box sx={{ mb: 4 }}>
                            <TitlebarImageList themeClick={handleImgStyle} />
                        </Box> */}
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                                Save
                            </Button>
                            <Button type='button' variant='tonal' color='secondary' onClick={resetToEmptyValues}  >
                                Reset
                            </Button>
                        </Box>

                    </Box>
                </form>
            </Drawer>
        </>
    )
}

