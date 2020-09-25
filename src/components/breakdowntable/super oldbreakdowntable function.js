import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  { id: 'company', label: 'Company\u00a0Name', minWidth: 170 },
  { id: 'paid', label: 'Dollars\u00a0Paid', minWidth: 150 },
  { id: 'payments', label: 'Number\u00a0Of\u00a0Payments', minWidth: 100 },
  { id: 'users', label: 'Paying\u00a0Users', minWidth: 100 },
];

function formatData(company, paid, payments, users) {
    paid="$"+ paid.toLocaleString()
    payments= payments.toLocaleString()
    users= users.toLocaleString()

  return { company, paid, payments, users };
}

const rows = [
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
  formatData('First Company', 500000, 200, 50),
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function StickyHeadTable() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
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
        rowsPerPageOptions={[5, 10, 25, 100]}
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