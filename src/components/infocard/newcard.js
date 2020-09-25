import React, {useState, useEffect} from 'react'

// import { Card, Icon, Image, Loader } from 'semantic-ui-react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { TheatersRounded } from '@material-ui/icons';



const useStyles = makeStyles((theme) => ({
  '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    cardHeader: {
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardBody: {
      display: 'flex',
      justifyContent: 'center',
      textAlign: "center",
      alignItems: 'baseline',
    //   marginBottom: theme.spacing(3),
    },
    MuiCardRoot:{
      height: "100%"
    },
  }));


// import '../infocard/infocard.css'
export default function Infocard(props){


    const [data, setData] = React.useState([0,0]);
    const [cardType, setCardType] = React.useState(props.cardType);
    const [headerText, setHeaderText] = React.useState("Loading");
    const [bodyText, setBodyText] = React.useState("Loading");
    const [isLoading, setIsLoading] = React.useState(true);





    // useEffect(() => {
    //   var ht = "Something went wrong"
    //     var bt = "Body not loaded yet"
    //     if (cardType === 'paid'){
    //         ht = "Total Dollars Paid"
    //         bt = "$"+ data[0].toLocaleString()
    //     }else if(cardType === 'payments'){
    //         ht = "Total # of Payments"
    //         bt = data[0].toLocaleString()
    //     }else if(cardType === 'breakdown'){
    //         ht = "Payment Breakdown"
    //         bt = data[0].toLocaleString() + " paying users from "+data[1].toLocaleString()+" Companies"
    //     }


    //     setHeaderText(ht)
    //     setBodyText(bt)
    //     setData(props.data)
  
    //   }
    // ,[])

    //update data when the props update
    useEffect(() => {
        setData(props.data)
        updateText()
      }
    ,[props.data])

    //update text when the data updates
    useEffect(() => {
      updateText()
    }
  ,[data])


      const updateText = () => {

        
        var ht = "Something went wrong"
        var bt = "Body not loaded yet"
        try{
          if (cardType === 'paid'){
              ht = "Total Dollars Paid"
              bt = "$"+ data[0].toLocaleString()
          }else if(cardType === 'payments'){
              ht = "Total # of Payments"
              bt = data[0].toLocaleString()
          }else if(cardType === 'breakdown'){
              ht = "Payment Breakdown"
              bt = data[0].toLocaleString() + " paying users from "+data[1].toLocaleString()+" Companies"
          }
          setHeaderText(ht)
          setBodyText(bt)
          setIsLoading(false)
        }catch(error){
          console.error(error)
          console.log("Errored out in Newcard")
        }



      }
   

    const classes = useStyles();

        if (isLoading) {
          return (<CircularProgress />);
        }
        return(
          
            <Grid item key={headerText} xs={12} sm={8} md={4}>
              
              <Card className={classes.MuiCardRoot}>
                <CardHeader
                  title={headerText}
                  titleTypographyProps={{ align: 'left' }}
                  className={classes.cardHeader}
                  />
                <CardContent>
                  <div className={classes.cardBody}>
                    
                    {/* {isLoading?
                    
                      (<CircularProgress />):(
                    
                     */}
                    <Typography component="h3" variant="h4" color="textPrimary">
                      {bodyText}
                    </Typography>
                    {/* )} */}
                  </div>
                </CardContent>
              </Card>

            </Grid>
      )
    
    }
    