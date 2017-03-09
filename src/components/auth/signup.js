import React, {Component} from 'react';
import { reduxForm, Field } from  'redux-form';
import {connect} from 'react-redux';

import * as actions from '../../actions';

const renderField = ({input, meta: {error, touched}, labelname, type}) => {
   return( <fieldset className="form-group">
        <label>{labelname}: </label>
        <input {...input} className="form-control" type={type} />
       {touched && error && <div className="error">{error}</div>}
    </fieldset>);

}
class Signup extends Component {
    handFormSubmit(formprops){
        //Call action creator
        this.props.signupuser(formprops);
    }

    renderAlert(){
        if(this.props.errorMessage){
            return (
                <div className="alert alert-danger">
                    <strong>Oops!</strong> {this.props.errorMessage}
                </div>
            )
        }
    }
    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit(this.handFormSubmit.bind(this))}>
                <Field  name="email" labelname="Email" component={renderField}/>
                <Field  name="password" labelname="Password" type="password" component={renderField}/>
                <Field  name="confirmPassword" labelname="Confirm Password" type="password" component={renderField}/>
                {this.renderAlert()}
                <button action="submit" className="btn btn-primary">Sign up!</button>
            </form>
        )
    }
}

function validate(formprops) {
    const errors = {};
    const field_error = {email: 'Please enter an email' ,
                    password: 'Please enter a password',
                    confirmPassword: 'Please enter a password confirmation'};

     Object.keys(field_error).map((field) => {
            if(!formprops[field]) {
                errors[field] = field_error[field];
            }
    });

    // if(!formprops.email) {
    //     errors.email = 'Please enter an email';
    // }
    // if(!formprops.password) {
    //     errors.password = 'Please enter a password';
    // }
    //
    if(formprops.password !== formprops.confirmPassword) {
        errors.password = 'Password must match';
    }

    // if(!formprops.confirmPassword) {
    //     errors.confirmPassword = 'Please enter a password confirmation';
    // }
    // console.log(errors);
    return errors;
}

function mapStateToProps(state) {
    return {
        errorMessage : state.auth.error
    }
}
export default connect(mapStateToProps, actions)(reduxForm({
        form: 'signup',
        validate
})(Signup));