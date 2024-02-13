import { View, useWindowDimensions } from "react-native";
import RenderHtml from "react-native-render-html";

import Animated, {
  FadeIn,
  FadeInUp,
  clamp,
  measure,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";
import { SafeAreaView, StyleSheet, Text } from "react-native";

export function FeedReader({ route }) {
  const { width } = useWindowDimensions();
  const { article } = route.params;

  const scrollViewRef = useAnimatedRef<Animated.ScrollView>();
  const textRef = useAnimatedRef<Animated.Text>();
  const scrollHandler = useScrollViewOffset(scrollViewRef);

  const progressBarAnimatedStyle = useAnimatedStyle(() => {
    const measuredText = measure(textRef);
    if (measuredText === null || measuredText.height === 0 || Number.isNaN(measuredText.height)) { // Si el texto no es visible no tendra tamaño, retornamos el width a 0
      return { width: 0 };
    }

    const measuredScroll = measure(scrollViewRef); // Lo mismo para el scroll, puede tardar un poco en haber medidas debido a la animación del ScrollView
    if (
      measuredScroll === null ||
      measuredScroll.width === 0 ||
      measuredScroll.height === 0 ||
      Number.isNaN(measuredScroll.width) ||
      Number.isNaN(measuredScroll.height)
    ) {
      return { width: 0 };
    }

    const currentOffset = scrollHandler.value;
    const maxOffset = measuredText.height - measuredScroll.height;

    const progress = currentOffset / maxOffset;
    const clampedProgress = clamp(progress, 0, 1); // Limitamos con clamp, la animación con reanimated siempre debe estar en medidas comprendidas entre el 0 y el 1

    const maxWidth = measuredScroll.width;
    const width = clampedProgress * maxWidth;

    return { width };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ paddingHorizontal: 8, paddingVertical: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "700", textAlign: "center" }}>{article.title}</Text>
      </View>
      <Animated.View style={[styles.progressBar, progressBarAnimatedStyle]} />

      <Animated.ScrollView ref={scrollViewRef} style={{ flex: 1 }}>
        <Animated.Image
          entering={FadeInUp.delay(50).duration(500)}
          // sharedTransitionStyle={sharedTransition}
          source={{ uri: article.headerImage }}
          // sharedTransitionTag={`imgHeader${article.index}`}
          style={{ width: "100%", height: 300 }}
        ></Animated.Image>
        <Animated.View entering={FadeIn.delay(200).duration(500)} style={{ marginHorizontal: 14 }} ref={textRef}>
          <RenderHtml
            tagsStyles={{
              a: {
                color: "#58585A",
                textDecorationLine: "none",
                fontSize: 16,
                fontFamily: "Montserrat-Bold",
                lineHeight: 23,
              },
              img: { paddingTop: "0%" },
            }}
            contentWidth={width}
            source={{ html: article.content }}
          />
        </Animated.View>
      </Animated.ScrollView>
    </SafeAreaView>
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
});
