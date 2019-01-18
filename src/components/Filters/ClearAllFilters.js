import React from 'react';
import { Button } from 'react-native';
import { inject, observer } from 'mobx-react';
import PropTypes from 'prop-types';

@inject('moviesPageStore')
@observer
class ClearAllFilters extends React.Component {
  clearFilters = () => {
    const {
      moviesPageStore: { clearAllFilters },
    } = this.props;
    clearAllFilters();
  };

  render() {
    return (
      <Button
        onPress={this.clearFilters}
        title="Clear all filters"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    );
  }
}

ClearAllFilters.propTypes = {
  moviesPageStore: PropTypes.object,
};

export default ClearAllFilters;
