import React from 'react';
import FilterGroup from './FilterGroup';
import { createNewFilter } from './modfilter';

const category = ['Consumer Services', 'Finance', 'Technology', 'Public Utilities',
'Captial Goods', 'Basic Industries', 'Health Care', 'Energy'];

class FilterBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {},
    };

    this.modFilter = this.modFilter.bind(this);
  }

  modFilter({ name, value }) {
    const filter = createNewFilter( this.state.filter, name, value );
    this.setState( filter );
    this.props.changeFilter( 1, filter );
  }


  render() {

    const categories = [
      { name: 'sector', title: 'Sector', category },
    ];

    return (
      <sidebar>
        <ul className="list-group">
          { categories.map((cat, idx) => (
            <FilterGroup
              key={ idx }
              category={ cat.category }
              title={ cat.title }
              catName={ cat.name }
              modFilter={ this.modFilter }
              filter={this.state.filter}
            />
            )) }
        </ul>
      </sidebar>
    );
  }
}


export default FilterBar;
