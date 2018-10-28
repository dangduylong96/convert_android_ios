import { URL } from '../Const/Const';

function apiGetAccessToken(idUser,accessToken) {
    return fetch(URL.URL_BASE_SERVER+`/check-username-password?idUser=${idUser}&accessToken=${accessToken}`)
    .then(res => res.json())
    .then(resjson => {
        return resjson;
    })
    .catch((error) => {
        return 'loi';
    });
}
export default apiGetAccessToken;