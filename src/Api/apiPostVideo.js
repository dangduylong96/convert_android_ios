import { URL } from '../Const/Const';
function randomName() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 20; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

function apiPostVideo(data) {
	//Append form data
    let formData = new FormData();
    formData.append("userId", data.userId);
    formData.append("email", data.email);
    formData.append("accessToken", data.accessToken);
    //Video
    formData.append("videoFile", {
        name: data.nameVideo+'.mp4',
        uri: data.sourceVideoUri,
        type: 'video/mp4'
    });

    return fetch(URL.URL_BASE_SERVER+`/send-video-profile`,{
    	method: 'POST',
    	headers: {
                'Content-Type': 'multipart/form-data',
        },
        body: formData
    })
    // .then(res=>{
    //     console.log(res);
    // 	// alert(res);
    // })
    // .then(res => res.json())
    .then(resjson => {
        return resjson;
    })
    .catch((error) => {
        alert('Video vượt quá dung lượng cho phép');
        console.log('loi');
        return 'loi';
    });
}
export default apiPostVideo;