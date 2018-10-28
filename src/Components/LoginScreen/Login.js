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
import { connect } from 'react-redux';
import { Icon, Button } from 'native-base';
import { AccessToken, LoginManager } from 'react-native-fbsdk';

import { COLORS, INFO_APP } from '../../Const/Const';
import apiGetAccessToken from '../../Api/apiGetAccessToken';
// import { saveToken } from '../../redux/ActionCreators';
var { height, width } = Dimensions.get('window');

class Login extends Component{
	constructor(props){
		// mibus@xgmailoo.com
		// mibus123@xgmailoo.com
		// mibu3123213@xgmailoo.com
		super(props);
		this.state={
			'message': 'Thông tin tài khoản tuyệt đối được bảo mật',
			'colorMessage': COLORS.COLOR_TEXT_BG_WHITE,
			'isSubmit': false,
			'textLogin': <Text style={{color:'white'}}>Đăng nhập Facebook</Text>
		}
	}
	saveAccount = async (id,email,accessToken) => {
        try {
        	let detail={
        		'idUser':id,
        		'emailUser':email,
        		'access_token':accessToken
        	};
            await AsyncStorage.setItem('@accountDetail', JSON.stringify(detail));
            this.props.navigation.navigate('CheckRouteScreen');
        } catch (error) {
            alert('Vui lòng cho quyền ứng dụng được lưu trữ');
        }
    }
	login(idUser,accessToken){
		//Check email pass is corrected
		apiGetAccessToken(idUser,accessToken)
		.then((dataRes)=>{
			let status=dataRes.status;
			if(status=='error'){
				this.setState({
					isSubmit:false,
					message: 'Có lỗi xảy ra',
					colorMessage: 'red'
				})
			}else{
				//status equa success
				let accessTokenNew=dataRes.access_token;
				let emailRes=dataRes.email;
				let idRes=dataRes.id;
				//Save token in asynstorage
				this.saveAccount(idRes,emailRes,accessTokenNew);
			}
		})
	}
	setLoading(){
		this.setState({
			isSubmit:true,
			message: 'Vui lòng chờ trong giây lát....',
			colorMessage: '#ffa31a'
		});
	}
	handleFacebookLogin = () => {
		this.setLoading();
	    LoginManager.logInWithReadPermissions(['public_profile', 'email']).then(
	    	result=> {
		        if(result.isCancelled) {
		          	this.setState({
						isSubmit:false,
						message: 'Thông tin tài khoản tuyệt đối được bảo mật',
						colorMessage: COLORS.COLOR_TEXT_BG_WHITE
					});
		        }else{
		        	AccessToken.getCurrentAccessToken().then(
		                (data) => {
		                	this.login(data.userID,data.accessToken.toString());
		                }
	                )
		        }
		    },
		    function (error) {
		      	alert('Vui lòng thử lại sau');
		      	this.setState({
					isSubmit:false,
					message: 'Thông tin tài khoản tuyệt đối được bảo mật',
					colorMessage: COLORS.COLOR_TEXT_BG_WHITE
				});
		        console.log('Login fail with error: ' + error)
		    }
	    )
	}
	render(){
		//LoginManager.logOut()
		const IMAGE_LOGO='../../Assets/Images/Logo.jpg';
		const { message, colorMessage, isSubmit, textLogin }=this.state;
		return(
			<View style={styles.container} pointerEvents={isSubmit ? 'none' : 'auto'}>
				<View style={styles.header}>
					<Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
				</View>
				<View style={styles.content}>
					<ScrollView contentContainerStyle={{flexGrow:1,height:'100%',alignItems:'center'}}>
						<Image
							style={styles.imageLogo}
							source={require(IMAGE_LOGO)}
						/>
						<Text style={styles.message}>Đăng nhập bằng tài khoản facebook</Text>
						<Text style={[styles.message,{color: colorMessage}]}>{message}</Text>
				        <TouchableOpacity onPress={()=>this.handleFacebookLogin()}>
				        <View style={styles.buttonFace}>
				        	<View style={styles.iconFace}>
				        		<Icon type='FontAwesome' name='facebook' style={{color: 'white'}} />
				        	</View>
				        	<View style={styles.textFacebook} >
				        		{textLogin}
				        	</View>
				        </View>
				        </TouchableOpacity>
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
		// alignItems: 'center',
	},
	textHead: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	},
	imageLogo:{
		width: width/2,
		height: height/4,
		resizeMode: 'center'
	},
	message:{
		// fontSize: 18,
		color: COLORS.COLOR_TEXT_BG_WHITE
	},
	buttonFace:{
		width: width*7/10,
		height: height/15,
		backgroundColor: '#4267B2',
		flexDirection: 'row' ,
		marginTop: 20
	},
	iconFace:{
		width: '20%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	textFacebook:{
		width: '80%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center'
	}

});

export default connect()(Login)
