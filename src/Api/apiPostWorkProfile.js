import { URL } from '../Const/Const';
function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function apiPostWorkProfile(data) {
	//Append form data
	let formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("email", data.email);
    formData.append("listContact", data.listContact);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    formData.append("accessToken", data.accessToken);
    //Loại tài khoản
    formData.append("typeAccount", data.typeAccount);
    //Loại tài khoản vay
    formData.append("studentOrWork", data.studentOrWork);
    //Gói vay
    formData.append("idParkageBorrow", data.idParkageBorrow);
    //Thông tin cơ bản
    formData.append("nameUser", data.nameUser);
    formData.append("gender", data.gender);
    formData.append("birthDay", data.birthDay);
    formData.append("cmnd", data.cmnd);
    formData.append("dayProviderCmnd", data.dayProviderCmnd);
    formData.append("placeOfCmnd", data.placeOfCmnd);
    formData.append("phone", data.phone);
    formData.append("sourceBeforeCMND", {
        name: randomName()+'.jpg',
        uri: data.sourceBeforeCMND,
        type: 'image/jpg'
    });
    formData.append("sourceUnderCMND", {
        name: randomName()+'.jpg',
        uri: data.sourceUnderCMND,
        type: 'image/jpg'
    });
    formData.append("sourceWithCMND", {
        name: randomName()+'.jpg',
        uri: data.sourceWithCMND,
        type: 'image/jpg'
    });
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
    
    //Thông tin công ty
    formData.append("nameCompany", data.nameCompany);
    formData.append("level", data.level);
    formData.append("salaryMonth", data.salaryMonth);
    formData.append("phoneCompany", data.phoneCompany);
    formData.append("sourceHdld", {
        name: randomName()+'.jpg',
        uri: data.sourceHdld,
        type: 'image/jpg'
    });
    //Thông tin người thân
    formData.append("name1", data.name1);
    formData.append("relationship_1", data.relationship_1);
    formData.append("phone_1", data.phone_1);
    formData.append("name2", data.name2);
    formData.append("relationship_2", data.relationship_2);
    formData.append("phone_2", data.phone_2);
    //Thông tin chuyển khoản
    formData.append("numberAccountBank", data.numberAccountBank);
    formData.append("nameBank", data.nameBank);
    formData.append("sourceBeforeBank", {
        name: randomName()+'.jpg',
        uri: data.sourceBeforeBank,
        type: 'image/jpg'
    });

    return fetch(URL.URL_BASE_SERVER+`/send-profile-work-to-server`,{
    	method: 'POST',
    	headers: {
                'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
    // .then(res=>{
    // 	console.log(res);
    // })
    .then(res => res.json())
    .then(resjson => {
        return resjson;
    })
    .catch((error) => {
        alert(error);
        console.log(error);
        return 'loi';
    });
}
export default apiPostWorkProfile;