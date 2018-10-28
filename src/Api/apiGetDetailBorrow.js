import { URL } from '../Const/Const';

function apiGetDetailBorrow(idUser,emailUser,access_token,mode) {
    return fetch(URL.URL_BASE_SERVER+`/detail-borrow-mode?userId=${idUser}&email=${emailUser}&accessToken=${access_token}&mode=${mode}`)
    // .then(res=>{
    // 	console.log(URL.URL_BASE_SERVER+`/detail-borrow-mode?userId=${idUser}&email=${emailUser}&accessToken=${access_token}&mode=${mode}`);
    // 	console.log(res);
    // })
    .then(res => res.json())
    .then(resjson => {
        return resjson;
    })
    .catch((error) => {
        return 'loi';
    });
}
export default apiGetDetailBorrow;