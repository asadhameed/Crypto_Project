import React, { useContext, useEffect, useState } from "react";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, ActivityIndicator, StyleSheet } from "react-native";

import { HomeStackParamList } from "../types/navigationType";
import { Context } from "../contexts/coinContext";
import SearchBar from "../components/ui/SearchBar";
import TopCoinList from "../components/TopCoinList";
import CoinList from "../components/CoinList";
import Colors from "../constant/Colors";
import Coin from "../models/Coin";

type Props = NativeStackScreenProps<HomeStackParamList, "CryptoScreen">;

const CryptoCoinsScreen: React.FC<Props> = ({ navigation }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const {
    state: { coins, searchCoin },
    getCoins,
    onSearchCoin,
  } = useContext(Context);

  const [coinsData, setCoinsData] = useState<Coin[]>([]);
  useEffect(() => {
    let isActive = true;
    if (isActive) {
      setIsFetchingData(true);
      getCoins(() => setIsFetchingData(false));
      setSearch(false);
    }
    return () => {
      isActive = false;
    };
  }, [navigation]);

  useEffect(() => {
    let isActive = true;
    if (isSearch) {
      if (isActive) setCoinsData(searchCoin);
    } else {
      if (isActive) setCoinsData(coins);
    }

    return () => {
      isActive = false;
    };
  }, [isSearch, searchCoin, coins]);

  const onCompleteFetchData = () => {
    setIsFetchingData(false);
  };

  const onSubmitCoinSearch = () => {
    setIsFetchingData(true);
    if (searchTerm.trim()) {
      onSearchCoin(searchTerm.trim().toUpperCase(), onCompleteFetchData);
      setSearch(true);
      setSearchTerm("");
    } else {
      getCoins(onCompleteFetchData);
      setSearch(false);
    }
  };

  return (
    <View style={styles.screenContainer}>
      <SearchBar
        searchTerm={searchTerm}
        onTermChange={setSearchTerm}
        onTermSubmit={onSubmitCoinSearch}
      />
      <TopCoinList />
      {isFetchingData && (
        <ActivityIndicator size="large" color={Colors.indicatorColor} />
      )}
      <CoinList
        coins={coinsData}
        isSearch={isSearch}
        resetSearch={() => setSearch(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: Colors.bgColor,
  },
});

export default CryptoCoinsScreen;
