import React from 'react';
import {Alert, AsyncStorage, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import {DigitText} from '../components/StyledText';
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";
import ButtonIcon from "../components/ButtonIcon";
import DialogInput from "react-native-dialog-input";
import i18n from './../translations/i18n';


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
        tabBarLabel: i18n.t('tabCounter'),
    };

    constructor(props) {
        super(props);
        this.pad   = 3;
        this.state = {
            counter: '0000',
            disabledButton: true,
            isDialogSave: false
        };
    }

    showDialogReset = () => {
        Alert.alert(i18n.t('ask_reset'), '', [
            {text: i18n.t('cancel'), onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: i18n.t('submit'), onPress: () => this.confirmReset()},
        ], {cancelable: true})
    };

    showDialogSave = (bool) => {
        this.setState({
            isDialogSave: bool
        })
    };

    onPressReset = () => {
        if (!this.state.disabledButton) {
            this.showDialogReset();
        }
    };

    onPressSave = () => {
        if (!this.state.disabledButton) {
            this.showDialogSave(true)
        }

    };

    onPressCount = () => {
        const count       = parseInt(this.state.counter) + 1;
        const countLength = count.toString().length;
        const repeat      = (this.pad - countLength + 1 >= 0) ? this.pad - countLength + 1 : 0;

        this.setState({
            counter: '0'.repeat(repeat) + count,
            disabledButton: false
        })
    };

    confirmReset = () => {
        this.setState({
            counter: '0000',
            disabledButton: true
        })
    };

    confirmSave = (inputText) => {
        if (inputText) {

            const counter = {
                name: inputText,
                date: new Date(),
                counter: this.state.counter
            };

            const counterStringify = JSON.stringify(counter);

            AsyncStorage.getItem('counters').then((items) => {

                let data = (items !== null)
                    ? items + ',' + counterStringify
                    : counterStringify;

                AsyncStorage.setItem('counters', data).then(() => {
                    // Hide dialog save
                    this.showDialogSave(false);
                });

            });
        }
    };


    render() {
        return (

            <View style={styles.container}>

                <TouchableOpacity onPress={this.onPressCount} activeOpacity={1} style={styles.TouchableOpacity}>

                    <Text style={styles.textIntro}>{i18n.t('title')}</Text>

                    <View style={styles.digitContainer}>

                        <DigitText style={styles.digitFont}>{this.state.counter}</DigitText>

                    </View>

                </TouchableOpacity>

                <View style={styles.tabBarInfoContainer}>

                    <View>

                        <ButtonIcon
                            name='clear'
                            color={Colors.tabIconDefault}
                            onPress={this.onPressReset} size={36}
                            disabled={this.state.disabledButton}/>

                    </View>

                    <View>

                        <ButtonIcon
                            name='save'
                            color={Colors.tabIconDefault}
                            onPress={this.onPressSave}
                            size={30}
                            disabled={this.state.disabledButton}/>

                    </View>

                </View>

                <DialogInput isDialogVisible={this.state.isDialogSave}
                             title={i18n.t('save_title')}
                             message={i18n.t('save_message')}
                             cancelText={i18n.t('cancel')}
                             submitText={i18n.t('submit')}
                             modalStyle={{backgroundColor: 'rgba(0,0,0,0.3)'}}
                             dialogStyle={{backgroundColor: '#ccc'}}
                             submitInput={(inputText) => {
                                 this.confirmSave(inputText)
                             }}
                             closeDialog={() => {
                                 this.showDialogSave(false)
                             }}> </DialogInput>

            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backColor
    },
    textIntro: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        marginBottom: 50
    },
    digitContainer: {
        borderRadius: 200,
        borderWidth: 0.5,
        borderColor: Colors.primaryColor,
        padding: 50
    },
    digitFont: {
        fontSize: 80,
        color: Colors.primaryColor
    },
    TouchableOpacity: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        width: 40,
        left: (Layout.window.width / 2) - (40 / 2),
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        flexDirection: 'column',
    }
});