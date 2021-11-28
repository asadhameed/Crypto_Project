import React, { useReducer } from "react";
import { createClient, coinQuery } from "../api/createClient";
import { AllCoins } from "../demmy_data/demmy";
import Coin from "../models/Coin";

interface Error {
  isError: boolean;
  message: String;
}
interface AppState {
  coins: Coin[];
  favoriteCoins: string[];
  errorObj: Error;
  searchCoin: Coin[];
}

const initialState: AppState = {
  coins: [],
  favoriteCoins: [],
  errorObj: {
    isError: false,
    message: "",
  },
  searchCoin: [],
};

type Action =
  | { type: "TOGGLE_FAVORITE"; payload: any }
  | { type: "GET_ALL_COINS"; payload: any }
  | { type: "SEARCH_COIN"; payload: any }
  | { type: "ERROR_OCCUR"; payload: Error };

const reducer = (state: AppState, action: Action) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const coinId = action.payload.coinId;
      const existingCoin = state.favoriteCoins.find(
        (coin) => coin === action.payload.coinId
      );
      let favoriteCoins: string[];
      if (existingCoin) {
        favoriteCoins = state.favoriteCoins.filter((id) => id !== coinId);
      } else {
        favoriteCoins = [...state.favoriteCoins, coinId];
      }
      return { ...state, favoriteCoins };

    case "GET_ALL_COINS":
      return {
        ...state,
        coins: action.payload,
        errorObj: { isError: false, message: "" },
        searchCoin: [],
      };

    case "ERROR_OCCUR":
      return { ...state, coins: [], errorObj: action.payload };

    case "SEARCH_COIN":
      return { ...state, searchCoin: action.payload };

    default:
      return state;
  }
};
export const Context = React.createContext<{
  state: AppState;
  addToFavorite: (id: string) => void;
  getCoins: (cb?: () => void) => void;
  onSearchCoin: (coin: string, cb: () => void) => void;
}>({
  state: initialState,
  addToFavorite: () => {},
  getCoins: (cb?: () => void) => {},
  onSearchCoin: (coin: string, cb: () => void) => {},
});

export const Provider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToFavorite = (id: string) => {
    dispatch({ type: "TOGGLE_FAVORITE", payload: { coinId: id } });
  };
  const getCoins = async (callBack?: () => void) => {
    const body = coinQuery(10);

    try {
      const response = await createClient.post("/", body);

      const extractCoins = response.data.data.getCryptoCoins.map(
        (c: any) =>
          new Coin(
            c.asset_id,
            c.name,
            c.price_usd,
            c.volume_1day_usd / 1000000,
            c.url
          )
      );
      dispatch({ type: "GET_ALL_COINS", payload: extractCoins });
    } catch (error) {
      dispatch({
        type: "ERROR_OCCUR",
        payload: {
          isError: true,
          message: "Unable to get fetch response.\n Please try again.",
        },
      });
    }
    //dispatch({ type: "GET_ALL_COINS", payload: AllCoins });
    if (callBack) callBack();
  };

  const onSearchCoin = async (coin: string, callBack: () => void) => {
    // const existCoin = state.coins.find((c: Coin) => c.id === coin);
    // const payload = existCoin ? [existCoin] : [];
    const body = coinQuery(100, coin);
    try {
      const response = await createClient.post("/", body);
      const extractCoins = response.data.data.getCryptoCoins.map(
        (c: any) =>
          new Coin(
            c.asset_id,
            c.name,
            c.price_usd,
            c.volume_1day_usd / 1000000,
            c.url
          )
      );
      dispatch({ type: "SEARCH_COIN", payload: extractCoins });
    } catch (error) {
      dispatch({
        type: "ERROR_OCCUR",
        payload: {
          isError: true,
          message: "Unable to get fetch response.\n Please try again.",
        },
      });
    }
    if (callBack) callBack();
  };

  return (
    <Context.Provider value={{ state, addToFavorite, getCoins, onSearchCoin }}>
      {children}
    </Context.Provider>
  );
};
