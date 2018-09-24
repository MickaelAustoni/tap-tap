import React from 'react';
import {DigitText} from '../components/StyledText';
import Colors from "../constants/Colors";
import {
    Alert,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ButtonIcon from "../components/ButtonIcon";

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null,
    };

    constructor(props) {
        super(props);
        this.state = {
            counter: '0000',
            pad: 3,
            disabledButton: true
        };
    }

    alert = (title, message) => {
        Alert.alert(title, message, [
            {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'OK', onPress: () => this.confirmResetCounter()},
        ], {cancelable: true})
    };

    resetCounter = () => {
        if (!this.state.disabledButton) {
            this.alert('Reset counter ?');
        }
    };

    confirmResetCounter = () => {
        this.setState({
            counter: '0000',
            disabledButton: true
        })
    };

    saveCounter = () => {
        if (!this.state.disabledButton) {
            alert('Save...')
        }

    };

    onPressCount = () => {

        let count       = parseInt(this.state.counter) + 1;
        let countLength = count.toString().length;
        let repeat      = (this.state.pad - countLength + 1 >= 0) ? this.state.pad - countLength + 1 : 0;

        this.setState({
            counter: '0'.repeat(repeat) + count,
            disabledButton: false
        })
    };


    render() {
        return (

            <View style={styles.container}>

                /* Timer */

                <TouchableOpacity onPress={this.onPressCount} activeOpacity={1} style={styles.TouchableOpacity}>

                    <Text style={styles.textIntro}>Tap to count</Text>


                    <View style={styles.digitContainer}>

                        <DigitText style={styles.digitFont}>{this.state.counter}</DigitText>

                    </View>

                </TouchableOpacity>


                /* Bottom button */

                <View style={styles.tabBarInfoContainer}>

                    <View style={styles.buttonButton}>

                        <ButtonIcon
                            name='clear'
                            color={Colors.tabIconDefault}
                            onPress={this.resetCounter} size={36}
                            disabled={this.state.disabledButton}/>

                    </View>

                    <View style={styles.buttonButton}>

                        <ButtonIcon
                            name='save'
                            color={Colors.tabIconDefault}
                            onPress={this.saveCounter}
                            size={30}
                            disabled={this.state.disabledButton}/>

                    </View>

                </View>

            </View>


        )
            ;
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
