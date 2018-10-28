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
	ScrollView
} from 'react-native';
import Slider from "react-native-slider";
import { connect } from 'react-redux';
import { ListItem, Radio, Right, Left, Icon, Button } from 'native-base';

import { COLORS, INFO_APP } from '../../Const/Const';
import apiGetDetailBorrow from '../../Api/apiGetDetailBorrow';
// import { saveToken } from '../../redux/ActionCreators';
var { height, width } = Dimensions.get('window');

class BorrowStudent extends Component{
	constructor(props){
		super(props);
		this.state={
			valueMoney: 0,
			textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Chọn khoản vay</Text>,
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
			checkRender: true
		}
	}
	componentDidMount=async () =>{
		// let mode='sinh-vien';
		let accountDetail=await AsyncStorage.getItem('@accountDetail');
		let mode=await AsyncStorage.getItem('@studentOrWork');
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
	saveParkage = async (idBorrowValue) => {
        try {
            await AsyncStorage.setItem('@idParkageBorrow',idBorrowValue.toString());
            this.props.navigation.navigate('StudentStep1');
        } catch (error) {
            alert('Vui lòng cho quyền ứng dụng được lưu trữ');
        }
    }
	chooseParkage(idBorrowValue){
		this.setState({
			textbtnText: <ActivityIndicator size="small" color="white" />,
			isSendData: true
		})
		this.saveParkage(idBorrowValue);
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
	render(){
		const IMAGE_LOGO='../../Assets/Images/Logo.jpg';
		const { valueMoney, valueDay, minSlideMoney, maxSlideMoney, valueSlideMoney, textbtnText, maxSlideDay, minSlideDay, valueSlideDay, money_real, rate, idBorrowValue, isSendData, checkRender}=this.state;
		if(checkRender){
			return(
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
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
					<Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
				</View>
				<View style={styles.content}>
					<Image
						style={styles.imageLogo}
						source={require(IMAGE_LOGO)}
					/>
					<ScrollView>
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
					        <TouchableOpacity onPress={()=>this.chooseParkage(idBorrowValue)} disabled={isSendData}>
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
		fontSize: 18,
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
	}
});

export default connect()(BorrowStudent)
