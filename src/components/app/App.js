import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css'
import Infocard from '../infocard/infocard';
import Mainpage from '../mainpage/mainpage'
import Newpage from '../mainpage/newpage'
function App() {


  // var profit=25235343.31
  // var payments=521346
  // var users=50000
  // var companies=3000

  


  return (
    // <div className="App">
    //   <header className="App-header">
    //   <h1 class="ui header grey huge">Perpay Payment Metrics</h1>

    //   <div class="ui three column grid cards centered stackable">
    //   <Infocard cardType="paid" data={[profit]} ></Infocard>
    //   <Infocard cardType="payments" data={[payments]} ></Infocard>
    //   <Infocard cardType="breakdown" data={[users,companies]} ></Infocard>
    //   </div>


      
    //   </header>
    // </div>
    <Mainpage></Mainpage>
    // <Newpage></Newpage>
  );
}

export default App;
