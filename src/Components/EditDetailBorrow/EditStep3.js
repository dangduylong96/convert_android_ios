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
import apiPostDetailStep3 from '../../Api/apiPostDetailStep3';
import { COLORS, INFO_APP } from '../../Const/Const';
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
class EditStep3 extends Component{
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
		let StudentStep3=await AsyncStorage.getItem('@StudentStep3');
		StudentStep3=JSON.parse(StudentStep3);
		this.setState({
            checkRender: false,
            nameSchool: StudentStep3.nameSchool,
			mssv: StudentStep3.mssv,
			urlBeforeCard: {uri: StudentStep3.sourceBeforeCard},
			urlUnderCard: {uri: StudentStep3.sourceUnderCard},
			urlTableScore: {uri: StudentStep3.sourceTableScore},
            idUser: accountDetail.idUser,
            emailUser: accountDetail.emailUser,
            access_token: accountDetail.access_token
        })
	}
	saveEditStep3(){
    	const { nameSchool, mssv, sourceBeforeCard, sourceUnderCard, sourceTableScore, idUser, emailUser, access_token }=this.state;
        //Send to server
        let bodyData={
        	'userId': idUser,
        	'email': emailUser,
        	'accessToken': access_token,
        	//Thông tin nơi học
        	'nameSchool': nameSchool,
    		'mssv': mssv,
    		'sourceBeforeCard': sourceBeforeCard,
    		'sourceUnderCard': sourceUnderCard,
    		'sourceTableScore': sourceTableScore
        }
        apiPostDetailStep3(bodyData)
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
		}
		if(!error){
			this.saveEditStep3();
		}else{
			this.setState({
				isSubmit: false,
				textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
			})
		}
		
	}
	render(){
		const { nameSchool, mssv, urlBeforeCard, urlUnderCard, urlTableScore, isSubmit, textBtnLogin, checkRender}=this.state;
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
	}
});

export default connect()(EditStep3)
