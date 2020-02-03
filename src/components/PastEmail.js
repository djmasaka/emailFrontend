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
    title: {
      fontSize: 14,
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
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                        to: {email.recipients}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                        from: {email.sender}
                        </Typography>
                        <Typography variant="body2" component="p">
                        subject: {email.subject}
                        <br />
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