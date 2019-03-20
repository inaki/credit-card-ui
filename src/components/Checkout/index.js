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
    TextField,
    Grid
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
        productNumber: '',
        errors: {
            street: null,
            city: null, 
            zipcode: null,
            country: null,
            cardnumber: null,
            expiration: null,
            fullname: null,
        }
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
                    <Grid container style={{maxWidth: 290}}>
                        <img className={this.props.classes.productImage} src={productImage} alt="productimage"/>
                        <Typography>OP-Z</Typography>
                        <Typography>multimedia synthesizer and sequencer</Typography><br/>
                        <Typography style={{fontWeight: 'bold'}}>$599.00</Typography>
                    </Grid>
                    );
            case 1:
                return (
                    <Grid container style={{maxWidth: 290}}>
                        <Grid item xs={12}>
                            <TextField
                                error={this.state.errors['street'] ? "un error" : null}
                                id="street"
                                label="Street Address"
                                type="text"
                                name="street"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleStepsInput}
                                fullWidth
                            />  
                        </Grid>
                        <Grid item xs={8}>
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
                        </Grid>
                        <Grid item xs={4}>
                            <TextField
                                label="Zipcode"
                                id="zipcode"
                                placeholder="zipcode"
                                type="text"
                                name="zipcode"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleStepsInput}
                            />
                        </Grid>
                        <Grid item xs={4}>
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
                        </Grid>
                        <Grid item xs={8}>
                            <TextField
                                id="country"
                                label="Country"
                                type="text"
                                name="country"
                                margin="normal"
                                variant="outlined"
                                onChange={this.handleStepsInput}
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container style={{maxWidth: 290}}>
                        <Grid item xs={12}>
                            <CreditCard
                                styles={{textAlign: 'center'}}
                                fullname={this.state.fullname}
                                cardnumber={this.state.cardnumber}
                                expiration={this.state.expiration}/>
                        </Grid>
                        <Grid item xs={8}>
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
                        </Grid>
                        <Grid item xs={4}>
                            <InputMask
                                mask="99/99"
                                value={this.state.expiration}
                                onChange={this.handleStepsInput}
                                className={this.props.classes.textField}
                            >
                                {
                                    () => {
                                        return <TextField
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
                        </Grid>
                        <Grid item xs={12}>
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
                        </Grid>
                    </Grid>
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
        if(!e.target.value) {
            this.setState({errors: {[e.target.name]: true}})
        } else {
            this.setState({
                [e.target.name]: e.target.value,
                errors: {[e.target.name]: false}
            });
        }
    }

    handleNext = () => {
        if (this.state.activeStep === 0) {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
            }));
        } else if (this.state.activeStep === 1) {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
            }));
        }  else if (this.state.activeStep === 2) {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
            }));
        }  else if (this.state.activeStep === 3) {
            this.setState(state => ({
                activeStep: state.activeStep + 1,
            }));
        } else {
            this.completeTransaction();
        }
    };

    handleDisabledButton = (step) => {
        const { street, city, zipcode, country, cardnumber, expiration, fullname } = this.state;
        if (step === 1) {
            if(street && city && zipcode && country) {
                return false;
            } else {
                return true;
            }
        }  else if (step === 2) {
            if(cardnumber && expiration && fullname ) {
                return false;
            } else {
                return true;
            }
        }
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
                            disabled={this.handleDisabledButton(activeStep)}
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