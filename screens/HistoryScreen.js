import React from 'react';
import {AsyncStorage, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Colors from "../constants/Colors";
import {DigitText} from "../components/StyledText";
import {Icon} from "expo";
import i18n from './../translations/i18n';


export default class HistoryScreen extends React.Component {
    static navigationOptions = () => ({
        title: i18n.t('tab_history'),
        headerStyle: {
            backgroundColor: Colors.backColor,
            borderBottomColor: Colors.greyMid
        },
        headerTitleStyle: {
            color: Colors.primaryColor
        }
    });

    constructor(props) {
        super(props);
        this.state = {
            listViewData: []
        };
    }

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => this.getData());
    }

    getData = () => {
        AsyncStorage.getItem('counters').then((value) => {
            if (value) {
                const arrayOfObject = JSON.parse('[' + value + ']');
                this.setState({
                    listViewData: arrayOfObject
                })
            }
        }).catch(() => {
            //error
        })
    };

    deleteRow(data) {
        const array = [...this.state.listViewData];
        array.splice(data.index, 1);

        AsyncStorage.setItem('counters', JSON.stringify(array).slice(1, -1)).then(() => {
            this.setState({listViewData: array});
        });
    }

    static dateFormat(time) {
        let date = new Date(time);
        return (date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear() + ', ' + date.getHours() + ':' + date.getMinutes();
    }

    render() {

        return (

            <View style={styles.container}>

                <SwipeListView
                    useFlatList
                    rightOpenValue={-60}
                    disableRightSwipe
                    data={this.state.listViewData}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={(data) => (
                        <View style={styles.rowFront}>

                            <View>

                                <Text style={styles.textItem}> {data.item.name}</Text>

                                <Text style={[styles.textItem, styles.textDate]}> {HistoryScreen.dateFormat(data.item.date)}</Text>

                            </View>


                            <DigitText style={[styles.textItem, styles.textCounter]}> {data.item.counter}</DigitText>

                        </View>
                    )}
                    renderHiddenItem={(data, rowMap) => (

                        <TouchableOpacity onPress={() => this.deleteRow(data)} style={styles.rowBack}>

                            <Icon.MaterialIcons name={'delete'} color={'white'} size={30}/>

                        </TouchableOpacity>

                    )}
                />

            </View>


        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backColor
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: Colors.backColor,
        borderBottomColor: Colors.greyMid,
        borderBottomWidth: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 10,
        flex: 1,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#ff543c',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingRight: 14,
    },
    textItem: {
        color: Colors.greyLight
    },
    textDate: {
        fontSize: 10,
        color: '#a8a8a8',
        paddingLeft: 1
    },
    textCounter: {
        color: Colors.primaryColor,
        fontSize: 40
    }
});
