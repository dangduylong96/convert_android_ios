import { URL } from '../Const/Const';
function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function apiPostDetailStep5(data) {
    let formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("email", data.email);
    formData.append("accessToken", data.accessToken);
    //Thông tin chuyển khoản
    formData.append("numberAccountBank", data.numberAccountBank);
    formData.append("nameBank", data.nameBank);
    if(data.sourceBeforeBank!=''){
        formData.append("sourceBeforeBank", {
            name: randomName()+'.jpg',
            uri: data.sourceBeforeBank,
            type: 'image/jpg'
        });
    }
    return fetch(URL.URL_BASE_SERVER+`/post-detail-step5`,{
    	method: 'POST',
    	headers: {
                'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
    .then(res=>{
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
        return 'loi';
    });
}
export default apiPostDetailStep5;
