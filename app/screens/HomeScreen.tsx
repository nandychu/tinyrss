import { useEffect } from "react";
import { Text, StyleSheet, StatusBar, View } from "react-native";
import { fetchFeed } from "../services/FetchService";
import { RSSFeedSource } from "../models/RSSFeedSource";
import { SafeAreaView } from "react-native-safe-area-context";
export default function HomeScreen() {
  useEffect(() => {
    const xatakaAndroid: RSSFeedSource = {
      name: "XatakaAndroid",
      url: "https://www.xatakandroid.com/tag/feeds/rss2.xml",
      firstFetch: false,
      articles: [],
    };
    fetchFeed(xatakaAndroid);
  }, []);

  return (
    <SafeAreaView style={[styles.safeAreaContainter]}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.listContainer]}></View>
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
