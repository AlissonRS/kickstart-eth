import React, { FC, useCallback, useState } from 'react';
import { Router } from 'routes';
import { Button, Container, Form, Input, Message } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import factory from '../../utils/factory';
import web3 from '../../utils/web3';

const CampaignNew: FC = (props) => {
    const [minContribution, setMinContribution] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = useCallback(async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            setErrorMessage('');
            const accounts = await web3.eth.getAccounts();
            await factory.methods
            .createCampaign(minContribution)
            .send({
                from: accounts[0]
            });
            Router.pushRoute('/');
        } catch (e) {
            const err = e as any;
            if ('message' in err) {
                setErrorMessage(err.message);
            }
        }
        setLoading(false);
    }, [minContribution, setErrorMessage, setLoading]);

    return (
        <Layout>
            <h3>Create a Campaign</h3>

            <Form onSubmit={onSubmit} error={!!errorMessage}>
                <Form.Field>
                    <label>Minimum Contribution</label>
                    <Input label="wei" labelPosition='right' value={minContribution} onChange={e => setMinContribution(e.target.value)}></Input>
                </Form.Field>

                <Message error header="Oops!" content={errorMessage}></Message>

                <Button primary loading={loading}>Create!</Button>
            </Form>
        </Layout>
    )
}

export default CampaignNew;