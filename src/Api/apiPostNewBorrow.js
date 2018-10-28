import { URL } from '../Const/Const';
function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function apiPostNewBorrow(data) {
	//Append form data
	let formData = new FormData();
	//Video
	formData.append("videoFile", {
		name: data.nameVideo+'.mp4',
		uri: data.sourceVideoUri,
		type: 'video/mp4'
    });
    formData.append("userId", data.userId);
    formData.append("email", data.email);
    formData.append("accessToken", data.accessToken);
    formData.append("latitude", data.latitude);
    formData.append("longitude", data.longitude);
    //Gói vay
    formData.append("idParkageBorrow", data.idParkageBorrow);
    formData.append("sourceWithCMND", {
        name: randomName()+'.jpg',
        uri: data.sourceWithCMND,
        type: 'image/jpg'
    });


    return fetch(URL.URL_BASE_SERVER+`/add-new-borrow`,{
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
export default apiPostNewBorrow;