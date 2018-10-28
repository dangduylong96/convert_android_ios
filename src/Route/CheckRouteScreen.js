import React, { Component } from 'react';
import {
	AsyncStorage,
	StyleSheet,
	View,
	Text,
	Image,
	Dimensions,
	Alert
} from 'react-native';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';

import apiGetDataBorrow from '../Api/apiGetDataBorrow';
import { COLORS, URL } from '../Const/Const';
var { height, width } = Dimensions.get('window');
class CheckRouteScreen extends Component {
	constructor(props) {
		super(props);
		this.state={
			version: ''
		}
	}
	setVersion(){
		let version=this.state.version;
		AsyncStorage.setItem('@checkVersion', version.toString());
	}
	componentDidMount= async () =>{
		// AsyncStorage.clear();
		let checkVersion = await AsyncStorage.getItem('@checkVersion');
		let isUpdateVersion=false;
		let versionUpdate=0;
		//Check version
		await fetch(`${URL.URL_BASE_SERVER}/get-version`)
		.then(res=>res.json())
		.then(resj=>{
			if(!checkVersion){
				this.setState({
					version: resj.version
				})
				this.setVersion();
			}else if(checkVersion!=resj.version){
				isUpdateVersion=true;
			}
		})
		if(isUpdateVersion){
			//Cập nhập phần mềm
			Alert.alert(
			  'Cập nhập',
			  'Vui lòng cập nhập phần mềm để tiếp tục sử dụng',
			  [
			    {text: 'Cập nhập', onPress: () => console.log('OK Pressed')},
			  ],
			  { cancelable: false }
			)

		}else{
			let accountDetail = await AsyncStorage.getItem('@accountDetail');
		  	//Xét tài khoản có vay bao giờ chưa
		  	if(accountDetail){
		  		accountDetail=JSON.parse(accountDetail);
				fetch(`${URL.URL_BASE_SERVER}/get-data-borrow?userId=${accountDetail.idUser}&email=${accountDetail.emailUser}&accessToken=${accountDetail.access_token}`)
				.then(res=>res.json())
				.then(resjs=>{
					this.setCheckIsRow(resjs.checkIsRow);
					if(resjs.checkIsRow=='yes'){
						if(resjs.typeAccount=='nguoi_vay'){
							this.saveAsyncStorage(resjs);
						}
						if(resjs.typeAccount=='nha_dau_tu'){
							this.saveAsyncStorageInvestor(resjs);

						}
					}
				})
				.then(resjs=>{
					this._checkPage();
				})
			}else{
				this._checkPage();
			}
		}
	}
	//kiểm tra dòng này có trong CSDL hay chưa
	setCheckIsRow= async (check) => {
		await AsyncStorage.setItem('@checkIsRow', check);
	}
	saveAsyncStorage = async (resjs) => {
        try {
        	// await AsyncStorage.removeItem('@StudentStep6');
            await AsyncStorage.setItem('@typeAccount', resjs.typeAccount);
			await AsyncStorage.setItem('@studentOrWork', resjs.studentOrWork);
			await AsyncStorage.setItem('@acceptReadRule', resjs.acceptReadRule.toString());
			await AsyncStorage.setItem('@idParkageBorrow', JSON.stringify(resjs.idParkageBorrow));
			await AsyncStorage.setItem('@studentStep1', JSON.stringify(resjs.step1));
			await AsyncStorage.setItem('@StudentStep2', JSON.stringify(resjs.step2));
			await AsyncStorage.setItem('@StudentStep3', JSON.stringify(resjs.step3));
			if(resjs.step3Work.name_company!=null && resjs.step3Work.name_company!=''){
				await AsyncStorage.setItem('@StudentWorkStep3', JSON.stringify(resjs.step3Work));
			}
			await AsyncStorage.setItem('@StudentStep4', JSON.stringify(resjs.step4));
			await AsyncStorage.setItem('@StudentStep5', JSON.stringify(resjs.step5));
			if(resjs.step5.sourceVideoUri=='ok'){
				await AsyncStorage.setItem('@StudentStep6', 'ok');
			}else{
				await AsyncStorage.removeItem('@StudentStep6');
			}
			await AsyncStorage.setItem('@checkEditUser', resjs.checkEditUser.toString());
        } catch (error) {
            alert('Vui lòng cho quyền ứng dụng được lưu trữ');
        }
    }
    saveAsyncStorageInvestor = async (resjs) => {
        try {
            await AsyncStorage.setItem('@typeAccount', resjs.typeAccount);
			await AsyncStorage.setItem('@acceptReadRuleInvestor', 'true');
			await AsyncStorage.setItem('@detailInvestor', JSON.stringify(resjs.detailInvestor));
        } catch (error) {
            alert('Vui lòng cho quyền ứng dụng được lưu trữ');
        }
    }

	_checkPage = async () => {
	  	// AsyncStorage.clear();
	 //  	await AsyncStorage.removeItem('@typeAccount');
	 //  	await AsyncStorage.removeItem('@studentOrWork');s
	  	// await AsyncStorage.removeItem('@acceptReadRule');
	 //  	await AsyncStorage.removeItem('@idParkageBorrow');
	 //  	await AsyncStorage.removeItem('@studentStep1');
	 //  	await AsyncStorage.removeItem('@StudentStep2');
	 //  	await AsyncStorage.removeItem('@StudentStep3');
	 //  	await AsyncStorage.removeItem('@StudentStep4');
		// await AsyncStorage.removeItem('@StudentStep5');
		// await AsyncStorage.removeItem('@StudentStep6');
		// await AsyncStorage.setItem('@StudentStep5', "true");
		// console.log(await AsyncStorage.getItem('@StudentStep5'));
		// console.log('aaa');
		// await AsyncStorage.removeItem('@studentStep5');
		// await AsyncStorage.removeItem('@detailInvestor');


	  	//kiểm tra lần trc có đăng nhập hay chưa?
	  	let initRouteApp='';
	  	let accountDetail = await AsyncStorage.getItem('@accountDetail');
	  	//Xét tài khoản có vay bao giờ chưa
	  	if(accountDetail){
	  		accountDetail=JSON.parse(accountDetail);
	  	}
	  	//Kiểm tra loại
	  	let typeAccount = await AsyncStorage.getItem('@typeAccount');
	  	if(!typeAccount){
	  		initRouteApp='ChooseType';
	  	}
	  	if(typeAccount=='nguoi_vay'){
	  		//Kiểm tra điều khoản
		  	let acceptReadRule = await AsyncStorage.getItem('@acceptReadRule');
		  	console.log('aaaa'+acceptReadRule);
		  	// acceptReadRule=1;
		  	if(!acceptReadRule && initRouteApp==''){
		  		initRouteApp='Rule';
		  	}
		  	//Kiểm tra chọn loại tk vay chưa(sinh viên or ng đi làm)
		  	if(initRouteApp==''){
		  		let studentOrWork = await AsyncStorage.getItem('@studentOrWork');
		  		if(!studentOrWork){
		  			initRouteApp='ChooseUserBorrows';
		  		}
		  	}
	  		let studentOrWork = await AsyncStorage.getItem('@studentOrWork');
		  	if(studentOrWork=='sinh-vien'){
		  		//Kiểm tra chọn gói vay hay chưa
			  	if(initRouteApp==''){
			  		let chooseParkages = await AsyncStorage.getItem('@idParkageBorrow');
			  		if(!chooseParkages){
			  			initRouteApp='BorrowStudent';
			  		}
			  	}
		  		if(initRouteApp==''){
			  		let studentStep1 = await AsyncStorage.getItem('@studentStep1');
			  		if(!studentStep1){
			  			initRouteApp='StudentStep1';
			  		}
			  	}
			  	if(initRouteApp==''){
			  		let studentStep2 = await AsyncStorage.getItem('@StudentStep2');
			  		if(!studentStep2){
			  			initRouteApp='StudentStep2';
			  		}
			  	}
			  	if(initRouteApp==''){
			  		let StudentStep3 = await AsyncStorage.getItem('@StudentStep3');
			  		if(!StudentStep3){
			  			initRouteApp='StudentStep3';
			  		}
			  	}
			  	if(initRouteApp==''){
			  		let StudentStep4 = await AsyncStorage.getItem('@StudentStep4');
			  		if(!StudentStep4){
			  			initRouteApp='StudentStep4';
			  		}
			  	}
			  	if(initRouteApp==''){
			  		let StudentStep5 = await AsyncStorage.getItem('@StudentStep5');
			  		if(!StudentStep5){
			  			initRouteApp='StudentStep5';
			  		}
			  	}
			  	if(initRouteApp==''){
			  		let StudentStep6 = await AsyncStorage.getItem('@StudentStep6');
			  		if(!StudentStep6){
			  			initRouteApp='StudentStep6';
			  		}
			  	}
			  	if(initRouteApp==''){
			  		let checkBorrowSuccess = await AsyncStorage.getItem('@checkBorrowSuccess');
			  		if(!checkBorrowSuccess){
			  			initRouteApp='TabbarRoute';
			  		}
			  	}
		  	}
		  	if(studentOrWork=='nguoi-di-lam'){
		  		//Kiểm tra chọn gói vay hay chưa
			  	if(initRouteApp==''){
			  		let chooseParkages = await AsyncStorage.getItem('@idParkageBorrow');
			  		if(!chooseParkages){			  			
			  			initRouteApp='BorrowStudent';
			  		}
			  	}
		  		if(initRouteApp==''){
			  		let studentStep1 = await AsyncStorage.getItem('@studentStep1');
			  		if(!studentStep1){
			  			initRouteApp='StudentStep1';
			  		}
			  	}
			  	if(initRouteApp==''){
			  		let studentStep2 = await AsyncStorage.getItem('@StudentStep2');
			  		if(!studentStep2){
			  			initRouteApp='StudentStep2';
			  		}
			  	}
			  	if(initRouteApp==''){
			  		let StudentWorkStep3 = await AsyncStorage.getItem('@StudentWorkStep3');
			  		if(!StudentWorkStep3){
			  			initRouteApp='StudentWorkStep3';
			  		}
			  	}
			  	if(initRouteApp==''){
			  		let StudentStep4 = await AsyncStorage.getItem('@StudentStep4');
			  		if(!StudentStep4){
			  			initRouteApp='StudentStep4';
			  		}
			  	}
			  	if(initRouteApp==''){
			  		let StudentStep5 = await AsyncStorage.getItem('@StudentStep5');
			  		console.log('step 5 check route');
			  		if(!StudentStep5){
			  			initRouteApp='StudentWorkStep5';
			  		}
			  	}
			  	if(initRouteApp==''){
			  		let StudentStep6 = await AsyncStorage.getItem('@StudentStep6');
			  		if(!StudentStep6){
			  			initRouteApp='StudentStep6';
			  		}
			  	}
			  	if(initRouteApp==''){
			  		let checkBorrowSuccess = await AsyncStorage.getItem('@checkBorrowSuccess');
			  		if(!checkBorrowSuccess){
			  			initRouteApp='TabbarRoute';
			  		}
			  	}
		  	}

	  	}
	  	if(typeAccount=='nha_dau_tu'){
	  		//Kiểm tra điều khoản
		  	let acceptReadRuleInvestor = await AsyncStorage.getItem('@acceptReadRuleInvestor');
		  	if(!acceptReadRuleInvestor && initRouteApp==''){
		  		initRouteApp='RuleInvestor';
		  	}
		  	if(initRouteApp==''){
		  		let detailInvestor = await AsyncStorage.getItem('@detailInvestor');
		  		if(!detailInvestor){
		  			initRouteApp='DetailInvestor';
		  		}else{
		  			initRouteApp='TabbarRouteInvestor';
		  		}
		  	}
		  	// if(initRouteApp==''){
		  	// 	let detailInvestor = await AsyncStorage.getItem('@detailInvestor');
		  	// 	console.log('aaa'+detailInvestor);
		  	// 	if(!detailInvestor){
		  	// 		initRouteApp='DetailInvestor';
		  	// 	}
		  	// }
	  	}
	  	if(initRouteApp==''){
	  		AsyncStorage.clear();
	  		initRouteApp='Login';
	  	}
	  	//Điều hướng
	  	this.props.navigation.navigate(accountDetail ? initRouteApp : 'Login');
	};

	render() {
		const IMAGE_LOGO='../Assets/Images/Logo.jpg';
		const IMAGE_LOGO2='../Assets/Images/Logo_check_route.png';
		return (
			<View style={styles.container}>
				<View>
					<Image
						style={styles.imageLogo}
						source={require(IMAGE_LOGO2)}
					/>
					<Text></Text>
					<Spinner color='white' />
				</View>
			</View>
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: COLORS.MAIN_COLOR
	},
	imageLogo:{
		width: width/2,
		height: height/4,
		resizeMode: 'center'
	}
});
function mapStateToProps(state) {
	return {
		accessToken: state.accessToken
	}
}
// export default connect(mapStateToProps, {saveToken: saveToken, saveNavigation: saveNavigation, setCart: setCart})(AuthLoadingScreen)
export default connect(mapStateToProps)(CheckRouteScreen);