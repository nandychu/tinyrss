import { useEffect, useState } from "react";
import { Text, StyleSheet, StatusBar, View } from "react-native";
import { fetchFeed } from "../services/FetchService";
import { RSSFeedSource } from "../models/RSSFeedSource";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FeedList from "../components/FeedList";
export default function HomeScreen() {
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      // Cargamos las dos fuentes por defecto para esta demo
      const macStories = await AsyncStorage.getItem("macstories");
      const xatakaAndroid = await AsyncStorage.getItem("xatakandroid");

      if (!macStories) {
        const macStoriesFeed: RSSFeedSource = {
          name: "MacStories",
          url: "https://www.macstories.net/feed/",
          firstFetch: false,
          articles: [],
        };
        await AsyncStorage.setItem("macstories", JSON.stringify(macStoriesFeed));
      }
      if (!xatakaAndroid) {
        const xatakaAndroid: RSSFeedSource = {
          name: "XatakaAndroid",
          url: "https://www.xatakandroid.com/tag/feeds/rss2.xml",
          firstFetch: false,
          articles: [],
        };
        await AsyncStorage.setItem("xatakandroid", JSON.stringify(xatakaAndroid));
      }
      setInitialLoad(true);
    } catch (e) {
      setInitialLoad(true);
    }
  };

  return (
    <SafeAreaView style={[styles.safeAreaContainter]}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.listContainer]}>{initialLoad && <FeedList></FeedList>}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainter: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});
