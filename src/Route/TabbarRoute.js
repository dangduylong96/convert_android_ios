import React from 'react';
import {
    Image,
    StyleSheet
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { Icon } from 'native-base';
import COLORS from '../Const/Const';

import BorrowSuccess from '../Components/PageSuccess/BorrowSuccess';
import HistoryBorrow from '../Components/History/HistoryBorrow';
import Application from '../Components/Application/Application';

const TabbarRoute=createBottomTabNavigator({
    BorrowSuccess:{
        screen: BorrowSuccess,
        navigationOptions: ({ navigation }) => ({
            title: 'Khoản vay',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type='MaterialIcons' name='attach-money' style={styles.icon} />
            },
        }),
    },
    HistoryBorrow:{
        screen:HistoryBorrow,
        navigationOptions: ({ navigation }) => ({
            title: 'Lịch sử',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type='FontAwesome' name='history' style={styles.icon} />
            },
        }),
    },
    Application:{
        screen:Application,
        navigationOptions: ({ navigation }) => ({
            title: 'Thông tin',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type='MaterialIcons' name='apps' style={styles.icon} />
            },
        }),
    }
},{
    initialRouteName: "BorrowSuccess",
    tabBarComponent: BottomTabBar,
    tabBarPosition:'bottom',
    swipeEnabled:true,
    animationEnabled:true,
    tabBarOptions:{
        labelStyle: {
            fontSize: 15,
        },
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        tabStyle: {
            backgroundColor: COLORS.MAIN_COLOR
        }
    }
})
var styles=StyleSheet.create({
    icon:{
        color: '#ffd11a'
    }
})
export default TabbarRoute;