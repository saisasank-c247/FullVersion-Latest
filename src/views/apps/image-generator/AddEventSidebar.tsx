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
import TitlebarImageList from "./TitlebarImageList";
const stylesData = [{
    id: 0,
    url: "https://gencraft.com/api_resources/images/art_styles/ic_style_cartoon.jpg",
    name: "Cartoon"
},
{
    id: 1,
    url: "https://gencraft.com/api_resources/images/art_styles/ic_style_oil_painting.jpg",
    name: "Oil painting"
}, {
    id: 2,
    url: "https://gencraft.com/api_resources/images/art_styles/ic_style_floral.jpg",
    name: "Floral"
},
{
    id: 3,
    url: "https://gencraft.com/api_resources/images/art_styles/ic_style_valentines.jpg",
    name: "Valentine"
}, {
    id: 4,
    url: "https://gencraft.com/api_resources/images/art_styles/ic_style_3d.jpg",
    name: "3D"
}, {
    id: 5,
    url: "https://gencraft.com/api_resources/images/art_styles/ic_style_anime.jpg",
    name: "Anime"
}, {
    id: 6,
    url: "https://gencraft.com/api_resources/images/art_styles/ic_style_ink.jpg",
    name: "Ink"
}, {
    id: 7,
    url: "https://gencraft.com/api_resources/images/art_styles/ic_style_watercolor.jpg",
    name: "Watercolor"
}, {
    id: 8,
    url: "https://gencraft.com/api_resources/images/art_styles/ic_style_abstract.jpg",
    name: "Abstract"
}, {
    id: 9,
    url: "https://gencraft.com/api_resources/images/art_styles/ic_style_transparent.jpg",
    name: "Transparent"
},
{
    id: 10,
    url: "https://gencraft.com/api_resources/images/art_styles/ic_style_polaroid.jpg",
    name: "Polaroid"
},

]

interface DefaultStateType {
    url: string
    enterText: string
    numberImages: any
    size: any
}
const defaultState: DefaultStateType = {
    url: '',
    enterText: '',
    numberImages: '',
    size: ''
}

export const AddEventSidebar = (props: AddEventSidebarType) => {
    const {
        drawerWidth,
        addEventSidebarOpen,
        handleAddEventSidebarToggle,
        dataGet
    } = props

    const [numberOfImages, setNumberOfImages] = React.useState<any>()
    const [imageSize, setImageSize] = useState('256x256');
    const [styleImage, setStyleImage] = useState("")
    const [loading, setLoading] = useState(false);

    const {
        control,
        setValue,
        reset,
        clearErrors,
        handleSubmit,
        formState: { errors }
        
    } = useForm({ defaultValues: { text: '' } })
    const [values, setValues] = React.useState<DefaultStateType>(defaultState)
    const handleSidebarClose = async () => {
        setValues(defaultState)
        clearErrors()
        handleAddEventSidebarToggle()
    }
    
    const handleImgStyle = (val: any) => {
        console.log(val);
        setStyleImage(val)
    }
    const onSubmit = (data: { title: string, numberof: string },e:any) => {
        console.log(data);
       
        const modifiedEvent = {
            "prompt": data.title + ' ' + styleImage,
            "n": JSON.parse(data.numberof),
            "size": imageSize
        }
        dataGet(modifiedEvent)
        resetToEmptyValues()
        handleSidebarClose()
        
    }

    const handleSelectChange = (event: SelectChangeEvent<string[]>) => {
        setImageSize(event.target.value as string[])
    }

    const resetToEmptyValues = () => {
       reset({title:'',numberof:''});
       setStyleImage("");
       setImageSize('256x256');
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
                        Image Generator
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
                <Box className='sidebar-body' sx={{ p: theme => theme.spacing(0, 6, 6) }}>
                    <form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
                        <Controller
                            name='title'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    label='Image Name'
                                    value={value}
                                    sx={{ mb: 4 }}
                                    onChange={onChange}
                                    placeholder='Image Name'
                                />
                            )}
                        />

                        <Controller
                            name='numberof'
                            control={control}
                            rules={{ required: true }}
                            render={({ field: { value, onChange } }) => (
                                <CustomTextField
                                    fullWidth
                                    label='Number Of Images'
                                    value={value}
                                    sx={{ mb: 4 }}
                                    type="number"
                                    onChange={onChange}
                                    placeholder='Number Of Images'
                                />
                            )}
                        />

                        <Box sx={{ mb: 4 }}>
                            <CustomTextField
                                select
                                fullWidth
                                defaultValue=''
                                label='Image Size'
                                id='form-layouts-separator-multiple-select'
                                SelectProps={{
                                    multiple: false,
                                    value: imageSize,
                                    onChange: e => handleSelectChange(e as SelectChangeEvent<string[]>)
                                }}
                            >
                                <MenuItem value='256x256'>256x256</MenuItem>
                                <MenuItem value='512x512'>512x512</MenuItem>
                                <MenuItem value='1024x1024'>1024x1024</MenuItem>

                            </CustomTextField>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <TitlebarImageList themeClick={handleImgStyle} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Fragment>
                                <Button type='submit' variant='contained' sx={{ mr: 4 }}>
                                    Generate
                                </Button>
                                <Button type='button' variant='tonal' color='secondary' onClick={resetToEmptyValues}  >
                                    Reset
                                </Button>
                            </Fragment>
                        </Box>
                    </form>
                </Box>
            </Drawer>
        </>
    )
}

