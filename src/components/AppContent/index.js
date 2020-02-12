import React from 'react';
import { PropTypes } from 'prop-types';

import {
  Search,
  UserInfo,
  Actions,
  Repos
} from '../../components';

const AppContent = ({ 
  userInfo, 
  repos, 
  starred, 
  handleSearch, 
  getRepos ,
  getStarred
}) => (

  <div className="app">
    
    <Search handleSearch={ handleSearch } />

    { !!userInfo && 
      <UserInfo userInfo={ userInfo } /> 
    }
    { !!userInfo && 
      <Actions 
        getRepos={getRepos} 
        getStarred={getStarred}
      /> 
    }

    { !!repos.length && 
      <Repos 
        className="repos" 
        title="Repositórios: "
        repos={ repos }
      />
    }

    { !!starred.length &&
      <Repos 
        className="starred" 
        title="Favoritos: "
        repos={ starred }
      />
    }
  </div>
);

AppContent.propTypes = {
  userinfo: PropTypes.object,
  repos: PropTypes.array.isRequired,
  starred: PropTypes.array.isRequired
};

export default AppContent;