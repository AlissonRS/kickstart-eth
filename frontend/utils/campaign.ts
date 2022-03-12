import web3 from "./web3";
import CampaignJson from '../../ethereum/build/Campaign.json';

const { abi, evm }: any = CampaignJson;

const Campaign = (address: string) => {
    return new web3.eth.Contract(abi, address);
}

export default Campaign;