import { URL } from '../Const/Const';
function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function apiPostDetailWorkStep3(data) {
    let formData = new FormData();
    formData.append("userId", data.idUser);
    formData.append("email", data.emailUser);
    formData.append("accessToken", data.access_token);
    //Thông tin sinh viên
    formData.append("nameCompany", data.nameCompany);
    formData.append("level", data.level);
    formData.append("salaryMonth", data.salaryMonth);
    formData.append("phoneCompany", data.phoneCompany);
    if(data.sourceHdld!=''){
        formData.append("sourceHdld", {
            name: randomName()+'.jpg',
            uri: data.sourceHdld,
            type: 'image/jpg'
        });
    }
    return fetch(URL.URL_BASE_SERVER+`/post-detail-work-step3`,{
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
export default apiPostDetailWorkStep3;
