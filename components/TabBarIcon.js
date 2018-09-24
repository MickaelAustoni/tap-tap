import React from 'react';
import {Icon} from 'expo';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
    render() {
        return (
            <Icon.MaterialIcons
                name={this.props.name}
                size={26}
                style={{marginBottom: -5}}
                color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
            />
        );
    }
}