import web3 from "./web3";
import compiledFactory from '../../ethereum/build/CampaignFactory.json';

const address = '0xdeb9E55E0F20bC59029271372ECea50E67182A3A';

const { abi, evm }: any = compiledFactory;

const instance = new web3.eth.Contract(abi, address);

export default instance;