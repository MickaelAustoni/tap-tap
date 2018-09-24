import React from 'react';
import {Icon} from 'expo';
import {Text, TouchableOpacity, View} from "react-native";

export default class ButtonIcon extends React.Component {
    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}>

                <Icon.MaterialIcons
                    name={this.props.name}
                    size={(this.props.size) ? this.props.size : 26}
                    color={(this.props.disabled) ? '#555' : this.props.color}
                />

                <Text>{this.props.text}</Text>

            </TouchableOpacity>
        );
    }
}