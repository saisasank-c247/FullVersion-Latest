import { Button } from "@mui/material"
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid, GridColDef, } from '@mui/x-data-grid';
import Link from "next/link";
import {useRouter} from 'next/router'
import { deleteUser, getAllDetails } from "src/pages/apps/createpage/CreatePageService";

const Listpage = () => {
    const [open, setOpen] = React.useState(false);
    const [selectedId, setSelectedId] = React.useState('');
    const router = useRouter()
    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Name', width: 130 },
        {field:'description',headerName:'Description',width: 130},
        { field: 'template', headerName: 'Template', width: 170 },
        { field: 'createdat', headerName: 'Created At', type: 'number', width: 150, },
        { field: 'status', headerName: 'Status', sortable: false, width: 160, },
        {
            field: 'operations', headerName: 'Operations', width: 300, sortable: false, renderCell: (params) => {
                const onClick = (e: any) => {
                    console.log("edit",e,params);
                };
                const onDelete = (e: any) => {
                    console.log("delete",e);
                    setSelectedId(params.id+"");
                    setOpen(true);

                }
                
                return <div><Link  style={{ marginRight: "5px" }} href={'/apps/createPageEdit/?id='+ params.id}>Edit</Link>
                    <Button variant="contained" size="small" color="primary" onClick={(e)=>onDelete(e)}>DELETE</Button>
                </div>;
            },
        },
    ];
    const [rows,setRows] = React.useState([])

    React.useEffect(()=>{
        getListData()
    },[])

    const getListData =()=>{
        let result = getAllDetails().then((res)=>{
            console.log(res,"result");
            setRows(res)
           }) 
    }

    const handleClose = () => {
        setOpen(false);
        console.log(selectedId,"no")
    };
    const handleDelete = () => {
        setOpen(false);
        deleteUser(selectedId).then((res)=>{
            getListData()
        }).catch((err)=>{
            console.error(err)
        })

    };
    const handlerowClick=(operations:any)=> {
        console.log(`Button clicked for row with id ${operations}`);
      }
    return (
        <>
            <Link style={{ marginBottom: "11px" }} href='/apps/createpage'>Create</Link>
            <div style={{ height: 400, width: '100%' }}>
     
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                />
            </div>

            <Dialog
                open={open}
                fullWidth
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">DELETE</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to delete?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="success" onClick={(e)=>handleDelete()}>Yes</Button>
                    <Button variant="contained" onClick={handleClose} autoFocus>No</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
export default Listpage;