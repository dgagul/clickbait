const getCbtBtn = document.getElementById("get-Cbt-btn");
var headlines = document.getElementsByClassName("cd__headline-text");



const localhost = "http://127.0.0.1:5000/";
const URL = "https://regres.in/api/users";

const sendHttpRequest = (method, url, data) => {
    const promise = new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = "json";
        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        };
        // xhr.onerror = () => {
        //     reject("Something went wrong!");
        // };


        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization');
        if (data) {
            xhr.setRequestHeader('Content-Type', 'application/json');
        }
        xhr.send(JSON.stringify(data));
    });
    return promise;
};

const getClickbait = () => {
    sendHttpRequest("GET", localhost).then(responseData => {
        console.log(responseData);
    });
    // .catch(err => {
    //     console.log(err);
    // });
};

const sendRequest = () => {
    for(i=0; i< headlines.length; i++) {
        sendHttpRequest("POST", localhost, {headline: headlines[i].textContent}).then(responseData => {
            console.log(responseData);
        });
    };
};


getCbtBtn.addEventListener('click', sendRequest); 