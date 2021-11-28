import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constant/Colors";
import { Context } from "../contexts/coinContext";
import { HomeStackParamList } from "../types/navigationType";

type NavigationProps = NativeStackNavigationProp<
  HomeStackParamList,
  "CoinHistoryGraphScreen"
>;

const TopCoinList = () => {
  const { state } = useContext(Context);
  const navigation = useNavigation<NavigationProps>();

  const renderItem = ({ item }: any) => {
    return (
      <TouchableNativeFeedback
        onPress={() =>
          navigation.navigate("CoinHistoryGraphScreen", { coinId: item.id })
        }
      >
        <View style={styles.itemContainer}>
          <Image
            source={{
              uri: item.iconUrl,
            }}
            style={styles.imageStyle}
          />
          <View>
            <Text style={styles.textNameStyle}>{item.id}/USD</Text>
            <Text style={styles.textPriceStyle}>${item.price.toFixed(2)}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}> Top 5 Coin Live Price</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={state.coins.slice(0, 5)}
        keyExtractor={(coin) => coin.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Colors.primaryColor,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  titleStyle: {
    marginLeft: 15,
    padding: 10,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.accentColor,
    alignSelf: "flex-start",
  },

  itemContainer: {
    flex: 1,
    flexDirection: "row",
    width: "100%",
    backgroundColor: Colors.boxColor,
    borderRadius: 10,
    shadowColor: "black",
    elevation: 6,
    fontFamily: "open-sans",
    padding: 10,
    margin: 5,
    marginLeft: 10,
    marginBottom: 10,
  },

  imageStyle: {
    width: 30,
    height: 30,
  },
  textNameStyle: {
    fontSize: 12,
    marginLeft: 10,
    fontWeight: "bold",
    fontFamily: "open-sans",
    color: Colors.accentColor,
  },
  textPriceStyle: {
    fontSize: 12,
    fontWeight: "normal",
    marginLeft: 10,
    fontFamily: "open-sans",
    color: Colors.accentColor,
  },
});

export default TopCoinList;
