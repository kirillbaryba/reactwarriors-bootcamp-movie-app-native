import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  FlatList,
  Dimensions
} from "react-native";
import { inject, observer } from "mobx-react";
import PropTypes from "prop-types";
import MovieItem from "../../components/Movies/MovieItem";
import HeaderComponent from "../../components/Header/HeaderComponent";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const SCREEN_WIDTH = Dimensions.get("window").width;
const x = new Animated.Value(0);

const transitionAnimation = index => ({
  transform: [
    { perspective: 300 },
    {
      scale: x.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH
        ],
        outputRange: [0.9, 1, 0.9]
      })
    },
    {
      rotateY: x.interpolate({
        inputRange: [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH
        ],
        outputRange: ["-10deg", "0deg", "10deg"]
      })
    }
  ]
});

@inject("moviesPageStore")
@observer
class MoviesScreen extends React.Component {
  componentDidMount() {
    const {
      moviesPageStore: { getMovies }
    } = this.props;
    getMovies();
  }

  render() {
    const {
      moviesPageStore: { isLoading, movies }
    } = this.props;
    return (
      <View style={styles.container}>
        <HeaderComponent />
        {isLoading ? (
          <Text>...loading</Text>
        ) : (
          <AnimatedFlatList
            style={{ width: SCREEN_WIDTH }}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x } } }],
              { useNativeDriver: true }
            )}
            data={movies}
            keyExtractor={item => String(item.id)}
            renderItem={({ item, index }) => (
              <MovieItem
                item={item}
                index={index}
                style={transitionAnimation(index)}
              />
            )}
          />
        )}
      </View>
    );
  }
}

MoviesScreen.propTypes = {
  moviesPageStore: PropTypes.object
};

export default MoviesScreen;
