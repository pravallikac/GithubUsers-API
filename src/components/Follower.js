import React from 'react';
import PropTypes from 'prop-types'
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../css/Follower.css';

const Follower = ({ avatarUrl, githubUrl, login }) => {
    return (
        <div className='main'>
        <ul>
            <a href={githubUrl} target='_blank'>
                        <img className='user-info__avatar' src={avatarUrl} alt={`${login} avatar`}/>
                    <h2 className="user-info__title">{login}</h2>
        
            </a>
        </ul>
        </div>
    );
};

Follower.propTypes = {
    avatarUrl: PropTypes.string,
    githubUrl: PropTypes.string
}

export default Follower;