import type { NextApiRequest, NextApiResponse } from 'next'
import factory from '../../../utils/factory';

type Data = {
  name: string
}[]

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const fetchedCampaigns = await factory.methods.getDeployedCampaigns().call();
  res.status(200).json(fetchedCampaigns);
}
