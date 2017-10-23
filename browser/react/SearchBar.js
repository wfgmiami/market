import React from 'react';

import axios from 'axios';


class SearchBar extends React.Component {
  constructor(props) {
    super(props);

  }


  render() {
    return (
      <div>
        <form className="navbar-form" >
        <div className="input-group">
          <input className="form-control" placeholder="Enter Company" type="text"  />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">
              <span className="glyphicon glyphicon-search" />
            </button>
          </span>
        </div>
      </form>
     </div>
    );
  }
}


export default SearchBar;
