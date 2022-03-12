import React, { FC, useCallback } from 'react';
import { Button, Table } from 'semantic-ui-react';
import Campaign from 'utils/campaign';
import web3 from 'utils/web3';

type RequestRowProps = {
    id: number;
    request: any;
    approversCount: number;
    address: string;
}

const RequestRow: FC<RequestRowProps> = ({id, request, approversCount, address}) => {
    const { Row, Cell } = Table;

    const onApprove = async () => {
        const campaign = Campaign(address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(id).send({ from: accounts[0] });
    };

    const onFinalize = async () => {
        const campaign = Campaign(address);
        const accounts = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(id).send({ from: accounts[0] });
    };

    const readyToFinalize = request.approvalsCount > approversCount / 2;

    return (
        <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell>{request.approvalsCount}/{approversCount}</Cell>
            <Cell>{request.complete ? null : <Button color="green" basic onClick={() => onApprove()}>Approve</Button> }</Cell>
            <Cell>{request.complete ? null : <Button color="teal" basic onClick={() => onFinalize()}>Finalize</Button> }</Cell>
        </Row>
    )
}

export default RequestRow;