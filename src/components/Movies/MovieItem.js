import React from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet, Image } from "react-native";
import { Card } from "react-native-elements";
import PercentageCircle from "react-native-percentage-circle";

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "row" },
  text: {
    fontSize: 18,
    fontWeight: "600",
    display: "flex",
    alignItems: "flex-end"
  },
  date: {
    color: "gray",
    fontSize: 14
  },
  card: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  percent: {
    marginRight: 8
  }
});

const MovieItem = ({ item }) => (
  <Card
    image={{
      uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path ||
        item.poster_path}`
    }}
    imageStyle={{ height: 300 }}
    imageProps={{ resizeMode: "cover" }}
  >
    <View
      style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}
    >
      <View>
        <Text style={styles.text}>{item.title}</Text>
        {/* <Text>
          Rating:
          {item.vote_average}
        </Text> */}
        <Text style={styles.date}>Release date: {item.release_date}</Text>
      </View>
      <PercentageCircle
        style={styles.percent}
        radius={16}
        percent={item.vote_average * 10}
        color="salmon"
      />
    </View>
  </Card>
);

MovieItem.propTypes = {
  item: PropTypes.object
};

export default MovieItem;
