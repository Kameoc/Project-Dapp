// app/page.tsx
'use client'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'
import { abi } from './abi.ts';
import { useWriteContract, useReadContract } from 'wagmi'
import { useState, useEffect } from 'react';

export default function Home() {
  const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';
  const { address, isConnected } = useAccount();
  const [voterAddress, setVoterAddress] = useState('');
  
  // Utilisation de useReadContract pour obtenir le workflow
  const { data: workflow, isLoading: isLoadingWorkflow, isError: isErrorWorkflow } = useReadContract({
    address: contractAddress,
    abi: abi,
    functionName: "getStatus",
    chainId: 31337,
  });


  // Fonction pour inscrire un votant
  const { writeContract, isLoading: isPending, error } = useWriteContract();

  const startVoterRegistration = () => {
      writeContract({
        address: contractAddress,
        abi: abi,
        functionName: "startVoterRegistration",
      });
  };

  const { data: convertAdress} = useReadContract(
    {
      address: contractAddress,
      abi: abi,
      functionName: "stringToAddress",
      args:[voterAddress],
      chainId: 31337
    }
  );
  

  const registerVoter =  () => {
    if (!voterAddress) {
      console.error("Voter address is required");
      return;
    }

       writeContract({
        address: contractAddress,
        abi: abi,
        functionName: "registerVoter",
        args: [convertAdress]
      });
  };

  return (
    <div>
      <footer className="row-start-3 flex gap-[24px] justify-center ">
        <h1>EtherVote</h1>
        <div className="flex gap-[20px] justify-center,margin [5px]">
          <p>Current phase : </p>
          {isLoadingWorkflow ? (
            <p className = "state">Loading...</p> // Affiche "Loading..." si les données du workflow sont encore en train de charger
          ) : isErrorWorkflow ? (
            <p>Error loading workflow status</p> // Affiche une erreur si le statut du workflow n'est pas récupéré correctement
          ) : (
            <p className="state">{workflow}</p> // Affiche le workflow quand les données sont chargées
          )}
        </div>
        <ConnectButton />
      </footer>
      <div>
        <input
          type="text"
          placeholder="Copy your account address here!"
          onChange={(e) => setVoterAddress(e.target.value)}
        />
        <button
          onClick={registerVoter}
          className="button register"
          disabled={isPending}
        >
          {isPending ? "Registering..." : "Register"}
        </button>

        {error && <p>Voter registered!</p>}

        <div className="underDiv"></div>

        {isConnected ? (
          <div>
            <p>Account: {address}</p>
          </div>
        ) : (
          <p>Please connect your Wallet.</p>
        )}
      </div>
    </div>
  );
}
