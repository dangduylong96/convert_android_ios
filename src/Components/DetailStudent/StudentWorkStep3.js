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

import apiPostUpdateStep3 from '../../Api/apiPostUpdateStep3';
import { COLORS, INFO_APP } from '../../Const/Const';
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
class StudentWorkStep3 extends Component{
	constructor(props){
		super(props);
		this.state={
			nameCompany: '',
			level: '',
			salaryMonth: '',
			phoneCompany: '',
			sourceHdld:'',
			urlHdld: require('../../Assets/Images/add_image.png'),
			isSubmit: false,
			textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
		}
	}

	saveStudentWorkStep3 = async () => {
		let checkIsRow=await AsyncStorage.getItem('@checkIsRow');
		let { nameCompany, level, sourceHdld, salaryMonth, phoneCompany }=this.state;
		if(checkIsRow=='yes'){
			//Nếu có đăng kí người vay rồi mà chuyển đổi (update thêm các cột của người đi làm)
			let accountDetail=await AsyncStorage.getItem('@accountDetail');
			accountDetail=JSON.parse(accountDetail);
			let bodyData={
				nameCompany: nameCompany,
				level: level,
				salaryMonth: salaryMonth,
				phoneCompany: phoneCompany,
				sourceHdld: sourceHdld,
				mode: 'update-work',
				idUser: accountDetail.idUser,
	            emailUser: accountDetail.emailUser,
	            access_token: accountDetail.access_token
			};
			apiPostUpdateStep3(bodyData)
			.then(res=>{
				this.props.navigation.navigate('CheckRouteScreen');
			})
		}else{
			//Đăng kí lần đầu (chuyển đến step 4)
	        try {
	        	let data={
	        		nameCompany: nameCompany,
					level: level,
					salaryMonth: salaryMonth,
					phoneCompany: phoneCompany,
					sourceHdld: sourceHdld
	        	};
	            await AsyncStorage.setItem('@StudentWorkStep3', JSON.stringify(data));
	            this.props.navigation.navigate('StudentStep4');
	        } catch (error) {
	            alert('Vui lòng cho quyền ứng dụng được lưu trữ');
	        }
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
				let source = { uri: response.uri };
			    this.setState({
			    	['source'+name]: response.uri,
			      	['url'+name]: source
			    });
			}
		});
    }
	submit(){
		this.setState({
			isSubmit: true,
			textBtnLogin: <ActivityIndicator size="small" color="white" />
		})
		let { nameCompany, level, sourceHdld, salaryMonth, phoneCompany }=this.state;
		let error=false;
		if(nameCompany==''){
			error=true;
			Toast.show({
	        	text: "Tên công ty k được bỏ trống!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(level==''){
			error=true;
			Toast.show({
	        	text: "Chức vụ không được bỏ trống!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(salaryMonth==''){
			error=true;
			Toast.show({
	        	text: "Lương không được bỏ trống!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(phoneCompany==''){
			error=true;
			Toast.show({
	        	text: "SĐT công ty không được bỏ trống!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(sourceHdld==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa upload ảnh HĐLĐ!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}
		if(!error){
			this.saveStudentWorkStep3();
		}else{
			this.setState({
				isSubmit: false,
				textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
			})
		}
		
	}
	changePhone(text){
		let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
          	if (numbers.indexOf(text[i]) > -1) {
	       		newText = newText + text[i];
			}
		}
		this.setState({
			phoneCompany: newText
		})
	}
	render(){
		const { nameCompany, level, urlHdld, salaryMonth, phoneCompany, isSubmit, textBtnLogin}=this.state;
		return(
			<View style={styles.container} pointerEvents={isSubmit ? 'none' : 'auto'}>
				<View style={styles.header}>
					<Text style={styles.textHead}>Xác Thực Công Ty</Text>
				</View>
				<View style={styles.content}>
				    <ScrollView>
					<View style={styles.formLogin}>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Tên công ty</Text>
							<TextInput 
			        			value={nameCompany}
			        			style={styles.textIpItemInput}
			        			onChangeText={(nameCompany) => this.setState({nameCompany})} 
			        			placeholder="Tên công ty" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Chức vụ</Text>
							<TextInput 
			        			value={level}
			        			style={styles.textIpItemInput}
			        			onChangeText={(level) => this.setState({level})} 
			        			placeholder="Chức vụ" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Lương một tháng</Text>
							<TextInput 
			        			value={salaryMonth}
			        			style={styles.textIpItemInput}
			        			onChangeText={(salaryMonth) => this.setState({salaryMonth})} 
			        			placeholder="Lương một tháng" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Số điện thoại công ty</Text>
							<TextInput 
			        			value={phoneCompany}
			        			style={styles.textIpItemInput}
			        			// onChangeText={(phoneCompany) => this.setState({phoneCompany})} 
			        			placeholder="Số điện thoại công ty" 
			        			maxLength={11}
			        			keyboardType="number-pad"
			        			onChangeText={(phoneCompany) => this.changePhone(phoneCompany)} 
			        		/>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh hợp đồng lao động</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadImage('Hdld')}>
									<Image
										style={styles.imageAdd}
										source={urlHdld}
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
	}
});

export default connect()(StudentWorkStep3)
