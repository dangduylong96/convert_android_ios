import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	ActivityIndicator,
	AsyncStorage,
	TouchableOpacity,
	ScrollView,
	PermissionsAndroid,
	Platform
} from 'react-native';
import Slider from "react-native-slider";
import { connect } from 'react-redux';
import { Icon, Button, Toast } from 'native-base';
import ImagePicker from 'react-native-image-picker';

import { COLORS } from '../../Const/Const';
import apiGetDetailBorrow from '../../Api/apiGetDetailBorrow';
import apiPostNewBorrow from '../../Api/apiPostNewBorrow';
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
class AddNewBorrow extends Component{
	constructor(props){
		super(props);
		this.state={
			valueMoney: 0,
			textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Xác nhận vay</Text>,
			maxSlideMoney: 0,
			minSlideMoney: 0,
			valueSlideMoney: 0,
			step: 1,
			maxSlideDay: 0,
			minSlideDay: 0,
			valueSlideDay:0,
			valueDay: 0,
			money_real: 0,
			rate:0,
			idBorrowValue:0,
			isSendData: false,
			checkRender: true,
			sourceWithCMND: '',
			urlWithCMND: require('../../Assets/Images/add_image.png'),
			sourceVideoUri: '',
			videoDefault: <Image style={styles.imageAdd} source={require('../../Assets/Images/add_image.png')}/>
		}
	}
	componentDidMount=async () =>{
		// let mode='sinh-vien';
		let accountDetail=await AsyncStorage.getItem('@accountDetail');
		let mode=await AsyncStorage.getItem('@studentOrWork');
		console.log(mode);
		accountDetail=JSON.parse(accountDetail);
		apiGetDetailBorrow(accountDetail.idUser,accountDetail.emailUser,accountDetail.access_token,mode)
		.then(data=>{
			let count=data.count;
			this.setState({
				dataRes: data,
				minSlideMoney: 0,
				maxSlideMoney: count,
				valueMoney: data['GT_0']['nameMoney'],
				valueDay: data['GT_0']['value_0']['day'],
				maxSlideDay: data['GT_0']['count'],
				money_real: data['GT_0']['value_0']['money_real'],
				rate: data['GT_0']['value_0']['rate'],
				idBorrowValue: data['GT_0']['value_0']['id'],
				checkRender: false
			})
		})
	}
	sendNewParkage= async (idBorrowValue) => {
		const { sourceWithCMND, sourceVideoUri }=this.state;
		let nameVideo=this.randomName();
		//Get detail user
        let accountDetail=await AsyncStorage.getItem('@accountDetail');
		accountDetail=JSON.parse(accountDetail);
		let latitude=await AsyncStorage.getItem('@latitude');
        let longitude=await AsyncStorage.getItem('@longitude');
        let bodyData={
        	'userId': accountDetail.idUser,
        	'email': accountDetail.emailUser,
        	'accessToken': accountDetail.access_token,
        	//Lấy vị trí
        	'latitude': latitude,
        	'longitude': longitude,
        	//Lấy gói vay (dạng id gói vay)
        	'idParkageBorrow': idBorrowValue,
        	'sourceWithCMND': sourceWithCMND,
    		'sourceVideoUri': sourceVideoUri,
    		'nameVideo': nameVideo
        }
        apiPostNewBorrow(bodyData)
        .then(res=>{
        	Toast.show({
	        	text: "Thêm khoản vay thành công!",
	        	buttonText: "Okay",
	        	type: "success",
	        	duration: 3000
      		})
      		this.props.navigation.navigate('CheckRouteScreen');
        })
        .catch(error=>{
        	alert('Có lỗi xảy ra. vui lòng thử lại sau');
        })
    }
	chooseParkage(idBorrowValue){
		this.setState({
			textbtnText: <ActivityIndicator size="small" color="white" />,
			isSendData: true
		})
		let { sourceWithCMND, sourceVideoUri }=this.state;
		let error=false;
		if(sourceWithCMND==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa upload hình chụp cùng CMND!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 3000
      		})
		}else if(sourceVideoUri==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa upload video xác nhận vay!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 3000
      		})
		}
		if(!error){
			// this.sendNewParkage(idBorrowValue);
			this.getGeo(idBorrowValue);
		}else{
			this.setState({
				isSendData: false,
				textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Xác nhận vay</Text>
			})
		}
		// this.saveParkage(idBorrowValue);
	}
	changeMoney(value){
		let { dataRes }=this.state;
		let valueMoney=dataRes['GT_'+value]['nameMoney'];
		this.setState({
			valueMoney: valueMoney,
			valueSlideMoney: value,
			//Setting default thanh ngày
			valueDay: dataRes['GT_'+value]['value_0']['day'],
			money_real: dataRes['GT_'+value]['value_0']['money_real'],
			rate: dataRes['GT_'+value]['value_0']['rate'],
			idBorrowValue: dataRes['GT_'+value]['value_0']['id'],
			valueSlideDay: 0
		})
	}
	changeDay(value){
		let { dataRes, valueSlideMoney }=this.state;
		let valueDay=dataRes['GT_'+valueSlideMoney]['value_'+value]['day'];
		this.setState({
			valueDay: valueDay,
			valueSlideDay: value,
			money_real: dataRes['GT_'+valueSlideMoney]['value_'+value]['money_real'],
			rate: dataRes['GT_'+valueSlideMoney]['value_'+value]['rate'],
			idBorrowValue: dataRes['GT_'+valueSlideMoney]['value_'+value]['id'],
		})
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
    randomName() {
	  	var text = "";
	  	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	  	for (var i = 0; i < 20; i++){
	    	text += possible.charAt(Math.floor(Math.random() * possible.length));
	  	}
	  	return text;
	}
	getGeo= async (idBorrowValue) =>{
		if (Platform.OS == 'android') {
			PermissionsAndroid.request(
		        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
		        {
		            'title': 'Thông báo',
		            'message': 'ứng dụng cần được cấp quyền truy cập'
		        }
			    )
			    .then(granted => {
			        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
			          	navigator.geolocation.getCurrentPosition(
				      	(position) => {
				      		let latitude=position.coords.latitude;
				      		let longitude=position.coords.longitude;
					        AsyncStorage.setItem('@latitude', latitude.toString());
					        AsyncStorage.setItem('@longitude', longitude.toString());
					        this.sendNewParkage(idBorrowValue);
					     },
				      	(error) => {
				      		alert('Vui lòng bật định vị trên điện thoại bạn');
				      		console.log(error);
				      	},
				      	{enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
			    	);
			        }
			        else {
			     		// this.faileCheckPermission();
			            alert('ứng dụng cần được cấp quyền truy cập');
						// this.props.navigation.navigate('CheckRouteScreen');
			        }
			    })
			    .catch(err => {
			    	// this.faileCheckPermission();
			        alert('ứng dụng cần được cấp quyền truy cập');
			        // this.props.navigation.navigate('CheckRouteScreen');
			    }
			)
		}else{
			navigator.geolocation.getCurrentPosition(
		      	(position) => {
		      		let latitude=position.coords.latitude;
		      		let longitude=position.coords.longitude;
			        AsyncStorage.setItem('@latitude', latitude.toString());
			        AsyncStorage.setItem('@longitude', longitude.toString());
			        this.sendNewParkage(idBorrowValue);
			     },
		      	(error) => {
		      		console.log(error);
		      	}
	      	)
		}
	}
	render(){
		const IMAGE_LOGO='../../Assets/Images/Logo.jpg';
		const { valueMoney, valueDay, minSlideMoney, maxSlideMoney, valueSlideMoney, textbtnText, maxSlideDay, minSlideDay, valueSlideDay, money_real, rate, idBorrowValue, isSendData, checkRender, urlWithCMND, videoDefault }=this.state;
		if(checkRender){
			return(
				<View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerBack}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate({ routeName: 'CheckRouteScreen' })}>
                                <Icon type='FontAwesome' name='chevron-left' style={{fontSize:20,color:'white',marginLeft: 10}} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.headerTitle}>
                            <Text style={styles.textHead}>Vay Mới</Text>
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
			<View style={styles.container}>
				<View style={styles.header}>
                    <View style={styles.headerBack}>
                        <TouchableOpacity onPress={()=>this.props.navigation.navigate({ routeName: 'CheckRouteScreen' })}>
                            <Icon type='FontAwesome' name='chevron-left' style={{fontSize:20,color:'white',marginLeft: 10}} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerTitle}>
                        <Text style={styles.textHead}>Vay Mới</Text>
                    </View>
                    <View style={{flex:1}}></View>
                </View>
				<View style={styles.content}>
					<ScrollView style={{width:width*93/100}}>
						<View style={{justifyContent:'center',alignItems:'center',height: height/8}}>
							<Image
								style={styles.imageLogo}
								source={require(IMAGE_LOGO)}
							/>
						</View>
						{/*<Text style={styles.message}>Chọn gói vay sinh viên</Text>*/}
						<View style={styles.form}>
							<View>
								<Text style={styles.label}>Số tiền vay: {valueMoney}</Text>
								<Slider 
									trackStyle={styles.track}
						            thumbStyle={styles.thumb}
						            minimumTrackTintColor='#ffa64d'
						            minimumValue={minSlideMoney}
						            maximumValue={maxSlideMoney}
						            value={valueSlideMoney}
						            step={1}
						            disabled={isSendData}
						            onValueChange={(value)=> this.changeMoney(value)}
								/>
							</View>
							<View>
								<Text style={styles.label}>Ngày vay: {valueDay}</Text>
								<Slider 
									trackStyle={styles.track}
						            thumbStyle={styles.thumb}
						            minimumTrackTintColor='#ffa64d'
						            minimumValue={minSlideDay}
						            maximumValue={maxSlideDay}
						            disabled={isSendData}
						            value={valueSlideDay}
						            step={1}
						            onValueChange={(value)=> this.changeDay(value)}
								/>
							</View>
							<View style={{flex:1, height: height/3}}>
								<View style={{flex:1,flexDirection: 'row'}}>
									<View style={styles.square}>
										<Text style={styles.textTable}>Tiền vay</Text>
									</View>
									<View style={styles.square2}>
										<Text style={styles.textTable}>{valueMoney}</Text>
									</View>
								</View>
								<View style={{flex:1,flexDirection: 'row'}}>
									<View style={styles.square}>
										<Text style={styles.textTable}>Thời hạn</Text>
									</View>
									<View style={styles.square2}>
										<Text style={styles.textTable}>{valueDay}</Text>
									</View>
								</View>
								<View style={{flex:1,flexDirection: 'row'}}>
									<View style={styles.square}>
										<Text style={styles.textTable}>Tiền thực nhận</Text>
									</View>
									<View style={styles.square2}>
										<Text style={styles.textTable}>{money_real}</Text>
									</View>
								</View>
								<View style={{flex:1,flexDirection: 'row',borderBottomWidth:1}}>
									<View style={styles.squareLast}>
										<Text style={styles.textTable}>Lãi suất và phí tư vấn</Text>
									</View>
									<View style={styles.square2}>
										<Text style={styles.textTable}>{rate}</Text>
									</View>
								</View>
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
						<Text style={styles.message}>Upload video với nội dung: tôi tên là, sđt, số CMND, hôm nay ngày tháng năm tôi có xác nhận vay với số tiền là ..Tôi đồng ý với những điều khoản của ứng dụng và chịu trách nhiệm về pháp luật (Video tối đa 1 phút)</Text>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Video xác nhận vay</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadVideo()}>
									{videoDefault}
								</TouchableOpacity>
							</View>
						</View>
						<View style={{justifyContent:'center',alignItems:'center',width:'100%',height:height/9}}>
						<TouchableOpacity onPress={()=>this.chooseParkage(idBorrowValue)} disabled={isSendData} >
				        	<Button disabled={isSendData} onPress={()=>this.chooseParkage(idBorrowValue)} rounded style={styles.btnText}>
					            {textbtnText}
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
		alignItems: 'center',
	},
	textHead: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	},
	imageLogo:{
		width: width/2,
		height: '100%',
		resizeMode: 'center'
	},
	message:{
		// fontSize: 18,
		color: COLORS.COLOR_TEXT_BG_WHITE
	},
	form:{
		flex: 1,
		marginTop: 10
	},
	btnText:{
		width:width*3/4,
		alignItems: 'center',
		justifyContent:'center',
		backgroundColor: COLORS.MAIN_COLOR,
		marginTop: 10
	},
	track: {
	    height: 10,
	    borderRadius: 4,
	    backgroundColor: COLORS.MAIN_COLOR,
	    shadowColor: 'black',
	    shadowOffset: {width: 0, height: 1},
	    shadowRadius: 1,
	    shadowOpacity: 0.15
	},
	thumb: {
	    width: 20,
	    height: 20,
	    backgroundColor: 'white',
	    borderColor: COLORS.COLOR_TEXT_BG_WHITE,
	    borderWidth: 5,
	    borderRadius: 10,
	    shadowColor: 'black',
	    shadowOffset: {width: 0, height: 2},
	    shadowRadius: 2,
	    shadowOpacity: 0.35
	},
	label:{
		fontWeight: 'bold',
		fontSize: 18
	},
	textTable:{
		fontWeight: 'bold'
	},
	square:{
		flex:1,
		borderWidth:1,
		alignItems:'center',
		borderRightWidth: 0,
		borderBottomWidth: 0,
		justifyContent: 'center'
	},
	square2:{
		flex:1,
		borderWidth:1,
		alignItems:'center',
		borderBottomWidth:0,
		justifyContent: 'center'
	},
	squareLast:{
		flex:1,
		borderWidth:1,
		alignItems:'center',
		borderRightWidth: 0,
		justifyContent: 'center',
		borderBottomWidth:0
	},
	squareLast2:{
		flex:1,
		borderWidth:1,
		alignItems:'center',
		justifyContent: 'center'
	},
	imageAdd:{
		width: width/3,
		height: '100%',
		resizeMode: 'center'
	},
	viewWrapImage:{
		flex: 3,
		width: '100%',
		height: height/4,
		borderWidth: 1,
		alignItems:'center',
		justifyContent: 'center'
	},
	textLabel:{
		flex:1,
		fontWeight: 'bold',
		// color: COLORS.COLOR_TEXT_BG_WHITE
		color: 'black'
	},
	itemInputImage:{
		flex: 1,
		height: height/5,
		marginTop: 10,
	},
});

export default connect()(AddNewBorrow)
