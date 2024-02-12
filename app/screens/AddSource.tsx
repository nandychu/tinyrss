import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator } from "react-native";
import { RSSFeedSource } from "../models/RSSFeedSource";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import mainStore from "../store/mainStore";
import { checkFeedSource } from "../services/FetchService";

export default function AddSource() {
  const [inputs, setInputs] = useState({
    nameInput: "",
    urlInput: "",
  });
  const [processingSource, setProcessingSource] = useState(false);
  const [processingFailed, setProcessingFailed] = useState(false);

  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleChange = (value, inputName) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [inputName]: value,
    }));
  };

  const handleSubmit = async () => {
    setProcessingSource(true);
    setProcessingFailed(false);

    checkFeedSource(inputs.urlInput)
      .then(() => {
        const newSource: RSSFeedSource = {
          name: inputs.nameInput,
          url: inputs.urlInput,
          firstFetch: false,
          articles: [],
        };

        mainStore.addSource(newSource);
        setProcessingSource(false);
        navigation.goBack();
      })
      .catch((err) => {
        setProcessingSource(false);
        setProcessingFailed(true);
        console.log("no feed foundt at source");
      });
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginHorizontal: 8,
          marginTop: 4,
        }}
      >
        <Button color={"red"} title="Cancel" onPress={() => navigation.goBack()} />
        {processingSource && <ActivityIndicator style={{ marginRight: 8 }}></ActivityIndicator>}
        {!processingSource && <Button title="Add" onPress={() => handleSubmit()} />}
      </View>
      <View style={styles.container}>
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontFamily: "TrebuchetMS-Bold", fontSize: 17, fontWeight: "600", marginBottom: 4 }}>
            Add source
          </Text>
          <Text style={{ fontWeight: "300", color: "#7b7b7b", fontSize: 13 }}>
            To add a source, enter a name and the URL of the feed to receive the latest news from the site
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Source Name..."
          value={inputs.nameInput}
          onChangeText={(text) => handleChange(text, "nameInput")}
        />
        <TextInput
          style={styles.input}
          placeholder="Source Feed URL"
          value={inputs.urlInput}
          onChangeText={(text) => handleChange(text, "urlInput")}
          keyboardType="url"
        />

        {!processingSource && processingFailed && (
          <Text style={{ fontWeight: "300", color: "red", fontSize: 13, marginTop: 12 }}>
            There was a problem loading your source url. Please check the provided source.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  input: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#dedede",
  },
});

