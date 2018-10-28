import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	AsyncStorage,
	TouchableOpacity,
    ScrollView,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Toast } from 'native-base';

import { COLORS, INFO_APP, URL } from '../../Const/Const';
import apiGetCurrentBorrow from '../../Api/apiGetCurrentBorrow';
import apiPostChangeAccount from '../../Api/apiPostChangeAccount';
// import { saveToken } from '../../redux/ActionCreators';
var { height, width } = Dimensions.get('window');

class Application extends Component{
	constructor(props){
		super(props);
		this.state={
            checkEditUser: 0,
            mode: 'sinh-vien'
		}
	}
    componentDidMount=async()=>{
        let mode=await AsyncStorage.getItem('@studentOrWork');
        this.setState({
            mode: mode
        })
    }
    redirectComponent=async (url) =>{
        let check=await AsyncStorage.getItem('@checkEditUser');
        if(check==0 || check==1){
            Toast.show({
                text: "Khoản vay chỉ sửa khi hoàn tất giao dịch",
                buttonText: "Okay",
                type: "warning",
                duration: 3000
            })
        }else{
            this.props.navigation.navigate(url);
        }
    }
    alertChangeAccount(){
        Alert.alert(
          'Chuyển đổi',
          'Chuyển đổi gói vay người đi làm không thể quay lại gói vay sinh viên',
          [
            {text: 'Hủy', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
            {text: 'Đồng ý', onPress: () => this.changeAccount()},
          ],
          { cancelable: false }
        )
    }
    changeAccount=async () =>{
        let check=await AsyncStorage.getItem('@checkEditUser');
        let mode=await AsyncStorage.getItem('@studentOrWork');
        if(check==0 || check==1){
            Toast.show({
                text: "Khoản vay chỉ sửa khi hoàn tất giao dịch",
                buttonText: "Okay",
                type: "warning",
                duration: 3000
            })
        }else if(mode=='nguoi-di-lam'){
            Toast.show({
                text: "Bạn đã là người đi làm",
                buttonText: "Okay",
                type: "warning",
                duration: 3000
            })
        }else{
            AsyncStorage.removeItem('@StudentWorkStep3');
            let accountDetail=await AsyncStorage.getItem('@accountDetail');
            accountDetail=JSON.parse(accountDetail);
            let bodyData={
                userId: accountDetail.idUser,
                email: accountDetail.emailUser,
                accessToken: accountDetail.access_token,
                studentOrWork: 'nguoi-di-lam'
            };
            apiPostChangeAccount(bodyData)
            .then(()=>{
                this.props.navigation.navigate('CheckRouteScreen');
            })
        }
    }
    logOut=async () =>{
        await AsyncStorage.clear();
        this.props.navigation.navigate('CheckRouteScreen');
    }
	render(){
		const { checkRender, nameParkage, money, day, money_real, rate, status, mode }=this.state;
        const ARRAY_STATUS=[
            <Text style={{fontWeight:'bold',fontSize: 15,color: '#ffcc00'}}><Icon type='SimpleLineIcons' name='cloud-upload' style={{color:'#ffcc00'}} /> Đang chờ duyệt</Text>,
            <Text style={{fontWeight:'bold',fontSize: 15,color: 'blue'}}><Icon type='FontAwesome' name='plane' style={{color:'blue'}} /> Đang giải ngân</Text>,
            <Text style={{fontWeight:'bold',fontSize: 15,color: COLORS.MAIN_COLOR}}><Icon type='FontAwesome' name='check-circle-o' style={{color:COLORS.MAIN_COLOR}} /> Hoàn tất giao dịch</Text>,
            <Text style={{fontWeight:'bold',fontSize: 13,color: 'red'}}><Icon type='MaterialIcons' name='error' style={{color:'red',fontSize: 18}} /> Hồ sơ không được duyệt</Text>,
        ];
        const studentComponent=(
            <TouchableOpacity style={styles.itemDivider} onPress={()=>this.redirectComponent('EditStep3')}>
                <View style={styles.itemLeft}>
                    <Text style={styles.fontItemLeft}>Xác thức sinh viên</Text>
                </View>
                <View style={styles.itemRight}>
                    <Text style={styles.fontItemRight}><Icon type='FontAwesome' name='graduation-cap' style={{fontSize:18,color:'blue',marginLeft: 10}} /></Text>
                </View>
            </TouchableOpacity>
        );
        const workComponent=(
            <TouchableOpacity style={styles.itemDivider} onPress={()=>this.redirectComponent('EditWorkStep3')}>
                <View style={styles.itemLeft}>
                    <Text style={styles.fontItemLeft}>Xác thực công ty</Text>
                </View>
                <View style={styles.itemRight}>
                    <Text style={styles.fontItemRight}><Icon type='MaterialIcons' name='work' style={{fontSize:18,color:'blue',marginLeft: 10}} /></Text>
                </View>
            </TouchableOpacity>
        );
        const changeAccountComponent=(
            <TouchableOpacity style={styles.itemDivider} onPress={()=>this.alertChangeAccount()}>
                <View style={styles.itemLeft}>
                    <Text style={styles.fontItemLeft}>Chuyển đổi người đi làm</Text>
                </View>
                <View style={styles.itemRight}>
                    <Text style={styles.fontItemRight}><Icon type='FontAwesome' name='exchange' style={{fontSize:18,color:'blue',marginLeft: 10}} /></Text>
                </View>
            </TouchableOpacity>
        );
		return(
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
				</View>
				<View style={styles.content}>
                    <ScrollView style={{width:'100%'}}>
                        <TouchableOpacity style={styles.itemDivider} onPress={()=>this.redirectComponent('EditStep1')}>
                            <View style={styles.itemLeft}>
                                <Text style={styles.fontItemLeft}>Thông tin cơ bản</Text>
                            </View>
                            <View style={styles.itemRight}>
                                <Text style={styles.fontItemRight}><Icon type='FontAwesome' name='user-circle-o' style={{fontSize:18,color:'blue',marginLeft: 10}} /></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemDivider} onPress={()=>this.redirectComponent('EditStep2')}>
                            <View style={styles.itemLeft}>
                                <Text style={styles.fontItemLeft}>Xác thực nơi ở</Text>
                            </View>
                            <View style={styles.itemRight}>
                                <Text style={styles.fontItemRight}><Icon type='FontAwesome' name='home' style={{fontSize:18,color:'blue',marginLeft: 10}} /></Text>
                            </View>
                        </TouchableOpacity>
                        {mode=='nguoi-di-lam'?workComponent:studentComponent}
                        <TouchableOpacity style={styles.itemDivider} onPress={()=>this.redirectComponent('EditStep4')}>
                            <View style={styles.itemLeft}>
                                <Text style={styles.fontItemLeft}>Thông tin người thân</Text>
                            </View>
                            <View style={styles.itemRight}>
                                <Text style={styles.fontItemRight}><Icon type='FontAwesome' name='users' style={{fontSize:18,color:'blue',marginLeft: 10}} /></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemDivider} onPress={()=>this.redirectComponent('EditStep5')}>
                            <View style={styles.itemLeft}>
                                <Text style={styles.fontItemLeft}>Thông tin chuyển khoản</Text>
                            </View>
                            <View style={styles.itemRight}>
                                <Text style={styles.fontItemRight}><Icon type='FontAwesome' name='bank' style={{fontSize:18,color:'blue',marginLeft: 10}} /></Text>
                            </View>
                        </TouchableOpacity>
                        {mode=='nguoi-di-lam'?null:changeAccountComponent}
                        <TouchableOpacity style={styles.itemDivider} onPress={()=>this.logOut()}>
                            <View style={styles.itemLeft}>
                                <Text style={styles.fontItemLeft}>Đăng xuất</Text>
                            </View>
                            <View style={styles.itemRight}>
                                <Text style={styles.fontItemRight}><Icon type='FontAwesome' name='sign-out' style={{fontSize:18,color:'blue',marginLeft: 10}} /></Text>
                            </View>
                        </TouchableOpacity>
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
		backgroundColor: 'white',
		width: '100%',
		alignItems: 'center'
	},
	textHead: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	},
    itemDivider:{
        width: '100%',
        borderBottomWidth: 1,
        borderColor: COLORS.COLOR_TEXT_BG_WHITE,
        flexDirection: 'row',
        height: height/12,
        flex: 1,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    itemLeft:{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        // backgroundColor: 'red'
    },
    fontItemLeft:{
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
export default connect()(Application)
