import React from 'react';
import { View, Text } from 'react-native';
import SortBy from '../../Filters/SortBy';
import SortByYear from '../../Filters/SortByYear';

const Filters = () => (
  <View>
    <Text>Filters: </Text>
    <SortBy />
    <SortByYear />
  </View>
);

export default Filters;
