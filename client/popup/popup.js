const getCbtBtn = document.getElementById("get-Cbt-btn");
var headlines = document.getElementsByClassName("cd__headline-text");



const localhost = "http://127.0.0.1:5000/";
var statistics = document.getElementById("statistics");
var info = document.getElementById("info");


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
        xhr.onerror = () => {
            reject("Something went wrong!");
        };


        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE');
        xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type, X-Auth-Token, Origin, Authorization');
        xhr.send(JSON.stringify(data));
    });
    return promise;
};

const getClickbait = () => {
    sendHttpRequest("GET", localhost).then(responseData => {
        var websites = Object.keys(responseData)
        for(var website in websites){
            var nrClickbait = responseData[websites[website]][0];
            var nrTotal = responseData[websites[website]][1];
            // Create Statistics Label
            var label = document.createElement("label");
            label.setAttribute("for","file");
            label.insertAdjacentText('beforeend',`The percentage of clickbait on ${websites[website]} is:`);
            // Create Statistics Progress Bar
            var div = document.createElement("div");
            var p = document.createElement("p");
            p.insertAdjacentText('beforeend',`${Math.round(nrClickbait/nrTotal*100)}%`);
            var progress = document.createElement("progress");
            progress.setAttribute("id","file");
            progress.setAttribute("value",`${nrClickbait/nrTotal*100}`);
            progress.setAttribute("max","100");
            // Insert Label and Progress Bar
            div.appendChild(label);
            div.appendChild(p);
            div.appendChild(progress);
            div.setAttribute("class","webstat");
            statistics.appendChild(div);
        };
        if (websites.length > 0) {
            info.classList.toggle('active');
            statistics.classList.toggle('active');
        };
    });
};



getClickbait();