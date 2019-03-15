import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import productImage from '../../images/opz.jpg';
import CreditCard from '../CreditCard';
import InputMask from 'react-input-mask';
import uniqid from 'uniqid';
import axios from 'axios';

import {
    Button,
    Paper,
    Step,
    StepLabel,
    StepContent,
    Stepper,
    Typography,
    TextField
} from '@material-ui/core';

const styles = theme => ({
    root: {
        maxWidth: '50%'
    },
    button: {
        marginTop: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    actionsContainer: {
        marginTop: theme.spacing.unit * 4,
        marginBottom: theme.spacing.unit * 2,
        float: 'right'
    },
    resetContainer: {
        padding: theme.spacing.unit * 3,
    },
    productImage: {
        maxWidth: '100%',
        height: 200
    }
});

function getSteps() {
    return ['OP-Z', 'Billing Info', 'Payment', 'Complete Purchase'];
}

class Checkout extends React.Component {
    state = {
        activeStep: 0,
        street: '',
        city: '', 
        zipcode: '',
        country: '',
        cardnumber: '',
        expiration: '',
        fullname: '',
        productNumber: ''
    };

    componentDidMount() {
        this.setState({productNumber: uniqid()})
    }

    completeTransaction = () => {
        axios.post('http://localhost:3004/checkouts', {
            address: {
                street: this.state.street,
                zipcode: this.state.zipcode,
                country: this.state.country,
                city: this.state.city
            },
            card: { cardnumber: this.state.cardnumber, expiration: this.state.expiration, fullname: this.state.fullname},
            fullname: this.state.fullname
        })
        .then(function (response) {
        console.log(response);
        })
        .catch(function (error) {
        console.log(error);
        });
    }

    getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <div style={{maxWidth: 290, minWidth: 290}}>
                        <img className={this.props.classes.productImage} src={productImage} alt="productimage"/>
                        <Typography>OP-Z</Typography>
                        <Typography>multimedia synthesizer and sequencer</Typography><br/>
                        <Typography style={{fontWeight: 'bold'}}>$599.00</Typography>
                    </div>
                    );
            case 1:
                return (
                    <div style={{maxWidth: 290, minWidth: 290}}>
                        <TextField
                            id="street"
                            label="Street Address"
                            type="text"
                            name="street"
                            margin="normal"
                            variant="outlined"
                            onChange={this.handleStepsInput}
                            fullWidth
                        />  
                        <div style={{display: 'flex'}}>
                            <TextField
                                InputProps={
                                    {style: {
                                        marginRight: 10
                                    }}
                                }
                                id="city"
                                label="City"
                                type="text"
                                name="city"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleStepsInput}
                            />
                            <TextField
                                InputProps={
                                    {style: {
                                        width: 90
                                    }}
                                }
                                label="Zipcode"
                                id="zipcode"
                                placeholder="zipcode"
                                type="text"
                                name="zipcode"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleStepsInput}
                            />
                        </div>
                        <div style={{display: 'flex'}}>
                            <TextField
                                InputProps={
                                    {style: {
                                        width: 90,
                                        marginRight: 10
                                    }}
                                }
                                label="State"
                                id="state"
                                placeholder="State"
                                type="text"
                                name="state"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleStepsInput}
                            />
                            <TextField
                                id="country"
                                label="Country"
                                type="text"
                                name="country"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleStepsInput}
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div style={{maxWidth: 290, minWidth: 290}}>
                        <CreditCard
                            styles={{textAlign: 'center'}}
                            fullname={this.state.fullname}
                            cardnumber={this.state.cardnumber}
                            expiration={this.state.expiration}/>

                        <div style={{display: 'flex'}}>
                            <InputMask
                                mask="9999 9999 9999 9999"
                                value={this.state.cardnumber}
                                onChange={this.handleStepsInput}
                                className={this.props.classes.textField}
                            >
                                {
                                    () => {
                                        return <TextField
                                            InputProps={
                                                {style: {
                                                    marginRight: 5
                                                }}
                                            }
                                            id="card-number"
                                            label="Credit Card Number"
                                            type="text"
                                            name="cardnumber"
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    }
                                }
                            </InputMask>
                            
                            <InputMask
                                mask="99/99"
                                value={this.state.expiration}
                                onChange={this.handleStepsInput}
                                className={this.props.classes.textField}
                            >
                                {
                                    () => {
                                        return <TextField
                                            InputProps={
                                                {style: {
                                                    width: 90
                                                }}
                                            }
                                            id="card-number"
                                            placeholder="XX/YY"
                                            type="text"
                                            name="expiration"
                                            margin="normal"
                                            variant="outlined"
                                        />
                                    }
                                }
                            </InputMask>
                        </div>
                        
                        <TextField
                            id="fullname"
                            label="Name On The Card"
                            type="text"
                            name="fullname"
                            value={this.state.fullname}
                            variant="outlined"
                            fullWidth
                            onChange={this.handleStepsInput}
                        />
                    </div>
                );
                
            case 3:
                return (
                    <div style={{maxWidth: 290, minWidth: 290}}>
                        <Typography>Order Number: {this.state.productNumber.toUpperCase()}</Typography>
                        <Typography>OP-Z</Typography>
                        <Typography style={{fontWeight: 'bold'}}>$599.00</Typography><br/>
                    </div>
                );  
            default:
                return 'Unknown step';
        }
    }

    handleStepsInput = (e) => {
        e.preventDefault();
        this.setState({[e.target.name]: e.target.value});
    }

    handleNext = () => {
        if(this.state.activeStep === 3) {
            this.completeTransaction();
        }
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }));
    };

    handleBack = () => {
        this.setState(state => ({
        activeStep: state.activeStep - 1,
        }));
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        return (
        <Paper className={classes.root}>
            <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => (
                <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                    <div>{this.getStepContent(index, this.props)}</div>
                    <div className={classes.actionsContainer}>
                    <div>
                        <Button
                            disabled={activeStep === 0}
                            onClick={this.handleBack}
                            className={classes.button}
                            >
                            Back
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleNext}
                            className={classes.button}
                            >
                            {activeStep === 0 ? 'Billing Info' : null}
                            {activeStep === 1 ? 'Payment' : null}
                            {activeStep === 2 ? 'Review' : null}
                            {activeStep === 3 ? 'Finish' : null}
                        </Button>
                    </div>
                    </div>
                </StepContent>
                </Step>
            ))}
            </Stepper>
            {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
                <Typography>Thank You!</Typography>
            </Paper>
            )}
        </Paper>
        );
    }
}

Checkout.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(Checkout);