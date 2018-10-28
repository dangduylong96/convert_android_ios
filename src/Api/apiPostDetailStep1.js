import { URL } from '../Const/Const';
function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function apiPostDetailStep1(data) {
    let formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("email", data.email);
    formData.append("accessToken", data.accessToken);
    //Thông tin cơ bản
    formData.append("nameUser", data.nameUser);
    formData.append("gender", data.gender);
    formData.append("birthDay", data.birthDay);
    formData.append("cmnd", data.cmnd);
    formData.append("dayProviderCmnd", data.dayProviderCmnd);
    formData.append("placeOfCmnd", data.placeOfCmnd);
    formData.append("phone", data.phone);
    if(data.sourceBeforeCMND!=''){
        formData.append("sourceBeforeCMND", {
            name: randomName()+'.jpg',
            uri: data.sourceBeforeCMND,
            type: 'image/jpg'
        });
    }
    if(data.sourceUnderCMND!=''){
        formData.append("sourceUnderCMND", {
            name: randomName()+'.jpg',
            uri: data.sourceUnderCMND,
            type: 'image/jpg'
        });
    }
    if(data.sourceWithCMND!=''){
        formData.append("sourceWithCMND", {
            name: randomName()+'.jpg',
            uri: data.sourceWithCMND,
            type: 'image/jpg'
        });
    }

    return fetch(URL.URL_BASE_SERVER+`/post-detail-step1`,{
    	method: 'POST',
    	headers: {
                'Content-Type': 'multipart/form-data',
        },
        body: formData
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
export default apiPostDetailStep1;
