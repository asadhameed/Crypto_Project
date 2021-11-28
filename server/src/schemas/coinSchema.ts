import { gql } from "apollo-server";
const typeDefs = gql`
  type Coin {
    asset_id: ID!
    name: String
    type_is_crypto: String
    data_start: String
    data_end: String
    data_quote_start: String
    data_quote_end: String
    data_orderbook_start: String
    data_orderbook_end: String
    data_trade_start: String
    data_trade_end: String
    data_symbols_count: Int
    volume_1hrs_usd: Float
    volume_1day_usd: Float
    volume_1mth_usd: Float
    price_usd: Float
    url: String
  }

  type CoinHistory {
    time_period_start: String
    time_period_end: String
    time_open: String
    time_close: String
    rate_open: Float
    rate_high: Float
    rate_low: Float
    rate_close: Float
  }

  type Query  {
    getCryptoCoins(limit: Int , filterAsset: String): [Coin]
    getCoinHistory(coinId:ID! , period_id: String, limit: Int): [CoinHistory]
  }
`;

export default typeDefs;