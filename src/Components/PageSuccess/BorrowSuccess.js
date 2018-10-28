import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	ActivityIndicator,
	AsyncStorage,
	WebView,
	TouchableOpacity,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Button, Toast } from 'native-base';

import { COLORS, INFO_APP, URL } from '../../Const/Const';
import apiGetCurrentBorrow from '../../Api/apiGetCurrentBorrow';
var { height, width } = Dimensions.get('window');

class BorrowSuccess extends Component{
	constructor(props){
		super(props);
		this.state={
			valueTypeAccount: 'nguoi_vay',
			checkNgVay: true,
			checkNhaDauTu: false,
			editData: true,
			textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Chấp nhận</Text>,
			htmlRule: 'Loadding',
			disableBtn: true,
            checkRender: true,
            nameParkage: '',
            money: '',
            day: '',
            money_real: '',
            rate: '',
            status: ''
		}
	}
	componentDidMount=async () =>{
		let accountDetail=await AsyncStorage.getItem('@accountDetail');
		accountDetail=JSON.parse(accountDetail);
        apiGetCurrentBorrow(accountDetail.idUser,accountDetail.emailUser,accountDetail.access_token)
        .then(res=>{
            this.setState({
                checkRender: false,
                nameParkage: res.parkage,
                money: res.money,
                day: res.day,
                money_real: res.money_real,
                rate: res.rate,
                status: res.status
            })
        })
	}
    updateBorrow=async () =>{
        this.props.navigation.navigate('CheckRouteScreen');
        // this.setState({
        //     checkRender: true
        // })
        // let accountDetail=await AsyncStorage.getItem('@accountDetail');
        // accountDetail=JSON.parse(accountDetail);
        // apiGetCurrentBorrow(accountDetail.idUser,accountDetail.emailUser,accountDetail.access_token)
        // .then(res=>{
        //     this.setState({
        //         checkRender: false,
        //         nameParkage: res.parkage,
        //         money: res.money,
        //         day: res.day,
        //         money_real: res.money_real,
        //         rate: res.rate,
        //         status: res.status
        //     })
        // })
        //Set storage check edit User
    }
    addNewBorrow=async () =>{
        let check=await AsyncStorage.getItem('@checkEditUser');
        if(check==0 || check==1){
            Toast.show({
                text: "Đang có khoản vay thực thi",
                buttonText: "Okay",
                type: "warning",
                duration: 3000
            })
        }else{
            this.props.navigation.navigate('AddNewBorrow');
        }
    }
    // test(){
    //     Contacts.getAll((err, contacts) => {
    //         if(err === 'denied'){
    //           // error
    //         } else {
    //             console.log(contacts);
    //         }
    //     })
    // }
	render(){
		const IMAGE_LOGO='../../Assets/Images/Logo.jpg';
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
                        <Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
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
					<Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
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
                            <View style={styles.itemDividerHeader}>
                                <TouchableOpacity onPress={()=>this.updateBorrow()}>
                                    <Text style={styles.updateStatus}>Cập nhập trạng thái vay</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bottomContent}>
                            <View style={{flex: 1,paddingLeft:10,paddingRight: 10}}>
                                <Text style={styles.textWarning}>Chú ý: *Nếu khoản vay của bạn không được nhà đầu tư duyệt, chúng tôi khuyên bạn nên chỉnh sửa thông tin cá nhân trước khi tiếp tục khoản vay tiếp theo (Mỗi tài khoản chỉ được vay 1 khoản vay 1 lúc)</Text>
                            </View>
                            <View style={{flex: 1,justifyContent: 'center',alignItems:'center'}}>
                                <TouchableOpacity onPress={()=>this.addNewBorrow()}>
                                    <Button onPress={()=>this.addNewBorrow()} rounded style={styles.btnLogin}>
                                        <Icon type='Feather' name='plus-circle' />
                                        <Text style={{color:'white',fontWeight:'bold'}}>Thêm khoản vay mới</Text>
                                    </Button>
                                </TouchableOpacity>
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

export default connect()(BorrowSuccess)
