import Web3 from 'web3';

(window as any).ethereum.request({ method: "eth_requestAccounts" });
 
const web3 = new Web3((window as any).ethereum);
 
export default web3;