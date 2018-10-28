import { URL } from '../Const/Const';
function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function apiPostChangeAccount(data) {
    let bodyData=JSON.stringify({
        userId: data.userId,
        email: data.email,
        accessToken: data.accessToken,
        studentOrWork: data.studentOrWork
    });
    return fetch(URL.URL_BASE_SERVER+`/change-account`,{
    	method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: bodyData
    })
    .then(res=>{
    	console.log(res);
    })
    // .then(res => res.json())
    // .then(resjson => {
    //     return resjson;
    // })
    .catch((error) => {
        console.log('loi');
        return 'loi';
    });
}
export default apiPostChangeAccount;