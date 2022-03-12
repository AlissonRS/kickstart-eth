import type { NextPage } from 'next';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Card } from 'semantic-ui-react';
import Layout from '../components/Layout';

const Home: NextPage = () => {

  const [campaigns, setCampaigns] = useState<any>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await fetch('api/campaigns/all');
      const fetchedCampaigns = await res.json();
      console.log("fetched", fetchedCampaigns);
      setCampaigns(fetchedCampaigns);
    };
    fetchCampaigns();
  }, [setCampaigns]);

  const items = campaigns.map((address: any) => ({
    header: address,
    description: <Link href={`/campaigns/${address}`}><a>View Campaign</a></Link>,
    fluid: true
  }));

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>

        <Link href="/campaigns/new">
          <a>
            <Button primary floated="right" content="Create Campaign" icon="add circle"></Button>      
          </a>
        </Link>
        <Card.Group items={items}></Card.Group>
      </div>
    </Layout>
    );
}

export default Home
