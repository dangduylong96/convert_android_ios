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
class StudentStep3 extends Component{
	constructor(props){
		super(props);
		this.state={
			nameSchool: '',
			mssv: '',
			sourceBeforeCard:'',
			urlBeforeCard: require('../../Assets/Images/add_image.png'),
			sourceUnderCard: '',
			urlUnderCard: require('../../Assets/Images/add_image.png'),
			sourceTableScore: '',
			urlTableScore: require('../../Assets/Images/add_image.png'),
			isSubmit: false,
			textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
		}
	}
	saveStudentStep3 = async () => {
        try {
        	let { nameSchool, mssv, sourceBeforeCard, sourceUnderCard, sourceTableScore}=this.state;
        	let data={
        		'nameSchool': nameSchool,
        		'mssv': mssv,
        		'sourceBeforeCard': sourceBeforeCard,
        		'sourceUnderCard': sourceUnderCard,
        		'sourceTableScore': sourceTableScore
        	};
            await AsyncStorage.setItem('@StudentStep3', JSON.stringify(data));
            this.props.navigation.navigate('CheckRouteScreen');
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
		let { nameSchool, mssv, sourceBeforeCard, sourceUnderCard, sourceTableScore}=this.state;
		let error=false;
		if(nameSchool==''){
			error=true;
			Toast.show({
	        	text: "Tên trường k được bỏ trống!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(mssv==''){
			error=true;
			Toast.show({
	        	text: "Mã số sinh viên k được bỏ trống!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(sourceBeforeCard==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa upload mặt trước thẻ SV!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(sourceUnderCard==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa upload mặt sau thẻ SV!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(sourceTableScore==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa upload bảng điểm",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}
		if(!error){
			this.saveStudentStep3();
		}else{
			this.setState({
				isSubmit: false,
				textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
			})
		}
		
	}
	render(){
		const { nameSchool, mssv, urlBeforeCard, urlUnderCard, urlTableScore, isSubmit, textBtnLogin}=this.state;
		return(
			<View style={styles.container} pointerEvents={isSubmit ? 'none' : 'auto'}>
				<View style={styles.header}>
					<Text style={styles.textHead}>Xác Thực Sinh Viên</Text>
				</View>
				<View style={styles.content}>
				    <ScrollView>
					<View style={styles.formLogin}>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Sinh viên trường</Text>
							<TextInput 
			        			value={nameSchool}
			        			style={styles.textIpItemInput}
			        			onChangeText={(nameSchool) => this.setState({nameSchool})} 
			        			placeholder="Tên trường đang theo học" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Mã số sinh viên</Text>
							<TextInput 
			        			value={mssv}
			        			style={styles.textIpItemInput}
			        			onChangeText={(mssv) => this.setState({mssv})} 
			        			placeholder="Mã số sinh viên" 
			        		/>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh mặt trước thẻ sinh viên</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadImage('BeforeCard')}>
									<Image
										style={styles.imageAdd}
										source={urlBeforeCard}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh mặt sau thẻ sinh viên</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadImage('UnderCard')}>
									<Image
										style={styles.imageAdd}
										source={urlUnderCard}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh bảng điểm gần nhất</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadImage('TableScore')}>
									<Image
										style={styles.imageAdd}
										source={urlTableScore}
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

export default connect()(StudentStep3)
