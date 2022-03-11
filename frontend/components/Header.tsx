import React, { FC } from 'react';
import { Menu } from 'semantic-ui-react';

const Header: FC = () => {
    return (
        <Menu style={{ marginTop: '10px' }}>
            <Menu.Item name="">CrowdCoin</Menu.Item>
            <Menu.Menu position='right'>
                <Menu.Item name="">Campaigns</Menu.Item>
                <Menu.Item name="">+</Menu.Item>
            </Menu.Menu>
        </Menu>
    )
}

export default Header;