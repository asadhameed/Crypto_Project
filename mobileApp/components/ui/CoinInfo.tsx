import React from "react";
import {
  View,
  Text,
  TouchableNativeFeedback,
  Image,
  StyleSheet,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";

import Colors from "../../constant/Colors";
import Coin from "../../models/Coin";
import { HomeStackParamList } from "../../types/navigationType";
type NavigationProps = NativeStackNavigationProp<
  HomeStackParamList,
  "CoinHistoryGraphScreen"
>;
type Props = {
  coin: Coin;
};

const CoinInfo: React.FC<Props> = ({
  coin: { id, iconUrl, price, volume24H },
}: Props) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <TouchableNativeFeedback
      onPress={() =>
        navigation.navigate("CoinHistoryGraphScreen", { coinId: id })
      }
    >
      <View style={styles.itemContainer}>
        <View style={styles.coinTitle}>
          <Image
            source={{
              uri: iconUrl,
            }}
            style={styles.imageStyle}
          />
          <Text style={styles.titleStyle}>{id}</Text>
        </View>

        <Text style={styles.textPriceVolumeStyle}>${price.toFixed(2)}</Text>
        <Text style={styles.textPriceVolumeStyle}>{volume24H.toFixed(0)}M</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    height: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.boxColor,
    marginHorizontal: 5,
    marginVertical: 2,
    padding: 10,
    borderRadius: 10,
    shadowColor: "black",
    elevation: 6,
  },
  textHeaderStyle: {
    fontFamily: "open-sans",
    color: Colors.accentColor,
    width: 100,
    textAlign: "right",
  },

  titleStyle: {
    marginLeft: 15,
    fontWeight: "bold",
    marginBottom: 5,
    color: Colors.accentColor,
    width: 100,
  },
  coinTitle: {
    flexDirection: "row",
    justifyContent: "center",
  },
  imageStyle: {
    width: 25,
    height: 25,
  },
  textPriceVolumeStyle: {
    fontFamily: "open-sans",
    color: Colors.accentColor,
    width: 100,
    textAlign: "left",
  },
});

export default CoinInfo;
