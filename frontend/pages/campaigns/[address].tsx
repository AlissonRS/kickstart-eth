import ContributeForm from 'components/ContributeForm';
import Layout from 'components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CampaignSummary } from 'pages/api/campaigns/[address]';
import React, { FC, useEffect } from 'react';
import { useMemo } from 'react';
import { useState } from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';
import web3 from 'utils/web3';

const ShowCampaign: FC = (props) => {
    const router = useRouter();
    const [campaign, setCampaign] = useState<CampaignSummary>();
    const address = router.query.address as string;
    console.log('router query', router.query);

    useEffect(() => {
        if (!address) return;
        const init = async () => {
            const res = await fetch(`/api/campaigns/${address}`);
            const campaign: CampaignSummary = await res.json();
            setCampaign(campaign);
        };
        init();
    }, [address]);

    const RenderCards = useMemo(() => {
        if (campaign) {
            const items = [
                {
                    header: campaign.manager,
                    meta: 'Address of Manager',
                    description: 'The manager created this campaign and can create withdraw requests.',
                    style: { overflowWrap: 'break-word' }
                },
                {
                    header: campaign.minimumContribution,
                    meta: 'Minimum Contribution (wei)',
                    description: 'You must contribute at least this much wei to become an approver.',
                },
                {
                    header: campaign.requestsCount,
                    meta: 'Number of Requests',
                    description: 'A request tries to withdraw money from the contract. Requests must be approved by approvers.',
                },
                {
                    header: campaign.approversCount,
                    meta: 'Number of Approvers',
                    description: 'Number of people who have already donated to the campaign.',
                },
                {
                    header: web3.utils.fromWei(campaign.balance.toString(), 'ether'),
                    meta: 'Campaign Balance (ether)',
                    description: 'The balance is how much money this campaign has to spend',
                }
            ];
            return (<Card.Group items={items}></Card.Group>);
        }
        return (<></>);
    }, [campaign]);

    return (
        <Layout>
            <h3>Campaign</h3>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={10}>
                        { RenderCards }
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <ContributeForm address={address}></ContributeForm>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={6}>
                        <Link href={`/campaigns/${address}/requests`}>
                            <a>
                                <Button secondary>View Requests</Button>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Layout>
    )
}

export default ShowCampaign;