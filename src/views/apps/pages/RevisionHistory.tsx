import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as yup from "yup";

const validationSchema = yup.object({
    status: yup.object().required("This field is required"),
    template: yup.object().required("This field is required")
})

const useStyles = {
    "& .MuiTableCell-root": {
        borderLeft: "1px solid rgba(224, 224, 224, 1)"
    },
    "& .MuiTableCell-root:hover": {
        backGroundColor: "#afafaf",
        color: "black",
        cursor: 'pointer'
    },
    minWidth: 650
}

function createData(
    name: string,
    COLUMN: number,
    ORIGIN: number,
    AFTERCHANGES: number,
    CREATED_AT: number,
) {
    return { name, COLUMN, ORIGIN, AFTERCHANGES, CREATED_AT };
}

const rows: any[] = [
    //   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //   createData('Eclair', 262, 16.0, 24, 6.0),
    //   createData('Cupcake', 305, 3.7, 67, 4.3),
    //   createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function RevisionHistory() {
    return (
        <TableContainer component={Paper}>
            <Table sx={useStyles} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell style={{ fontSize: "12px" }} >AUTHOR</TableCell>
                        <TableCell style={{ fontSize: "12px" }} align="left">COLUMN</TableCell>
                        <TableCell style={{ fontSize: "12px" }} align="left">ORIGIN</TableCell>
                        <TableCell style={{ fontSize: "12px" }} align="left">AFTER CHANGES</TableCell>
                        <TableCell style={{ fontSize: "12px" }} align="left">CREATED AT</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right">{row.COLUMN}</TableCell>
                            <TableCell align="right">{row.ORIGIN}</TableCell>
                            <TableCell align="right">{row.AFTERCHANGES}</TableCell>
                            <TableCell align="right">{row.CREATED_AT}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
