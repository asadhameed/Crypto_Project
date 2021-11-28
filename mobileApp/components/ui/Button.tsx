import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import Colors from "../../constant/Colors";

type Props = {
  title: String;
  cb: () => void;
};
const Button: React.FC<Props> = ({ title, cb }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={cb}>
      <Text style={styles.textTile}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 70,
    margin: 5,
    borderWidth: 2,
    borderRadius: 20,
    justifyContent: "center",
  },
  textTile: {
    padding: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "open-sans",
    color: Colors.accentColor,
  },
});

export default Button;
