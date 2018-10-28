import { URL } from '../Const/Const';
function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function apiPostSendInvestor(data) {
    let formData = new FormData();
    formData.append("userId", data.idUser);
    formData.append("email", data.emailUser);
    formData.append("accessToken", data.access_token);
    //Thông tin cơ bản
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("numberBank", data.numberBank);
    formData.append("cmnd", data.cmnd);
    formData.append("dayProviderCmnd", data.dayProviderCmnd);
    formData.append("placeOfCmnd", data.placeOfCmnd);
    formData.append("phone", data.phone);
    formData.append("nameOfBank", data.nameOfBank);
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
    if(data.sourceCardBank!=''){
        formData.append("sourceCardBank", {
            name: randomName()+'.jpg',
            uri: data.sourceCardBank,
            type: 'image/jpg'
        });
    }
    return fetch(URL.URL_BASE_SERVER+`/send-profile-investor`,{
    	method: 'POST',
    	headers: {
                'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
    .then(res => res.json())
    .then(resjson => {
        return resjson;
    })
    .catch((error) => {
        console.log('loi');
        return 'loi';
    });
}
export default apiPostSendInvestor;
