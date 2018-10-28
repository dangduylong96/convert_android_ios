import React from 'react';
import {
    Image,
    StyleSheet
} from 'react-native';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import { Icon } from 'native-base';
import COLORS from '../Const/Const';

import InvestorSuccess from '../Components/PageSuccess/InvestorSuccess';
import HistoryBorrowOfInvestor from '../Components/History/HistoryBorrowOfInvestor';
import ApplicationInvestor from '../Components/Application/ApplicationInvestor';

const TabbarRouteInvestor=createBottomTabNavigator({
    InvestorSuccess:{
        screen: InvestorSuccess,
        navigationOptions: ({ navigation }) => ({
            title: 'Khoản vay',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type='MaterialIcons' name='attach-money' style={styles.icon} />
            },
        }),
    },
    HistoryInvestor:{
        screen:HistoryBorrowOfInvestor,
        navigationOptions: ({ navigation }) => ({
            title: 'Lịch sử',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type='FontAwesome' name='history' style={styles.icon} />
            },
        }),
    },
    ApplicationInvestor:{
        screen:ApplicationInvestor,
        navigationOptions: ({ navigation }) => ({
            title: 'Thông tin',
            tabBarIcon: ({ focused, tintColor }) => {
                return <Icon type='MaterialIcons' name='apps' style={styles.icon} />
            },
        }),
    }
},{
    initialRouteName: "InvestorSuccess",
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
export default TabbarRouteInvestor;