// import React from 'react';
import Infocard from '../infocard/infocard';
import React from 'react'

class Mainpage extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                error: null,
                isLoaded: false,
                totals: []
              };
        }


        componentDidMount() {
            fetch("http://127.0.0.1:8000/totals?format=json")
            // fetch(process.env.REACT_APP_DATABASE_URL)
              .then(res => res.json())
              .then(
                (result) => {
                    console.log(result)
                  this.setState({
                    isLoaded: true,
                    totals: result
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

    render(){
        var profit = this.state.totals["totalPaid"]
        var payments = this.state.totals["totalPayments"]
        var users = this.state.totals["totalUsers"]
        var companies = this.state.totals["totalCompanies"]

    const {
        error,
        isLoaded,
        items
    } = this.state;
    if (error) {
        return <div> Error: {
            error.message
        } </div>;
    } else if (!isLoaded) {
        return <div> Loading... </div>;
    } else {
        return (
                <div className="App">
                <header className="App-header">
                <h1 class="ui header grey huge">Perpay Payment Metrics</h1>
            
                <div class="ui three column grid cards centered stackable">
                <Infocard isloaded={this.state.isLoaded} cardType="paid" data={[profit]} ></Infocard>
                <Infocard isloaded={this.state.isLoaded} cardType="payments" data={[payments]} ></Infocard>
                <Infocard isloaded={this.state.isLoaded} cardType="breakdown" data={[users,companies]} ></Infocard>
                </div>
            
            
                
                </header>
                </div>
            );
        }
    }
}
    
export default Mainpage





