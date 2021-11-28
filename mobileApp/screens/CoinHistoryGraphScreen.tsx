import React, { useLayoutEffect, useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import {
  HomeStackParamList,
  FavoriteStackParamList,
} from "../types/navigationType";

import { Context } from "../contexts/coinContext";
import CoinDetail from "../components/CoinDetail";

type Props =
  | NativeStackScreenProps<HomeStackParamList, "CoinHistoryGraphScreen">
  | NativeStackScreenProps<FavoriteStackParamList, "CoinHistoryGraphScreen">;
const CoinHistoryGraphScreen: React.FC<Props> = ({ navigation, route }) => {
  const { state, addToFavorite } = useContext(Context);

  const { coinId } = route.params;
  const isFavorite = state.favoriteCoins.find((c) => c === coinId);
  const selectedCoin = state.coins.find((c) => c.id === coinId);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.coinId + "/UST",
      headerRight: () => (
        <TouchableNativeFeedback onPress={() => addToFavorite(coinId)}>
          <FontAwesome
            name={isFavorite ? "star" : "star-o"}
            size={24}
            color="white"
          />
        </TouchableNativeFeedback>
      ),
    });
  }, [navigation, coinId, isFavorite]);

  return (
    <View style={styles.screenContainer}>
      <CoinDetail coin={selectedCoin} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 18,
  },
});

export default CoinHistoryGraphScreen;
