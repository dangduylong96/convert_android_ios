import { URL } from '../Const/Const';
import { AsyncStorage } from 'react-native'; 
function apiGetDataBorrow(){
	return get();
}
get=async () =>{
	let accountDetail = await AsyncStorage.getItem('@accountDetail');
	//Xét tài khoản có vay bao giờ chưa
  	if(accountDetail){
  		accountDetail=JSON.parse(accountDetail);
		fetch(`${URL.URL_BASE_SERVER}/get-data-borrow?userId=${accountDetail.idUser}&email=${accountDetail.emailUser}&accessToken=${accountDetail.access_token}`)
		.then(res=>res.json())
		.then(resjs=>{
			setAsync(resjs);
		})
		.then(()=>{
			return true;
		})
	}
}
setAsync=async (resjs) =>{
    try {
        await AsyncStorage.setItem('@typeAccount', resjs.typeAccount);
		await AsyncStorage.setItem('@studentOrWork', resjs.studentOrWork);
		await AsyncStorage.setItem('@acceptReadRule', resjs.acceptReadRule);
		await AsyncStorage.setItem('@idParkageBorrow', JSON.stringify(resjs.idParkageBorrow));
		await AsyncStorage.setItem('@studentStep1', JSON.stringify(resjs.step1));
		await AsyncStorage.setItem('@StudentStep2', JSON.stringify(resjs.step2));
		await AsyncStorage.setItem('@StudentStep3', JSON.stringify(resjs.step3));
		if(resjs.step3Work.name_company!=''){
			await AsyncStorage.setItem('@StudentWorkStep3', JSON.stringify(resjs.step3Work));
		}
		await AsyncStorage.setItem('@StudentWorkStep3', JSON.stringify(resjs.step3Work));
		await AsyncStorage.setItem('@StudentStep4', JSON.stringify(resjs.step4));
		await AsyncStorage.setItem('@StudentStep5', JSON.stringify(resjs.step5));
    } catch (error) {
        alert('Vui lòng cho quyền ứng dụng được lưu trữ');
    }
}
export default apiGetDataBorrow;