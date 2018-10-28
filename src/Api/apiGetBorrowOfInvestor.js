import { URL } from '../Const/Const';

function apiGetBorrowOfInvestor(userId,email,accessToken,status) {
    return fetch(`${URL.URL_BASE_SERVER}/get-borrow-of-investor?userId=${userId}&email=${email}&accessToken=${accessToken}&status=${status}`)
	// .then(res=>console.log(res))
	.then(res=>res.json())
	.catch(error=>{
		console.log('loi');
	})
}
export default apiGetBorrowOfInvestor;