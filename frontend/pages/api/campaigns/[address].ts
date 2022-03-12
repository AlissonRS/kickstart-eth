import type { NextApiRequest, NextApiResponse } from 'next'
import Campaign from 'utils/campaign';
import isString from 'utils/helpers';

export type CampaignSummary = {
  minimumContribution: number;
  balance: number;
  requestsCount: number;
  approversCount: number;
  manager: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CampaignSummary>
) {
  const { address } = req.query;
  if (!isString(address)) return res.status(400);
  const campaign = Campaign(address);
  const summary = await campaign.methods.getSummary().call();
  res.status(200).json({ 
    minimumContribution: summary[0],
    balance: summary[1],
    requestsCount: summary[2],
    approversCount: summary[3],
    manager: summary[4],
   });
}
