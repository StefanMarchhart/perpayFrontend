import React from 'react'
import { Card, Icon, Image, Loader } from 'semantic-ui-react'
import '../infocard/infocard.css'
class Infocard extends React.Component {
    constructor(props) {
        super(props);
        this.state=  {
            data: props.data||[0,0], 
            cardType: props.cardType,
            headerText:"Not Yet Loaded",
            bodyText:"Not Yet Loaded",
            isLoaded:props.isLoaded
            
        }

        // var ht = "Something went wrong"

        // if (this.props.cardType=='paid'){
        //     ht = "Total Dollars Paid"
        // }else if(this.props.cardType=='payments'){
        //     ht = "Total # of Payments"
        // }else if(this.props.cardType=='breakdown'){
        //     ht = "Payment Breakdown"
        // }

        // this.state={
        //     "headerText":ht
        // }
    }


    componentDidMount(){
        var ht = "Something went wrong"
        var bt = "Body not loaded yet"
        if (this.state.cardType=='paid'){
            ht = "Total Dollars Paid"
            bt = "$"+ this.state.data[0].toLocaleString()
        }else if(this.state.cardType=='payments'){
            ht = "Total # of Payments"
            bt = this.state.data[0].toLocaleString()
        }else if(this.state.cardType=='breakdown'){
            ht = "Payment Breakdown"
            bt = this.state.data[0].toLocaleString() + " paying users from "+this.state.data[1].toLocaleString()+" Companies"
        }

        this.setState ({
            "headerText":ht,
            "bodyText":bt,
            data:this.props.data,
            isLoaded:true
        })
    }
//     componentDidUpdate(this.props){
//   // Typical usage (don't forget to compare props):
//         if (this.props.isLoaded !== prevProps.isLoaded) {
//             this.setState({isLoaded:true})
//         }
//     }
    
    
    

    render(){

        return(
        <Card>
            <Card.Content className="cardHeader">
                {/* <Card.Header className="cardHeader">{this.state.headerText}</Card.Header> */}
                <Card.Header size="huge" textAlign="left">{this.state.headerText}</Card.Header>
            </Card.Content>
        <Card.Content >
            
            <Card.Description>
                {/* {this.state.isLoaded?(
                this.state.bodyText
                ):(
                    <div class="ui active inline text loader">Loading</div>
                )} */}
            {this.state.bodyText}
            {/* <div class="ui active inline text loader">Loading</div> */}
            </Card.Description>
        </Card.Content>

    </Card>
    )
    }
    }
    
export default Infocard