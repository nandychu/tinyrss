import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import { FeedReader } from "../screens/FeedReader";
import AddSource from "../screens/AddSource";

export default function AppNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
          <Stack.Screen options={{ headerShown: false }} name="FeedReader" component={FeedReader} />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: "modal", headerShown: false }}>
          <Stack.Screen name="AddSource" component={AddSource} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
