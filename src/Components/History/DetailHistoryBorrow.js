import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	ActivityIndicator,
	TouchableOpacity,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { COLORS, INFO_APP, URL } from '../../Const/Const';
var { height, width } = Dimensions.get('window');

class DetailHistoryBorrow extends Component{
	constructor(props){
		super(props);
		this.state={
            checkRender: true,
            nameParkage: '',
            money: '',
            day: '',
            money_real: '',
            rate: '',
            status: ''
		}
	}
	componentDidMount(){
        let dataBorrow=this.props.navigation.state.params.dataBorrow;
        this.setState({
            checkRender: false,
            nameParkage: dataBorrow.parkage,
            money: dataBorrow.money,
            day: dataBorrow.day,
            money_real: dataBorrow.money_real,
            rate: dataBorrow.rate,
            status: dataBorrow.status
        })
	}
	render(){
        const ARRAY_STATUS=[
            <Text style={{fontWeight:'bold',fontSize: 15,color: '#ffcc00'}}><Icon type='SimpleLineIcons' name='cloud-upload' style={{color:'#ffcc00'}} /> Đang chờ duyệt</Text>,
            <Text style={{fontWeight:'bold',fontSize: 15,color: 'blue'}}><Icon type='FontAwesome' name='plane' style={{color:'blue'}} /> Đang giải ngân</Text>,
            <Text style={{fontWeight:'bold',fontSize: 15,color: COLORS.MAIN_COLOR}}><Icon type='FontAwesome' name='check-circle-o' style={{color:COLORS.MAIN_COLOR}} /> Hoàn tất giao dịch</Text>,
            <Text style={{fontWeight:'bold',fontSize: 13,color: 'red'}}><Icon type='MaterialIcons' name='error' style={{color:'red',fontSize: 18}} /> Hồ sơ không được duyệt</Text>,
        ];
		const { checkRender, nameParkage, money, day, money_real, rate, status }=this.state;
        if(checkRender){
            return(
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerBack}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate({ routeName: 'HistoryBorrow' })}>
                                <Icon type='FontAwesome' name='chevron-left' style={{fontSize:20,color:'white',marginLeft: 10}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerTitle}>
                            <Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
                        </View>
                        <View style={{flex:1}}></View>
                    </View>
                    <View style={styles.content}>
                        <ActivityIndicator size="small" color="blue" />
                    </View>
                </View>
            )
        }
		return(
			<View style={styles.container}>
				<View style={styles.header}>
                    <View style={styles.headerBack}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate({ routeName: 'HistoryBorrow' })}>
                            <Icon type='FontAwesome' name='chevron-left' style={{fontSize:20,color:'white',marginLeft: 10}} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerTitle}>
                        <Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
                    </View>
                    <View style={{flex:1}}></View>
                </View>
				<View style={styles.content}>
                    <ScrollView>
                        <View style={styles.headerContent}>
                            <View style={styles.itemDividerHeader}>
                                <Text style={styles.textDividerHeader}>Gói Vay: {nameParkage}</Text>
                            </View>
                            <View style={styles.itemDivider}>
                                <View style={styles.itemLeft}>
                                    <Text style={styles.fontItemLeft}>Số tiền vay</Text>
                                </View>
                                <View style={styles.itemRight}>
                                    <Text style={styles.fontItemRight}>{money}</Text>
                                </View>
                            </View>
                            <View style={styles.itemDivider}>
                                <View style={styles.itemLeft}>
                                    <Text style={styles.fontItemLeft}>Thời hạn</Text>
                                </View>
                                <View style={styles.itemRight}>
                                    <Text style={styles.fontItemRight}>{day}</Text>
                                </View>
                            </View>
                            <View style={styles.itemDivider}>
                                <View style={styles.itemLeft}>
                                    <Text style={styles.fontItemLeft}>Số tiền thực nhận</Text>
                                </View>
                                <View style={styles.itemRight}>
                                    <Text style={styles.fontItemRight}>{money_real}</Text>
                                </View>
                            </View>
                            <View style={styles.itemDivider}>
                                <View style={styles.itemLeft}>
                                    <Text style={styles.fontItemLeft}>Lãi suất và phí</Text>
                                </View>
                                <View style={styles.itemRight}>
                                    <Text style={styles.fontItemRight}>{rate}</Text>
                                </View>
                            </View>
                            <View style={styles.itemDivider}>
                                <View style={styles.itemLeft}>
                                    <Text style={styles.fontItemLeft}>Trạng thái</Text>
                                </View>
                                <View style={styles.itemRight}>
                                    {ARRAY_STATUS[status]}
                                </View>
                            </View>
                        </View>
                    </ScrollView>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	header: {
		flex: 1,
		backgroundColor: COLORS.MAIN_COLOR,
		width: '100%',
        flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
    headerBack:{
        flex:1,
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    headerTitle:{
        flex:1,
        height: '100%',
        justifyContent: 'center',
        alignItems:'center'
    },
	content: {
		flex: 12,
		backgroundColor: '#e0e0d1',
		width: '100%',
		alignItems: 'center',
	},
	textHead: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	},
	headerContent:{
        backgroundColor: 'white',
        height: height/2,
        width: width*97/100,
        marginTop: 10,
        marginBottom: 20
    },
    itemDivider:{
        width: '100%',
        borderBottomWidth: 1,
        flexDirection: 'row',
        // height: height/16,
        flex: 1,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    itemDividerHeader:{
        width: '100%',
        borderBottomWidth: 1,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textDividerHeader:{
        fontSize: 18,
        fontWeight: 'bold'
    },
    itemLeft:{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        // backgroundColor: 'red'
    },
    fontItemLeft:{
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black'
    },
    fontItemRight:{
        fontWeight: 'bold',
        fontSize: 15,
        color: COLORS.MAIN_COLOR
    },
    itemRight:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        // backgroundColor: 'blue'
    }
});

export default connect()(DetailHistoryBorrow)
