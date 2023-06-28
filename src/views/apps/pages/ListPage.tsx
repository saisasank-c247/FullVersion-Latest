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
import { faArrowDown19, faArrowDownAZ, faArrowDownZA, faArrowUpAZ, faCircleCheck, faCopy, faDownload, faEye, faFilter, faFolder, faGlobe, faPenToSquare, faRecycle, faStar, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import CustomTextField from 'src/@core/components/mui/text-field';
import { url } from 'inspector';
import { color } from '@mui/system';
import * as moment from "moment";
import axios from 'axios';



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

const ListPage = () => {
    const [filter, setFilter] = React.useState('');
    const [allMedia, setAllMedia] = React.useState('');
    const [sortValue, setSortValue] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [openDownload, setOpenDownload] = React.useState(false);
    const inputRef = React.useRef();
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [folder, setFolder] = React.useState("");

    const handleRefreshClick = () => {
        loadData();
    }
    const handleChange = (event: SelectChangeEvent) => {
        setFilter(event.target.value);
    };

    const handleChangeMedia = (event: SelectChangeEvent) => {
        setAllMedia(event.target.value);
    };
    const handleChangeSorting = (event: SelectChangeEvent) => {
        setSortValue(event.target.value);
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
    const [activeItem, SetActiveItem] = React.useState("");
    const [directions, setDirections] = React.useState<any>([]);
    // React.useEffect(() => {
    //     // console.log(searchResults, "search");

    //     // const result = apiData.filter((item: any) => {
    //     //     console.log(item.name, "dsfs");

    //     //     item.name.toLowerCase().includes(searchResults)
    //     // });
    //     // setSearchResults(result);
    // }, [1])

    const createFolder = () => {
        let name = folderName;
        let id = 0;
        if (apiData.length)
            id = apiData[apiData.length - 1]['id']++;

        let json = {
            id: id,
            name: name,
            type: "folder",
            createdAt: moment().format("DD-MM-YYYY HH:MM"),
            files: []
        }
        setApiData([...apiData, json])
        changeApiData([...apiData, json]);
        handleClose();
    }

    const changeApiData = (apiData: any) => {
        axios.post("http://localhost:8000/folder/update", {
            apiData
        }).then(res => { })
    }

    const selectedImg = (val: any) => {
        console.log(val);
        // setData(val);
        setSelectedDataId(val.id);
        SetActiveImg(val.name)
        SetActiveImgUrl(val.url)
        SetActiveImgUploadDate(val.createdAt)
        SetActiveItem(val);
    }

    const folderAscOrder = (field: any, isDes: any) => {
        let itemDataClone = [...apiData];
        itemDataClone.sort((a: any, b: any) => {
            const nameA = a[field].toUpperCase();
            const nameB = b[field].toUpperCase();

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
        setApiData(itemDataClone)
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
        // console.log(itemDataClone);
        if (isDes) {
            itemDataClone.reverse();
        }
        setApiData(itemDataClone)
    }


    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
        const formData = new FormData();
        formData.append('myFile', event.target.files[0]);
        // formData.append('name', selectedFile.name);
        // formData.append('type', selectedFile.type);
        console.log(formData)
        console.log("selectedFile", selectedFile);
        axios({
            method: "post",
            url: "http://localhost:8000/upload",
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
            .then(function (response) {
                //handle success
                console.log(response);
                // response.data.filename
                let data = [...apiData];
                data.push({
                    id: apiData.length ? apiData[apiData.length - 1]['id'] + 1 : 0,
                    name: response.data.filename,
                    type: response.data.mimetype,
                    createdAt: moment().format("DD-MM-YYYY HH:MM"),
                    size: response.data.size,
                    url: "http://localhost:8000/files/" + response.data.filename
                })
                setApiData(data);
                changeApiData(data);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
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

    const downloadFile = () => {
        console.log(activeItem)
        const link = document.createElement('a');
        link.href = activeItem?.url;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    const loadData = () => {
        axios.get("http://localhost:8000/folder/getAll").then(res => {
            setApiData(res.data)
            setCloneApiData(res.data)
        })
    }

    const dbClick = (index: number) => {
        setDirections([...directions, index]);
    }

    const getFoldersGenerated = (value: any) => {
        if (directions.length) {
            return value[directions[value.length]]
        } else {
            return value
        }
    }

    React.useEffect(() => {
        loadData();
    }, [])

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

    return (
        <>
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
                        className='btn btn-success js-dropzone-upload dz-clickable filterEverything'
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
                                <FontAwesomeIcon icon={faFilter} /><span>Filter </span>
                                (<FontAwesomeIcon icon={faRecycle} /><span>Everything</span>)</span>
                        </MenuItem>
                        <MenuItem value={"Everything"} style={{ backgroundColor: "white" }}><RecyclingIcon style={{ fontSize: "18px", color: "#e0d3d3" }} /> Everything</MenuItem>
                        <MenuItem value={"Image"}><ImageIcon style={{ fontSize: "18px", color: "#e0d3d3" }} />Image</MenuItem>
                        <MenuItem value={"Video"}><VideoFileIcon style={{ fontSize: "18px", color: "#e0d3d3" }} /> Video</MenuItem>
                        <MenuItem value={"Document"}><InsertDriveFileIcon style={{ fontSize: "18px", color: "#e0d3d3" }} />Document</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className='btn btn-success js-dropzone-upload dz-clickable ' sx={{ m: 1, minWidth: 120 }}>
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
                </FormControl>

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
                            <MenuItem value={"sizeAsc"}><FontAwesomeIcon icon={faArrowDown19} />Size - ASC</MenuItem>
                            <MenuItem value={"sizeDesc"}><FontAwesomeIcon icon={faArrowDown19} />Size - DESC</MenuItem>

                        </Select>
                        {/* <FormHelperText>Without label</FormHelperText> */}
                    </FormControl>

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
                            {/* <MenuItem value={"rename"} className='actionsDropdown'> <FontAwesomeIcon icon={faPenToSquare} /> Rename</MenuItem>
                            <MenuItem value={"copy"} className='actionsDropdown'><FontAwesomeIcon icon={faCopy} /> Make a copy</MenuItem>
                            <MenuItem value={"favorite"} className='actionsDropdown'><FontAwesomeIcon icon={faStar} /> Add to favorite</MenuItem> */}
                            <MenuItem value={"download"} className='actionsDropdown' onClick={downloadFile}><FontAwesomeIcon icon={faDownload} /> Download</MenuItem>
                            {/* <MenuItem value={"trash"} className='actionsDropdown'><FontAwesomeIcon icon={faTrash} /> Move to trash</MenuItem> */}

                        </Select>
                        {/* <FormHelperText>Without label</FormHelperText> */}
                    </FormControl>

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
                <Grid item lg={activeImg ? 9 : 12}>
                    <Box className={gridView ? 'fullDiv' : ''} sx={{ width: "100%", borderRight: "1px solid #e0d3d3" }}>
                        {getFoldersGenerated(apiData).filter((item: any) => {
                            if (!searchResults) return apiData
                            if (item.name.includes(searchResults)) {
                                return true
                            }
                        })
                            .map((item: any) => (
                                <>
                                    {gridView ? <Box className='imagesBox' onClick={() => selectedImg(item)} sx={{ border: item.name == activeImg ? `3px solid blue` : `` }}>
                                        <Card className='allCards' >

                                            <span >{item.name == activeImg ? <FontAwesomeIcon className='tickIcon' icon={faCircleCheck} /> : ``}</span>
                                            <span className='folderIcons' >
                                                {item.type == "folder" ? <FontAwesomeIcon icon={faFolder} /> : <img className='allCardsImages' src={item.url ? item.url : 'https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png'} alt='image' />
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
                                        <FormGroup>

                                            <div className="evenOdd div_hover" style={{ display: "flex", justifyContent: "space-between" }}>
                                                <div style={{ display: "flex", alignItems: "center" }} >
                                                    <Checkbox /><FolderIcon />stores 2023-05-28 14:23:04
                                                </div>
                                            </div>
                                        </FormGroup>
                                    }
                                </>
                            ))}
                    </Box>
                </Grid>
                {activeImg ? <Grid item lg={3} className='resultImageDiv'>
                    <Box >

                        {activeImgUrl
                            ?
                            <img className='resultCardImg' src={activeImgUrl ? activeImgUrl : 'https://winaero.com/blog/wp-content/uploads/2019/11/Photos-new-icon.png'} alt='image' />
                            :
                            <FontAwesomeIcon className='resultCardIcon' icon={faFolder} />
                        }

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
        </>
    )
}

export default ListPage