import React, { useContext } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text, StyleSheet, Button } from "react-native";
import { FavoriteStackParamList } from "../types/navigationType";

import CoinList from "../components/CoinList";
import { Context } from "../contexts/coinContext";
import Coin from "../models/Coin";

type Props = NativeStackScreenProps<FavoriteStackParamList, "FavoriteScreen">;

const FavoriteScreen: React.FC<Props> = ({ navigation }: Props) => {
  const { state } = useContext(Context);

  let favoriteCoins = state.favoriteCoins.map(
    (fc) => state.coins.find((c) => c.id === fc) as Coin
  );

  return (
    <View style={styles.screenContainer}>
      <CoinList isFavoritePage={true} coins={favoriteCoins} />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: "center",
  },
});

export default FavoriteScreen;
