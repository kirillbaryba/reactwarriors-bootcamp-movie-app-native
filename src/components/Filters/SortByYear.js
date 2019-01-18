import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { inject, observer } from 'mobx-react';

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    backgroundColor: 'white',
    color: 'black',
  },
});

@inject('moviesPageStore')
@observer
class SortByYear extends React.Component {
  static defaultProps = {
    options: [
      {
        label: 'Все фильмы',
        value: '',
      },
      {
        label: '2019',
        value: '2019',
      },
      {
        label: '2018',
        value: '2018',
      },
      {
        label: '2017',
        value: '2017',
      },
      {
        label: '2016',
        value: '2016',
      },
      {
        label: '2015',
        value: '2015',
      },
      {
        label: '2014',
        value: '2014',
      },
      {
        label: '2013',
        value: '2013',
      },
    ],
  };

  handleFiltersYearChange = (itemValue) => {
    const {
      moviesPageStore: { onChangeFilters },
    } = this.props;
    onChangeFilters({
      target: {
        name: 'primary_release_year',
        value: itemValue,
      },
    });
  };

  render() {
    const {
      moviesPageStore: { filters },
      options,
    } = this.props;
    return (
      <View>
        <Text>Sort by year: </Text>
        <RNPickerSelect
          placeholder={{
            label: 'Sort by year',
            value: null,
          }}
          items={options}
          onValueChange={this.handleFiltersYearChange}
          onUpArrow={() => {
            this.inputRefs.name.focus();
          }}
          onDownArrow={() => {
            this.inputRefs.picker2.togglePicker();
          }}
          value={filters.primary_release_year}
          style={{ ...pickerSelectStyles }}
        />
      </View>
    );
  }
}

SortByYear.propTypes = {
  moviesPageStore: PropTypes.object,
  options: PropTypes.array,
};

export default SortByYear;
