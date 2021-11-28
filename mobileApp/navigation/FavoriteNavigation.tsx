import React from "react";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";

import FavoriteScreen from "../screens/FavoritesScreen";
import CoinHistoryGraphScreen from "../screens/CoinHistoryGraphScreen";
import Colors from "../constant/Colors";
import { FavoriteStackParamList } from "../types/navigationType";

const Stack = createNativeStackNavigator<FavoriteStackParamList>();

const options: NativeStackNavigationOptions = {
  headerTitleAlign: "center",
  headerTintColor: "white",
  headerStyle: {
    backgroundColor: Colors.primaryColor,
  },
};
const FavoriteNavigation: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={options}>
      <Stack.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          title: "Favorite Coins",
        }}
      />
      <Stack.Screen
        name="CoinHistoryGraphScreen"
        component={CoinHistoryGraphScreen}
      />
    </Stack.Navigator>
  );
};

export default FavoriteNavigation;
