import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

const Profile = function(){
		this.id = ''
		this.avatar = '';
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


class Parent extends React.Component{

	constructor(props) {
    	super(props);
    	this.user = new Profile();
    	this.state = {
    		user: this.user
    	};
  	}

	componentWillMount(){
		let self = this;
		$.get('/api/v1/user_session/').then((response)=>{
			if(response.status !== "error"){
				this.user.id = response.data._id;
				//this.user.role = 2;
				this.setState({user: this.user});
				self.loadUserInfo(this.user.id);
			}else {
				window.location.href = "/";
			}
		});
	}

	loadUserInfo(id){
		$.get('/api/v1/users/' + id).then((response)=>{
			this.setState({
				user: response.data
			});
		});
	}

	render(){
		return(
			<div className="standard-section-with-sidebar">
				<div className="container">
				{this.state.user.role < 1 &&
				<div className="flex-row">
					<div className="content-block content-block-standard">
						<header>
							<h3>My Account</h3>
						</header>
						<div className="title-row">
							<h4>Account Info</h4>
							<a className="control" href="/dashboard/edit">Edit</a>
						</div>
						<div className="user-info">
							<div className="main">
								<figure className="avatar">
									<img src={this.state.user.avatar} alt="" />
								</figure>
								<div className="details">
									<h5>{this.state.user.name}</h5>
									{this.state.user.achievement &&
										<p>Achievement-Placeholder</p>
									}
									{this.state.user.social_media &&
										<div className="basic-profile">
											{this.state.user.social_media.website &&
												<p>
													<a href={this.state.user.social_media.website} target="_blank">
														{this.state.user.social_media.website}
													</a>
												</p>
											}
											<ul className="social-links">
												{this.state.user.social_media.good_reads &&
													<li>
														<a href={this.state.user.social_media.good_reads} target="_blank">
															<img src="/assets/images/icons/social/goodreads.svg" alt="Goodreads" />
														</a>
													</li>
												}
												{this.state.user.social_media.amazon &&
													<li>
														<a href={this.state.user.social_media.amazon} target="_blank">
															<img src="/assets/images/icons/social/amazon.svg" alt="Amazon" />
														</a>
													</li>
												}
												{this.state.user.social_media.wordpress &&
													<li>
														<a href={this.state.user.social_media.wordpress} target="_blank">
															<img src="/assets/images/icons/social/wordpress.svg" alt="Wordpress" />
														</a>
													</li>
												}
												{this.state.user.social_media.facebook &&
													<li>
														<a href={this.state.user.social_media.facebook} target="_blank">
															<img src="/assets/images/icons/social/facebook.svg" alt="Facebook" />
														</a>
													</li>
												}
												{this.state.user.social_media.twitter &&
													<li>
														<a href={this.state.user.social_media.twitter} target="_blank">
															<img src="/assets/images/icons/social/twitter.svg" alt="Twitter" />
														</a>
													</li>
												}
											</ul>
										</div>
									}
								</div>
							</div>
							{this.state.user.achievement &&
								<div className="progress-meter">
									<a href="." className="help-link">?</a>
									<figure>
										<figcaption>
											<h4>80%</h4>
										</figcaption>
										<div className="meter"></div>
									</figure>
								</div>
							}
						</div>
						<hr/>
							<div className="title-row">
								<h4>Favorite Authors</h4>
								<a className="control" href="/dashboard/find-friends">Find Friends</a>
							</div>
							<ul className="user-list">
								You're not following any authors
								{/*
								<li>
									<a href="/author/">
										<figure className="avatar">
											<img src="/assets/images/avatars/cat-3.png" alt="">
										</figure>
										<h5>Author Name</h5>
									</a>
									<div className="control">Delete</div>
								</li>
								*/}
							</ul>
						<hr/>
							<div className="title-row">
								<h4>My Library</h4>
								{/* <a className="control" href=".">See All</a> */}
							</div>
							<div className="book-blocks book-blocks-small">
								You don't have any books in your library
								{/*
									<ul>
										<li>
											<a href="." className="content-block content-block-book">
												<figure>
													<div className="cover" style="background-image: url('/assets/images/samples/covers/1.jpg');">
														<div className="overlay">
															<button className="button button-red" href=".">Unfollow</button>
														</div>
													</div>
													<figcaption>
														<h4>Title Area</h4>
														<p>By [Author Name]</p>
														<ul className="rating-display">
															<li className="filled"></li>
															<li className="filled"></li>
															<li className="filled"></li>
															<li className="filled"></li>
															<li></li>
														</ul>
													</figcaption>
												</figure>
											</a>
										</li>
										<li className="spacing-block"></li>
										<li className="spacing-block"></li>
									</ul>
								*/}
							</div>
						<hr/>
						<div className="title-row">
							<h4>Books I’ve Written</h4>
							{/* <a class="control" href=".">See All</a> */}
						</div>
						You haven't written any books
					</div>
					<div>
						<div className="content-block">
							<div className="placeholder">
								<h4>Ad Space</h4>
							</div>
						</div>
						<div className="content-block">
							<div className="placeholder">
								<h4>Ad Space</h4>
							</div>
						</div>
					</div>
				</div>
				}
				{this.state.user.role >= 1 &&
					<div className="content-block content-block-standard account-block">
						<header>
							<h3>Admin Account</h3>
						</header>
						<div className="title-row">
							<h4>Quick Links</h4>
						</div>
						<div className="user-list">
							<a className="admin-link" href=".">Google Analytics</a>
							<a className="admin-link" href=".">Create Newsletter</a>
						</div>
						<hr/>
							<div className="title-row">
								<h4>Edit Users</h4>
							</div>
							<ul className="user-list">
								There are no user's to edit
								{/*
								<li>
									<a href="/author/">
										<figure className="avatar">
											<img src="/assets/images/avatars/cat-3.png" alt="">
										</figure>
										<h5>Author Name</h5>
									</a>
									<div className="control">Delete</div>
								</li>
								*/}
							</ul>
						<hr/>
						<div className="title-row">
							<h4>Books to Approve</h4>
							{/* <a className="control" href=".">See All</a> */}
						</div>
						<div className="book-blocks book-blocks-small">
							You don't have any books to approve
						</div>
						<hr/>
						<div className="title-row">
							<h4>Book Claims</h4>
							{/* <a className="control" href=".">See All</a> */}
						</div>
						<div className="book-blocks book-blocks-small">
							You don't have any book claims
						</div>
						<hr/>
						<div className="title-row">
							<h4>Show or Hide Ads</h4>
							{/* <a className="control" href=".">See All</a> */}
						</div>
						<div className="book-blocks book-blocks-small">
							This feature will be built in phase 3
						</div>
						<hr/>
						<div className="title-row">
							<h4>Current Book Brawls</h4>
							{/* <a className="control" href=".">See All</a> */}
						</div>
						<div className="book-blocks book-blocks-small">
							This feature will be built in phase 3
						</div>
					</div>
				}
				{/* <div id="myBooks"></div> */}
				</div>
			</div>
		)
	}
}

if(document.getElementById('accountInfo'))
	ReactDOM.render(<Parent />, document.getElementById('accountInfo'))



class Report extends React.Component{

	constructor(props) {
    	super(props);
    	this._handleSubmit = this._handleSubmit.bind(this);
  	}

  	_objectEmpty(obj){
	    for(var prop in obj) {
	        if(obj.hasOwnProperty(prop))
	            return false;
	    }

    	return JSON.stringify(obj) === JSON.stringify({});
	}

	_handleSubmit(event){
		//code for email submission goes here
		window.location.href = "/report-sent";
	}

	render(){
		return(
			<div className="overlay">
				<div className="content-block-small content-block" id="reset">
					<h3>Report Issue</h3>
					<p className="instructions">Please report your issue below and we will get back to you in X amount of time.</p>
					<ul className="field-list field-list-small">
						<li>
							<textarea name="name" rows="5" cols="80"></textarea>
						</li>
					</ul>
					<div className="submit-row submit-row-small">
						<div className="buttons">
							<a className="button button-white" href="/dashboard/">Close</a>
							<a className="button button-red" href="javascript:void(0)" onClick={this._handleSubmit}>Submit</a>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

if(document.getElementById('report'))
	ReactDOM.render(<Report />, document.getElementById('report'))