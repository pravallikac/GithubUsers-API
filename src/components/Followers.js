import React from 'react';
import PropTypes from 'prop-types';
import Follower from './Follower';

const Followers = ({ listOfFollowers, userFound }) => {
    if (!userFound) { return null; }
    if (listOfFollowers.length === 0) { return <p>This user has no followers</p>}
    
    return (
        <div className='Followers'>
            <div className='Followers-wrapper'>
                {listOfFollowers && listOfFollowers.map((follower, idx) => {
                    const { avatarUrl, htmlUrl, login } = follower;
                    return (
                        
                        <Follower key={idx} avatarUrl={avatarUrl} githubUrl={htmlUrl} login={login} />
                    );
                })}
            </div>
        </div>
    );
};

Followers.propTypes = {
    listOfFollowers: PropTypes.array,
    userFound: PropTypes.bool
}

export default Followers;