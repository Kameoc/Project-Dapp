import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { abi } from '../constants/Voting.json';

export default function useEthereum() {
  const [isConnected, setIsConnected] = useState(false);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initEthereum = async () => {
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send('eth_requestAccounts', []);
        setAccount(accounts[0]);
        setIsConnected(accounts.length > 0);

        // Initialize contract
        const signer = provider.getSigner();
        const contractAddress = "0x1d945cf059cF43706Ce9b3DD6A560D402597F0F9";
        const contractInstance = new ethers.Contract(contractAddress, abi, signer);
        setContract(contractInstance);
      }
    };

    initEthereum();
  }, []);

  return { isConnected, account, contract };
}
