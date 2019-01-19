import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
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
          <FlatList
            data={movies}
            renderItem={({ item }) => <MovieItem item={item} />}
            keyExtractor={item => String(item.id)}
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
