import Layout from 'components/Layout';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { FC, FormEvent, useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from 'utils/campaign';
import web3 from 'utils/web3';

const NewCampaignRequest: FC = (props) => {
    const router = useRouter();
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const [recipient, setRecipient] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const address = router.query.address as string;

    const onSubmit = async (e: FormEvent) => {
        try {
            setErrorMessage('');
            setLoading(true);
            const campaign = Campaign(address);
            const accounts = await web3.eth.getAccounts();
            const wei = web3.utils.toWei(value, 'ether');
            await campaign.methods.createRequest(description, wei, recipient).send({ from: accounts[0] });
            router.replace(`/campaigns/${address}/requests`);

        } catch (error) {
            setErrorMessage((error as Error).message);
        }
        setLoading(false);
    };


    return (
        <Layout>
            <Link href={`/campaigns/${address}/requests`}>
                <a>Back</a>
            </Link>
            <h3>Create a Request</h3>
            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input value={description} onChange={(e) => setDescription(e.target.value)}></Input>
                </Form.Field>
                <Form.Field>
                    <label>Amount</label>
                    <Input value={value} onChange={(e) => setValue(e.target.value)} label="ether" labelPosition='right'></Input>
                </Form.Field>
                <Form.Field>
                    <label>Recipient</label>
                    <Input value={recipient} onChange={(e) => setRecipient(e.target.value)}></Input>
                </Form.Field>
                <Message error header="Oops!" content={errorMessage}></Message>
                <Button loading={loading} primary>Create</Button>
            </Form>
        </Layout>
    )
}

export default NewCampaignRequest;