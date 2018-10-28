import { URL } from '../Const/Const';
function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function apiPostDetailStep3(data) {
    let formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("email", data.email);
    formData.append("accessToken", data.accessToken);
    //Thông tin sinh viên
    formData.append("nameSchool", data.nameSchool);
    formData.append("mssv", data.mssv);
    if(data.sourceBeforeCard!=''){
        formData.append("sourceBeforeCard", {
            name: randomName()+'.jpg',
            uri: data.sourceBeforeCard,
            type: 'image/jpg'
        });
    }
    if(data.sourceUnderCard!=''){
        formData.append("sourceUnderCard", {
            name: randomName()+'.jpg',
            uri: data.sourceUnderCard,
            type: 'image/jpg'
        });
    }
    if(data.sourceTableScore!=''){
        formData.append("sourceTableScore", {
            name: randomName()+'.jpg',
            uri: data.sourceTableScore,
            type: 'image/jpg'
        });
    }
    return fetch(URL.URL_BASE_SERVER+`/post-detail-step3`,{
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
export default apiPostDetailStep3;
