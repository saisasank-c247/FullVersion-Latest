// ** React Imports
import { useState, useEffect } from 'react'

// ** MUI Components
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import AvatarGroup from '@mui/material/AvatarGroup'
import { DataGrid, GridColDef, GridRenderCellParams, GridTreeNodeWithRender } from '@mui/x-data-grid'
import LinearProgress from '@mui/material/LinearProgress'

// ** Third Party Imports
import axios from 'axios'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { UserableRowType } from 'src/@fake-db/types'

// ** Custom Components Imports
import OptionsMenu from 'src/@core/components/option-menu'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

interface CellType {
    row: UserableRowType
}

// ** renders name column
// const renderName = (row: UserableRowType) => {
//   if (row.avatar) {
//     return <CustomAvatar src={row.avatar} sx={{ mr: 2.5, width: 38, height: 38 }} />
//   } else {
//     return (
//       <CustomAvatar
//         skin='light'
//         color={(row.avatarColor as ThemeColor) || ('primary' as ThemeColor)}
//         sx={{ mr: 2.5, width: 38, height: 38, fontSize: theme => theme.typography.body1.fontSize }}
//       >
//         {getInitials(row.name || 'John Doe')}
//       </CustomAvatar>
//     )
//   }
// }

const UsersTable = (props:any) => {
    const { user, handleEditUser} = props;
    const columns: GridColDef[] = [
        {
            flex: 0.1,
            field: 'name',
            minWidth: 220,
            headerName: 'Name',
            renderCell: ({ row }: CellType) => {
                const { name } = row
              
                return (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* {renderName(row)} */}
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
                                {name}
                            </Typography>
                            {/* <Typography noWrap variant='body2' sx={{ color: 'text.disabled', textTransform: 'capitalize' }}>
                  {date}
                </Typography> */}
                        </Box>
                    </Box>
                )
            }
        },
        {
            flex: 0.1,
            minWidth: 105,
            field: 'email',
            headerName: 'Email',
            renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.email}</Typography>
        },
    
        {
            flex: 0.1,
            minWidth: 100,
            field: 'actions',
            headerName: 'Actions',
            renderCell: (e) => (
                <OptionsMenu
                    iconButtonProps={{ size: 'small', sx: { color: 'text.secondary' } }}
                    options={[
                        {text:'Edit',menuItemProps:{onClick: ()=>{
                            handleClick(e.id)
                        }}},
                        {text:'Generate Password', menuItemProps:{onClick:()=>{
                            handleClick(e.id)
                        }}},
                        { divider: true },
                        { text: 'Delete', menuItemProps: { sx: { color: 'error.main' } } },
                        
                    ]}
                />
            )
        }
    ];
    // ** State
    const [data, setData] = useState(user)
    const [value, setValue] = useState<string>('')
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 7 })

    function handleClick(e:any) {
        console.log(e , "editable");
        handleEditUser(e)    
    }

    useEffect(()=>{
        setData(user)
    },[user])

    const handleFilter = (val: string) => {
        setValue(val)
    }

    return data ? (
        <Card>
            <CardHeader
                title='Users'
                action={
                    <CustomTextField value={value} placeholder='Search Users' onChange={e => handleFilter(e.target.value)} />
                }
            />
           { data && <DataGrid
                autoHeight
                pagination
                rows={data}
                rowHeight={60}
                columns={columns}
                checkboxSelection
                disableRowSelectionOnClick
                pageSizeOptions={[5, 7, 10]}
                paginationModel={paginationModel}
                onPaginationModelChange={setPaginationModel}
            />}
        </Card>
    ) : null
}

export default UsersTable
