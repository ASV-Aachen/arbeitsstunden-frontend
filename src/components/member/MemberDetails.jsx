import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';

import MemberEditDialogContainer from './MemberEditDialogContainer.jsx';

export default class MemberDetails extends Component {
	static propTypes = {
		firstName: PropTypes.string.isRequired,
		lastName: PropTypes.string.isRequired,
		email: PropTypes.string.isRequired,
		intervals: PropTypes.array.isRequired
	};

	constructor(props, context) {
        super(props, context);

        this.state = {
    	  editUserDialogOpen: false,
        };
      }

	toSeasonString = (year) => {
		return year-1 + "/" + year
	}

	toHumanReadable = (status) => {
		let map = {
			"PROSPECT":"Anwärter",
			"ACTIVE": "Aktiv",
			"INACTIVE": "Inaktiv",
			"OLD_MAN": "Alter Herr",
		}
		if (map[status]) {
			return map[status];
		} else {
			return status;
		} 
	}

	render() {
		const { firstName, lastName, email, intervals } = this.props;
		const { editUserDialogOpen } = this.state;
		return (
			<div style={{height:240}}>

                <Button fab="true" aria-label="edit" style={{position:'absolute', top: 15, right:15, zIndex:1000}} onClick={()=>{this.setState({editUserDialogOpen: true,})}}>
                    <EditIcon />
                </Button>

				<Typography paragraph>{ firstName } { lastName }</Typography>
				<Typography paragraph>{ email }</Typography>
					<Typography>
					{ intervals.map((interval) => {
						if (interval.to === undefined) {
							let reduction = "";
							if (interval.reduction > 0) {
								reduction = "(Reduktion: " + (interval.reduction/60) + " Stunden)";
							}
							return (<span key={interval.from}> {this.toSeasonString(interval.from)} {this.toHumanReadable(interval.status)} {reduction} <br /></span>) 
						} else {
							return (<span key={interval.from}> {this.toSeasonString(interval.from)} - {this.toSeasonString(interval.to)} {this.toHumanReadable(interval.status)} <br /></span>) 
						}

					}) }
					</Typography>
                    <MemberEditDialogContainer open={editUserDialogOpen} handleClose={()=>this.setState({editUserDialogOpen: false})} />
				</div>
		);
	}
}
