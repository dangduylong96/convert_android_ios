import { URL } from '../Const/Const';

function apiGetCurrentBorrow(userId,email,accessToken) {
    return fetch(`${URL.URL_BASE_SERVER}/get-current-borrow?userId=${userId}&email=${email}&accessToken=${accessToken}`)
	.then(res=>res.json())
	.catch(error=>{
		console.log('loi');
	})
}
export default apiGetCurrentBorrow;