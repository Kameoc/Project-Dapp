'use client'
//import "./globals.css";

import { useState, useEffect } from 'react';
import useEthereum from '../hooks/useEthereum';

export default function Home() {
  const { isConnected, account, contract } = useEthereum();
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (contract) {
      // Exemple de récupération d'une donnée du contrat (comme l'état actuel du workflow)
      contract.status().then((state) => {
        setStatus(state);
      });
    }
  }, [contract]);

  const startProposalsRegistration = async () => {
    if (contract) {
      await contract.startProposalsRegistration();
    }
  };

  return (
    <div>
      <h1>Vote DApp</h1>
     
      {!isConnected ? (
          <button  >Connect Wallet</button>
      ) : (
        <div>
          <p>Compte connecté : {account}</p>
          <p>État du workflow : {status}</p>
          <button onClick={startProposalsRegistration}>Commencer l'enregistrement des propositions</button>
        </div>
      )}
    </div>
  );
}
