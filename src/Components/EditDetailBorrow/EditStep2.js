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

import apiPostDetailStep2 from '../../Api/apiPostDetailStep2';
import apiGetDataBorrow from '../../Api/apiGetDataBorrow';
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
class EditStep2 extends Component{
	constructor(props){
		super(props);
		this.state={
			address: '',
			typeHome: 'nha-tro',
			sourceBook_1: '',
			urlBook_1: require('../../Assets/Images/add_image.png'),
			sourceBook_2: '',
			urlBook_2: require('../../Assets/Images/add_image.png'),
			sourceBook_3: '',
			urlBook_3: require('../../Assets/Images/add_image.png'),
			sourceBook_4: '',
			urlBook_4: require('../../Assets/Images/add_image.png'),
			sourceBook_5: '',
			urlBook_5: require('../../Assets/Images/add_image.png'),
			sourceBook_6: '',
			urlBook_6: require('../../Assets/Images/add_image.png'),
			sourceBook_7: '',
			urlBook_7: require('../../Assets/Images/add_image.png'),
			isSubmit: false,
			countImage: 0,
			arrayCheck: [],
			'textBtnLogin': <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>,
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
		let studentStep2=await AsyncStorage.getItem('@StudentStep2');
		studentStep2=JSON.parse(studentStep2);
		this.setState({
            checkRender: false,
            address: studentStep2.address,
            typeHome: studentStep2.typeHome,
            urlBook_1: {uri: studentStep2.sourceBook_1},
            urlBook_2: {uri: studentStep2.sourceBook_2},
            urlBook_3: {uri: studentStep2.sourceBook_3},
            urlBook_4: {uri: studentStep2.sourceBook_4},
            urlBook_5: {uri: studentStep2.sourceBook_5},
            urlBook_6: {uri: studentStep2.sourceBook_6},
            urlBook_7: {uri: studentStep2.sourceBook_7},
            idUser: accountDetail.idUser,
            emailUser: accountDetail.emailUser,
            access_token: accountDetail.access_token
        })
	}
	saveEditStep2(){
		const { address, typeHome, sourceBook_1, sourceBook_2, sourceBook_3, sourceBook_4, sourceBook_5, sourceBook_6, sourceBook_7, checkRender, idUser, emailUser, access_token  }=this.state;
         let bodyData={
        	'userId': idUser,
        	'email': emailUser,
        	'accessToken': access_token,
        	//Thông tin nơi ở
        	'address': address,
    		'typeHome': typeHome,
    		'sourceBook_1': sourceBook_1,
    		'sourceBook_2': sourceBook_2,
    		'sourceBook_3': sourceBook_3,
    		'sourceBook_4': sourceBook_4,
    		'sourceBook_5': sourceBook_5,
    		'sourceBook_6': sourceBook_6,
    		'sourceBook_7': sourceBook_7
        }
        console.log(bodyData);
        apiPostDetailStep2(bodyData)
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
    registionBook(id){
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
			      	['urlBook_'+id]: source,
			      	['sourceBook_'+id]: response.uri
			    });
			    let arrayCheck=this.state.arrayCheck;
			    if(!arrayCheck.includes(id)){
			    	arrayCheck.push(id);
			    	this.setState({
			    		arrayCheck: arrayCheck,
				    	countImage: this.state.countImage+1
				    });
			    }
			}
		});
    }

	submit(){
		this.setState({
			isSubmit: true,
			textBtnLogin: <ActivityIndicator size="small" color="white" />
		})
		let { address, countImage}=this.state;
		let error=false;
		if(address==''){
			error=true;
			Toast.show({
	        	text: "Địa chỉ không được bỏ trống!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}
		if(!error){
			this.saveEditStep2();
		}else{
			this.setState({
				isSubmit: false,
				textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
			})
		}
		
	}
	render(){
		const { address, typeHome, isSubmit, textBtnLogin, sourceBook_1, urlBook_1, sourceBook_2, urlBook_2, sourceBook_3, urlBook_3, sourceBook_4, urlBook_4, sourceBook_5, urlBook_5, sourceBook_6, urlBook_6, sourceBook_7, urlBook_7, checkRender, numberTypeHome }=this.state;
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
							<Text style={styles.textLabel}>Địa chỉ hiện tại</Text>
							<TextInput 
			        			value={address}
			        			style={styles.textIpItemInput}
			        			onChangeText={(address) => this.setState({address})} 
			        			placeholder="Địa chỉ hiện tại của bạn" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Dạng nhà ở</Text>
							<View style={styles.pickerInput}>
				             	<Picker
					                mode="dropdown"
					                iosIcon={<Icon name="ios-arrow-down-outline" />}
					                placeholder="Chọn giới tính"
					                selectedValue={typeHome}
					                style={styles.pickerInputSub}
					                onValueChange={(typeHome)=>this.setState({typeHome})}
				              	>
					                <Picker.Item label="Nhà trọ" value="nha-tro" />
					                <Picker.Item label="Nhà người thân" value="nha-nguoi-than" />
					                <Picker.Item label="Nhà riêng" value="nha-rieng" />
				            	</Picker>
				            </View>
						</View>
						<Text style={styles.message}>Vui Lòng Upload ít nhất 3 ảnh trong sổ hộ khẩu của bạn (Tối thiểu 3 ảnh và tối đa 7 ảnh)</Text>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh 1</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.registionBook(1)}>
									<Image
										style={styles.imageAdd}
										source={urlBook_1}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh 2</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.registionBook(2)}>
									<Image
										style={styles.imageAdd}
										source={urlBook_2}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh 3</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.registionBook(3)}>
									<Image
										style={styles.imageAdd}
										source={urlBook_3}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh 4</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.registionBook(4)}>
									<Image
										style={styles.imageAdd}
										source={urlBook_4}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh 5</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.registionBook(5)}>
									<Image
										style={styles.imageAdd}
										source={urlBook_5}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh 6</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.registionBook(6)}>
									<Image
										style={styles.imageAdd}
										source={urlBook_6}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh 7</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.registionBook(7)}>
									<Image
										style={styles.imageAdd}
										source={urlBook_7}
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
		flexDirection: 'row'
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
	message:{
		marginTop: 10,
		fontWeight: 'bold',
		fontSize: 18
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

export default connect()(EditStep2)
