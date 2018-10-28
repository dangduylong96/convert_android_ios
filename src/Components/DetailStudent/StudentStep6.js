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
import apiPostVideo from '../../Api/apiPostVideo';
// import { saveToken } from '../../redux/ActionCreators';
var { height, width } = Dimensions.get('window');
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
class StudentStep6 extends Component{
	constructor(props){
		super(props);
		this.state={
			sourceVideoUri: '',
			videoDefault: <Image style={styles.imageAdd} source={require('../../Assets/Images/add_image.png')}/>,
			isSubmit: false,
			textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
		}
	}
	saveStudentStep6 = async () => {
        try {
        	let { sourceVideoUri }=this.state;
        	let data={
        		'sourceVideoUri': sourceVideoUri
        	};
            await AsyncStorage.setItem('@StudentStep6', JSON.stringify(data));
            //Get detail user
            let accountDetail=await AsyncStorage.getItem('@accountDetail');
			accountDetail=JSON.parse(accountDetail);
			let nameVideo=this.randomName();
			let bodyData={
				'userId': accountDetail.idUser,
            	'email': accountDetail.emailUser,
            	'accessToken': accountDetail.access_token,
				'sourceVideoUri': sourceVideoUri,
        		'nameVideo': nameVideo
			};
            apiPostVideo(bodyData)
            .then(res=>{
            	this.props.navigation.navigate('CheckRouteScreen');
            })
        } catch (error) {
            alert('Vui lòng cho quyền ứng dụng được lưu trữ');
        }
    }
    uploadVideo(){
    	ImagePicker.showImagePicker(options2, (response) => {
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
			    	videoDefault: <Image style={styles.imageAdd} source={require('../../Assets/Images/check.png')}/>,
			      	sourceVideoUri: response.uri
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
		let { numberAccountBank, nameBank, sourceBeforeBank, sourceVideoUri}=this.state;
		let error=false;
		if(sourceVideoUri==''){
			error=true;
			Toast.show({
	        	text: "Chưa upload video xác nhận!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}
		if(!error){
			this.saveStudentStep6();
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
					<Text style={styles.textHead}>Upload video</Text>
				</View>
				<View style={styles.content}>
				    <ScrollView style={{width: width*95/100}}>
						<Text style={styles.message}>Upload video với nội dung: tôi tên là, sđt, số CMND, hôm nay ngày tháng năm tôi có xác nhận vay với số tiền là ..Tôi đồng ý với những điều khoản của ứng dụng và chịu trách nhiệm về pháp luật (Video tối đa 1 phút). Việc này có thể mất khoảng 3 phút tùy vào dung lượng video của bạn</Text>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Upload video</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadVideo()}>
									{videoDefault}
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

export default connect()(StudentStep6)
