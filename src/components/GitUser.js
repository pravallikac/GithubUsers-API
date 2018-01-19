import React, { Component } from 'react';
import Search from './Search';
import Profile from './Profile';
import Followers from './Followers';
import { fetchGitHubData } from './helpers';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

import '../css/GitUser.css';


class User extends Component {
    constructor(props) {
        super(props);
        this._submitUsername = this._submitUsername.bind(this);
        this._getMoreFollowers = this._getMoreFollowers.bind(this);
        this.state = { 
            user: undefined,
            listOfFollowers: [],
            followersCount: 0,
            isLoading: false,
            page: 1,
            error: ''
        };
    }

    _submitUsername (e) {
        e.preventDefault();
        const username = e.currentTarget.username.value;
        this._getUserData (username);
        this._getFollowersData(username);
    }

    _isLoadingUser () {
        this.setState({
            user: null,
            isLoading: true,
            error: ''
        });
    }

    _getUserData (username) {
        if (!username) { return null; }
        this._isLoadingUser();

        fetchGitHubData(username).then(user => {
            this._setUser(user);
        }).catch(error => {
            console.warn(error);
            this.setState({ error });           
        });
    }

    _setUser (user) {
        const currentUser = {
            login: user.login,
            avatarUrl: user.avatar_url,
            htmlUrl: user.html_url,
            name: user.name,
            followersCount: user.followers
        };
        this.setState({ 
            user: currentUser,
            followersCount: currentUser.followersCount,
            page: 1
        });
    }

    _isLoadingFollowers () {
        this.setState({ 
            listOfFollowers: [],
            error: ''
        });
    }

    _mapFollowers (follower) {
        return {
            login: follower.login,
            avatarUrl: follower.avatar_url,
            htmlUrl: follower.html_url
        };
    }

    _getFollowersData (username) {
        if (!username) { return null; }
        this._isLoadingFollowers();

        fetchGitHubData(username, 1).then(followers => {
            const followersList = followers.map(this._mapFollowers);
            this._setFollowers (followersList);
        }).catch(error => {
            console.warn(error);
        });
    }

    _setFollowers (followers) {
        this.setState({ 
            listOfFollowers: [...this.state.listOfFollowers, ...followers],
            page: this.state.page + 1,            
            isLoading: false
        });
    }

    _getMoreFollowers () {
        const { login: username } = this.state.user
        const { page } = this.state;
        if (!username) { return null; }

        fetchGitHubData(username, page).then(followers => {
            const followersList = followers.map(this._mapFollowers);
            this._setFollowers (followersList);            
        }).catch(error => {
            console.warn(error);
        });
    }

    render() {
        const { user, listOfFollowers, isLoading, error, followersCount } = this.state;
        const loadMore = listOfFollowers.length > 0 && user && followersCount && followersCount > listOfFollowers.length;
        const userFound = Boolean(user)
        if (isLoading && !error) { return (<p className='User-loading'>Loading data</p>); }

        return ( <div className="container"> 
                                           
                      
              <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Github</a>
  
                <div className=" navbar-collapse" id="navbarNavAltMarkup">
                  <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="/">Home <span className="sr-only">(current)</span></a>
                    <a className="nav-item nav-link" target="_blank" rel='noopener noreferrer' href="https://www.linkedin.com/in/pravallika-c/">LinkedIn</a>
                    <a className="nav-item nav-link" target="_blank" rel='noopener noreferrer' href="https://github.com/pravallikac">MyGithub</a>
                    <a className="nav-item nav-link" target="_blank" rel='noopener noreferrer' href="http://www2.cs.siu.edu/~pchandolu/">Myblog</a>
                  </div>
                </div>
                </nav>          
            
                <div className="card main">
                    <div className="card-block">
                        <h4 className="card-title">GitHub Followers</h4>
                        
                        <Search submit={this._submitUsername} className="search"/>
                   </div>                       
                    
                 </div> 
                <div className="container main">
                    <div className="row">
                        <div className="col-3">
                            <Profile user={user} className="profilec"/>
                                {error && <p className='User-errorMessage'>Error: user does not exist or exceeded API limit (60/hour)</p>}
                        </div>
                        <div className= "col-3"  >
                            </div>
                        <div className="col-3">
                                 
                           <Followers listOfFollowers={listOfFollowers} userFound={userFound} className=""/>
                          {loadMore && <button className='btn btn-primary' 
                           onClick={this._getMoreFollowers}>Load more
                    </button>}
                        </div>
                    </div>
                </div>                          
                    
               
             
                <div>
                
              </div>
            </div>
        )
    }
}

export default User;