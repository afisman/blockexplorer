
import { Alchemy, Network } from 'alchemy-sdk';


const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_SEPOLIA,
};

export const alchemy = new Alchemy(settings);