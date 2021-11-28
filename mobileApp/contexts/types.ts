

 export interface Coin {
    id: string;
    name: string;
    price: number;
  }
export type CoinContextState = {
    favoriteCoins: Coin[];
    getCoins: () => void;
  };