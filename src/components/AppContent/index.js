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
  isFetching,
  handleSearch, 
  getRepos ,
  getStarred
}) => (

  <div className="app">
    
    <Search isDisabled={isFetching} handleSearch={ handleSearch } />

    {isFetching && <div>Carregando...</div>}

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
  starred: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func.isRequired, 
  getRepos: PropTypes.func.isRequired,
  getStarred: PropTypes.func.isRequired
};

export default AppContent;