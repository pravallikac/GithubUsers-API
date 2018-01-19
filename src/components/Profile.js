import React from 'react';
import PropTypes from 'prop-types';
import '../css/Profile.css';

const Profile = ({ user }) => {
    if (!user) { return null }
    const { htmlUrl, avatarUrl, name, login, followersCount } = user;
    var count = Number(followersCount).toLocaleString(); 

    return (
        <div className='Profile'>
            <a href={htmlUrl} target='_blank'>
                <img className='Profile-image' src={avatarUrl} alt='GitHub User Profile Avatar'/>
            </a><br/><br/>
            <h5>{name}</h5>
            <a href={htmlUrl} target='_blank'>
                <p>{login}</p>
            </a>
            <p>Followers: {count}</p>
        </div>
    );
};

Profile.propTypes = {
    user: PropTypes.object
}

export default Profile;