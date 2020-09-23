import React from 'react'
// import { Card, Icon, Image, Loader } from 'semantic-ui-react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// import '../infocard/infocard.css'
class Infocard extends React.Component {
    constructor(props) {
        super(props);
        this.state=  {
            data: props.data||[0,0], 
            cardType: props.cardType,
            headerText:"Not Yet Loaded",
            bodyText:"Not Yet Loaded",
            isLoaded:props.isLoaded,
            styles:props.styles
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
            isLoaded:true,
            styles:this.props.stye
        })
    }
//     componentDidUpdate(this.props){
//   // Typical usage (don't forget to compare props):
//         if (this.props.isLoaded !== prevProps.isLoaded) {
//             this.setState({isLoaded:true})
//         }
//     }
    
    
    

    render(){
        const classes = this.props.styles;

        // const tiers = [
        //     {
        //       title: 'Free',
        //       price: '0',
        //       description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
        //       buttonText: 'Sign up for free',
        //       buttonVariant: 'outlined',
        //     },
        //     {
        //       title: 'Pro',
        //       subheader: 'Most popular',
        //       price: '15',
        //       description: [
        //         '20 users included',
        //         '10 GB of storage',
        //         'Help center access',
        //         'Priority email support',
        //       ],
        //       buttonText: 'Get started',
        //       buttonVariant: 'contained',
        //     },
        //     {
        //       title: 'Enterprise',
        //       price: '30',
        //       description: [
        //         '50 users included',
        //         '30 GB of storage',
        //         'Help center access',
        //         'Phone & email support',
        //       ],
        //       buttonText: 'Contact us',
        //       buttonVariant: 'outlined',
        //     },
        //   ];


        return(

            <Grid item key={this.state.headerText} xs={12} sm={6} md={4}>
              
            <Card>
                <CardHeader
                  title={this.state.headerText}
                  titleTypographyProps={{ align: 'left' }}
                  className={classes.cardHeader}
                  />
                <CardContent>
                  <div className={classes.cardPricing}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {this.state.bodyText}
                    </Typography>
                  </div>
                  {/* <ul>
                    {tier.description.map((line) => (
                        <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                        </Typography>
                        ))}
                    </ul> */}
                </CardContent>
              </Card>

                    </Grid>





        // <Card>
        //     <Card.Content className="cardHeader">
        //         {/* <Card.Header className="cardHeader">{this.state.headerText}</Card.Header> */}
        //         <Card.Header size="huge" textAlign="left">{this.state.headerText}</Card.Header>
        //     </Card.Content>
        // <Card.Content >
            
        //     <Card.Description>
        //         {/* {this.state.isLoaded?(
        //         this.state.bodyText
        //         ):(
        //             <div class="ui active inline text loader">Loading</div>
        //         )} */}
        //     {this.state.bodyText}
        //     {/* <div class="ui active inline text loader">Loading</div> */}
        //     </Card.Description>
        // </Card.Content>

    // </Card>
    )
    }
    }
    
export default Infocard