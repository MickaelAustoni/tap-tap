import React from 'react';
import {createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import HistoryScreen from '../screens/HistoryScreen';
import Colors from "../constants/Colors";
import i18n from './../translations/i18n';


/**
 * Home stack
 * @type {NavigationContainer | *}
 */
const HomeStack = createStackNavigator({
    Home: HomeScreen,
});

/**
 * History stack
 * @type {NavigationContainer | *}
 */
const HistoryStack = createStackNavigator({
    Settings: HistoryScreen,
});

/**
 * Options
 * @type {{activeTintColor: string, style: {backgroundColor: string}}}
 */
const options = {
    activeTintColor: Colors.primaryColor,
    style: {
        backgroundColor: Colors.tabBar,
    },
};

HomeStack.navigationOptions = () => ({
    tabBarLabel: i18n.t('tab_counter'),
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'timer'}
        />
    ),
    tabBarOptions: options
});


HistoryStack.navigationOptions = () => ({
    tabBarLabel: i18n.t('tab_history'),
    tabBarIcon: ({focused}) => (
        <TabBarIcon
            focused={focused}
            name={'history'}
        />
    ),
    tabBarOptions: options
});

export default createBottomTabNavigator({
    HomeStack,
    HistoryStack,
});





