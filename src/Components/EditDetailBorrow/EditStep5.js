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

import apiGetDataBorrow from '../../Api/apiGetDataBorrow';
import apiPostDetailStep5 from '../../Api/apiPostDetailStep5';
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
class EditStep5 extends Component{
	constructor(props){
		super(props);
		this.state={
			numberAccountBank: '',
			nameBank: '',
			sourceBeforeBank:'',
			urlBeforeBank: require('../../Assets/Images/add_image.png'),
			sourceVideoUri: '',
			videoDefault: <Image style={styles.imageAdd} source={require('../../Assets/Images/add_image.png')}/>,
			isSubmit: false,
			textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>,
			checkRender: true,
			idUser: '',
			emailUser: '',
			access_token: ''
		}
	}
	componentDidMount=async () =>{
		//Get detail
		let accountDetail=await AsyncStorage.getItem('@accountDetail');
		accountDetail=JSON.parse(accountDetail);
		//Lấy thông tin step 1
		let StudentStep5=await AsyncStorage.getItem('@StudentStep5');
		StudentStep5=JSON.parse(StudentStep5);
		this.setState({
            checkRender: false,
            numberAccountBank: StudentStep5.numberAccountBank,
			nameBank: StudentStep5.nameBank,
			urlBeforeBank: {uri: StudentStep5.sourceBeforeBank},
            idUser: accountDetail.idUser,
            emailUser: accountDetail.emailUser,
            access_token: accountDetail.access_token
        })
	}
	saveEditStep5 = async () => {
		const { numberAccountBank, nameBank, sourceBeforeBank, idUser, emailUser, access_token }=this.state;
        //Send to server
        let bodyData={
        	'userId': idUser,
        	'email': emailUser,
        	'accessToken': access_token,
        	//Thông tin chuyển khoản
        	'numberAccountBank': numberAccountBank,
    		'nameBank': nameBank,
    		'sourceBeforeBank': sourceBeforeBank
        }
        apiPostDetailStep5(bodyData)
        .then(()=>{
        	apiGetDataBorrow();
        })
        .then(()=>{
        	Toast.show({
	        	text: "Upload thành công",
	        	buttonText: "Okay",
	        	type: "success",
	        	duration: 3000
      		})
      		this.setState({
				isSubmit: false,
				textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
			})
        })
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
		this.setState({
			isSubmit: true,
			textBtnLogin: <ActivityIndicator size="small" color="white" />
		})
		let { numberAccountBank, nameBank, sourceBeforeBank, sourceVideoUri}=this.state;
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
		}
		if(!error){
			this.saveEditStep5();
		}else{
			this.setState({
				isSubmit: false,
				textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
			})
		}
	}
	render(){
		const { numberAccountBank, nameBank, urlBeforeBank, videoDefault, isSubmit, textBtnLogin, checkRender }=this.state;
		if(checkRender){
            return(
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerBack}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate({ routeName: 'Application' })}>
                                <Icon type='FontAwesome' name='chevron-left' style={{fontSize:20,color:'white',marginLeft: 10}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerTitle}>
                            <Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
                        </View>
                        <View style={{flex:1}}></View>
                    </View>
                    <View style={styles.content}>
                        <ActivityIndicator size="small" color="blue" />
                    </View>
                </View>
            )
        }
		return(
			<View style={styles.container} pointerEvents={isSubmit ? 'none' : 'auto'}>
				<View style={styles.header}>
                        <View style={styles.headerBack}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate({ routeName: 'Application' })}>
                                <Icon type='FontAwesome' name='chevron-left' style={{fontSize:20,color:'white',marginLeft: 10}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerTitle}>
                            <Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
                        </View>
                        <View style={{flex:1}}></View>
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
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
    headerBack:{
        flex:1,
        height: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    headerTitle:{
        flex:1,
        height: '100%',
        justifyContent: 'center',
        alignItems:'center'
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

export default connect()(EditStep5)
