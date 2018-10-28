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

import apiPostEditSendInvestor from '../../Api/apiPostEditSendInvestor';
import { COLORS, INFO_APP } from '../../Const/Const';
// import { saveToken } from '../../redux/ActionCreators';
var { height, width } = Dimensions.get('window');
var options = {
		title: 'Upload',
		takePhotoButtonTitle: 'Chụp Ngay',
		chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
		mediaType: 'photo',
		noData: true,

		storageOptions: {
			skipBackup: true,
			path: 'images11'
		}
};
class EditDetailInvestor extends Component{
	constructor(props){
		super(props);
		this.state={
			name: '',
			address: '',
			numberBank: '',
			cmnd: '',
			dayProviderCmnd: '',
			placeOfCmnd: '',
			phone: '',
			nameOfBank: '',
			sourceBeforeCMND: '',
			urlBeforeCMND: require('../../Assets/Images/add_image.png'),
			sourceUnderCMND: '',
			urlUnderCMND: require('../../Assets/Images/add_image.png'),
			sourceCardBank: '',
			urlCardBank: require('../../Assets/Images/add_image.png'),
			'editData': true,
			isSubmit: false,
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
		let detailInvestor=await AsyncStorage.getItem('@detailInvestor');
		detailInvestor=JSON.parse(detailInvestor);
		// console.log(detailInvestor);
		this.setState({
            checkRender: false,
            name: detailInvestor.name,
			address: detailInvestor.address,
			numberBank: detailInvestor.numberBank,
			cmnd: detailInvestor.cmnd,
			dayProviderCmnd: detailInvestor.dayProviderCmnd,
			placeOfCmnd: detailInvestor.placeOfCmnd,
			phone: detailInvestor.phone,
			nameOfBank: detailInvestor.nameOfBank,
			urlBeforeCMND: {uri: detailInvestor.urlBeforeCMND},
			urlUnderCMND: {uri: detailInvestor.urlUnderCMND},
			urlCardBank: {uri: detailInvestor.urlCardBank},
            idUser: accountDetail.idUser,
            emailUser: accountDetail.emailUser,
            access_token: accountDetail.access_token
        })
	}
	saveEditDetailInvestor = async () => {
        try {
        	const { name, address, cmnd, placeOfCmnd, dayProviderCmnd, phone, numberBank, sourceBeforeCMND, sourceUnderCMND, sourceCardBank, nameOfBank }=this.state;
            let accountDetail=await AsyncStorage.getItem('@accountDetail');
			accountDetail=JSON.parse(accountDetail);
			let dataBody={
				name: name,
				address: address,
				numberBank: numberBank,
				cmnd: cmnd,
				dayProviderCmnd: dayProviderCmnd,
				placeOfCmnd: placeOfCmnd,
				phone: phone,
				nameOfBank: nameOfBank,
				sourceBeforeCMND: sourceBeforeCMND,
				sourceUnderCMND: sourceUnderCMND,
				sourceCardBank: sourceCardBank,
				idUser: accountDetail.idUser,
	            emailUser: accountDetail.emailUser,
	            access_token: accountDetail.access_token
			};
            apiPostEditSendInvestor(dataBody)
            .then(res=>{
            	Toast.show({
		        	text: "Update thành công!",
		        	buttonText: "Okay",
		        	type: "success",
		        	duration: 30000
	      		})
	      		this.setState({
					isSubmit: false,
					textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
				})
            	// this.props.naviagtion.navigate('CheckRouteScreen');
            })
            //Send server
            // this.props.navigation.navigate('StudentStep2');
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
		const { name, address, cmnd, placeOfCmnd, dayProviderCmnd, phone, numberBank, sourceBeforeCMND, sourceUnderCMND, sourceCardBank, nameOfBank }=this.state;
		let error=false;
		if(name==''){
			error=true;
			Toast.show({
	        	text: "Tên k được bỏ trống!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(address==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa nhập địa chỉ!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(cmnd==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa nhập số CMND!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(dayProviderCmnd==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa chọn ngày cấp CMND!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(placeOfCmnd==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa nhập nơi cấp CMND!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(phone==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa nhập SĐT!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(numberBank==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa nhập số tài khoản ngân hàng!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(nameOfBank==''){
			error=true;
			Toast.show({
	        	text: "Bạn chưa nhập tên chủ tài khoản!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}
		if(!error){
			this.saveEditDetailInvestor();
		}else{
			this.setState({
				isSubmit: false,
				textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
			})
		}
		
	}
	changePhone(text){
		let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
          	if (numbers.indexOf(text[i]) > -1) {
	       		newText = newText + text[i];
			}
		}
		this.setState({
			phone: newText
		})
	}
	changeCMND(text){
		let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
          	if (numbers.indexOf(text[i]) > -1) {
	       		newText = newText + text[i];
			}
		}
		this.setState({
			cmnd: newText
		})
	}
	setDateTime(day,name){
		let dayFormat=new Date(day);
		dayFormat=dayFormat.getFullYear()+'-'+(dayFormat.getMonth() + 1) + '-' + dayFormat.getDate();
		this.setState({
			[name]: dayFormat
		})
	}
	formatDate(day){
		let dayFormat=new Date(day);
		dayFormat=(dayFormat.getDate()+1)+'-'+(dayFormat.getMonth() + 1)+ '-' +dayFormat.getFullYear()  ;
		return dayFormat;
	}
	defaultDatePicker(day){
		let date=new Date(day);
		date.setDate(date.getDate() + 1);
		return date;
	}
	render(){
		const { name, address, cmnd, placeOfCmnd, dayProviderCmnd, phone, numberBank, urlBeforeCMND, urlUnderCMND, urlCardBank, nameOfBank, editData, isSubmit, textBtnLogin, checkRender}=this.state;
		if(checkRender){
            return(
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View style={styles.headerBack}>
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate({ routeName: 'ApplicationInvestor' })}>
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
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate({ routeName: 'ApplicationInvestor' })}>
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
							<Text style={styles.textLabel}>Họ và tên</Text>
							<TextInput 
			        			editable={editData}
			        			value={name}
			        			style={styles.textIpItemInput}
			        			onChangeText={(name) => this.setState({name})} 
			        			placeholder="Họ và tên" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Địa chỉ</Text>
							<TextInput 
			        			editable={editData}
			        			value={address}
			        			style={styles.textIpItemInput}
			        			onChangeText={(address) => this.setState({address})} 
			        			placeholder="Nhập địa chỉ" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Số CMND</Text>
							<TextInput 
			        			editable={editData}
			        			value={cmnd}
			        			style={styles.textIpItemInput}
			        			onChangeText={(cmnd) => this.changeCMND(cmnd)} 
			        			placeholder="Số Chứng Minh Nhân Dân" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Ngày cấp CMND</Text>
							<View style={styles.pickerInput}>
								<DatePicker
						            defaultDate={new Date(this.defaultDatePicker(dayProviderCmnd))}
						            locale={"vn"}
						            timeZoneOffsetInMinutes={undefined}
						            modalTransparent={false}
						            animationType={"fade"}
						            style={styles.pickerInputSub}
						            androidMode={"default"}
						            placeHolderText={this.formatDate(dayProviderCmnd)}
						            onDateChange={(dayProviderCmnd)=>this.setDateTime(dayProviderCmnd,'dayProviderCmnd')}
						        />
					        </View>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Nơi cấp CMND</Text>
							<TextInput 
			        			editable={editData}
			        			value={placeOfCmnd}
			        			style={styles.textIpItemInput}
			        			onChangeText={(placeOfCmnd) => this.setState({placeOfCmnd})} 
			        			placeholder="Nơi cấp" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Số điện thoại</Text>
							<TextInput 
			        			editable={editData}
			        			value={phone}
			        			style={styles.textIpItemInput}
			        			maxLength={11}
			        			keyboardType="number-pad"
			        			onChangeText={(phone) => this.changePhone(phone)} 
			        			placeholder="Số Điện Thoại" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Số tài khoản ngân hàng</Text>
							<TextInput 
			        			editable={editData}
			        			value={numberBank}
			        			style={styles.textIpItemInput}
			        			onChangeText={(numberBank) => this.setState({numberBank})} 
			        			placeholder="Nhập số tài khoản ngân hàng" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Tên chủ tài khoản</Text>
							<TextInput 
			        			editable={editData}
			        			value={nameOfBank}
			        			style={styles.textIpItemInput}
			        			onChangeText={(nameOfBank) => this.setState({nameOfBank})} 
			        			placeholder="Họ và tên" 
			        		/>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh mặt trước CMND</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadImage('BeforeCMND')}>
									<Image
										style={styles.imageAdd}
										source={urlBeforeCMND}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh mặt sau CMND</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadImage('UnderCMND')}>
									<Image
										style={styles.imageAdd}
										source={urlUnderCMND}
									/>
								</TouchableOpacity>
							</View>
						</View>
						<View style={styles.itemInputImage}>
							<Text style={styles.textLabel}>Ảnh thẻ ngân hàng</Text>
							<View style={styles.viewWrapImage}>
								<TouchableOpacity onPress={()=>this.uploadImage('CardBank')}>
									<Image
										style={styles.imageAdd}
										source={urlCardBank}
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

export default connect()(EditDetailInvestor)
