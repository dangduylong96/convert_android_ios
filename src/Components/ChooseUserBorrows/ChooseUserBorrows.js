import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	Image,
	ActivityIndicator,
	AsyncStorage,
	TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { ListItem, Radio, Icon, Button } from 'native-base';

import { COLORS, INFO_APP } from '../../Const/Const';
var { height, width } = Dimensions.get('window');

class ChooseUserBorrows extends Component{
	constructor(props){
		super(props);
		this.state={
			valueTypeAccount: 'sinh-vien',
			checkSinhVien: true,
			checkNgDiLam: false,
			editData: true,
			textbtnText: <Text style={{color:'white',fontWeight:'bold'}}>Tiếp Tục</Text>
		}
	}
	saveTypeAccount = async (type) => {
        try {
            await AsyncStorage.setItem('@studentOrWork', type);
            this.props.navigation.navigate('BorrowStudent');
        } catch (error) {
            alert('Vui lòng cho quyền ứng dụng được lưu trữ');
        }
    }
	selected(value){
		let error=false;
		this.setState({
			checkSinhVien: false,
			checkNgDiLam: false
		})
		if(value=='sinh-vien'){
			this.setState({
				checkSinhVien: true,
				valueTypeAccount: 'sinh-vien'
			})
		}else if(value=='nguoi-di-lam'){
			this.setState({
				checkNgDiLam: true,
				valueTypeAccount: 'nguoi-di-lam'
			})
		}else{
			error=true;
			this.setState({
				checkSinhVien: false,
				checkNgDiLam: false
			})
			alert('Vui lòng chọn đúng giá trị!!');
		}
	}
	chooseTypeAcc(){
		this.setState({
			textbtnText: <ActivityIndicator size="small" color="white" />
		})
		this.saveTypeAccount(this.state.valueTypeAccount);
	}
	render(){
		const IMAGE_LOGO='../../Assets/Images/Logo.jpg';
		const { checkSinhVien, checkNgDiLam, editData, textbtnText}=this.state;
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
					<Text style={styles.message}>Bạn là :</Text>
					<View style={styles.form}>
						<ListItem selected={true}>
				            <Radio
				                color={"#f0ad4e"}
				                selectedColor={COLORS.MAIN_COLOR}
				                selected={checkSinhVien}
				                onPress={()=>this.selected('sinh-vien')}
				             />
				            <Text style={styles.radioLabel}><Icon type='FontAwesome' name='graduation-cap' style={{fontSize:20}} /> Sinh Viên</Text>
				        </ListItem>
				        <ListItem selected={true}>
				            <Radio
				                color={"#f0ad4e"}
				                selectedColor={COLORS.MAIN_COLOR}
				                selected={checkNgDiLam}
				                onPress={()=>this.selected('nguoi-di-lam')}
				             />
				            <Text style={styles.radioLabel}><Icon type='MaterialIcons' style={{fontSize:20}} name='work' /> Người đi làm</Text>
				        </ListItem>
				        <TouchableOpacity onPress={()=>this.chooseTypeAcc()}>
				        	<Button onPress={()=>this.chooseTypeAcc()} rounded style={styles.btnText}>
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
		height: height/4,
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
	radioLabel:{
		marginLeft: 15,
		fontSize: 20
	},
	btnText:{
		width:width*3/4,
		alignItems: 'center',
		justifyContent:'center',
		backgroundColor: COLORS.MAIN_COLOR,
		marginTop: 10
	}
});

export default connect()(ChooseUserBorrows)
