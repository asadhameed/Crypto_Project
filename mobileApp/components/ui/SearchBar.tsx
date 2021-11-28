import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type Props = {
  searchTerm: string;
  onTermChange: React.Dispatch<string>;
  onTermSubmit: () => void;
};
const SearchBar: React.FC<Props> = ({
  searchTerm,
  onTermChange,
  onTermSubmit,
}: Props) => {
  return (
    <View style={Styles.backgroundStyle}>
      <FontAwesome style={Styles.iconStyle} name="search" />
      <TextInput
        autoCapitalize="none"
        style={Styles.inputStyle}
        placeholder="Search"
        value={searchTerm}
        onChangeText={onTermChange}
        onEndEditing={onTermSubmit}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  backgroundStyle: {
    width: "50%",
    marginHorizontal: 15,
    marginTop: 10,
    flexDirection: "row",
    backgroundColor: "#eae1e1",
    height: 40,
    borderRadius: 20,
    marginBottom: 10,
    alignSelf: "center",
  },
  inputStyle: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 20,
    marginHorizontal: 15,
    alignSelf: "center",
  },
});

export default SearchBar;
