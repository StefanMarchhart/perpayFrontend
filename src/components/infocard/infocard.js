import React, {
    useState,
    useEffect
} from 'react'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
    makeStyles
} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';



const useStyles = makeStyles((theme) => ({
    '@global': {
        ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
        },
    },
    cardHeader: {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    cardBody: {
        display: 'flex',
        justifyContent: 'center',
        textAlign: "center",
        alignItems: 'baseline',
        //   marginBottom: theme.spacing(3),
    },
    MuiCardRoot: {
        height: "100%"
    },
}));


// import '../infocard/infocard.css'
export default function Infocard(props) {


    const [data, setData] = React.useState([0, 0]);
    const [cardType, setCardType] = React.useState(props.cardType);
    const [headerText, setHeaderText] = React.useState("");
    const [bodyText, setBodyText] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(true);
    const [showLoading, setShowLoading] = React.useState(true);


    useEffect(() => {
        if (props.faked){
            setHeaderText("Total Dollars Paid")
            setBodyText("$203,814 across 3,000")
            setIsLoading(false)
            setShowLoading(false)
        }
    }, [])

    //update data when the props update
    useEffect(() => {
        setData(props.data)
    }, [props.data])

    //update text when the data updates
    useEffect(() => {
        setIsLoading(false)
        updateText()
    }, [data])


    useEffect(()=>{
        if (bodyText!=="" && headerText!==""){
            setShowLoading(false)
        }
    },[bodyText])


    const updateText = () => {
        if (props.isFaked){
            setShowLoading(false)
            return
        }
        if (data[0]) {
            var ht = "Something went wrong"
            var bt = "Something went wrong"
            try {
                if (cardType === 'paid') {
                    ht = "Total Dollars Paid"
                    bt = "$" + data[0].toLocaleString()
                } else if (cardType === 'payments') {
                    ht = "Total # of Payments"
                    bt = data[0].toLocaleString()
                } else if (cardType === 'breakdown') {
                    ht = "Payment Breakdown"
                    bt = data[0].toLocaleString() + " paying users from " + data[1].toLocaleString() + " Companies"
                }
                setHeaderText(ht)
                setBodyText(bt)
                // setShowLoading(false)

            } catch (error) {
                console.error(error)
                console.log("Errored out in Newcard")
            }
        }

    }


    const classes = useStyles();

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
                     {showLoading?(<CircularProgress />):(
                       <Typography component="h3" variant="h4" color="textPrimary">{bodyText}</Typography>
                     )}
                  </div>
                </CardContent>
              </Card>

            </Grid>
      )
    
    }
    