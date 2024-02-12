import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Animated, { FadeInLeft, clamp } from "react-native-reanimated";
import Article from "../models/Article";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export default function FeedCard(props) {
  const article: Article = props.article;
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <Animated.View style={{ flex: 1 }} entering={FadeInLeft.delay(clamp(article.index * 100, 100, 1000)).duration(600)}>
      <TouchableOpacity onPress={() => navigation.navigate("FeedReader", { article })}>
        <View style={[styles.cardContainer]}>
          <View style={{ display: "flex", flexShrink: 1, flexGrow: 1 }}>
            <Text style={[styles.title]}>{article.title}</Text>
            <Text style={[styles.briefContent]} numberOfLines={2}>
              {article.briefContent}
            </Text>
          </View>

          <View style={{ flexGrow: 3 }}>
            <Animated.Image source={{ uri: article.headerImage }} style={[styles.headerImage]}></Animated.Image>
          </View>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8, marginTop: 4 }}>
          <Text style={[styles.author]}>{article.author}</Text>
          <Text style={[styles.author]}>{article.published}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  progressBar: {
    backgroundColor: "red",
    height: 8,
  },
  text: {
    marginHorizontal: 16,
  },
  cardContainer: {
    flex: 1,
    overflow: "hidden",
    marginTop: 16,
    flexDirection: "row",
  },
  headerImage: { width: 70, height: 70, borderRadius: 4, marginLeft: 12 },
  author: { fontSize: 12, marginLeft: 2, marginTop: 4, color: "#2f2f2f" },
  title: { fontFamily: "TrebuchetMS-Bold", fontWeight: "600", fontSize: 16, padding: 2, color: "#2b2b2b" },
  briefContent: { fontFamily: "Optima-Italic", padding: 2, fontSize: 13, color: "#7b7b7b", marginTop: 6 },
});
