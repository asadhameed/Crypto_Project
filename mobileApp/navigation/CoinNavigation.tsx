import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import HomeNavigation from "./HomeNavigation";
import FavoriteNavigation from "./FavoriteNavigation";
import Colors from "../constant/Colors";

const BottomTab = createBottomTabNavigator();

const options: BottomTabNavigationOptions = {
  headerShown: false,
  tabBarActiveTintColor: Colors.accentColor,
  tabBarStyle: {
    backgroundColor: Colors.primaryColor,
  },
};

const CoinNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <BottomTab.Navigator screenOptions={options}>
        <BottomTab.Screen
          name="homeNavigation"
          component={HomeNavigation}
          options={{
            title: "Home",
            tabBarIcon: ({ size, color, focused }) =>
              focused ? (
                <Ionicons name="md-home-sharp" size={size} color={color} />
              ) : (
                <Ionicons name="md-home-outline" size={size} color={color} />
              ),
          }}
        />
        <BottomTab.Screen
          name="FavoriteNavigation"
          component={FavoriteNavigation}
          options={{
            title: "Favorite",
            tabBarIcon: ({ size, color, focused }) =>
              focused ? (
                <FontAwesome name="star" size={size} color={color} />
              ) : (
                <FontAwesome name="star-o" size={size} color={color} />
              ),
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
};

export default CoinNavigation;
