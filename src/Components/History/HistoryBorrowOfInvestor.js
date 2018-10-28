import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	ActivityIndicator,
	AsyncStorage,
	TouchableOpacity,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Button, Toast } from 'native-base';

import { COLORS, INFO_APP, URL } from '../../Const/Const';
import apiGetBorrowOfInvestor from '../../Api/apiGetBorrowOfInvestor';
var { height, width } = Dimensions.get('window');

class HistoryBorrowOfInvestor extends Component{
	constructor(props){
		super(props);
		this.state={
            checkRender: true,
            // checkRender: false,
            dataBorrowInvestor: []
		}
	}
	componentDidMount=async () =>{
		let accountDetail=await AsyncStorage.getItem('@accountDetail');
		accountDetail=JSON.parse(accountDetail);
        apiGetBorrowOfInvestor(accountDetail.idUser,accountDetail.emailUser,accountDetail.access_token,-1)
        .then(res=>{
            this.setState({
                checkRender: false,
                dataBorrowInvestor: res
            })
        })
	}
	render(){
		const IMAGE_LOGO='../../Assets/Images/Logo.jpg';
        const ARRAY_STATUS=[
            <Text style={{fontWeight:'bold',fontSize: 15,color: '#ffcc00'}}><Icon type='SimpleLineIcons' name='cloud-upload' style={{color:'#ffcc00'}} /> Đang chờ duyệt</Text>,
            <Text style={{fontWeight:'bold',fontSize: 15,color: '#ffcc00'}}><Icon type='SimpleLineIcons' name='cloud-upload' style={{color:'#ffcc00'}} /> Đang giải ngân</Text>,
            <Text style={{fontWeight:'bold',fontSize: 15,color: COLORS.MAIN_COLOR}}><Icon type='FontAwesome' name='check-circle-o' style={{color:COLORS.MAIN_COLOR}} /> Hoàn tất giao dịch</Text>,
            <Text style={{fontWeight:'bold',fontSize: 13,color: 'red'}}><Icon type='MaterialIcons' name='error' style={{color:'red',fontSize: 18}} /> Từ chối</Text>,
        ];
		const { checkRender, dataBorrowInvestor }=this.state;
        if(checkRender){
            return(
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
                    </View>
                    <View style={styles.content}>
                        <ActivityIndicator size="small" color="blue" />
                    </View>
                </View>
            )
        }
        // for(borrow in dataBorrowInvestor){

        // }
        const listBorrow=dataBorrowInvestor.map(borrow=>(
            <View style={styles.headerContent} key={borrow.key}>
                <View style={styles.itemDividerHeader}>
                    <Text style={styles.textDividerHeader}>Gói Vay: {borrow.nameParkage}</Text>
                </View>
                <View style={styles.itemDivider}>
                    <View style={styles.itemLeft}>
                        <Text style={styles.fontItemLeft}>Họ tên</Text>
                    </View>
                    <View style={styles.itemRight}>
                        <Text style={styles.fontItemRight}>{borrow.name}</Text>
                    </View>
                </View>
                <View style={styles.itemDivider}>
                    <View style={styles.itemLeft}>
                        <Text style={styles.fontItemLeft}>Số tiền</Text>
                    </View>
                    <View style={styles.itemRight}>
                        <Text style={styles.fontItemRight}>{borrow.money}</Text>
                    </View>
                </View>
                <View style={styles.itemDivider}>
                    <View style={styles.itemLeft}>
                        <Text style={styles.fontItemLeft}>Ngày đáo hạn</Text>
                    </View>
                    <View style={styles.itemRight}>
                        <Text style={styles.fontItemRight}>{borrow.dayDue}</Text>
                    </View>
                </View>
                <View style={styles.itemDivider}>
                    <View style={styles.itemLeft}>
                        <Text style={styles.fontItemLeft}>Trạng thái</Text>
                    </View>
                    <View style={styles.itemRight}>
                        {ARRAY_STATUS[borrow.status]}
                    </View>
                </View>
            </View>
        ))
		return(
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
				</View>
				<View style={styles.content}>
                    <ScrollView>
                        {dataBorrowInvestor!=''?listBorrow:<Text>Bạn chưa có gói vay nào</Text>}
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
		justifyContent: 'center',
		alignItems: 'center',
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
    textDividerHeader:{
        fontSize: 18,
        fontWeight: 'bold'
    },
	headerContent:{
        backgroundColor: 'white',
        height: height/3,
        width: width*97/100,
        marginTop: 10
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
    },
    updateStatus:{
        fontWeight: 'bold',
        fontSize: 15,
        // color: COLORS.MAIN_COLOR,
        color: 'blue',
        textDecorationStyle: 'solid'
    },
    bottomContent:{
        backgroundColor: 'white',
        height: height/4,
        width: width*97/100,
        marginBottom: 10
    },
    textWarning:{
        fontWeight: 'bold'
    },
    btnLogin:{
        flex: 1,
        width:width*3/4,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: COLORS.MAIN_COLOR,
    },
});

export default connect()(HistoryBorrowOfInvestor)
