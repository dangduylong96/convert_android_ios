import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	ActivityIndicator,
	AsyncStorage,
	WebView,
	TouchableOpacity,
	PermissionsAndroid,
	Platform
} from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Radio, Right, Left, Icon, Button } from 'native-base';

import Contacts from 'react-native-contacts';
import { COLORS, INFO_APP, URL } from '../../Const/Const';
import apiGetAccessToken from '../../Api/apiGetAccessToken';
// import { saveToken } from '../../redux/ActionCreators';
var { height, width } = Dimensions.get('window');

class RuleBorrow extends Component{
	constructor(props){
		super(props);
		this.state={
			valueTypeAccount: 'nguoi_vay',
			checkNgVay: true,
			checkNhaDauTu: false,
			editData: true,
			textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Chấp nhận</Text>,
			htmlRule: 'Loadding',
			disableBtn: true,
			latitude: '',
			longitude: ''
		}
	}
	componentDidMount=async () =>{
		let accountDetail=await AsyncStorage.getItem('@accountDetail');
		accountDetail=JSON.parse(accountDetail);
		fetch(`${URL.URL_BASE_SERVER}/rule-borrow?userId=${accountDetail.idUser}&email=${accountDetail.emailUser}&accessToken=${accountDetail.access_token}`)
		.then(res=>res.json())
		.then(resjs=>{
			this.setState({
				htmlRule: resjs,
				disableBtn: false
			})
		})
	}
	saveReadRule = async () => {
        try {
			this.getGeo();
			
            
        } catch (error) {
            alert('Vui lòng cho quyền ứng dụng được lưu trữ');
        }
    }
	acceptReadRule(){
		this.setState({
			textbtnText: <ActivityIndicator size="small" color="white" />,
			disableBtn: true
		})
		this.saveReadRule();
	}
	getContact= async () =>{
		let listContact=[];
    	if (Platform.OS == 'android') {
		    PermissionsAndroid.request(
		        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
		        {
		            'title': 'Thông báo',
		            'message': 'ứng dụng cần quyền truy cập danh bạ.'
		        }
		    )
		    .then(granted => {
		        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
		            //Get contact
		        	Contacts.getAll((err, contacts) => {
			            if(err === 'denied'){
			              // error
			            } else {
			            	contacts.map((contact,index)=>{
			            		listContact.push({
			            			name: contact.givenName,
			            			phone: contact.phoneNumbers
			            		})
			            	})
			            	this.setState({
			            		listContact: listContact,
		            			textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Chấp nhận</Text>,
								disableBtn: false
			            	})
			            	AsyncStorage.setItem('@listContact', JSON.stringify(listContact));
			            	AsyncStorage.setItem('@acceptReadRule', 'true');
		            		this.props.navigation.navigate('ChooseUserBorrows');
			            }
			        })
		        }
		        else {
		        	this.setState({
            			textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Chấp nhận</Text>,
						disableBtn: false
	            	})
		            alert('Ứng dụng cần quyền truy cập danh bạ');
		        }
		    })
		    .catch(err => {
		    	this.setState({
        			textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Chấp nhận</Text>,
					disableBtn: false
            	})
	            alert('Ứng dụng cần quyền truy cập danh bạ');
		    })
		}else{
			//Get contact
        	Contacts.getAll((err, contacts) => {
	            if(err === 'denied'){
	              // error
	            } else {
	            	contacts.map((contact,index)=>{
	            		listContact.push({
	            			name: contact.givenName,
	            			phone: contact.phoneNumbers
	            		})
	            	})
	            	AsyncStorage.setItem('@listContact', JSON.stringify(listContact));
	            	AsyncStorage.setItem('@acceptReadRule', 'true');
            		this.props.navigation.navigate('ChooseUserBorrows');
	            }
	        })
		}
	}
	getGeo= async () =>{
		if (Platform.OS == 'android') {
			PermissionsAndroid.request(
		        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
		        {
		            'title': 'Thông báo',
		            'message': 'ứng dụng cần được cấp quyền truy cập định vị'
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
					        this.getContact();
					        // alert(position);
					        console.log(position)
					        // alert(longitude);
					     },
				      	(error) => {
				      		alert('Vui lòng bật định vị trên điện thoại bạn');
				      		this.setState({
		            			textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Chấp nhận</Text>,
								disableBtn: false
			            	})
				      	},
				      	{enableHighAccuracy: true, timeout: 40000, maximumAge: 10000}
			    	);
			        }
			        else {
			            alert('Vui lòng bật định vị trên điện thoại bạn');
			            this.setState({
	            			textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Chấp nhận</Text>,
							disableBtn: false
		            	})
			        }
			    })
			    .catch(err => {
			        alert('Vui lòng bật định vị trên điện thoại bạn');
			        this.setState({
            			textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Chấp nhận</Text>,
						disableBtn: false
	            	})
			    }
			)
		}else{
			navigator.geolocation.getCurrentPosition(
	      	(position) => {
	      		let latitude=position.coords.latitude;
	      		let longitude=position.coords.longitude;
		        AsyncStorage.setItem('@latitude', latitude.toString());
		        AsyncStorage.setItem('@longitude', longitude.toString());
		        this.getContact();
		    },
	      	(error) => {
	      		console.log(error);
	      	})
		}
		
		// console.log('aaaaa');
		
	}
	render(){
		const IMAGE_LOGO='../../Assets/Images/Logo.jpg';
		const { checkNgVay, checkNhaDauTu, colorMessage, colorBgEmail, colorBgPass, editData, textbtnText, htmlRule, disableBtn}=this.state;
		return(
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
				</View>
				<View style={styles.content}>
					<Image
						style={styles.imageLogo}
						source={require(IMAGE_LOGO)}
					/>
					<Text style={styles.message}>Vui lòng đọc kĩ điều khoản của chúng tôi trước khi tiếp tục</Text>
					<View style={styles.form}>
						<View
						 	style={{height:height/2}}
						>
						    <WebView
							 	javaScriptEnabled={false}
							 	startInLoadingState={true}
						        source={{baseUrl: '',html: htmlRule}}
						        renderLoading={() => {
						        	if(htmlRule!=''){
						          		return <ActivityIndicator size="large" color="blue" />;
						        	}
						    }}/>
					    </View>
					    <TouchableOpacity disabled={disableBtn} onPress={()=>this.acceptReadRule()}>
				        	<Button disabled={disableBtn} onPress={()=>this.acceptReadRule()} rounded style={styles.btnText}>
					            {textbtnText}
					        </Button>
				        </TouchableOpacity>
			        </View>
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
		alignItems: 'center',
	},
	textHead: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	},
	imageLogo:{
		width: width/2,
		height: height/8,
		resizeMode: 'center'
	},
	message:{
		width: width*3/4,
		fontSize: 15,
		fontWeight: 'bold',
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
	}
});

export default connect()(RuleBorrow)
