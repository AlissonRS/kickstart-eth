import Routes from 'next-routes';

const routes = new Routes();

routes
.add('/campaigns/new', '/campaigns/New')
.add('/campaigns/:address', '/campaigns/Show');

export const { Router, Link } = routes;

export default routes;