import { URL } from '../Const/Const';

function apiGetAllBorrow(userId,email,accessToken) {
    return fetch(`${URL.URL_BASE_SERVER}/get-all-borrow?userId=${userId}&email=${email}&accessToken=${accessToken}`)
	.then(res=>res.json())
	.catch(error=>{
		console.log('loi');
	})
}
export default apiGetAllBorrow;