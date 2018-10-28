import { URL } from '../Const/Const';
function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function apiPostDetailStep4(data) {
    let formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("email", data.email);
    formData.append("accessToken", data.accessToken);
    //Thông tin người thân
    formData.append("name1", data.name1);
    formData.append("relationship_1", data.relationship_1);
    formData.append("phone_1", data.phone_1);
    formData.append("name2", data.name2);
    formData.append("relationship_2", data.relationship_2);
    formData.append("phone_2", data.phone_2);
    return fetch(URL.URL_BASE_SERVER+`/post-detail-step4`,{
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
export default apiPostDetailStep4;
