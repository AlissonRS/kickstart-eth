import web3 from "./web";
import compiledFactory from './build/CampaignFactory.json';

require('dotenv').config();

const address = process.env.DEPLOY_ACCOUNT;

const { abi, evm }: any = compiledFactory;

const instance = new web3.eth.Contract(abi,address);