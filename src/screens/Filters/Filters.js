import React from "react";
import { View, Text } from "react-native";
import SortBy from "../../components/Filters/SortBy";
import SortByYear from "../../components/Filters/SortByYear";
import ClearAllFilters from "../../components/Filters/ClearAllFilters";

const Filters = () => (
  <View>
    <Text>Filters: </Text>
    <SortBy />
    <SortByYear />
    <ClearAllFilters />
  </View>
);

export default Filters;
