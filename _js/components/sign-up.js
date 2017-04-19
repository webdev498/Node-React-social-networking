import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import { validate } from '../plugins/validation.js';

//variables that will never change
const genres = ["Fantasy","Science Fiction","Horror","Non-Fiction","Mystery","Romance","Poetry"];
const themes = ["Contemporary", "Historical", "Drama", "ChickLit", "Tragedy", "Adventure", "Urban", "Epic", "Romance", "Spiritual", "Humor", "Paranormal", "Young Adult","Middle Grade","Children","Thriller","Mystery","Classic"];
const Profile = function(){
		this.avatar = '/assets/images/avatars/Dog_1.png';
    	this.name = '';
    	this.password = '';
    	this.email = '';
    	this.bday = '';
    	this.gender = '';
    	this.social_media = {
    		website: '',
    		good_reads: '',
    		amazon: '',
    		wordpress: '',
    		facebook: '',
    		twitter: ''
    	}
    	this.genres = [];
    	this.themes = [];
    	this.newsletter = true;
 	}

class SignUp extends React.Component{

	constructor(props) {
    	super(props);
        this.new_profile = new Profile();
    	this.state = {
    		profile: this.new_profile
    	};
        this.error = '';
    	this.handleChange = this.handleChange.bind(this);
    	this.handleSubmit = this.handleSubmit.bind(this);
  	}

    componentWillMount(){
        //get user session
        $.get('/api/v1/user_session/').then((response)=>{
            if(!this._objectEmpty(response.data)){
                window.location.href = "/";
            }
        });
    }

    _objectEmpty(obj){
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }
        return JSON.stringify(obj) === JSON.stringify({});
    }

  	handleChange(event) {
  		let target = event._isAMomentObject ? {name: "bday", value: event} : event.target,
  		props = target.name.split('.'),
  		value = (target.value === "true") ? true : (target.value === "false") ? false : target.value;


  		//if the property is nested, dig 1 level deeper
  		if(props.length > 1){
  			// add sub properties here
  			if(props[0] === "social_media"){
  				this.new_profile.social_media[props[1]] = value;
  			}
  		}
  		//if its a checkbox, add/delete values in an array
  		else if(target.type === "checkbox" && Array.isArray(this.new_profile[target.name])){
  			//get index of value
  			let index = this.new_profile[target.name].indexOf(value);
  			//if checked, add value
  			if(target.checked){
  				this.new_profile[target.name].push(value);
  			}
  			//if not checked, remove value
  			else{
  				this.new_profile[target.name].splice(index,1);
  			}
  		}
  		//if it isn't a checkbox or a sub property
  		else {
  			this.new_profile[target.name] = value;
  		}
  		//set the state
    	this.setState({profile: this.new_profile});
  	}

	handleSubmit(event){
		this.new_profile.bday = this.new_profile.bday._d
		//restart profile
		$.post('/api/v1/users', this.new_profile).then((data)=>{
            if(data.status === "error"){
                this.error = data.message;
            }else{
			    window.location.href = "/email";
            }
		});
		this.new_profile = new Profile();
		this.setState({profile: this.new_profile});
		event.preventDefault();
	}

	isChecked(array,value){
		let val = array.filter(function(item,index){
				return item === value;
		});
		return val.length ? true : false;
	}

	createCheckboxes(items,type){
		let self = this;
		return items.map(function(item,index){
			let id = item.replace(/\s+/g,'-').toLowerCase();

			return (
				<li key={id}>
					<input id={id} type="checkbox" name={type} value={item} onChange={self.handleChange} checked={self.isChecked(self.state.profile[type],item)}/>
					<label htmlFor={id}>{item}</label>
				</li>
			)
		})
	}

	render(){
		return(
			<form onSubmit={this.handleSubmit}>
				<h4><span>Step 1.</span> Tell us about yourself</h4>
				<p>Add your photo:</p>
				<div className="avatar-selection">
					<figure className="avatar"><img src={this.state.profile.avatar} /></figure>
					<ul className="radio-list">
						<li>
							<input type="radio" name="avatar" id="avatar-1" value="/assets/images/avatars/Dog_1.png" onChange={this.handleChange} checked={this.state.profile.avatar === '/assets/images/avatars/Dog_1.png'}/>
							<label htmlFor="avatar-1">Apprentice Puppy</label>
						</li>
						<li>
							<input type="radio" name="avatar" id="avatar-2" value="/assets/images/avatars/Cat_1.png" onChange={this.handleChange} checked={this.state.profile.avatar === '/assets/images/avatars/Cat_1.png'}/>
							<label htmlFor="avatar-2">Apprentice Kitty</label>
						</li>
					</ul>
				</div>
				<ul className="field-list">
					<li>
                        <div className="title">
                            <label htmlFor="name"><span>*</span>What is your name?</label>
                            <span className="help-text">Please enter your full name</span>
                        </div>
						<input id="name" name="name" type="text" value={this.state.profile.name} onChange={this.handleChange} onBlur={validate} data-validation="name,required"/>
					</li>
					<li>
                        <div className="title">
                            <label htmlFor="email"><span>*</span>What is your email?</label>
                            <span className="help-text">Invalid email address</span>
                        </div>
						<input id="email" name="email" type="text" value={this.state.profile.email} onChange={this.handleChange} onBlur={validate} data-validation="email,required"/>
					</li>
					<li>
                        <div className="title">
                            <label htmlFor="bday"><span>*</span>What is your birth date?</label>
                            <span className="help-text">Please enter a date</span>
                        </div>
                        <DatePicker id="bday" name="bday" selected={this.state.profile.bday} onChange={this.handleChange} showYearDropdown maxDate={moment()} onBlur={validate} data-validation="date,required"/>
					</li>
					<li>
                        <div className="title">
                            <label htmlFor="gender"><span>*</span>Your gender:</label>
                            <span className="help-text">Please select your gender</span>
                        </div>
						<select id="gender" name="gender" type="text" value={this.state.profile.gender} onChange={this.handleChange} onBlur={validate} data-validation="required">
                          <option value="">Select One</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
					</li>
				</ul>
				<hr/>
				<h4><span>Step 2.</span> Where else can we find you?</h4>
    				<ul className="field-list">
    					<li>
                            <div className="title">
                                <label htmlFor="website">Your website URL</label>
                                <span className="help-text">Url must include http(s)</span>
                            </div>
    						<input id="website" name="social_media.website" value={this.state.profile.social_media.website} onChange={this.handleChange} onBlur={validate} data-validation="url" type="text"/>
    					</li>
    					<li>
                            <div className="title">
                                <label htmlFor="good_reads">Goodreads URL</label>
                                <span className="help-text">Url must include http(s)</span>
                            </div>
    						<input id="good_reads" name="social_media.good_reads" value={this.state.profile.social_media.good_reads} onChange={this.handleChange} onBlur={validate} data-validation="url" type="text"/>
    					</li>
    					<li>
                            <div className="title">
                                <label htmlFor="amazon">Amazon URL</label>
                                <span className="help-text">Url must include http(s)</span>
                            </div>
    						<input id="amazon" name="social_media.amazon" value={this.state.profile.social_media.amazon} onChange={this.handleChange} onBlur={validate} data-validation="url" type="text"/>
    					</li>
    					<li>
                            <div className="title">
                                <label htmlFor="wordpress">WordPress URL</label>
                                <span className="help-text">Url must include http(s)</span>
                            </div>
    						<input id="wordpress" name="social_media.wordpress" value={this.state.profile.social_media.wordpress} onChange={this.handleChange} onBlur={validate} data-validation="url" type="text"/>
    					</li>
    					<li>
                            <div className="title">
                                <label htmlFor="facebook">Facebook URL</label>
                                <span className="help-text">Url must include http(s)</span>
                            </div>
    						<input id="facebook" name="social_media.facebook" value={this.state.profile.social_media.facebook} onChange={this.handleChange} onBlur={validate} data-validation="url" type="text"/>
    					</li>
    					<li>
                            <div className="title">
                                <label htmlFor="twitter">Twitter URL</label>
                                <span className="help-text">Url must include http(s)</span>
                            </div>
    						<input id="twitter" name="social_media.twitter" value={this.state.profile.social_media.twitter} onChange={this.handleChange} onBlur={validate} data-validation="url" type="text"/>
    					</li>
    				</ul>
				<hr/>
				<h4><span>Step 3.</span><span>*</span> Create a secure password</h4>
                <span className="instructions">Password must be 8 to 10 characters and contain at least one uppercase letter, lowercase letter, number, and special character (etc. @$!%*?&).</span>
				<ul className="field-list">
					<li>
                        <div className="title">
                            <label htmlFor="password1"><span>*</span>Password</label>
                            <span className="help-text">Password must match above format</span>
                        </div>
						<input id="password1" name="password" type="password" value={this.state.profile.password} onChange={this.handleChange} onBlur={validate} data-validation="password,required" />
					</li>
					<li>
                        <div className="title">
                            <label htmlFor="password2"><span>*</span>Confirm Password</label>
                            <span className="help-text">This password does not match</span>
                        </div>
						<input id="password2" type="password" onBlur={validate} data-password={this.state.profile.password} data-validation="confirmPassword,required"/>
					</li>
				</ul>
				<hr/>
				<h4><span>Step 4.</span> Tell us what you like to see</h4>
				<p>What Genres do you like?</p>
				<ul className="toggle-list">
					{ this.createCheckboxes(genres, 'genres') }
					<li className="spacing-block"></li>
					<li className="spacing-block"></li>
				</ul>
				<p>What type of Fiction Themes?</p>
				<ul className="toggle-list">
					{ this.createCheckboxes(themes, 'themes') }
					<li className="spacing-block"></li>
					<li className="spacing-block"></li>
				</ul>
				<div className="submit-row">
					<div className="field">
						<input type="checkbox" name="newsletter" id="newsletter" value={!this.state.profile.newsletter} onChange={this.handleChange} checked={this.state.profile.newsletter}/>
						<label htmlFor="newsletter">I want to subscribe to newsletters</label>
					</div>
					<div className="buttons">
						<a className="button button-white" href=".">Close</a>
						<input className="button button-red" type="submit" value="Sign Up" disabled/>
					</div>
				</div>
			</form>
		)
	}
}

if(document.getElementById('sign-up'))
	ReactDOM.render(<SignUp />, document.getElementById('sign-up'))
