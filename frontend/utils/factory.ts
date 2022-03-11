import web3 from "./web3";
import compiledFactory from '../../ethereum/build/CampaignFactory.json';

const address = '0xE8076D94Ef0eA7f586c36477186d7f1272CE1E00';

const { abi, evm }: any = compiledFactory;

const instance = new web3.eth.Contract(abi, address);

export default instance;