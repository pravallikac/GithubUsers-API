import React from 'react';
import PropTypes from 'prop-types'
import '../css/Search.css';

const Search = ({ submit }) => {
    return (
        <div className='Search'>
            <form onSubmit={submit}>
                <input className='search' type='text' name='username' placeholder='Search by Github username' required autoFocus />
                <input className='btn btn-primary submit' type='submit' value='Submit' />
            </form>
        </div>
    );
};

Search.propTypes = {
    submit: PropTypes.func
}

export default Search;