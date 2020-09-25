import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { SupervisedUserCircle } from '@material-ui/icons';
import { borders } from '@material-ui/system';



const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 600,
  },
  MuiTableCell: {
    borderRight: `1px solid ${theme.palette.divider}`,
    padding: theme.spacing(1.5),

  }
}))



export default function BreakdownTable(props){


  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [breakdownError, setBreakdownError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [rows, setRows] = useState([])
  const [userToken,setUserToken]=useState(props.userToken)



  useEffect(() => {
    fetch("http://127.0.0.1:8000/testbreakdown?format=json",{
      headers: {
        'Authorization': 'Token '+userToken
      },
    }).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(res.status+" - "+res.statusText);
      }
    }).then(
      (result) => {

        setRows(result)

      },
      (e) => {
        setBreakdownError(e)
        console.log(e)
        console.log("error hit")
        setIsLoading(false)
      }
    )}
  ,[])




  const formatData = (company, paid, payments, users) => {
      paid="$"+ paid.toLocaleString()
      payments= payments.toLocaleString()
      users= users.toLocaleString()

    return { company, paid, payments, users };
  }






  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };



  const classes = useStyles();
  
  const columns = [
    { id: 'company', label: 'Company\u00a0Name', align: "left"},
    { id: 'paid', label: 'Dollars\u00a0Paid', align: "center" },
    { id: 'payments', label: 'Number\u00a0Of\u00a0Payments',  align: "center"},
    { id: 'users', label: 'Paying\u00a0Users',  align: "center"},
  ];

  // var page = this.state.page
  // var rowsPerPage = this.state.rowsPerPage


  return (
    <Paper elevation={2} className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column,index) => (
                <TableCell 
                
                  key={column.id+index}
                  align={column.align}
                  style={{ minWidth: column.minWidth, 
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,rowindex) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={"row"+rowindex}>
                  {columns.map((column,index) => {
                    const value = row[column.id];
                    return (
                      <TableCell className={classes.MuiTableCell} key={column.id+index+"body"} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
  
}