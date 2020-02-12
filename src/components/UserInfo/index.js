import React from 'react';
import PropTypes from 'prop-types';

const UserInfo = ({ userInfo }) => (

  <div className="user-info">
    <img 
      src={ userInfo.photo } 
      alt="User avatar"
    />
    <h2>
      <a href={`https://github.com/${ userInfo.login }`}>
        { userInfo.username }
      </a>
    </h2>
    <ul className="repos-info">
      <li>- Repositorios: { userInfo.repos }</li>
      <li>- Seguidores: { userInfo.followers }</li>
      <li>- Seguindo: { userInfo.following }</li>
    </ul>
  </div>
);

UserInfo.propTypes = {
  userinfo: PropTypes.shape({
    username: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    login: PropTypes.string.isRequired,
    repos: PropTypes.array.isRequired,
    followers: PropTypes.number.isRequired,
    following: PropTypes.number.isRequired,
  })
};

export default UserInfo;