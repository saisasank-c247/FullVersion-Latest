import * as React from 'react';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Box, ButtonGroup, Card, CardActionArea, CardActions, CardContent, CardMedia, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, rt, FormHelperText, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, MenuItem, MenuProps, Select, SelectChangeEvent, TextField, Typography, FormControl, FormGroup, Checkbox } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import FolderIcon from '@mui/icons-material/Folder';
import CachedIcon from '@mui/icons-material/Cached';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RecyclingIcon from '@mui/icons-material/Recycling';
import VisibilityIcon from '@mui/icons-material/Visibility';
import LanguageIcon from '@mui/icons-material/Language';
import ImageIcon from '@mui/icons-material/Image';
import VideoFileIcon from '@mui/icons-material/VideoFile';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown19, faArrowDownAZ, faArrowDownZA, faArrowUpAZ, faCircleCheck, faCopy, faDownload, faEye, faFile, faFilter, faFolder, faGlobe, faImage, faPenToSquare, faRecycle, faStar, faTrash, faVideo, faXmark } from '@fortawesome/free-solid-svg-icons';
import CustomTextField from 'src/@core/components/mui/text-field';
import { url } from 'inspector';
import { color } from '@mui/system';
import moment from "moment";
import axios from 'axios';
import WindowIcon from '@mui/icons-material/Window';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import CircularProgress from '@mui/material/CircularProgress';

const getFolderSizes = (apiData: any[]) => {
    let data = [...apiData];
    data.forEach(item => {
        if (item.type == 'folder') {
            let count = 0;
            item.files.forEach((file: any) => {
                count += file.size
            })
            item['size'] = count;
        }
    })
    return data;
}

const AddImage = (props: any) => {
    const [filter, setFilter] = React.useState('');
    const [allMedia, setAllMedia] = React.useState('');
    const [sortValue, setSortValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openDownload, setOpenDownload] = React.useState(false);
    const inputRef = React.useRef();
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [folder, setFolder] = React.useState("");
    console.log(props, "sad");

    const handleRefreshClick = () => {
        loadData();
    }
    const handleChange = (event: SelectChangeEvent) => {
        console.log(event.target.value)
        let selected = event.target.value;
        setFilter(event.target.value);
        // let val = selected == 'Image' ? "image/png" : selected
        let apiDataClo = apiData.filter((e: any) => selected == 'Everything' ? true : e.type == selected);

        // console.log(apiDataClo)
        setApiData(generateSizes(apiDataClo))
    };

    const handleChangeMedia = (event: SelectChangeEvent) => {
        let value = event.target.value;
        setAllMedia(value);
        if (value == 'Trash') {
            console.log(trashData);
            setApiData(val => generateSizes([...trashData]))
            //     let apiDataClo = apiData;
            //     apiDataClo.splice(activeItemIndex,1)
            //     setApiData(val => [...apiDataClo])
            //     changeApiData(apiDataClo);
            // setAllMedia("");

        } else {
            setApiData(cloneApiData)
        }
    };
    const handleChangeSorting = (event: SelectChangeEvent) => {
        setSortValue(event.target.value);
        // if(event.target.value == 'rename'){
        //     let apiDataClo = apiData;
        //     apiDataClo.map((e,i)=> {
        //         if(i == activeItemIndex){
        //             e.name
        //         }
        //         return e
        //     })
        // }
    };

    const handleClickOpen = () => {
        // console.log('Creating folder')
        setOpen(true);
    };
    const handleDownloadClickOpen = () => {
        // console.log('Creating folder')
        setOpenDownload(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleDownloadClose = () => {
        setOpenDownload(false);
    };
    const handleUploadClick = () => {
        inputRef?.current?.click();
    }
    const [activeImg, SetActiveImg] = React.useState('')
    const [activeImgUrl, SetActiveImgUrl] = React.useState('')
    const [inputText, setInputText] = React.useState("");
    const [activeImgUploadDate, SetActiveImgUploadDate] = React.useState([])
    const [searchResults, setSearchResults] = React.useState();
    const [gridView, setGridView] = React.useState(true);
    const [apiData, setApiData] = React.useState<any>([]);
    const [cloneApiData, setCloneApiData] = React.useState<any>([]);
    const [folderName, setFolderName] = React.useState("");
    const [selectedFileId, setSelectedDataId] = React.useState('');
    const [activeItemIndex, setActiveItemIndex] = React.useState();
    const [renameValue, setRenameValue] = React.useState("");
    const [activeItem, SetActiveItem] = React.useState("");
    const [trashData, setTrashData] = React.useState<any>([]);
    const [directions, setDirections] = React.useState<any>([]);
    const [rename, setRename] = React.useState(false);
    const [trash, setTrash] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [resultType, setResultType] = React.useState('')


    const [opens, SetOpens] = React.useState(false);
    const handleChangeOpens = (event: any) => {
        console.log(event, "dfgh");
        if (event == 'rename') {
            {
                setRename(true)
            }
        }
        if (event == 'trash') {
            {
                setTrash(true)
            }
        }
    }
    const handleClickClose = () => {
        setRename(false);
        setTrash(false);
    }
    const handleCloseDropdown = () => {
        setOpen(false)
    }
    const backward = [{ name: "back", type: "back" }];

    const createFolder = () => {
        let name = folderName;
        let id = 0;
        if (apiData.length)
            id = apiData[apiData.length - 1]['id']++;

        let json = storeFile({
            id: id,
            name: name,
            type: "folder",
            createdAt: moment().format("DD-MM-YYYY HH:MM"),
            files: []
        })
        let generated = getFoldersGenerated(json);
        setApiData(generateSizes([...generated]))
        changeApiData([...json]);
        handleClose();
    }

    const storeFile = (file: any) => {
        let tmp = [...cloneApiData];
        console.log("tmp",tmp);
        
        console.log({ directions } , {file})
        if (tmp[directions[0]]) {
            if (tmp[directions[0]].files[directions[1]]) {
                if (tmp[directions[0]].files[directions[1]].files[directions[2]]) {
                    tmp[directions[0]].files[directions[1]].files[
                        directions[2]
                    ].files.push(file);
                } else {
                    tmp[directions[0]].files[directions[1]].files.push(file);
                }
            } else {
                tmp[directions[0]].files.push(file);
            }
        } else {
            tmp.push(file);
        }
        console.log(tmp, directions)
        return tmp;
    };

    const changeApiData = (apiData: any) => {
        setLoading(true)
        axios.post("http://localhost:8000/folder/update", {
            apiData
        }).then(res => {
            setLoading(false)
            console.log(res, "*****");
        })
    }

    const selectedImg = (val: any, index: any) => {
        if (val == activeItem) {
            SetActiveItem("");
            return
        }
        if (val.type == 'back') return
        console.log(val, "cgtvbhnjkml,");
        // setData(val);
        setSelectedDataId(val.id);
        SetActiveImg(val.name)
        setRenameValue(val.name)
        SetActiveImgUrl(val.url)
        SetActiveImgUploadDate(val.createdAt)
        SetActiveItem(val);
        setActiveItemIndex(index)
        setResultType(val.type);
    }

    const handleInsert = () => {
        props.activeSelectedItem(activeItem)
            let src = props.activeSelectedItem?.url
    }
    console.log(activeImgUrl, "activeImgUrl")

    const folderAscOrder = (field: any, isDes: any) => {
        let itemDataClone = [...apiData];
        itemDataClone.sort((a: any, b: any) => {
            const nameA = typeof a[field] == 'string' ? a[field].toUpperCase() : a[field];
            const nameB = typeof b[field] == 'string' ? b[field].toUpperCase() : b[field];

            if (nameA < nameB) {
                return -1; // a should be placed before b
            }
            if (nameA > nameB) {
                return 1; // a should be placed after b
            }
            return 0; // names are equal
        });
        if (isDes) {
            itemDataClone.reverse();
        }
        setApiData(generateSizes(itemDataClone))
    }


    const uploadAscOrder = (field: any, isDes: any) => {
        let itemDataClone = apiData;
        itemDataClone.sort((a: any, b: any) => {
            const nameA = new Date(a[field]);
            const nameB = new Date(b[field]);
            if (nameA < nameB) {
                return -1; // a should be placed before b
            }
            if (nameA > nameB) {
                return 1; // a should be placed after b
            }
            return 0; // names are equal
        });
        if (isDes) {
            itemDataClone.reverse();
        }
        setApiData(generateSizes(itemDataClone))
    }


    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
        const formData = new FormData();
        formData.append('myFile', event.target.files[0]);
        console.log(formData)
        console.log("selectedFile", selectedFile);
        setLoading(true)
        axios({
            method: "post",
            url: "http://localhost:8000/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                setLoading(false);
                console.log(response , "ksdfgh");
                setTimeout(() => {
                    let data = storeFile({
                        id: apiData.length ? apiData[apiData.length - 1]['id'] + 1 : 0,
                        name: response.data.filename,
                        type: response.data.mimetype,
                        createdAt: moment().format("DD-MM-YYYY HH:MM"),
                        size: response.data.size,
                        url: "http://localhost:8000/files/" + response.data.filename
                    })
                    console.log("dta", data);
                    
                    setApiData(generateSizes(getFoldersGenerated([...data])));
                    changeApiData([...data]);
                }, 500);
                // response.data.filename
                
            })
            .catch(function (response) {
                //handle error
                console.log(response);
                setLoading(false)
            });

    };

    const onFileUpload = () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append('file', selectedFile);
            // formData.append('name', selectedFile.name);
            // formData.append('type', selectedFile.type);
            console.log(formData)

        }
    }

    const downloadFile = async () => {

        // window.location.href = "http://localhost:8000/files/admin-myFile-1688034845182.png"

        console.log(activeItem)
        const link = document.createElement('a');
        // link.href = activeItem?.url;
        link.href = await toDataUrl("http://localhost:8000/files/admin-myFile-1688034845182.png")
        // link.target = "_blank";
        link.download = "image.png"
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
    const toDataUrl = (url: any) => {
        return fetch(url)
            .then((response) => {
                return response.blob();
            })
            .then((blob) => {
                return URL.createObjectURL(blob);
            });

    }

    const loadData = () => {
        // setLoading(true)
        axios.get("http://localhost:8000/folder/getAll").then(res => {
            setApiData(generateSizes(res.data))
            setCloneApiData(res.data)
            setDirections([]);
            // setLoading(false);
        })
    }

    const dbClick = (index: number) => {
        setDirections([...directions, index]);
    }

    const getFoldersGenerated = (value: any) => {

        let result = value;
        if (directions.length) {
            directions.forEach((i: any) => {
                console.log(result, "jhgf", apiData[i]);

                result = result[i].files
            })
            return result;
        }
        return value
    }
    const generateDirections = (item: any, index: any) => {
        // console.log("hii*****", item, index);
        if (item.type == "folder") {
            setDirections([...directions, index]);
            // console.log(apiData[index].files, "*********", index);
            //   setApiData([...backward, ...item.files]);
            setApiData(generateSizes(apiData[index].files));
        }
    };
    const back = () => {
        let dir = [...directions];
        dir.pop();
        setDirections(dir);
        if (dir.length == 0) {
            setApiData(generateSizes(cloneApiData));
        } else {
            let tmp = [...cloneApiData];
            dir.forEach((dirItem) => {
                console.log({ tmp });
                if (tmp[dirItem].files) tmp = tmp[dirItem].files;
            });
            setApiData(generateSizes(tmp));
            console.log(tmp, directions);
        }
        console.log(dir);
        // setApiData(cloneApiData);
    };

    React.useEffect(() => {
        loadData();
    }, [])

    const generateSizes = (files: any) => {
        let data = [...files];
        data.forEach((item: any) => {
            if (item.type == 'folder') {
                let count = 0;
                if (item.files && item.files.length) {
                    item.files.forEach((file: any) => {
                        if (file.type != 'folder') {
                            count += file.size
                        }
                    })
                }
                item.size = count;
            }
        })
        console.log("finallllll", data)
        return data;
    }

    // const folderSize = () => {
    //     let itemDataClone = itemData;
    //     let kilobytes = "kb";
    //     let gegabytes = "gb";
    //     let megabytes = "mb";
    //     let bytesData = "bytes"

    //     itemDataClone.sort((a: any, b: any) => {
    //         const sizeA = a.includes(kilobytes);

    //     })

    // }

    const handleRename = () => {

        console.log(renameValue, activeItemIndex);
        let apiDataClo = apiData;
        apiDataClo.map((e: any, i: any) => {
            if (i == activeItemIndex) {
                e.name = renameValue;
            }
            return e
        })
        console.log(apiDataClo);
        setRenameValue("");
        setApiData((val: any) => generateSizes([...apiDataClo]))
        changeApiData(apiDataClo);
        handleClickClose()
    }

    const handleTrash = () => {
        let apiDataClo = apiData;
        if (activeItemIndex) {
            setTrashData([...trashData, apiDataClo[activeItemIndex]])
            apiDataClo.splice(activeItemIndex, 1)
            setApiData(val => generateSizes([...apiDataClo]))
            SetActiveImg("")
            changeApiData(apiDataClo);
        }
        handleClickClose()
    }


    return (
        <>
            {loading ? <div className="loading">Loading&#8230;</div> : null}
            {/* <Dialog open={true} fullWidth maxWidth="sm" sx={{"display":"flex","justify-content":"center"}}>
                <CircularProgress/>
            </Dialog> */}
            <Box sx={{ p: 2, borderBottom: '1px solid #e0d3d3' }}>
                <Button variant="contained" onClick={handleUploadClick} startIcon={<CloudUploadIcon className='iconStyling' />}
                    className='btn btn-success js-dropzone-upload dz-clickable'>Upload</Button>

                <input
                    style={{ display: 'none' }}
                    ref={inputRef}
                    type="file"
                    onClick={onFileUpload}
                    onChange={handleFileChange}
                />

                {/* <Button variant="contained" onClick={handleDownloadClickOpen} startIcon={<CloudDownloadIcon style={{ fontSize: "18px", color: "white" }} />}
                        className='btn btn-success js-dropzone-upload dz-clickable'> Download</Button> */}

                <Dialog open={openDownload} onClose={handleDownloadClose} fullWidth maxWidth="sm">
                    <DialogTitle sx={{ background: "#003d4f", color: "white", display: "flex", justifyContent: "space-between" }} >
                        <div> {<CloudDownloadIcon style={{ fontSize: "18px", color: "white", marginTop: "2px" }} />}
                            <span>Download</span></div>
                        <div> <FontAwesomeIcon icon={faXmark} onClick={handleDownloadClose} style={{ fontSize: "18px", color: "white" }} />
                        </div>
                    </DialogTitle>
                    <Divider />
                    <DialogContent style={{ display: "flex" }}>
                        <FormControl fullWidth ><CustomTextField
                            // autoFocus
                            // margin="dense"
                            id="name"
                            style={{ borderRadius: "0px !important" }}
                            // label="Email Address"
                            // type="folderName"
                            type="text"
                            size="small"
                            fullWidth
                            maxRows={10}
                            minRows={4}
                            multiline
                            variant="standard"
                        /></FormControl>


                        <div><Button variant="contained" style={{ borderRadius: "0px", backgroundColor: "rgb(0, 61, 79)" }}>Download</Button></div>
                    </DialogContent>

                </Dialog>

                <Button variant="contained" onClick={handleClickOpen} startIcon={<FolderIcon style={{ fontSize: "18px", color: "white" }} />}
                    className='btn btn-success js-dropzone-upload dz-clickable'>Create Folder</Button>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                    <DialogTitle sx={{ background: "#003d4f", color: "white", display: "flex", justifyContent: "space-between" }} >
                        <div> {<FolderIcon style={{ fontSize: "18px", color: "white", marginTop: "2px" }} />}
                            Create Folder </div>
                        <div> <FontAwesomeIcon icon={faXmark} onClick={handleClose} style={{ fontSize: "18px", color: "white" }} />
                        </div>
                    </DialogTitle>
                    <Divider />
                    <DialogContent style={{ display: "flex" }}>
                        <FormControl fullWidth >
                            <CustomTextField
                                onChange={(e: any) => setFolderName(e.target.value)}
                                autoFocus
                                // margin="dense"
                                id="name"
                                style={{ borderRadius: "0px !important" }}
                                // label="Email Address"
                                // type="folderName"
                                type="text"
                                size="small"
                                fullWidth
                                variant="standard"
                            /></FormControl>


                        <div><Button onClick={createFolder} variant="contained" style={{ borderRadius: "0px", backgroundColor: "rgb(0, 61, 79)" }}>Create</Button></div>
                    </DialogContent>

                </Dialog>

                <Button variant="contained" startIcon={<CachedIcon style={{ fontSize: "18px", color: "white" }} />}
                    className='btn btn-success js-dropzone-upload dz-clickable' onClick={handleRefreshClick}> Refresh</Button>

                <FormControl className='btn btn-success js-dropzone-upload dz-clickable' sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        className='btn btn-success js-dropzone-upload dz-clickable filterEverything borders'
                        value={filter}
                        onChange={handleChange}
                        displayEmpty
                        sx={{
                            '.MuiSvgIcon-root ': {
                                fill: "white !important",
                            }
                        }}
                        inputProps={{
                            'aria-label': 'Without label'
                        }}
                    >
                        <MenuItem value="" >
                            <span>
                                <FontAwesomeIcon icon={faFilter} /><span>Filter </span></span>
                        </MenuItem>
                        <MenuItem value={"Everything"} onClick={handleRefreshClick} style={{ backgroundColor: "white" }}><FontAwesomeIcon icon={faRecycle} style={{ fontSize: "18px", color: "#e0d3d3" }} /> Everything</MenuItem>
                        <MenuItem value={"image/png"}><ImageIcon style={{ fontSize: "18px", color: "#e0d3d3" }} />Image</MenuItem>
                        <MenuItem value={"video/mp4"}><VideoFileIcon style={{ fontSize: "18px", color: "#e0d3d3" }} /> Video</MenuItem>
                        <MenuItem value={"text/plain"}><InsertDriveFileIcon style={{ fontSize: "18px", color: "#e0d3d3" }} />Document</MenuItem>
                    </Select>
                </FormControl>

                {/* <FormControl className='btn btn-success js-dropzone-upload dz-clickable ' sx={{ m: 1, minWidth: 120 }}>
                    <Select
                        className='btn btn-success js-dropzone-upload dz-clickable viewInMedia'
                        value={allMedia}
                        onChange={handleChangeMedia}
                        sx={{
                            '.MuiSvgIcon-root ': {
                                fill: "white !important",
                            }
                        }}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                        <MenuItem value="" >
                            <span ><FontAwesomeIcon icon={faEye} />View in (<FontAwesomeIcon icon={faGlobe} />AllMedia)</span>
                        </MenuItem>
                        <MenuItem value={"AllMedia"}><LanguageIcon /> All Media</MenuItem>
                        <MenuItem value={"Trash"}><DeleteIcon /> Trash</MenuItem>
                        <MenuItem value={"Recent"}><AccessTimeIcon /> Recent</MenuItem>
                        <MenuItem value={"Favorites"}><StarIcon /> Favorites</MenuItem>
                    </Select>
                </FormControl> */}

                <TextField
                    className='searchField'
                    id="standard-bare"
                    variant="outlined"
                    placeholder="Search in current folder"
                    onChange={(e: any) => setSearchResults(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <IconButton>
                                <SearchOutlined />
                            </IconButton>
                        ),
                    }}
                />

            </Box>
            <Box className='mediaDiv' sx={{ p: 2, borderBottom: '1px solid #e0d3d3' }}>
                <Button style={{ color: "black" }} variant="text" startIcon={<PersonIcon />} >All media</Button>
                <Box>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            className='sortDropdown'
                            value=""
                            onChange={handleChangeSorting}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <MenuItem value="" sx={{ display: 'none' }}>
                                <span className='actionsDropdown'>Sort<FontAwesomeIcon icon={faArrowDownAZ} /> </span>
                            </MenuItem>
                            {/* <MenuItem value={"AllMedia"}>All Media</MenuItem> */}
                            <MenuItem value={"filenameAsc"} onClick={() => folderAscOrder('name', false)}><FontAwesomeIcon icon={faArrowUpAZ} /> File name - ASC</MenuItem>
                            <MenuItem value={"filenameDesc"} onClick={() => folderAscOrder('name', true)}><FontAwesomeIcon icon={faArrowDownZA} />File name - DESC</MenuItem>
                            <MenuItem value={"uploadedDateAsc"} onClick={() => uploadAscOrder('createdAt', false)}><FontAwesomeIcon icon={faArrowDown19} /> Uploaded date - ASC</MenuItem>
                            <MenuItem value={"uploadedDateDesc"} onClick={() => uploadAscOrder('createdAt', true)}><FontAwesomeIcon icon={faArrowDown19} />Uploaded date - DESC</MenuItem>
                            <MenuItem value={"sizeAsc"} onClick={() => folderAscOrder('size', false)}><FontAwesomeIcon icon={faArrowDown19} />Size - ASC</MenuItem>
                            <MenuItem value={"sizeDesc"} onClick={() => folderAscOrder('size', true)}><FontAwesomeIcon icon={faArrowDown19} />Size - DESC</MenuItem>

                        </Select>
                        {/* <FormHelperText>Without label</FormHelperText> */}
                    </FormControl>
                    {
                        activeItem ?
                            <FormControl className="actionsDropdownDiv" sx={{ m: 1, minWidth: 120 }}>
                                <Select
                                    className='actionsDropdown'
                                    value=""
                                    onChange={handleChangeSorting}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'Without label' }}
                                >
                                    <MenuItem value="" >
                                        <span className='actionsDropdown'>Actions </span>
                                    </MenuItem>
                                    {/* <MenuItem value={"AllMedia"}>All Media</MenuItem> */}
                                    <MenuItem value={"rename"} onClick={() => handleChangeOpens('rename')} className='actionsDropdown'> <FontAwesomeIcon icon={faPenToSquare} /> Rename</MenuItem>
                                    {/* <MenuItem value={"copy"} className='actionsDropdown'><FontAwesomeIcon icon={faCopy} /> Make a copy</MenuItem>
                            <MenuItem value={"favorite"} className='actionsDropdown'><FontAwesomeIcon icon={faStar} /> Add to favorite</MenuItem> */}
                                    {
                                        activeItem && activeItem['type'] !== 'folder' ? <MenuItem value={"download"} className='actionsDropdown' onClick={downloadFile}><FontAwesomeIcon icon={faDownload} /> Download</MenuItem> : null
                                    }



                                    {/* <MenuItem value={"trash"} className='actionsDropdown' onClick={() => handleChangeOpens('trash')}><FontAwesomeIcon icon={faTrash} /> Move to trash</MenuItem> */}

                                </Select>
                                {/* <FormHelperText>Without label</FormHelperText> */}
                            </FormControl> : null
                    }


                    <ButtonGroup className='buttonGroup324' variant="outlined" aria-label="outlined button group" >
                        <Button onClick={() => setGridView(true)} style={{
                            padding: "10px", height: "40px", color: "black",
                            border: "1px solid black"
                        }}><GridViewIcon /></Button>
                        <Button onClick={() => setGridView(false)} style={{
                            padding: "10px", height: "40px", color: "black",
                            border: "1px solid black"
                        }}> <ViewListIcon /></Button>
                    </ButtonGroup>
                    <ExitToAppIcon sx={{ color: "blue" }} />


                </Box>
            </Box>

            <Grid container sx={{ height: "400px" }}>
                <Grid item lg={activeItem ? 9 : 12}>
                    <Box className={gridView ? 'fullDiv' : ''} sx={{ width: "100%", borderRight: "1px solid #e0d3d3", overflowY: "scroll", maxHeight: "60vh" }}>

                        {directions.length ? <Card className='allCards' onDoubleClick={back}>
                            {/* <span ><FontAwesomeIcon className='tickIcon' icon={faCircleCheck} /></span> */}
                            {gridView ? <> <span className='folderIcons' >
                                <FontAwesomeIcon className='allCards' icon={faFolder} />

                            </span>
                                <CardContent className='cardTitle' sx={{ backgroundColor: `#rgba(47, 43, 61, 0.78)`, color: `#rgba(47, 43, 61, 0.78)` }} >
                                    <Typography className='cardTitleInnerText' sx={{ backgroundColor: `#rgba(47, 43, 61, 0.78)`, color: `#rgba(47, 43, 61, 0.78)` }} gutterBottom variant="h5" component="div">
                                        Back
                                    </Typography>
                                </CardContent></>
                                :
                                <div className="evenOdd div_hover ">
                                    <div className="backButton" style={{ marginLeft: "12px", padding: "10px" }}>
                                        <FontAwesomeIcon icon={faFolder} />
                                        Back
                                    </div>
                                </div>}
                        </Card> : ""}
                        {apiData.filter((item: any) => {
                            if (!searchResults) return apiData
                            if (item.name.includes(searchResults)) {
                                return true
                            }
                        })
                            .map((item: any, index: any) => (
                                <>
                                    {gridView ? <Box className='imagesBox' onClick={() => selectedImg(item, index)} onDoubleClick={() => generateDirections(item, index)} sx={{ border: item.name == activeImg ? `3px solid blue` : `` }}>
                                        <Card className='allCards' >

                                            <span >{item.name == activeItem["name"] ? <FontAwesomeIcon className='tickIcon' icon={faCircleCheck} /> : ``}</span>
                                            <span className='folderIcons'>
                                                {item.type == "folder" ? <FontAwesomeIcon icon={faFolder} /> :
                                                    (item.type == "image/png" ? <img className='allCardsImages' src={item.url ? item.url : <FontAwesomeIcon icon={faImage} />} alt='image' /> :
                                                        (item.type == "video/mp4" ? <FontAwesomeIcon className='videoIcon' icon={faVideo} /> :
                                                            (item.type == "text/plain" ? <FontAwesomeIcon className='videoIcon' icon={faFile} /> : '')))
                                                }
                                            </span>
                                            <CardContent className='cardTitle' sx={{ backgroundColor: item.name == activeImg ? `blue` : `#e2e5dd`, color: item.name == activeImg ? `white` : `#rgba(47, 43, 61, 0.78)` }} >
                                                <Typography className='cardTitleInnerText' sx={{ backgroundColor: item.name == activeImg ? `blue` : `#e2e5dd`, color: item.name == activeImg ? `white` : `#rgba(47, 43, 61, 0.78)` }} gutterBottom variant="h5" component="div">
                                                    {item.name}
                                                </Typography>

                                            </CardContent>

                                        </Card>
                                    </Box>
                                        :
                                        <FormGroup onClick={() => selectedImg(item, index)} onDoubleClick={() => generateDirections(item, index)}>

                                            <div className="evenOdd div_hover" >
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} >
                                                    <div> <span ><Checkbox checked={item.name == activeImg} /></span>
                                                        {item.type == "folder" ? <FontAwesomeIcon className='listViewIcons' icon={faFolder} /> :
                                                            (item.type == "image/png" ? <FontAwesomeIcon className='listViewIcons' icon={faImage} /> :
                                                                (item.type == "video/mp4" ? <FontAwesomeIcon className='listViewIcons' icon={faVideo} /> :
                                                                    (item.type == "text/plain" ? <FontAwesomeIcon className='listViewIcons' icon={faFile} /> : '')))
                                                        }{item.name}
                                                    </div>
                                                    <div>{item.createdAt}</div>
                                                </div>
                                            </div>
                                        </FormGroup>
                                    }
                                </>
                            ))}
                    </Box>
                </Grid>
                {activeItem ? <Grid item lg={3} className='resultImageDiv'>
                    <Box >

                        {
                            activeImgUrl && resultType == "image/png" ? <img className='resultCardImg' src={activeImgUrl ? activeImgUrl : <FontAwesomeIcon className='resultIcons' icon={faImage} />} alt='image' /> : (activeImgUrl && resultType == "video/mp4" ? <FontAwesomeIcon className='resultIcons' icon={faVideo} /> : (activeImgUrl && resultType == "text/plain" ? <FontAwesomeIcon className='resultIcons' icon={faFile} /> : <FontAwesomeIcon className='resultIcons' icon={faFolder} />))
                        }


                        {/* {activeImgUrl
                            ?
                            <img className='resultCardImg' src={activeImgUrl ? activeImgUrl : '' } alt='image' />
                            :
                        } */}

                        {/* <img className='allCards' src={activeImgUrl} alt='image' /> */}

                    </Box>

                    <Grid className='resultDesc'>
                        <Typography className='actionsDropdown'>Name</Typography>
                        <Typography>{activeImg}</Typography>
                        <Typography className='actionsDropdown'>Uploaded at</Typography>

                        {/* console.log(apiData.createdAt , "apiData.createdAt"); */}

                        <Typography>{activeImgUploadDate}</Typography>
                    </Grid>

                </Grid> : null}

            </Grid>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={rename}
                onClose={handleCloseDropdown}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ background: "#003d4f", color: "white", display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
                    <div style={{ display: "flex" }}>
                        < WindowIcon /> Rename
                    </div>
                    <div>
                        <CloseRoundedIcon onClick={handleClose} style={{ fontSize: "20px", color: "white" }} />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <FolderIcon /><CustomTextField
                                type="text"
                                fullWidth
                                sx={{ marginRight: "13px" }} value={renameValue}
                                onChange={(event) => { setRenameValue(event.target.value) }} />
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button size="small" onClick={handleClickClose}>Close</Button>
                    <Button size="small" variant="contained" onClick={handleRename}>Save Changes</Button>
                </DialogActions>
            </Dialog>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={trash}
                onClose={handleCloseDropdown}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" sx={{ background: "#003d4f", color: "white", display: "flex", justifyContent: "space-between", fontSize: "16px" }}>
                    <div style={{ display: "flex" }}>
                        < WindowIcon /> Move items to trash
                    </div>
                    <div>
                        <CloseRoundedIcon onClick={handleClose} style={{ fontSize: "20px", color: "white" }} />
                    </div>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <label style={{ color: "black" }}>
                            Are you sure you want to move these items to trash?
                        </label>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button size="small" color='warning' variant="contained" onClick={handleTrash}>Confirm</Button>
                    <Button size="small" variant="contained" onClick={handleClickClose}>Close</Button>
                </DialogActions>
            </Dialog>

            <div style={{float: "right"}}>{activeItem && activeItem['type'] !== 'folder' ?   <Button className="insertButton"variant="contained" onClick={handleInsert}>Insert</Button> : ''}</div>
        </>
    )
}

export default AddImage