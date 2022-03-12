# Kickstarter with Solidity and Next.js

This is a sample project that uses Smart Contracts built with Solidity on top of Ethereum blockchain and a React Next.js with TypeScript frontend, that allows users to create campaigns, donate ether, create request to withdraw money (e.g. for buying batteries for the kickstarter project), approve the request and finalize once enough people approved it.

The `ethereum` folder contains the smart contracts, there is a `package.json` with the following scripts:

    yarn test
    yarn compile
    yarn deploy

The unit tests rely on Ganache to provide fake accounts for testing with Mocha. After installing the dependencies with `yarn install`, you are free to run the unit tests.

The command `yarn compile` uses solc library to generate solidity abi and evm bytecode into json files that are placed within a `build` folder under `ethereum` folder.

The command `yarn deploy` requires adding a `.env` file in the `ethereum` folder. It should look as below:

    DEPLOY_MNEMONIC=please put your own mnemonic twelve words because I wont share mine
    DEPLOY_ENDPOINT=https://rinkeby.infura.io/v3/123a123a123a123a123a123a

The mnemonic is only used for deploying the `CampaignFactory` contract, so it's gonna use gas from this address. The endpoint is where we want to deploy (e.g. Rinkeby Network through Infura). The only transaction and gas used from the mnemonic account is for deploying, all other transactions such as creating campaigns, requests, sending funds, etc, are done by the end users via their own wallet.

When you run `yarn deploy`, the address of the new deployed contract will be printed to the console. Copy this address, open `frontend/utils/factory.ts` file, and update the hard-coded address there. It's ok to keep this address in git, as it's not sensitive data and any end users can see it from the browser anyway (this is similar to a backend URL used to send requests to, where users can inspect from the browser's Network tab in DevTools).

Now under the `frontend` folder, you can simply run `yarn install` and `yarn start` to run the Next.js frontend, which will connect to the contract you deployed.

Happy Coding 🚀🚀🚀