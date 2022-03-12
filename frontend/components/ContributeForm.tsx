import { useRouter } from 'next/router';
import React, { FC, FormEvent } from 'react';
import { useState } from 'react';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import Campaign from 'utils/campaign';
import web3 from 'utils/web3';


type ContributeFormProps = {
    address: string;
}

const ContributeForm: FC<ContributeFormProps> = (props) => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const campaign = Campaign(props.address);
        try {
            setErrorMessage('');
            setLoading(true);
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(value, 'ether')
            });
            router.replace(`/campaigns/${props.address}`);
        } catch (error) {
            setErrorMessage((error as Error).message);
        }
        setLoading(false);
    };

    return (
        <Form onSubmit={onSubmit} error={!!errorMessage}>
            <Form.Field>
                <label>Amount to Contribute</label>
                <Input value={value} onChange={(e) => setValue(e.target.value)} label="ether" labelPosition='right'></Input>
            </Form.Field>
            <Message error header="Oops!" content={errorMessage}></Message>
            <Button loading={loading} primary>Contribute!</Button>
        </Form>
    )
}

export default ContributeForm;