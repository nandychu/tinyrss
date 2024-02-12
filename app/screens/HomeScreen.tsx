import { useEffect } from "react";
import { Text } from "react-native";
import { fetchFeed } from "../services/FetchService";
import { RSSFeedSource } from "../models/RSSFeedSource";
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
  return <Text>Halo!</Text>;
}
