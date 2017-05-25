import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

// Polyfills
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function(searchElement, fromIndex) {
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      var o = Object(this);
      var len = o.length >>> 0;
      if (len === 0) {
        return false;
      }
      var n = fromIndex | 0;
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }
      while (k < len) {
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }
      return false;
    }
  });
}

//components
import './components/scripts.js';
import './components/sign-up.js';
import './components/profile.js';
import './components/author.js';
import './components/login.js';
import './components/edit.js';
import './components/friends.js';
import './components/reset-password.js';
import './pages/dashboard/create';
import './pages/books/edit';
import './pages/homepage/home';
import './pages/search';
import './pages/view_all/view_all';
import '../_sass/main.scss';

//plugins
import { toggleNightMode, activateNightMode } from './plugins/night-mode.js';

function mapObject(object, callback) {
  return Object.keys(object).map((key) => {
    return callback(key, object[key]);
  });
}

class LoginButtons extends React.Component{

  constructor(props) {
    super(props);
	this.state = {
		loggedIn: false,
		title: '',
		user: {}
	};
	this._signOut = this._signOut.bind(this);
	this._objectEmpty = this._objectEmpty.bind(this);
  }

  componentWillMount(){
    activateNightMode();
  }

  componentDidMount(){
    $.get('/api/v1/user_session/').then((response) => {
      let isLoggedIn = !this._objectEmpty(response.data);
      this.setState({loggedIn: isLoggedIn, title: $('#login-buttons').attr('title'), user: response.data});
    });

  }

  _objectEmpty(obj){
	    for(var prop in obj) {
	        if(obj.hasOwnProperty(prop))
	            {return false;}
	    }

    	return JSON.stringify(obj) === JSON.stringify({});
  }

  _signOut(){
    let self = this;
    $.get('/api/v1/logout').then((response) => {
      let isLoggedIn = response.status = "ok" ? false : true;
      self.setState({loggedIn: isLoggedIn});
      if(!isLoggedIn){
        window.location.href = "/";
      }
    });
  }

  render(){
    return(
    <div>
        <nav>
            <ul>
				<div>
					<div className="sign-in-buttons">
					    <li className={this.state.title === "Browse" ? 'selected' : ''}>
		                    <a href="/">
		                        <div className="icon">
		                            <img className="day" src="/assets/images/icons/nav/browse.svg" alt="Browse"/>
                                    <img className="night" src="/assets/images/icons/nav/browse-night.svg" alt="Browse"/>
		                        </div>
		                        <span>Browse</span>
		                    </a>
		                    <ul>
		                        <li>
		                            <a href="/books/all">All</a>
		                        </li>
														{this.state.loggedIn?<li>
															 <a href=".">My Library</a>
													 </li>:''}
		                        <li>
		                            <a href="/books/all?view=top">Top Rated</a>
		                        </li>
		                        <li>
		                            <a href="/books/all?genres=Fantasy">Fantasy Books</a>
		                        </li>
														<li>
		                            <a href="/books/all?genres=Horror">Horror Books</a>
		                        </li>
		                    </ul>
		                </li>
	                </div>
					{!this.state.loggedIn &&
						<div className="sign-in-buttons">
			                <li>
			                    <a id="loginButton" href=".">
			                        <div className="icon">
			                            <img className="day" src="/assets/images/icons/nav/sign-up.svg" alt="Browse"/>
                                        <img className="night" src="/assets/images/icons/nav/sign-up-night.svg" alt="Browse"/>
			                        </div>
			                        <span>Log In</span>
			                    </a>
			                </li>
			                <li>
			                    <a href="/signup/">
			                        <div className="icon">
			                            <img className="day" src="/assets/images/icons/nav/sign-up.svg" alt="Browse"/>
                                        <img className="night" src="/assets/images/icons/nav/sign-up-night.svg" alt="Browse"/>
			                        </div>
			                        <span>Sign Up</span>
			                    </a>
			                </li>
		                </div>
	            	}
	            	{this.state.loggedIn &&
	            		<div className="sign-in-buttons">
	            		   <li className={this.state.title === "Dashboard" || this.state.title === "Create" || this.state.title === "Following" || this.state.title === "Edit" || this.state.title === "Author Page" ? 'selected' : ''}>
			                    <a href="/dashboard/">
			                        <div className="icon">
			                            <img className="day" src="/assets/images/icons/nav/dashboard.svg" alt="Browse"/>
                                        <img className="night" src="/assets/images/icons/nav/dashboard-night.svg" alt="Browse"/>
			                        </div>
			                        <span>Dashboard</span>
			                    </a>
			                    <ul>
			                        {this.state.user.role < 1 &&
			                        <div>
			                        	<li className={this.state.title === "Create" ? 'selected' : ''}>
				                            <a href="/dashboard/create/">Create</a>
				                        </li>
				                        <li className={this.state.title === "Following" ? 'selected' : ''}>
				                            <a href="/dashboard/following/1">Following</a>
				                        </li>
				                        <li>
				                            <a href="javascript:void(0)" id="report-issue" className="modal-trigger modal-trigger-report-issue">Report Issue</a>
				                        </li>
			                        </div>
			                    	}
			                    	{this.state.user.role > 0 &&
			                        <li className={this.state.title === "Following" ? 'selected' : ''}>
			                            <a href="/dashboard/all-users/1">All Users</a>
			                        </li>
			                    	}
			                    </ul>
			                </li>
			                <li className={this.state.title === "Forum" || this.state.title === "Create" ? 'selected' : ''}>
			                    <a href="/forum/">
			                        <div className="icon">
			                            <img className="day" src="/assets/images/icons/nav/forum.svg" alt="Browse"/>
                                        <img className="night" src="/assets/images/icons/nav/forum-night.svg" alt="Browse"/>
			                        </div>
			                        <span>Forum</span>
			                    </a>
			                    <ul>
			                        <li>
			                            <a href=".">Messages</a>
			                        </li>
			                    </ul>
                			</li>
			                <li onClick={this._signOut}>
			                    <a href="javascript:void(0)">
			                        <div className="icon">
			                            <img className="day" src="/assets/images/icons/nav/sign-up.svg" alt="Browse"/>
                                        <img className="night" src="/assets/images/icons/nav/sign-up-night.svg" alt="Browse"/>
			                        </div>
			                        <span>Log Out</span>
			                    </a>
			                </li>
		                </div>
	            	}
	            	<div className="sign-in-buttons">
	        			<li className={this.state.title === "Search" ? 'selected' : ''}>
		                    <a href="/search/">
		                        <div className="icon">
		                            <img className="day" src="/assets/images/icons/nav/advanced-search.svg" alt="Browse"/>
                                    <img className="night" src="/assets/images/icons/nav/advanced-search-night.svg" alt="Browse"/>
		                        </div>
		                        <span>Advanced Search</span>
		                    </a>
		                </li>
	                </div>
              	</div>
            </ul>
        </nav>
        <footer>
            <form className="search-form">
                <input type="search" placeholder="Search" />
            </form>
            <a href="javascript:void(0)" onClick={toggleNightMode} className="button button-red button-night-mode day">Night Mode</a>
            <a href="javascript:void(0)" onClick={toggleNightMode} className="button button-red button-night-mode night">Day Mode</a>
        </footer>
    </div>
    );
  }
}

if(document.getElementById('login-buttons'))
  {ReactDOM.render(<LoginButtons />, document.getElementById('login-buttons'));}


class UploadCover extends React.Component{
  state = {title:'', coverFile: false}

  coverAdd = (e) => {
    var reader = new FileReader();
    var file = e.target.files[0];
    reader.onload = (upload) => {
      this.setState({coverFile: upload.target.result});
    };

    reader.readAsDataURL(file);
  }

  _onChange = (e) => {
    var state = {};
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  _onSubmit = (e) => {
    e.preventDefault();
    var postData = {title: this.state.title, cover: this.state.coverFile};
		// $.post('/api/v1/mybooks', postData).then((data) => {
		// 	window.location.href = "/dashboard";
		// });
  }

  render(){
    var cover = <div className="cover"> <div className="flex"> <h4>Cover</h4> </div> </div>;
    if(this.state.coverFile){
      cover = <div className="cover"><div className="flex"><img src={this.state.coverFile}/></div></div>;
    }

    var bookTitle = 'Title Area';
    if(this.state.title){ bookTitle = this.state.title; }

    return(
			<ul className="field-list field-list-split">
				<li>
					<div className="copy">
						<p>Preview</p>
					</div>
					<div className="book-blocks book-blocks-single book-blocks-preview">
						<ul>
							<li>
								<div className="content-block content-block-book">
									<figure>
										{cover}
										<figcaption>
											<h4>{bookTitle}</h4>
											<p>By [Author Name]</p>
											<ul className="rating-display">
												<li></li>
												<li></li>
												<li></li>
												<li></li>
												<li></li>
											</ul>
										</figcaption>
									</figure>
								</div>
							</li>
						</ul>
					</div>
				</li>
				<li>
					<div className="copy">
						<p>Add Basic Information</p>
						<form id="coverForm" onSubmit={this._onSubmit}>
							<ul className="inner-fields">
								<li>
									<label htmlFor="title">Book Title</label>
									<input id="title" name="title" type="text" onChange={this._onChange} value={this.state.title}/>
								</li>
								<li>
									<label htmlFor="cover">Upload Cover Art</label>
									<input id="cover" type="file" onChange={this.coverAdd}/>
									<small>
										Max size of 15 MB<br />
										Dimensions are X by X<br />
										Needs to be jpg, png, or gif
									</small>
									<button id="coverSubmit" type="submit" style={{display:'none'}}></button>
								</li>
							</ul>
						</form>
					</div>
				</li>
			</ul>
    );
  }
}

if(document.getElementById('uploadCover'))
  {ReactDOM.render(<UploadCover />, document.getElementById('uploadCover'));}


class MyBooks extends React.Component{
  state = {books: []};
  componentDidMount(){
    $.get('/api/v1/mybooks').then((data) => {
      console.log(data);
      this.setState({books:data});
    });
  }

  render(){

    var books = mapObject(this.state.books, (key, item) => {
      var cover = "url('"+item.cover+"')";
      return(
				<li key={key}>
					<a href="." className="content-block content-block-book">
						<figure>
							<div className="cover" style={{backgroundImage: cover}}>
								<div className="overlay">
									<button className="button button-red modal-trigger modal-trigger-create-brawl">Brawl</button>
									<button className="button button-white" href=".">Edit</button>
								</div>
							</div>
							<figcaption>
								<h4>{item.title}</h4>
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
      );
    });

    return(
			<div className="book-blocks book-blocks-small">
			<ul>
				{books}
				<li>
					<a href="." className="content-block content-block-book">
						<figure>
							<div className="cover" style={{backgroundImage: "url('/assets/images/samples/covers/1.jpg')"}}>
								<div className="overlay">
									<button className="button button-red modal-trigger modal-trigger-create-brawl">Brawl</button>
									<button className="button button-white" href=".">Edit</button>
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
				<li>
					<a href="." className="content-block content-block-book">
						<figure>
							<div className="cover" style={{backgroundImage: "url('/assets/images/samples/covers/2.jpg')"}}>
								<div className="overlay">
									<button className="button button-red modal-trigger modal-trigger-create-brawl">Brawl</button>
									<button className="button button-white" href=".">Edit</button>
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
				<li>
					<a href="." className="content-block content-block-book">
						<figure>
							<div className="cover" style={{backgroundImage: "url('/assets/images/samples/covers/3.jpg')"}}>
								<div className="overlay">
									<button className="button button-red modal-trigger modal-trigger-create-brawl">Brawl</button>
									<button className="button button-white" href=".">Edit</button>
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
				<li>
					<a href="." className="content-block content-block-book">
						<figure>
							<div className="cover" style={{backgroundImage: "url('/assets/images/samples/covers/4.jpg')"}}>
								<div className="overlay">
									<button className="button button-red modal-trigger modal-trigger-create-brawl">Brawl</button>
									<button className="button button-white" href=".">Edit</button>
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
		</div>
    );
  }
}

if(document.getElementById('myBooks'))
  {ReactDOM.render(<MyBooks />, document.getElementById('myBooks'));}

class NewComponent extends React.Component{
  state = {}

  componentDidMount(){
		/// API call
		/// SET STATE
    this.setState({users: apiUsers});
  }

  render(){
    return(
			<div></div>
    );
  }
}
