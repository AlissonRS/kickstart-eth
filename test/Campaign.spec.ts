const assert = require('assert');
const ganache = require('ganache-cli');
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';

const web3 = new Web3(ganache.provider());

const compiledFactory = require('../ethereum/build/CampaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory: Contract;
let campaignAddress;
let campaign: Contract;

let { abi, evm } = compiledFactory;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();
    // Use one of those accounts to deploy the factory contract
    factory = await new web3.eth.Contract(abi)
        .deploy({
            data: evm.bytecode.object,
            arguments: []
        })
        .send({ from: accounts[0], gas: 3000000 });

    await factory.methods.createCampaign('100').send({
        from: accounts[0],
        gas: '1000000'
    });

    [campaignAddress] = await factory.methods.getDeployedCampaigns().call();
    campaign = await new web3.eth.Contract(compiledCampaign.abi, campaignAddress);
});

describe('Campaign', () => {
    it('should deploy factory and campaign', () => {
        assert.ok(factory.options.address);
        assert.ok(campaign.options.address);
    });
    
    it('mark caller as the campaign manager', async () => {
        const manager = await campaign.methods.manager().call();
        assert.equal(accounts[0], manager);
    });
    
    it('allows people to contribute money and mark them as approvers', async () => {
        const contributor = accounts[1];
        await campaign.methods.contribute().send({ value: '200', from: contributor });
        const isContributor = await campaign.methods.approvers(contributor).call();
        assert(isContributor);
    });
    
    it('requires a minimum contribution', async () => {
        const contributor = accounts[1];
        try {
            await campaign.methods.contribute().send({ value: '50', from: contributor });
            assert(false);
        } catch (error) {
            assert(error);
        }
    });

    it('allows a manager to make a payment request', async () => {
        const description = 'Buy batteries';
        const value = '100';
        const recipient = accounts[1];
        await campaign.methods.createRequest(description, value, recipient)
        .send({ from: accounts[0], gas: '1000000' });

        const request = await campaign.methods.requests(0).call();
        assert.equal(description, request.description);
    });

    it('processes requests', async () => {
        await campaign.methods.contribute().send({
            from: accounts[0],
            value: web3.utils.toWei('10', 'ether')
        });

        await campaign.methods.createRequest('a', web3.utils.toWei('5', 'ether'), accounts[1])
        .send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.approveRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        await campaign.methods.finalizeRequest(0).send({
            from: accounts[0],
            gas: '1000000'
        });

        let balanceStr = await web3.eth.getBalance(accounts[1]);
        balanceStr = web3.utils.fromWei(balanceStr, 'ether');
        const balance = parseFloat(balanceStr);

        assert(balance > 104);

    });
});