import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	ActivityIndicator,
	AsyncStorage,
	Button,
	TouchableOpacity,
    FlatList
} from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';

import { COLORS, INFO_APP, URL } from '../../Const/Const';
import apiGetAllBorrow from '../../Api/apiGetAllBorrow';
// import { saveToken } from '../../redux/ActionCrsseators';
var { height, width } = Dimensions.get('window');

class HistoryBorrow extends Component{
	constructor(props){
		super(props);
		this.state={
            checkRender: true,
            nameParkage: '',
            money: '',
            day: '',
            money_real: '',
            rate: '',
            status: '',
            dataOrder: []
		}
	}
	componentDidMount=async () =>{
		let accountDetail=await AsyncStorage.getItem('@accountDetail');
		accountDetail=JSON.parse(accountDetail);
        apiGetAllBorrow(accountDetail.idUser,accountDetail.emailUser,accountDetail.access_token)
        .then(res=>{
            this.setState({
                checkRender: false,
                dataOrder: res
            })
        })
	}
    updateBorrow=async () =>{
        this.setState({
            checkRender: true
        })
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
                status: res.status,
                dataOrder: []
            })
        })
    }
	render(){
		const IMAGE_LOGO='../../Assets/Images/Logo.jpg';
        const ARRAY_STATUS=[
            <Text style={{fontWeight:'bold',fontSize: 15,color: '#ffcc00'}}><Icon type='SimpleLineIcons' name='cloud-upload' style={{color:'#ffcc00',fontSize: 18}} /> Đang chờ duyệt</Text>,
            <Text style={{fontWeight:'bold',fontSize: 15,color: 'blue'}}><Icon type='FontAwesome' name='plane' style={{color:'blue'}} /> Đang giải ngân</Text>,
            <Text style={{fontWeight:'bold',fontSize: 15,color: COLORS.MAIN_COLOR}}><Icon type='FontAwesome' name='check-circle-o' style={{color:COLORS.MAIN_COLOR}} /> Hoàn tất giao dịch</Text>,
            <Text style={{fontWeight:'bold',fontSize: 13,color: 'red'}}><Icon type='MaterialIcons' name='error' style={{color:'red',fontSize: 18}} /> Hồ sơ không được duyệt</Text>,
        ];
		const { dataOrder, checkRender, nameParkage, money, day, money_real, rate, status }=this.state;
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
                    <FlatList
                        data={dataOrder}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(data_item)=>
                        <View style={styles.content1}>
                            <View style={{margin: 5, marginLeft: 10, flex: 1}}>
                                <View style={styles.content_header}>
                                    <View style={styles.parkage}>
                                        <Text style={styles.title_header}>Gói vay</Text>
                                        <Text style={styles.title_value}>{data_item.item.parkage}</Text>
                                    </View>
                                    <View style={styles.money}>
                                        <Text style={styles.title_header}>Số tiền</Text>
                                        <Text style={styles.title_value}>{data_item.item.money} VNĐ</Text>
                                    </View>
                                    <View style={styles.day}>
                                        <Text style={styles.title_header}>Số ngày</Text>
                                        <Text style={styles.title_value}>{data_item.item.day}</Text>
                                    </View>
                                </View>
                                <View style={styles.content_status}>
                                    <Text style={{marginRight: 5}}>Trạng thái: </Text>
                                    {ARRAY_STATUS[data_item.item.status]}
                                </View>
                                <TouchableOpacity style={styles.content_button}
                                    onPress={()=>this.props.navigation.navigate('DetailHistoryBorrow',{
                                        dataBorrow: data_item.item
                                    })}
                                >
                                    <Text style={{color:'white',fontWeight:'bold',fontSize: 18}}><Icon type='FontAwesome' name='eye' style={{fontSize:18,color:'white'}} /> Xem</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        }
                    />
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
    textHead: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20
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
		alignItems: 'center'
	},
	contentItems:{
        backgroundColor: 'white',
        height: height/4,
        width: width*97/100,
        marginTop: 10,
        marginBottom: 20
    },
    content1:{
        width: width*0.98,
        backgroundColor:'white',
        marginTop: height/120,
        height: height/4
    },
    content_header:{
        flexDirection: 'row',
        flex: 1
    },
    title_header:{
        fontWeight: 'bold',
        color: '#00b359'
    },
    title_value:{
        marginTop: 5,
        fontWeight: 'bold'
    },
    parkage:{
        flex: 1,
        alignItems: 'center'
    },
    money:{
        flex: 1,
        alignItems: 'center'
    },
    day:{
        flex: 1,
        alignItems: 'center'
    },
    content_status:{
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    content_button:{
        flex: 1,
        backgroundColor: COLORS.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    touchableButton:{
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default connect()(HistoryBorrow)
