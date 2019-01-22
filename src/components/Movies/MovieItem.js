import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Animated
} from "react-native";
import PercentageCircle from "react-native-percentage-circle";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

const styles = StyleSheet.create({
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
  image: {
    height: 400,
    resizeMode: "cover",
    marginBottom: 10
  },
  card: {
    width: SCREEN_WIDTH,
    padding: 10
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  rating: {
    position: "absolute",
    top: 0,
    right: 0
  }
});

const MovieItem = ({ item, style }) => (
  <View style={styles.card}>
    <Animated.View style={style}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${item.backdrop_path ||
            item.poster_path}`
        }}
        style={styles.image}
      />
      <View style={style.wrapper}>
        <View>
          <Text style={styles.text}>{item.title}</Text>
          <Text style={styles.date}>Release date: {item.release_date}</Text>
        </View>

        <View style={styles.rating}>
          <PercentageCircle
            ItemSeparatorComponent
            radius={16}
            percent={item.vote_average * 10}
            color="salmon"
          />
        </View>
      </View>
    </Animated.View>
  </View>
);

MovieItem.propTypes = {
  item: PropTypes.object,
  style: PropTypes.object
};

export default MovieItem;
