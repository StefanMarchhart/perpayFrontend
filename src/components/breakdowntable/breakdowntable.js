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
import { SupervisedUserCircle } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { borders } from '@material-ui/system';



const styles = theme=>({
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
});



class BreakdownTable extends React.Component{




  constructor(props){
    super(props);

    // var columns = [
    //   { id: 'company', label: 'Company\u00a0Name', minWidth: 170 },
    //   { id: 'paid', label: 'Dollars\u00a0Paid', minWidth: 150 },
    //   { id: 'payments', label: 'Number\u00a0Of\u00a0Payments', minWidth: 100 },
    //   { id: 'users', label: 'Paying\u00a0Users', minWidth: 100 },
    // ];

    var rows = [
      // this.formatData('1 Company', 500000, 200, 50),
      // this.formatData('2 Company', 500000, 200, 50),
      // this.formatData('3 Company', 500000, 200, 50),
      // this.formatData('4 Company', 500000, 200, 50),
      // this.formatData('5 Company', 500000, 200, 50),
      // this.formatData('6 Company', 500000, 200, 50),
      // this.formatData('7 Company', 500000, 200, 50),
      // this.formatData('8 Company', 500000, 200, 50),
      // this.formatData('9 Company', 500000, 200, 50),
      // this.formatData('10 Company', 500000, 200, 50),
      // this.formatData('11 Company', 500000, 200, 50),
      this.formatData('', '', '', ''),
      this.formatData('', '', '', ''),
      this.formatData('', '', '', ''),
      this.formatData('', '', '', ''),
      this.formatData('', '', '', ''),
      this.formatData('', '', '', ''),
      this.formatData('', '', '', ''),
      this.formatData('', '', '', ''),
      this.formatData('', '', '', ''),
      this.formatData('', '', '', ''),
      this.formatData('', '', '', ''),

    ];

    this.state={
      page:0,
      // rows:rows,
      rowsPerPage:10,
      // columns:columns
      error: null,
      isLoaded: false,
      rows: []
    }
  }



  componentDidMount(){
    fetch("http://127.0.0.1:8000/testbreakdown?format=json")
    // fetch("http://127.0.0.1:8000/breakdown?format=json")
    // fetch(process.env.REACT_APP_DATABASE_URL)
      .then(res => res.json())
      .then(
        (result) => {
            console.log(result)
          this.setState({
            isLoaded: true,
            rows: result
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )

  }
  
  // rows = [
  //   this.formatData('First Company', 500000, 200, 50),
  //   this.formatData('First Company', 500000, 200, 50),
  //   this.formatData('First Company', 500000, 200, 50),
  //   this.formatData('First Company', 500000, 200, 50),
  //   this.formatData('First Company', 500000, 200, 50),
  // ];

  // columns = [
  //   { id: 'company', label: 'Company\u00a0Name', minWidth: 170 },
  //   { id: 'paid', label: 'Dollars\u00a0Paid', minWidth: 150 },
  //   { id: 'payments', label: 'Number\u00a0Of\u00a0Payments', minWidth: 100 },
  //   { id: 'users', label: 'Paying\u00a0Users', minWidth: 100 },
  // ];

  formatData(company, paid, payments, users) {
      paid="$"+ paid.toLocaleString()
      payments= payments.toLocaleString()
      users= users.toLocaleString()

    return { company, paid, payments, users };
  }






  // const [rowsPerPage, setRowsPerPage] = React.useState(10);

  handleChangePage = (event, newPage) => {
    this.setState({
      page:newPage
    });
  };

  handleChangeRowsPerPage = (event) => {
    // setRowsPerPage(+event.target.value);
    // setPage(0);

    this.setState({
      page:0,
      rowsPerPage:+event.target.value
    });

  };


render(){
  const {classes} = this.props;
  
  var columns = [
    { id: 'company', label: 'Company\u00a0Name', align: "left"},
    { id: 'paid', label: 'Dollars\u00a0Paid', align: "center" },
    { id: 'payments', label: 'Number\u00a0Of\u00a0Payments',  align: "center"},
    { id: 'users', label: 'Paying\u00a0Users',  align: "center"},
  ];

  var page = this.state.page
  var rowsPerPage = this.state.rowsPerPage


  return (
    <Paper elevation={2} className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell 
                
                  key={column.id}
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
            {this.state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell className={classes.MuiTableCell} align={"center"} key={column.id} align={column.align}>
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
        count={this.state.rows.length}
        rowsPerPage={this.state.rowsPerPage}
        page={this.state.page}
        onChangePage={this.handleChangePage}
        onChangeRowsPerPage={this.handleChangeRowsPerPage}
      />
    </Paper>
  );
  }
}


BreakdownTable.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(BreakdownTable);