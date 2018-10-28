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
import { Picker, Icon, Button, DatePicker, Toast } from 'native-base';

import { COLORS } from '../../Const/Const';
// import { saveToken } from '../../redux/ActionCreators';
var { height, width } = Dimensions.get('window');
var options = {
		title: 'Upload',
		takePhotoButtonTitle: 'Chụp Ngay',
		chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
		mediaType: 'photo',
		noData: true,

		storageOptions: {
			skipBackup: true,
			path: 'images11'
		}
};
class StudentStep1 extends Component{
	constructor(props){
		super(props);
		this.state={
			name: '',
			gender: 1,
			birthDay: '',
			cmnd: '',
			dayProviderCmnd: '',
			phone: '',
			sourceBeforeCMND: '',
			urlBeforeCMND: require('../../Assets/Images/add_image.png'),
			sourceUnderCMND: '',
			urlUnderCMND: require('../../Assets/Images/add_image.png'),
			sourceWithCMND: '',
			urlWithCMND: require('../../Assets/Images/add_image.png'),
			'editData': true,
			isSubmit: false,
			'textBtnLogin': <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
		}
	}
	saveStudentStep1 = async () => {
        try {
        	let { name, birthDay, gender, cmnd, placeOfCmnd, dayProviderCmnd, phone, sourceBeforeCMND, sourceUnderCMND, sourceWithCMND}=this.state;
        	let data={
        		'name': name,
        		'birthDay': birthDay,
        		'gender': gender,
        		'cmnd': cmnd,
        		'dayProviderCmnd': dayProviderCmnd,
        		'placeOfCmnd': placeOfCmnd,
        		'phone': phone,
        		'sourceBeforeCMND': sourceBeforeCMND,
        		'sourceUnderCMND': sourceUnderCMND,
        		'sourceWithCMND': sourceWithCMND
        	};
            await AsyncStorage.setItem('@studentStep1', JSON.stringify(data));
            this.props.navigation.navigate('StudentStep2');
        } catch (error) {
            alert('Vui lòng cho quyền ứng dụng được lưu trữ');
        }
    }
    uploadImageBeforeCMND(){
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
			    	sourceBeforeCMND: response.uri,
			      	urlBeforeCMND: source
			    });
			}
		});
    }
    uploadImageUnderCMND(){
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
			    	sourceUnderCMND: response.uri,
			      	urlUnderCMND: source
			    });
			}
		});
    }
    uploadImageWithCMND(){
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
			    	sourceWithCMND: response.uri,
			      	urlWithCMND: source
			    });
			}
		});
    }
	submit(){
		this.setState({
			isSubmit: true,
			textBtnLogin: <ActivityIndicator size="small" color="white" />
		})
		let { name, birthDay, cmnd, placeOfCmnd, dayProviderCmnd, phone, sourceBeforeCMND, sourceUnderCMND, sourceWithCMND, editData, textBtnLogin}=this.state;
		let error=false;
		if(name==''){
			error=true;
			Toast.show({
	        	text: "Tên k được bỏ trống!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(birthDay==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa chọn ngày sinh!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(cmnd==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa nhập số CMND!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(dayProviderCmnd==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa chọn ngày cấp CMND!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(placeOfCmnd==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa nhập nơi cấp CMND!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(phone==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa nhập SĐT!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(sourceBeforeCMND==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa upload mặt trước CMND!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(sourceUnderCMND==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa upload mặt sau CMND!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(sourceWithCMND==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa upload hình chụp cùng CMND",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}
		if(!error){
			this.saveStudentStep1();
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
			phone: newText
		})
	}
	changeCMND(text){
		let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
          	if (numbers.indexOf(text[i]) > -1) {
	       		newText = newText + text[i];
			}
		}
		this.setState({
			cmnd: newText
		})
	}
	setDateTime(day,name){
		let dayFormat=new Date(day);
		dayFormat=dayFormat.getFullYear()+'-'+(dayFormat.getMonth() + 1) + '-' + dayFormat.getDate();
		this.setState({
			[name]: dayFormat
		})
	}
	render(){
		const { name, gender, birthDay, cmnd, placeOfCmnd, dayProviderCmnd, phone, urlBeforeCMND, urlUnderCMND, urlWithCMND, colorMessage, colorBgEmail, colorBgPass, editData, isSubmit, textBtnLogin}=this.state;
		return(
			<View style={styles.container} pointerEvents={isSubmit ? 'none' : 'auto'}>
				<View style={styles.header}>
					<Text style={styles.textHead}>Thông tin cơ bản</Text>
				</View>
				<View style={styles.content}>
				    <ScrollView>
					<View style={styles.formLogin}>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Họ và tên</Text>
							<TextInput 
			        			editable={editData}
			        			value={name}
			        			style={styles.textIpItemInput}
			        			onChangeText={(name) => this.setState({name})} 
			        			placeholder="Họ và tên" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Giới tính</Text>
							<View style={styles.pickerInput}>
				             	<Picker
					                mode="dialog"
					                iosIcon={<Icon name="ios-arrow-down-outline" />}
					                placeholder="Chọn giới tính"
					                selectedValue={gender}
					                style={styles.pickerInputSub}
					                onValueChange={(gender)=>this.setState({gender})}
				              	>
					                <Picker.Item label="Nam" value="1" />
					                <Picker.Item label="Nữ" value="0" />
				            	</Picker>
				            </View>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Ngày sinh</Text>
							<View style={styles.pickerInput}>
								<DatePicker
						            defaultDate={new Date(1996, 1, 1)}
						            maximumDate={new Date(2000, 1, 1)}
						            locale={"vn"}
						            timeZoneOffsetInMinutes={undefined}
						            modalTransparent={false}
						            animationType={"fade"}
						            style={styles.pickerInputSub}
						            androidMode={"default"}
						            placeHolderText="Ngày sinh"
						            placeHolderTextStyle={{ color: "#d3d3d3" }}
						            // onDateChange={(birthDay)=>this.setState({birthDay})}
						            onDateChange={(birthDay)=>this.setDateTime(birthDay,'birthDay')}
						        />
					        </View>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Số CMND</Text>
							<TextInput 
			        			editable={editData}
			        			value={cmnd}
			        			keyboardType="number-pad"
			        			style={styles.textIpItemInput}
			        			onChangeText={(cmnd) => this.changeCMND(cmnd)} 
			        			placeholder="Số Chứng Minh Nhân Dân" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Ngày cấp CMND</Text>
							<View style={styles.pickerInput}>
								<DatePicker
						            defaultDate={new Date(2010, 1, 1)}
						            locale={"vn"}
						            timeZoneOffsetInMinutes={undefined}
						            modalTransparent={false}
						            animationType={"fade"}
						            style={styles.pickerInputSub}
						            androidMode={"default"}
						            placeHolderText="Ngày Cấp Chứng Minh"
						            placeHolderTextStyle={{ color: "#d3d3d3" }}
						            onDateChange={(dayProviderCmnd)=>this.setDateTime(dayProviderCmnd,'dayProviderCmnd')}
						        />
					        </View>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Nơi cấp CMND</Text>
							<TextInput 
			        			editable={editData}
			        			value={placeOfCmnd}
			        			style={styles.textIpItemInput}
			        			onChangeText={(placeOfCmnd) => this.setState({placeOfCmnd})} 
			        			placeholder="Nơi cấp" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Số điện thoại</Text>
							<TextInput 
			        			editable={editData}
			        			value={phone}
			        			style={styles.textIpItemInput}
			        			maxLength={11}
			        			keyboardType="number-pad"
			        			onChangeText={(phone) => this.changePhone(phone)} 
			        			placeholder="Số Điện Thoại" 
			        		/>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh mặt trước CMND</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadImageBeforeCMND()}>
									<Image
										style={styles.imageAdd}
										source={urlBeforeCMND}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh mặt sau CMND</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadImageUnderCMND()}>
									<Image
										style={styles.imageAdd}
										source={urlUnderCMND}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh chụp cùng CMND</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadImageWithCMND()}>
									<Image
										style={styles.imageAdd}
										source={urlWithCMND}
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

export default connect()(StudentStep1)
