import Layout from 'components/Layout';
import RequestRow from 'components/RequestRow';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Table } from 'semantic-ui-react';
import Campaign from 'utils/campaign';

const CampaignRequests: FC = (props) => {
    const router = useRouter();
    const [requests, setRequests] = useState<any>([]);
    const [approversCount, setApproversCount] = useState<number>(0);
    const address = router.query.address as string;

    useEffect(() => {
        if (!address) return;
        const loadRequests = async () => {
            const campaign = Campaign(address);
            const requestCount = await campaign.methods.getRequestsCount().call();
            setApproversCount(await campaign.methods.approversCount().call());
            const arr = [...Array(parseInt(requestCount, 10)).keys()];
            const campaignRequests = await Promise.all(arr.map((el, i) => {
                return campaign.methods.requests(i).call();
            }));
            setRequests(campaignRequests);
        };
        loadRequests();
    }, [address]);

    const { Header, Row, HeaderCell, Body, Cell } = Table; 
    return (
        <Layout>
            <Link href={`/campaigns/${address}`}>
                <a>Back</a>
            </Link>
            <h3>Campaign Requests</h3>
            <Link href={`/campaigns/${address}/requests/new`}>
                <a>
                    <Button primary floated='right' style={{ marginBottom: 10 }}>Add Request</Button>
                </a>
            </Link>
            <Table>
                <Header>
                    <Row>
                        <HeaderCell>ID</HeaderCell>
                        <HeaderCell>Description</HeaderCell>
                        <HeaderCell>Amount</HeaderCell>
                        <HeaderCell>Recipient</HeaderCell>
                        <HeaderCell>Approval Count</HeaderCell>
                        <HeaderCell>Approve</HeaderCell>
                        <HeaderCell>Finalize</HeaderCell>
                    </Row>
                </Header>
                <Body>
                    {requests.map((r: any, i: number) => (
                        <RequestRow key={i} id={i} request={r} approversCount={approversCount} address={address}></RequestRow>
                    ))}
                </Body>
            </Table>
            <div>Found {requests.length} requests.</div>
        </Layout>
    )
}

export default CampaignRequests;