import React from 'react';
import {AppLoading, Font, Icon} from 'expo';
import AppNavigator from './navigation/AppNavigator';
import {Platform, StatusBar, StyleSheet, View} from 'react-native';
import Colors from "./constants/Colors";

export default class App extends React.Component {
    state = {
        isLoadingComplete: false
    };

    render() {
        if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
            return (
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
        } else {
            return (<View style={styles.container}>{Platform.OS === 'ios' && <StatusBar barStyle="light-content"/>}<AppNavigator/></View>);
        }
    }

    _loadResourcesAsync = async () => {
        return Promise.all([
            Font.loadAsync({
                ...Icon.Ionicons.font,
                'digit': require('./assets/fonts/digit.ttf'),
            }),
        ]);
    };

    _handleLoadingError = error => {
        console.warn(error);
    };

    _handleFinishLoading = () => {
        this.setState({isLoadingComplete: true});
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backColor,
    },
});
