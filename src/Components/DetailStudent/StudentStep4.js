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
class StudentStep4 extends Component{
	constructor(props){
		super(props);
		this.state={
			name1: '',
			relationship_1: 'bo',
			phone_1: '',
			name2: '',
			relationship_2: 'ban-be',
			phone_2: '',
			isSubmit: false,
			textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
		}
	}
	saveStudentStep4 = async () => {
        try {
        	let { name1, relationship_1, phone_1, name2, relationship_2, phone_2}=this.state;
        	let data={
        		'name1': name1,
        		'relationship_1': relationship_1,
        		'phone_1': phone_1,
        		'name2': name2,
        		'relationship_2': relationship_2,
        		'phone_2': phone_2
        	};
            await AsyncStorage.setItem('@StudentStep4', JSON.stringify(data));
            this.props.navigation.navigate('CheckRouteScreen');
        } catch (error) {
            alert('Vui lòng cho quyền ứng dụng được lưu trữ');
        }
    }
	submit(){
		this.setState({
			isSubmit: true,
			textBtnLogin: <ActivityIndicator size="small" color="white" />
		})
		let { name1, relationship_1, phone_1, name2, relationship_2, phone_2}=this.state;
		let error=false;
		if(name1==''){
			error=true;
			Toast.show({
	        	text: "Chưa nhập tên người thân 1!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(phone_1==''){
			error=true;
			Toast.show({
	        	text: "Chưa nhấp sđt người thân 1!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(name2==''){
			error=true;
			Toast.show({
	        	text: "Chưa nhập tên người thân 2!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}else if(phone_2==''){
			error=true;
			Toast.show({
	        	text: "Chưa nhấp sđt người thân 2!",
	        	buttonText: "Okay",
	        	type: "danger",
	        	duration: 30000
      		})
		}
		if(!error){
			this.saveStudentStep4();
		}else{
			this.setState({
				isSubmit: false,
				textBtnLogin: <Text style={{color:'white',fontWeight:'bold'}}>Gửi</Text>
			})
		}
		
	}
	changePhone(text,id){
		let newText = '';
        let numbers = '0123456789';

        for (var i = 0; i < text.length; i++) {
          	if (numbers.indexOf(text[i]) > -1) {
	       		newText = newText + text[i];
			}
		}
		this.setState({
			['phone_'+id]: newText
		})
	}
	render(){
		const { name1, relationship_1, phone_1, name2, relationship_2, phone_2 ,isSubmit, textBtnLogin}=this.state;
		return(
			<View style={styles.container} pointerEvents={isSubmit ? 'none' : 'auto'}>
				<View style={styles.header}>
					<Text style={styles.textHead}>Thông Tin Người Thân</Text>
				</View>
				<View style={styles.content}>
				    <ScrollView>
					<View style={styles.formLogin}>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Tên người thân 1</Text>
							<TextInput 
			        			value={name1}
			        			style={styles.textIpItemInput}
			        			onChangeText={(name1) => this.setState({name1})} 
			        			placeholder="Tên người thân 1" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Quan hệ người thân 1</Text>
							<View style={styles.pickerInput}>
				             	<Picker
					                mode="dropdown"
					                iosIcon={<Icon name="ios-arrow-down-outline" />}
					                placeholder="Chọn quan hệ"
					                selectedValue={relationship_1}
					                style={styles.pickerInputSub}
					                onValueChange={(relationship_1)=>this.setState({relationship_1})}
				              	>
					                <Picker.Item label="Bố" value="bo" />
					                <Picker.Item label="Mẹ" value="me" />
					                <Picker.Item label="Anh chị em ruột" value="anh-chi-ruot" />
				            	</Picker>
				            </View>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>SĐT người thân 1</Text>
							<TextInput 
			        			value={phone_1}
			        			style={styles.textIpItemInput}
			        			keyboardType="number-pad"
			        			onChangeText={(phone_1) => this.changePhone(phone_1,1)} 
			        			placeholder="Số điện thoại người thân 1" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Tên người thân 2</Text>
							<TextInput 
			        			value={name2}
			        			style={styles.textIpItemInput}
			        			onChangeText={(name2) => this.setState({name2})} 
			        			placeholder="Tên người thân 2" 
			        		/>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>Quan hệ người thân 2</Text>
							<View style={styles.pickerInput}>
				             	<Picker
					                mode="dropdown"
					                iosIcon={<Icon name="ios-arrow-down-outline" />}
					                placeholder="Chọn quan hệ"
					                selectedValue={relationship_2}
					                style={styles.pickerInputSub}
					                onValueChange={(relationship_2)=>this.setState({relationship_2})}
				              	>
					                <Picker.Item label="Bạn bè" value="ban-be" />
					                <Picker.Item label="Anh chị em họ" value="anh-chi-ho" />
				            	</Picker>
				            </View>
						</View>
						<View style={styles.itemInput}>
							<Text style={styles.textLabel}>SĐT người thân 2</Text>
							<TextInput 
			        			value={phone_2}
			        			keyboardType="number-pad"
			        			style={styles.textIpItemInput}
			        			onChangeText={(phone_2) => this.changePhone(phone_2,2)} 
			        			placeholder="SĐT người thân 2" 
			        		/>
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

export default connect()(StudentStep4)
