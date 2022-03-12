import web3 from "./web3";
import compiledFactory from '../../ethereum/build/CampaignFactory.json';

const address = '0xcA5d7112349887402bdcea14b536de562Db70F32';

const { abi, evm }: any = compiledFactory;

const instance = new web3.eth.Contract(abi, address);

export default instance;