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
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Radio, Right, Left, Icon, Button } from 'native-base';

import { COLORS, INFO_APP, URL } from '../../Const/Const';
import apiGetAccessToken from '../../Api/apiGetAccessToken';
// import { saveToken } from '../../redux/ActionCreators';
var { height, width } = Dimensions.get('window');

class RuleInvestor extends Component{
	constructor(props){
		super(props);
		this.state={
			valueTypeAccount: 'nguoi_vay',
			checkNgVay: true,
			checkNhaDauTu: false,
			editData: true,
			textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Chấp nhận</Text>,
			htmlRule: 'Loadding',
			disableBtn: true
		}
	}
	componentDidMount=async () =>{
		let accountDetail=await AsyncStorage.getItem('@accountDetail');
		accountDetail=JSON.parse(accountDetail);
		fetch(`${URL.URL_BASE_SERVER}/rule-investor?userId=${accountDetail.idUser}&email=${accountDetail.emailUser}&accessToken=${accountDetail.access_token}`)
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
            await AsyncStorage.setItem('@acceptReadRuleInvestor', 'true');
            this.props.navigation.navigate('DetailInvestor');
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

export default connect()(RuleInvestor)
