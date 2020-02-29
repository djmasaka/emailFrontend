import React from 'react'
import {
    withStyles,
    Grid,
    Card,
    CardContent,
    Typography
} from '@material-ui/core'

const style = theme => ({
    root: {
        marginTop: '75px',
        paddingLeft: '25px'
    },
    card: {
      minWidth: 275,
      margin: 20
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    pos: {
      marginBottom: 12,
    },
  });


class PastEmail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            pastEmails: []
        }
    }
    //use this.props.db.collection('pastEmails').get() to get the collection of past emails
    componentDidMount(){
        this.props.db.collection('pastEmails').get()
        .then((snapshot) => {
            snapshot.forEach((doc) => {
              this.setState(prevState => {
                const newPastEmails = prevState.pastEmails.concat(doc.data())
                return(
                  {pastEmails: newPastEmails}
                )
              })
            });
          })
          .catch((err) => {
            console.log('Error getting documents', err);
          });
    }
    render(){
        const { classes } = this.props
        return(
            <Grid container spacing={3} className={classes.root}>
                {this.state.pastEmails.map(email => (
                    <Card className={classes.card}>
                    <CardContent>
                        <Typography className={classes.title} variant="subtitle1" color="primary">
                        to: {email.recipients}
                        </Typography>
                        <Typography variant="subtitle1" >
                        subject: {email.subject}
                        </Typography>
                        <Typography variant="subtitle1" >
                        text: {email.text}
                        </Typography>
                    </CardContent>
                    </Card>)
                )}
            </Grid>
        )
    }
}

export default withStyles(style) (PastEmail)