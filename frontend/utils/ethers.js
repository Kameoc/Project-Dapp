import { ethers } from 'ethers';
import { abi, contractAddress } from '../constants/Voting.json';

let provider;
let contract;
let signer;

// Replace with your contract's address and ABI
//const contractAddress = 'de188a7d0fc31010dc598b79d8d109556b69d1358990948cd747f57c12a0e85b';

//const contractABI = require( '../../artifacts/contracts/Voting.sol/Voting.json').abi;
//import contractJson from'../../artifacts/contracts/Voting.sol/Voting.json';
//const contractABI = contractJson.abi;
//const contractABI = require('C:/Users/Macéo/Downloads/hardhat/hardhat/artifacts/contracts/Voting.sol/Voting.json').abi;

const contractABI = abi;
// Fonction pour initialiser le fournisseur et le contrat
export const initializeEthers = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    // Demander la connexion du portefeuille Ethereum
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  } else {
    console.log('Please install MetaMask!');
  }
};

export const getContract = () => {
  return contract;
};
