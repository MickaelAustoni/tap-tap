import React from 'react';
import {DigitText} from '../components/StyledText';
import Colors from "../constants/Colors";
import {
    Alert,
    AsyncStorage,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ButtonIcon from "../components/ButtonIcon";
import DialogInput from "react-native-dialog-input";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
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
        Alert.alert('Reset counter ?', '', [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Submit', onPress: () => this.confirmReset()},
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

                    <Text style={styles.textIntro}>Tap to count</Text>

                    <View style={styles.digitContainer}>

                        <DigitText style={styles.digitFont}>{this.state.counter}</DigitText>

                    </View>

                </TouchableOpacity>

                <View style={styles.tabBarInfoContainer}>

                    <View style={styles.buttonButton}>

                        <ButtonIcon
                            name='clear'
                            color={Colors.tabIconDefault}
                            onPress={this.onPressReset} size={36}
                            disabled={this.state.disabledButton}/>

                    </View>

                    <View style={styles.buttonButton}>

                        <ButtonIcon
                            name='save'
                            color={Colors.tabIconDefault}
                            onPress={this.onPressSave}
                            size={30}
                            disabled={this.state.disabledButton}/>

                    </View>

                </View>

                <DialogInput isDialogVisible={this.state.isDialogSave}
                             title={"Save counter"}
                             message={"Choose a name"}
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
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        flex: 1,
        flexDirection: 'column',
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: {height: -3},
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
    },
    buttonButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});
