import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import CryptoCoinsScreen from "../screens/CryptoCoinsScreen";
import CoinHistoryGraphScreen from "../screens/CoinHistoryGraphScreen";
import Colors from "../constant/Colors";
import { HomeStackParamList } from "../types/navigationType";

const options: NativeStackNavigationOptions = {
  headerTitleAlign: "center",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        name="CryptoScreen"
        component={CryptoCoinsScreen}
        options={{
          title: "Crypto Coins",
        }}
      />
      <Stack.Screen
        name="CoinHistoryGraphScreen"
        component={CoinHistoryGraphScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
