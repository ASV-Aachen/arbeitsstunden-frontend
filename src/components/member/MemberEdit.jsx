import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'


export default class MemberEditWidget extends Component {
	static propTypes = {
		handleCancel: PropTypes.func.isRequired,
		handleEditUser: PropTypes.func.isRequired,
	};

	constructor(props) {
    		super(props);
    		this.state = {
    		    errors: {}
    		}
    	}

	render() {
		const { errors } = this.state;

		return (
			<div>

                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12}>
                            {this.renderTextField({name:'currentPassword', text:'Bisheriges Passwort', errors: errors})}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {this.renderTextField({name:'newPassword', text:'Neues Passwort', errors: errors})}
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            {this.renderTextField({name:'newPasswordRepeat', text:'Passwort Wiederholen', errors: errors})}
                        </Grid>
                    </Grid>

					<Grid container style={{textAlign:'center', paddingTop:'20px', paddingBottom: '10px'}}>
						<Grid item sm={6}>
							<Button variant='raised' onClick={this.props.handleCancel}>
								Abbrechen	
							</Button>
						</Grid>
						<Grid item sm={6}>
							<Button variant='raised' onClick={this.handleEdit}>
								Passwort ändern
							</Button>
						</Grid>
					</Grid>

			</div>
		);
	}

	renderTextField = ({name, text, errors}) => {

    		var error = '';
    		if(errors && errors.hasOwnProperty(name)) {
    			error = errors[name];
    		}

    		return (
    			<FormControl required error={!!error} onChange={this.handleFormChange} style={{width: '100%'}}>
    				<InputLabel htmlFor={name}>{text}</InputLabel>
    				<Input type='password' id={name} />
    				<FormHelperText>{error}</FormHelperText>
    			</FormControl>
    		);

    	};

    	handleEdit = () => {
        		const requiredFields = [ 'currentPassword', 'newPassword', 'newPasswordRepeat' ]
        		var validated = this.validate(requiredFields, this.state);

        		this.setState({errors: validated});

        		if (Object.keys(validated).length === 0) {
        			const { newPassword } = this.state;
        			this.props.handleEditUser(newPassword);
        		}
        };

        validate = (requiredFields, values) => {
        		const errors = {}

        		requiredFields.forEach(field => {
        			if (!values[ field ]) {
        				errors[ field ] = 'Required'
        			}
        		})

        		const cookies = new Cookies();
        		let pass = cookies.get('password');

        		if (values.currentPassword && values.currentPassword !== pass) {
        			errors.currentPassword = 'Falsches Passwort'
        		}

        		if (values.newPassword && values.newPasswordRepeat && values.newPassword !== values.newPasswordRepeat) {
        			errors.newPassword = 'Passwort stimmt nicht überein';
        			errors.newPasswordRepeat = 'Passwort stimmt nicht überein';
        		}

        		return errors
        	}

    handleFormChange = (event) => {
    		var newState = {[event.target.id]: event.target.value}
    		this.setState(newState);

    		const requiredFields = [ event.target.id ]
    		var validated = this.validate(requiredFields, newState);
    		this.setState({errors:validated});
    	}
}
