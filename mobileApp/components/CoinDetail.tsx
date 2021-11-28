import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import LineGraph from "./ui/LineGraph";
import Colors from "../constant/Colors";
import { createClient, coinHistory } from "../api/createClient";
import Coin from "../models/Coin";
// import { History } from "../demmy_data/history";

type Props = {
  coin?: Coin;
};

type coinHistory = {
  time_period_end: string;
  rate_close: number;
};
const CoinDetail: React.FC<Props> = ({ coin }: Props) => {
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [historyPeriod, setHistoryPeriod] = useState("1M");
  const [limitData, setLimitData] = useState(10);
  const [historyData, setHistoryData] = useState<{ x: number; y: number }[]>(
    []
  );

  useEffect(() => {
    let isActive = true;
    const getCoinHistory = async () => {
      setIsFetchingData(true);
      try {
        const body = coinHistory(limitData, coin?.id, historyPeriod);
        const response = await createClient.post("/", body);
        const hData = response.data.data.getCoinHistory.map(
          (c: coinHistory) => {
            return {
              x: new Date(c.time_period_end).getTime(),
              y: c.rate_close,
            };
          }
        );
        if (isActive) setHistoryData(hData);
      } catch (error) {}
      if (isActive) setIsFetchingData(false);
    };

    getCoinHistory();
    return () => {
      isActive = false;
    };
  }, [coin, historyPeriod, limitData]);

  const PeriodButton = ({ text }: { text: string }) => {
    return (
      <TouchableOpacity onPress={() => setHistoryPeriod(text)}>
        <Text style={styles.textColor}>{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.coinDetail}>
        <Image
          source={{
            uri: coin ? coin.iconUrl : "../assets/favicon.png",
          }}
          style={styles.imageStyle}
        />
        <Text style={[styles.textName, styles.textColor]}>{coin?.name}</Text>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={styles.textColor}>{coin?.price.toFixed(2)}$</Text>
          <Text style={styles.textColor}>{coin?.volume24H.toFixed(0)}M</Text>
        </View>
      </View>
      <View style={styles.graphHeader}>
        <PeriodButton text={"1M"} />
        <PeriodButton text={"1H"} />
        <PeriodButton text={"4H"} />
        <PeriodButton text={"1D"} />
        <PeriodButton text={"7D"} />
      </View>
      <View style={styles.graphStyle}>
        {isFetchingData ? (
          <ActivityIndicator size="large" color={Colors.indicatorColor} />
        ) : (
          <LineGraph historyData={historyData} range={10} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.bgColor,
    margin: 0,
  },
  coinDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
  },

  imageStyle: {
    width: 60,
    height: 60,
  },
  textColor: {
    color: Colors.accentColor,
  },
  textName: {
    fontFamily: "open-sans",
    fontSize: 20,
    textAlign: "center",
  },

  graphHeader: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  graphStyle: {},
  chartLineWrapper: {
    marginTop: 40,
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default CoinDetail;
