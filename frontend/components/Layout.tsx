import React, { FC } from 'react';
import { Container } from 'semantic-ui-react';
import Header from './Header';

const Layout: FC = (props) => {
    return (
        <Container>
            <Header></Header>
            {props.children}
        </Container>
    )
}

export default Layout;