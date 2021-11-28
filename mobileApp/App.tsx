import React from "react";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";

import CoinNavigation from "./navigation/CoinNavigation";
import { Provider } from "./contexts/coinContext";

export default function App() {
  const [loaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });

  if (!loaded) return <AppLoading />;
  return (
    <Provider>
      <CoinNavigation />
    </Provider>
  );
}
