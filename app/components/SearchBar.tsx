import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";
import Animated, { FadeIn, FadeOut, FadeOutLeft } from "react-native-reanimated";

const searchSubject = new Subject();

const SearchBar = ({ onChange }) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    // DebounceTime de rxjs para evitar emitir eventos por cada caracter introducido en el TextInput
    const subscription = searchSubject.pipe(debounceTime(300)).subscribe((value: string) => {
      onChange(value.toLowerCase());
    });

    // Eliminamos la suscripción ya que por defecto seguiría activa a la espera de recibir valors
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSearchTextChange = (text) => {
    // Emitimos al subject el nuevo valor del input
    searchSubject.next(text);
    setSearchText(text);
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        testID="search-input"
        placeholder="Buscar..."
        value={searchText}
        onChangeText={handleSearchTextChange}
        style={styles.input}
      />
      {searchText === "" && (
        <Animated.View exiting={FadeOut} entering={FadeIn}>
          <Ionicons name="search" size={20} color="#777" style={{ marginRight: 10 }} />
        </Animated.View>
      )}

      {searchText !== "" && (
        <Animated.View exiting={FadeOut} entering={FadeIn}>
          <Ionicons
            onPress={() => handleSearchTextChange("")}
            name="close-circle"
            size={20}
            color="#777"
            style={{ marginRight: 10 }}
          />
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dedede",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    flexDirection: "row",
  },
  icon: {
    marginLeft: 10,
  },
});

export default SearchBar;
