import React from 'react'
import {
    withStyles,
    TextField,
    Fab,
    Button,
    Grid,
    Typography
} from '@material-ui/core'
import {
    Add as AddIcon,
    Remove as RemoveIcon,
    Send as SendIcon
} from '@material-ui/icons'

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
        },
    },
    container: {
        minWidth: "300px",
        paddingTop: "75px",
        paddingLeft: "40px"
    },
    buttons:{
        margin: "5px"
    },
    recipient:{
        width: '90%', 
        paddingTop: '1%'
    }
});

class SendEmail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            recipients: [''],
            subject: '',
            text: '',
            emptyField: ''
        }
    }

    addRecipient = () => {
        this.setState(prevState => {
            return {recipients: [...prevState.recipients, ""]}
        })
    }

    deleteRecipient = () => {
        this.setState(prevState => {
            if(prevState.recipients.length > 1){
                const newRecipients = prevState.recipients
                newRecipients.pop()
                return {recipeints: [...newRecipients]}
            }
        })
    }

    changeRecipient = e => {
        this.setState({emptyField: ''})
        console.log(e.target.id)
        const id = e.target.id
        const value = e.target.value
        this.setState( prevState => {
            const newRecipients = prevState.recipients
            newRecipients[id] = value
            return {recipients: [...newRecipients]}
        })
        e.preventDefault()
    }

    changeText = e =>{
        this.setState({emptyField: ''})
        this.setState({[e.target.name]: e.target.value})
        e.preventDefault()
    }

    checkData = () => {
        this.setState({emptyField: ''})
        if(this.state.text === ''){
            this.setState({emptyField: 'text'})
            return false
        }else if(this.state.subject === ''){
            this.setState({emptyField: 'subject'})
            return false
        }else if(this.checkRecipient() === false){
            this.setState({emptyField: 'recipient'})
            return false
        }else{
            this.setState({emptyField: []})
            return true
        }
    }

    checkRecipient = () => {
        const arr = this.state.recipients.filter(recipient => recipient === '')
        console.log('the filter checkRecpient is working')
        console.log(arr)
        if(arr.length > 0){
            return false
        }else{
            return true
        }
    }

    sendMessage = () =>{
        if(this.checkData() === true){
            this.setState({emptyField: ''})
            const msg = {
                recipient: this.state.recipients,
                subject: this.state.subject,
                text: this.state.text
            }
            const msgForFirebase = {
                recipients: msg.recipient.join(','),
                subject: msg.subject,
                text: msg.text
            }
            //this to write to the firestore database
            this.props.db.collection('pastEmails').doc().set(msgForFirebase)
            console.log(msg)
            fetch("http://167.172.159.113:3001/api", {
                method: "post",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(msg)
            })
        }
    }


    render(){
        const { classes } = this.props
        return(
            <Grid container 
                className={classes.container} 
                spacing={3}
                direction="column"
                justify="center"
            >
            <Grid container item md={12}>
                {
                    this.state.recipients.map((item, index) => (
                        <Grid item md={3}>
                            <TextField 
                                id={`${index}`} 
                                label="Recipient (email)" 
                                key={`${index}`}
                                name="recipient" 
                                value={item}
                                variant="outlined" 
                                onChange={this.changeRecipient}
                                className={classes.recipient}
                            />
                        </Grid>
                    ))
                }
            </Grid>
            <Grid item md={12}>
            <Fab 
                size="small" 
                color="primary" 
                aria-label="add" 
                className={classes.buttons} 
                onClick={this.addRecipient}
            >
                <AddIcon />
            </Fab>
            <Fab 
                size="small" 
                color="secondary" 
                aria-label="add" 
                className={classes.buttons} 
                onClick={this.deleteRecipient}
            >
                <RemoveIcon />
            </Fab>
            </Grid>
            <Grid item md={6}>
            <TextField 
                id="subject" 
                label="Subject (text)" 
                name="subject" 
                variant="outlined" 
                value={this.state.subject} 
                onChange={this.changeText}
                style ={{width: '90%'}}
            />
            </Grid>
            <Grid item md={12}>
            <TextField
                id="text"
                label="Text"
                name="text"
                multiline
                rows="10"
                variant="outlined"
                value={this.state.value}
                onChange={this.changeText}
                style ={{width: '90%'}}
            />
            </Grid>
            {this.state.emptyField !== '' && <Typography color='error'> missing {this.state.emptyField}</Typography>}
            <Grid item md={12}>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                endIcon={<SendIcon />}
                onClick={this.sendMessage}
            >
                Send
            </Button>
            </Grid>
        </Grid>
    )
    }

}

export default withStyles(styles) (SendEmail)