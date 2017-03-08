import React, {Component} from 'react'
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import * as actions from  '../../actions';
const renderField = ({input, meta:{touched, error}, type}) => {
    return (
        <fieldset  className="form-group">
            <label>{input.name && input.name[0].toUpperCase() + input.name.slice(1)}: </label>
            <input {...input} type={type} className="form-control"/>
        </fieldset>
    );
};

class Signin extends Component {
    handleFormSubmit({email, password}) {
        console.log(email, password);
        this.props.signinUser({email, password});
    }
    renderAlert(){
        if(this.props.errorMessage) {
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
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
                <Field name="email" component={renderField}/>
                <Field name="password" type="password" component={renderField}/>
                {this.renderAlert()}
                <button className="btn btn-primary">Sign in</button>
            </form>
        );
    }
}
function mapStateToProps(state) {
    return { errorMessage: state.auth.error};
}

export default connect(mapStateToProps, actions) (reduxForm({
    form: 'signin'
}) (Signin));