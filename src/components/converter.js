import React, { useState, useEffect } from "react";
import axios from "axios";
import "./converter.css";

const cryptosList = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    symbol: "BTC"
  },
  {
    id: "ethereum",
    name: "Ethereum",
    symbol: "ETH"
  },
  {
    id: "binancecoin",
    name: "Binance Coin",
    symbol: "BNB"
  },
  {
    id: "cardano",
    name: "Cardano",
    symbol: "ADA"
  },
  {
    id: "tether",
    name: "Tether",
    symbol: "USDT"
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP"
  },
  {
    id: "solana",
    name: "Solana",
    symbol: "SOL"
  },
  {
    id: "polkadot",
    name: "Polkadot",
    symbol: "DOT"
  },
  {
    id: "usd-coin",
    name: "USD Coin",
    symbol: "USDC"
  },
  {
    id: "dogecoin",
    name: "Dogecoin",
    symbol: "DOGE"
  },
  {
    id: "avalanche",
    name: "Avalanche",
    symbol: "AVAX"
  },
  {
    id: "terra-luna",
    name: "Terra",
    symbol: "LUNA"
  },
  {
    id: "uniswap",
    name: "Uniswap",
    symbol: "UNI"
  },
  {
    id: "chainlink",
    name: "Chainlink",
    symbol: "LINK"
  },
  {
    id: "litecoin",
    name: "Litecoin",
    symbol: "LTC"
  },
  {
    id: "cosmos",
    name: "Cosmos",
    symbol: "ATOM"
  },
  {
    id: "algorand",
    name: "Algorand",
    symbol: "ALGO"
  },
  {
    id: "wrapped-bitcoin",
    name: "Wrapped Bitcoin",
    symbol: "WBTC"
  },
  {
    id: "bitcoin-cash",
    name: "Bitcoin Cash",
    symbol: "BCH"
  },
  {
    id: "matic-network",
    name: "Polygon",
    symbol: "MATIC"
  },
  {
    id: "stellar",
    name: "Stellar",
    symbol: "XLM"
  },
  {
    id: "shiba-inu",
    name: "Shiba Inu",
    symbol: "SHIB"
  },
  {
    id: "internet-computer",
    name: "Internet Computer",
    symbol: "ICP"
  },
  {
    id: "filecoin",
    name: "Filecoin",
    symbol: "FIL"
  },
  {
    id: "theta-token",
    name: "THETA",
    symbol: "THETA"
  },
  {
    id: "tron",
    symbol: "trx",
    name: "TRON"
  },
  {
    id: "vechain",
    name: "VeChain",
    symbol: "VET"
  }
];

const Converter = () => {
  const [crypto, setCrypto] = useState("ethereum");
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [currency, setCurrency] = useState("inr");
  const [currencyAmount, setCurrencyAmount] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [cryptos, setCryptos] = useState(cryptosList);

  useEffect(() => {
    const getConversionRate = async () => {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=${currency}`
      );
      const conversionRate = response.data[crypto][currency];
      setCurrencyAmount(cryptoAmount * conversionRate);
    };

    getConversionRate();
  }, [cryptoAmount, crypto, currency]);

  useEffect(() => {
    const getCurrencies = async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/supported_vs_currencies"
      );
      setCurrencies(response.data);
    };

    getCurrencies();
  }, []);

  /*  useEffect(() => {
    const getCryptos = async () => {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/list');
      setCryptos(response.data);
    };

    getCryptos();
  }, []);
*/
  const handleCryptoChange = (event) => {
    setCrypto(event.target.value);
  };

  const handleCryptoAmountChange = (event) => {
    setCryptoAmount(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  return (
    <div className="converter">
      <label>
        <p>CRYPTO CURRENCY</p>
        <select value={crypto} onChange={handleCryptoChange}>
          {cryptos.map((crypto) => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name} ({crypto.symbol.toUpperCase()})
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        <p> {crypto.toUpperCase()}</p>
        <input
          type="number"
          value={cryptoAmount}
          onChange={handleCryptoAmountChange}
        />
      </label>
      <br />
      <label>
        <p>FIAT CURRENCY</p>
        <select value={currency} onChange={handleCurrencyChange}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
        <input type="number" value={currencyAmount} readOnly />
      </label>
      <br />
      <label></label>
    </div>
  );
};

export default Converter;
