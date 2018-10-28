import { URL } from '../Const/Const';
function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function apiPostDetailStep2(data) {
    let formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("email", data.email);
    formData.append("accessToken", data.accessToken);
    //Thông tin nơi ở
    formData.append("address", data.address);
    formData.append("typeHome", data.typeHome);
    if(data.sourceBook_1!=''){
        formData.append("sourceBook_1", {
            name: randomName()+'.jpg',
            uri: data.sourceBook_1,
            type: 'image/jpg'
        });
    }
    if(data.sourceBook_2!=''){
        formData.append("sourceBook_2", {
            name: randomName()+'.jpg',
            uri: data.sourceBook_2,
            type: 'image/jpg'
        });
    }
    if(data.sourceBook_3!=''){
        formData.append("sourceBook_3", {
            name: randomName()+'.jpg',
            uri: data.sourceBook_3,
            type: 'image/jpg'
        });
    }
    if(data.sourceBook_4!=''){
        formData.append("sourceBook_4", {
            name: randomName()+'.jpg',
            uri: data.sourceBook_4,
            type: 'image/jpg'
        });
    }
    if(data.sourceBook_5!=''){
        formData.append("sourceBook_5", {
            name: randomName()+'.jpg',
            uri: data.sourceBook_5,
            type: 'image/jpg'
        });
    }
    if(data.sourceBook_6!=''){
        formData.append("sourceBook_6", {
            name: randomName()+'.jpg',
            uri: data.sourceBook_6,
            type: 'image/jpg'
        });
    }
    if(data.sourceBook_7!=''){
        formData.append("sourceBook_7", {
            name: randomName()+'.jpg',
            uri: data.sourceBook_7,
            type: 'image/jpg'
        });
    }

    return fetch(URL.URL_BASE_SERVER+`/post-detail-step2`,{
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
export default apiPostDetailStep2;
