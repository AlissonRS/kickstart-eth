import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Button, Card } from 'semantic-ui-react'
import Layout from '../components/Layout'
import styles from '../styles/Home.module.css'
import factory from '../utils/factory'

const Home: NextPage = () => {

  const [campaigns, setCampaigns] = useState<any>([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const res = await fetch('api/campaigns');
      const fetchedCampaigns = await res.json();
      console.log("fetched", fetchedCampaigns);
      setCampaigns(fetchedCampaigns);
    };
    fetchCampaigns();
  }, [setCampaigns]);

  const items = campaigns.map((a: any) => ({
    header: a,
    description: <a>View Campaign</a>,
    fluid: true
  }));

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Button primary floated="right" content="Create Campaign" icon="add circle"></Button>      
        <Card.Group items={items}></Card.Group>
      </div>
    </Layout>
    );
}

export default Home
