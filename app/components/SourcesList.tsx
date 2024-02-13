import { useEffect, useState } from "react";
import { FlatList, Text, TouchableOpacity, View, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import mainStore from "../store/mainStore";
import { observer } from "mobx-react-lite";

function SourcesList({ onSourceChange }) {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [selectedSource, setSelectedSource] = useState(mainStore.getSelectedSourceName());
  const [toDeleteSource, setToDeleteSource] = useState(mainStore.getSelectedSourceName());

  const deleteSourceAlert = () =>
    Alert.alert("Delete", "Are you sure you want to delete this source?", [
      {
        text: "Cancel",
        onPress: () => {},
        style: "cancel",
      },
      { text: "OK", onPress: () => handleSourceDeletion() },
    ]);

  async function handleSourceDeletion() {
    await AsyncStorage.removeItem(toDeleteSource);
    let sources = await AsyncStorage.getAllKeys();
    mainStore.loadSources();
    // Eliminamos el source y forzamos a elegir el primero para actualizar la vista a un source que exista
    onSourceChange(sources[0]);
  }

  return (
    <View style={{}}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <Text style={{ fontFamily: "Arial Rounded MT Bold", fontSize: 28, marginBottom: 0 }}>Sources</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddSource")}>
          <View style={styles.iconContainer}>
            <Ionicons name="add" size={18} color="yellow" />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {mainStore.getSources() &&
          mainStore.getSources().map((source, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.sourceContainer,
                {
                  borderColor: selectedSource !== source ? "#fec100" : "white",
                  backgroundColor: selectedSource === source ? "#fec100" : "transparent",
                },
              ]}
              onPress={() => {
                setSelectedSource(source);
                onSourceChange(source);
                mainStore.setSelectedSourceName(source);
              }}
              onLongPress={() => {
                setToDeleteSource(source);
                deleteSourceAlert();
              }}
            >
              <Text style={{ color: selectedSource !== source ? "#fec100" : "white", fontFamily: "TrebuchetMS-Bold" }}>
                {source}
              </Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
}

export default observer(SourcesList);

const styles = StyleSheet.create({
  button: {
    backgroundColor: "lightgrey",
    borderRadius: 30,
    width: 25,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  sourceContainer: {
    width: "40%",
    alignItems: "center",
    borderWidth: 1,
    padding: 8,
    margin: 4,
    borderRadius: 12,
  },
});
