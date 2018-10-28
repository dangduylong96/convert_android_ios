import React, {Component} from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	AsyncStorage,
	TouchableOpacity,
    ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { Icon, Toast } from 'native-base';

import { COLORS, INFO_APP, URL } from '../../Const/Const';
var { height, width } = Dimensions.get('window');

class ApplicationInvestor extends Component{
	constructor(props){
		super(props);
		this.state={
            checkEditUser: 0,
            mode: 'sinh-vien'
		}
	}
    componentDidMount=async()=>{
        let mode=await AsyncStorage.getItem('@studentOrWork');
        this.setState({
            mode: mode
        })
    }

    logOut=async () =>{
        AsyncStorage.clear();
        this.props.navigation.navigate('CheckRouteScreen');
    }
	render(){
		const { checkRender, nameParkage, money, day, money_real, rate, status, mode }=this.state;
		return(
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.textHead}>{INFO_APP.APP_NAME.toUpperCase()}</Text>
				</View>
				<View style={styles.content}>
                    <ScrollView style={{width:'100%'}}>
                        <TouchableOpacity style={styles.itemDivider} onPress={()=>this.props.navigation.navigate('EditDetailInvestor')}>
                            <View style={styles.itemLeft}>
                                <Text style={styles.fontItemLeft}>Sửa thông tin</Text>
                            </View>
                            <View style={styles.itemRight}>
                                <Text style={styles.fontItemRight}><Icon type='FontAwesome' name='user-circle-o' style={{fontSize:18,color:'blue',marginLeft: 10}} /></Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.itemDivider} onPress={()=>this.logOut()}>
                            <View style={styles.itemLeft}>
                                <Text style={styles.fontItemLeft}>Đăng xuất</Text>
                            </View>
                            <View style={styles.itemRight}>
                                <Text style={styles.fontItemRight}><Icon type='FontAwesome' name='sign-out' style={{fontSize:18,color:'blue',marginLeft: 10}} /></Text>
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
		alignItems: 'center'
	},
	textHead: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 20
	},
    itemDivider:{
        width: '100%',
        borderBottomWidth: 1,
        borderColor: COLORS.COLOR_TEXT_BG_WHITE,
        flexDirection: 'row',
        height: height/12,
        flex: 1,
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    itemLeft:{
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        // backgroundColor: 'red'
    },
    fontItemLeft:{
        fontSize: 15,
        color: 'black'
    },
    fontItemRight:{
        fontWeight: 'bold',
        fontSize: 15,
        color: COLORS.MAIN_COLOR
    },
    itemRight:{
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        // backgroundColor: 'blue'
    }
});
export default connect()(ApplicationInvestor)
