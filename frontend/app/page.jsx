// app/page.tsx
'use client'
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'
import {abi} from './abi.ts';
import { useWriteContract} from "wagmi";
import { useReadContract } from "wagmi";
import { useState } from 'react';
import { readContract, prepareWriteContract, writeContract } from '@wagmi/core'

export default  function Home() {
  const contractAddress = '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853';
  const { address, isConnected } = useAccount();
  const [voters, setVoters] = useState([]);
  const [voterAddress, setVoterAddress] = useState();
  const {data: workflow} = useReadContract({
    address: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
    abi: abi,
    functionName: "getStatus",
    chainId: 31337
  });
  const {data: voter} = useReadContract({
    address: '0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
    abi: abi,
    functionName: "voters",
    chainId: 31337
  });

  const startVoterRegistration = async () => {
    try {
      const { request } =  useWriteContract({
        address:'0xa513E6E4b8f2a923D98304ec87F64353C4D5C853',
        abi: abi,
        functionName: "startVoterRegistration"
      });
      console.log("Voter registration started:", request);
    } catch (error) {
      console.error("Error starting voter registration:", error);
    }
  };

  const registerVoter =  () => {
    
      console.log("Preparing to register voter with address:", voterAddress);
      const { request } =  useWriteContract({
        address: contractAddress,
        abi: abi,
        functionName: "registerVoter",
        args: [voterAddress],
      });
      console.log("Voter registered:", request);

      
  };


  return (
    <div>
      <footer className="row-start-3 flex gap-[24px] justify-center ">
      <h1>EtherVote</h1>
       <div className="flex gap-[20px] justify-center,margin [5px]">
        <p>Current phase : </p>
        <p className = "state">{workflow}</p>
       </div>
      <ConnectButton />
      </footer>
      <div>
        <input type="text" placeholder="Copy your account address here !" 
            onChange={e => setVoterAddress(e.target.value)} />
        <button onClick={registerVoter()} className="button register">
          Register
        </button>
       <div className ="underDiv"></div>
        {isConnected ? (
        <div >
          <p>Account :  {address}</p>
         
        </div>
      ) : (
       <p>Please connect your Wallet.</p>
      )}
      </div>

    </div>
 );
}