import React from "react";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingTop: 13,
    paddingHorizontal: 10,
    paddingBottom: 12,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    backgroundColor: "white",
    color: "black"
  }
});

@inject("moviesPageStore")
@observer
class SortBy extends React.Component {
  static defaultProps = {
    optionsSortBy: [
      {
        label: "Популярные по убыванию",
        value: "popularity.desc"
      },
      {
        label: "Популярные по возростанию",
        value: "popularity.asc"
      },
      {
        label: "Рейтинг по убыванию",
        value: "vote_average.desc"
      },
      {
        label: "Рейтинг по возростанию",
        value: "vote_average.asc"
      }
    ]
  };

  handleFiltersChange = itemValue => {
    const {
      moviesPageStore: { onChangeFilters }
    } = this.props;
    onChangeFilters({
      target: {
        name: "sort_by",
        value: itemValue
      }
    });
  };

  render() {
    const {
      moviesPageStore: { filters },
      optionsSortBy
    } = this.props;
    return (
      <View>
        <Text>Sort by: </Text>
        <RNPickerSelect
          items={optionsSortBy}
          onValueChange={this.handleFiltersChange}
          value={filters.sort_by}
          style={{ ...pickerSelectStyles }}
        />
      </View>
    );
  }
}

SortBy.propTypes = {
  moviesPageStore: PropTypes.object,
  optionsSortBy: PropTypes.array
};

export default SortBy;
