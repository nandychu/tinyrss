import React, { useState, useEffect } from "react";
import { TextInput, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Subject } from "rxjs";
import { debounceTime } from "rxjs/operators";

const searchSubject = new Subject();

const SearchBar = ({ onChange }) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const subscription = searchSubject.pipe(debounceTime(300)).subscribe((value: string) => {
      onChange(value.toLowerCase());
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSearchTextChange = (text) => {
    searchSubject.next(text);
    setSearchText(text);
    // onChange(text)
  };

  const handleSearchSubmit = () => {
    searchSubject.next(searchText);
  };

  return (
    <View style={styles.searchBar}>
      <TextInput
        testID="search-input"
        placeholder="Buscar..."
        value={searchText}
        onChangeText={handleSearchTextChange}
        onBlur={handleSearchSubmit}
        style={styles.input}
      />
      <Ionicons name="search" size={20} color="#777" style={{ marginRight: 10 }} />
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
