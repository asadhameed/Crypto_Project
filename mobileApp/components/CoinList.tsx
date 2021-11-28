import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import Colors from "../constant/Colors";
import { HomeStackParamList } from "../types/navigationType";

import { Context } from "../contexts/coinContext";
import Coin from "../models/Coin";
import ButtonUI from "./ui/Button";
import CoinInfo from "./ui/CoinInfo";

type NavigationProps = NativeStackNavigationProp<
  HomeStackParamList,
  "CoinHistoryGraphScreen"
>;
type Props = {
  coins: Coin[];
  isFavoritePage?: boolean;
  isSearch?: boolean;
  resetSearch?: () => void;
};
const CoinList: React.FC<Props> = ({
  coins,
  isFavoritePage,
  isSearch,
  resetSearch,
}: Props) => {
  const {
    state: { errorObj },
    getCoins,
  } = useContext(Context);
  const navigation = useNavigation<NavigationProps>();
  const [isFetchingData, setIsFetchingData] = useState(false);

  const onRefreshHandler = () => {
    setIsFetchingData(true);
    if (resetSearch) resetSearch();
    getCoins(() => setIsFetchingData(false));
  };

  const renderError = () => {
    return (
      <>
        {errorObj.isError && (
          <View style={styles.errorContainer}>
            {isFetchingData ? (
              <ActivityIndicator size="large" color={Colors.indicatorColor} />
            ) : (
              <>
                <Text style={styles.errorText}>{errorObj.message}</Text>
                <ButtonUI title="Refresh" cb={onRefreshHandler} />
              </>
            )}
          </View>
        )}
      </>
    );
  };

  const renderFavoriteButton = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ButtonUI
          title="Add Favorites"
          cb={() => navigation.navigate("CryptoScreen")}
        />
      </View>
    );
  };

  const renderSearchInfo = () => {
    return (
      <View style={styles.errorContainer}>
        {isFetchingData ? (
          <ActivityIndicator size="large" color={Colors.indicatorColor} />
        ) : (
          <>
            {coins.length === 0 && (
              <Text style={styles.errorText}>
                Don't Find coin, Please try again
              </Text>
            )}
            <ButtonUI title="Refresh" cb={onRefreshHandler} />
          </>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <Text style={styles.textHeaderStyle}>Coin Name</Text>
        <Text style={styles.textHeaderStyle}>Price</Text>
        <Text style={styles.textHeaderStyle}>24h Volume</Text>
      </View>

      {coins.length > 0 && (
        <FlatList
          data={coins}
          keyExtractor={(coin) => coin.id}
          renderItem={({ item }) => <CoinInfo coin={item} />}
        />
      )}
      {isSearch && !errorObj.isError && renderSearchInfo()}
      {isFavoritePage && renderFavoriteButton()}
      {renderError()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgColor,
    flex: 1,
  },
  containerHeader: {
    marginHorizontal: 20,
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  textHeaderStyle: {
    fontFamily: "open-sans",
    color: Colors.accentColor,
  },

  titleStyle: {
    marginLeft: 15,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.accentColor,
  },

  errorContainer: {
    marginTop: 60,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontFamily: "open-sans",
    fontSize: 16,
    textAlign: "center",
    color: Colors.accentColor,
    marginBottom: 20,
  },
});

export default CoinList;
