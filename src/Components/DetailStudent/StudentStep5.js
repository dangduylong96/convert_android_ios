import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	TextInput,
	ActivityIndicator,
	AsyncStorage,
	TouchableOpacity,
	ScrollView
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import { Picker, Item, Icon, Button, DatePicker, Toast } from 'native-base';

import { COLORS, INFO_APP } from '../../Const/Const';
import apiPostProfile from '../../Api/apiPostProfile';
// import { saveToken } from '../../redux/ActionCreators';
var { height, width } = Dimensions.get('window');
var options = {
		title: 'Upload',
		takePhotoButtonTitle: 'Chụp Ngay',
		chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
		mediaType: 'photo',

		storageOptions: {
			skipBackup: true,
			path: 'images'
		}
};
var options2 = {
		title: 'Upload',
		takePhotoButtonTitle: 'Quay ngay',
		chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
		mediaType: 'video',
		videoQuality: 'high',
		durationLimit: 60,

		storageOptions: {
			skipBackup: true,
			path: 'videos'
		}
};
class StudentStep5 extends Component{
	constructor(props){
		super(props);
		this.state={
			numberAccountBank: '',
			nameBank: '',
			sourceBeforeBank:'',
			urlBeforeBank: require('../../Assets/Images/add_image.png'),
			isSubmit: false,
			textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
		}
	}
	saveStudentStep5 = async () => {
        try {
        	let { numberAccountBank, nameBank, sourceBeforeBank}=this.state;
        	let data={
        		'numberAccountBank': numberAccountBank,
        		'nameBank': nameBank,
        		'sourceBeforeBank': sourceBeforeBank
        	};
            await AsyncStorage.setItem('@StudentStep5', JSON.stringify(data));
            //Get detail user
            let accountDetail=await AsyncStorage.getItem('@accountDetail');
			accountDetail=JSON.parse(accountDetail);
            //lấy loại tài khoản (giá trị là nguoi_vay hoặc nha_dau_tu)
            let typeAccount=await AsyncStorage.getItem('@typeAccount');
            //Lây loại tài khoản vay(giá trị là sinh-vien hoặc nguoi-di-lam)
            let studentOrWork=await AsyncStorage.getItem('@studentOrWork');
            //Lấy gói vay
            let idParkageBorrow = await AsyncStorage.getItem('@idParkageBorrow');
            //Lấy thông tin cơ bản người dùng
            let studentStep1 = await AsyncStorage.getItem('@studentStep1');
            studentStep1=JSON.parse(studentStep1);
            //Xác thực về nơi ở
            let StudentStep2 = await AsyncStorage.getItem('@StudentStep2');
            StudentStep2=JSON.parse(StudentStep2);
            //Thông tin sinh viên hoặc người đi làm
        	let StudentStep3 = await AsyncStorage.getItem('@StudentStep3');
        	StudentStep3=JSON.parse(StudentStep3);

            //Lấy thông tin người thân
            let StudentStep4 = await AsyncStorage.getItem('@StudentStep4');
            StudentStep4=JSON.parse(StudentStep4);
            //Lấy thông tin chuyển khoản
            let StudentStep5 = await AsyncStorage.getItem('@StudentStep5');
            StudentStep5=JSON.parse(StudentStep5);
            //Lấy danh bạ 
            let listContact = await AsyncStorage.getItem('@listContact');
            // listContact=JSON.parse(listContact);
            //Lấy vị trí
            let latitude=await AsyncStorage.getItem('@latitude');
            let longitude=await AsyncStorage.getItem('@longitude');

            let bodyData={
            	'userId': accountDetail.idUser,
            	'email': accountDetail.emailUser,
            	'accessToken': accountDetail.access_token,
            	//Danh bạ
            	'listContact': listContact,
            	//Lấy vị trí
            	'latitude': latitude,
            	'longitude': longitude,
            	//Loại tài khoản
            	'typeAccount': typeAccount,
            	//Loại tk vay
            	'studentOrWork': studentOrWork,
            	//Lấy gói vay (dạng id gói vay)
            	'idParkageBorrow': idParkageBorrow,
            	//Thông tin cơ bản người dùng
            	'nameUser': studentStep1.name,
            	'gender': studentStep1.gender,
            	'birthDay': studentStep1.birthDay,
            	'cmnd': studentStep1.cmnd,
            	'dayProviderCmnd': studentStep1.dayProviderCmnd,
            	'placeOfCmnd': studentStep1.placeOfCmnd,
            	'phone': studentStep1.phone,
            	'sourceBeforeCMND': studentStep1.sourceBeforeCMND,
            	'sourceUnderCMND': studentStep1.sourceUnderCMND,
            	'sourceWithCMND': studentStep1.sourceWithCMND,
            	//Thông tin nơi ở
            	'address': StudentStep2.address,
        		'typeHome': StudentStep2.typeHome,
        		'sourceBook_1': StudentStep2.sourceBook_1,
        		'sourceBook_2': StudentStep2.sourceBook_2,
        		'sourceBook_3': StudentStep2.sourceBook_3,
        		'sourceBook_4': StudentStep2.sourceBook_4,
        		'sourceBook_5': StudentStep2.sourceBook_5,
        		'sourceBook_6': StudentStep2.sourceBook_6,
        		'sourceBook_7': StudentStep2.sourceBook_7,
        		//Thông tin nơi học
        		'nameSchool': StudentStep3.nameSchool,
        		'mssv': StudentStep3.mssv,
        		'sourceBeforeCard': StudentStep3.sourceBeforeCard,
        		'sourceUnderCard': StudentStep3.sourceUnderCard,
        		'sourceTableScore': StudentStep3.sourceTableScore,
        		//Thông tin người thân
        		'name1': StudentStep4.name1,
        		'relationship_1': StudentStep4.relationship_1,
        		'phone_1': StudentStep4.phone_1,
        		'name2': StudentStep4.name2,
        		'relationship_2': StudentStep4.relationship_2,
        		'phone_2': StudentStep4.phone_2,
        		//Thông tin chuyển khoản
        		'numberAccountBank': StudentStep5.numberAccountBank,
        		'nameBank': StudentStep5.nameBank,
        		'sourceBeforeBank': StudentStep5.sourceBeforeBank
            }
            await AsyncStorage.removeItem('@StudentStep5');
            apiPostProfile(bodyData)
            .then(res=>{
            	// console.log(res);
            	// if(res.status=='success'){
            	// 	this.props.navigation.navigate('CheckRouteScreen');
            	// }else{
            	// 	this.props.navigation.navigate('CheckRouteScreen');
            	// }
            	this.props.navigation.navigate('CheckRouteScreen');
            })
        } catch (error) {
            alert('Vui lòng cho quyền ứng dụng được lưu trữ');
        }
    }
    uploadImage(name){
    	ImagePicker.showImagePicker(options, (response) => {
			if (response.didCancel) {
			    console.log('User cancelled image picker');
			}
			 else if (response.error) {
			    console.log('ImagePicker Error: ', response.error);
			}
			else if (response.customButton) {
			    console.log('User tapped custom button: ', response.customButton);
			 }
			else {
				console.log(response);
				let source = { uri: response.uri };
			    this.setState({
			    	['source'+name]: response.uri,
			      	['url'+name]: source
			    });
			}
		});
    }
    randomName() {
	  	var text = "";
	  	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  	for (var i = 0; i < 20; i++){
	    	text += possible.charAt(Math.floor(Math.random() * possible.length));
	  	}
	  	return text;
	}
	submit(){
		Toast.show({
        	text: "Vui lòng chờ trong giây lát",
        	buttonText: "Okay",
        	type: "success",
        	duration: 3000
  		})
		this.setState({
			isSubmit: true,
			textBtnLogin: <ActivityIndicator size="small" color="white" />
		})
		let { numberAccountBank, nameBank, sourceBeforeBank }=this.state;
		let error=false;
		if(numberAccountBank==''){
			error=true;
			Toast.show({
	        	text: "Chưa nhập số tk ngân hàng!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(nameBank==''){
			error=true;
			Toast.show({
	        	text: "Chưa nhập tên ngân hàng!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(sourceBeforeBank==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa upload mặt trước thẻ ngân hàng!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}
		if(!error){
			this.saveStudentStep5();
		}else{
			this.setState({
				isSubmit: false,
				textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
			})
		}
	}
	render(){
		const { numberAccountBank, nameBank, urlBeforeBank, videoDefault, isSubmit, textBtnLogin}=this.state;
		return(
			<View style={styles.container} pointerEvents={isSubmit ? 'none' : 'auto'}>
				<View style={styles.header}>
					<Text style={styles.textHead}>Thông tin Chuyển khoản</Text>
				</View>
				<View style={styles.content}>
				    <ScrollView>
				    <Text style={styles.message}>Chỉ sử dụng tài khoản chính chủ</Text>
					<View style={styles.formLogin}>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Số tài khoản ngân hàng</Text>
							<TextInput 
			        			value={numberAccountBank}
			        			style={styles.textIpItemInput}
			        			keyboardType="number-pad"
			        			onChangeText={(numberAccountBank) => this.setState({numberAccountBank})} 
			        			placeholder="Số tài khoản ngân hàng" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Tên ngân hàng</Text>
							<TextInput 
			        			value={nameBank}
			        			style={styles.textIpItemInput}
			        			onChangeText={(nameBank) => this.setState({nameBank})} 
			        			placeholder="Tên ngân hàng" 
			        		/>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh mặt trước thẻ ngân hàng</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadImage('BeforeBank')}>
									<Image
										style={styles.imageAdd}
										source={urlBeforeBank}
									/>
								</TouchableOpacity>
							</View>
						</View>
						
						<View style={styles.submit}>
				        	<TouchableOpacity onPress={()=>this.submit()}>
					        	<Button onPress={()=>this.submit()} rounded style={styles.btnLogin}>
						            {textBtnLogin}
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
		backgroundColor: 'white',
		width: '100%',
		alignItems: 'center'
	},
	textHead: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	},
	formLogin:{
		flex: 1,
		width: width*95/100
	},
	itemInput:{
		flex: 1,
		height: height/10,
		marginTop: 10
	},
	itemInputImage:{
		flex: 1,
		height: height/5,
		marginTop: 10
	},
	textLabel:{
		flex:1,
		fontWeight: 'bold',
		color: COLORS.COLOR_TEXT_BG_WHITE
	},
	textIpItemInput:{
		flex: 1,
		borderWidth: 1,
		borderColor: 'black',
		borderColor: COLORS.MAIN_COLOR,
	},
	pickerInput:{
		flex: 1,
		borderWidth: 1,
		borderColor: COLORS.MAIN_COLOR,
	},
	pickerInputSub:{
		flex: 1,
		borderTopWidth: 0,
		borderBottomWidth: 0
	},
	submit:{
		flex: 1,
		height: height/10,
		marginTop: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	btnLogin:{
		flex: 1,
		width:width*3/4,
		alignItems: 'center',
		justifyContent:'center',
		backgroundColor: COLORS.MAIN_COLOR,
	},
	viewWrapImage:{
		flex:3,
		borderWidth: 1,
		justifyContent:'center',
		alignItems: 'center',
		borderColor: COLORS.MAIN_COLOR
	},
	imageAdd:{
		width: width/3,
		height: '100%',
		resizeMode: 'center'
	},
	message:{
		marginTop: 10,
		fontWeight: 'bold',
		fontSize: 18
	}
});

export default connect()(StudentStep5)
