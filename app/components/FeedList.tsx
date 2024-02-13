import { useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, View, ActivityIndicator, StyleSheet, Text } from "react-native";
import {} from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import FeedCard from "./FeedCard";
import Article from "../models/Article";
import { observer } from "mobx-react-lite";
import mainStore from "../store/mainStore";
import { RSSFeedSource } from "../models/RSSFeedSource";
import { fetchFeed } from "../services/FetchService";
import SearchBar from "./SearchBar";
import SourcesList from "./SourcesList";
import AsyncStorage from "@react-native-async-storage/async-storage";

function FeedList() {
  const [items, setItems] = useState<Article[]>([]);
  const [filteredItems, setFilteredItems] = useState<Article[]>([]);
  const [filterTitle, setFilterTitle] = useState(null);
  const [selectedSource, setSelectedSource] = useState<RSSFeedSource>(mainStore.getSelectedSource());
  const [fetchingArticles, setFetchingArticles] = useState(false);
  const [noArticlesFound, setNoArticlesFound] = useState(false);

  useEffect(() => {
    setItems([]);
    setFilteredItems([]);
    fetch();
  }, [selectedSource]);

  function fetch() {
    setFetchingArticles(true);
    fetchFeed(selectedSource).then((res: any) => {
      setItems(res);
      setFilteredItems(res);
      setFetchingArticles(false);
    });
  }

  useEffect(() => {
    if (filterTitle === "") {
      setFilteredItems([...items]);
    } else {
      // Filtramos por título y mantenemos el array items inmutable para evitar llamar de nuevo al fetch
      let filteredArticles = [...items].filter((article) => article.title.toLowerCase().includes(filterTitle));
      setFilteredItems(filteredArticles);
      if (filteredArticles.length == 0) {
        setNoArticlesFound(true);
      } else {
        setNoArticlesFound(false)
      }
    }
  }, [filterTitle]);

  function renderListItem(el) {
    return <FeedCard article={el.item}></FeedCard>;
  }

  const ListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#CED0CE60",
        }}
      />
    );
  };

  function ListEmptyComponent() {
    return (
      <Animated.View entering={FadeIn} exiting={FadeOut} style={[styles.loaderContainer]}>
        {fetchingArticles && <ActivityIndicator></ActivityIndicator>}
        {noArticlesFound && !fetchingArticles && <Text>No articles found</Text>}
      </Animated.View>
    );
  }

  const onChange = useCallback((e) => {
    setFilterTitle(e);
  }, []);

  const onSourceChange = useCallback(async (source) => {
    const selectedSource = await AsyncStorage.getItem(source);
    setSelectedSource(JSON.parse(selectedSource));
  }, []);

  const ListHeaderComponent = useMemo(
    () => (
      <View style={{ flex: 1 }}>
        <SourcesList onSourceChange={onSourceChange}></SourcesList>
        <SearchBar onChange={onChange}></SearchBar>
      </View>
    ),
    [onSourceChange, onChange]
  );

  return (
    <View style={[styles.listContainer]}>
      <FlatList
        ListHeaderComponent={ListHeaderComponent}
        ItemSeparatorComponent={ListItemSeparator} // Aquí se agrega la línea divisoria
        renderItem={renderListItem}
        data={filteredItems}
        style={[styles.list]}
        extraData={filteredItems}
        ListEmptyComponent={ListEmptyComponent}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: { flex: 1, width: "100%" },
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  list: { marginHorizontal: 18 },
});

export default observer(FeedList);
