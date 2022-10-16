// Scrape headlines form the News websites by using the news related class attribute
var headlines1 = document.getElementsByClassName("cd__headline-text");
var headlines2 = document.getElementsByClassName("story__title");
var headlines3 = document.getElementsByClassName("news-title");

// Check if headlines have values and assign variables "headlines" and "web"
if (headlines1["length"] > 0) {
    var headlines = document.getElementsByClassName("cd__headline-text");
    var web = "CNN";
} else if (headlines2["length"] > 0) {
    var headlines = document.getElementsByClassName("story__title");
    var web = "Mirror";
} else if (headlines3["length"] > 0) {
    var headlines = document.getElementsByClassName("news-title");
    var web = "DailyFeed";
}

// URL of the server with the running backend
const localhost = "http://127.0.0.1:5000/";

// Function to send Http requests to the backend 
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
        // Add headers to resolve Same Origin Policy 
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


for(i=0; i< headlines.length; i++) {
    console.log(headlines[i].textContent)
    const cbt_headline = headlines[i]
    const idx = i;
    sendHttpRequest("POST", localhost, {headline: headlines[i].textContent, website: web}).then(responseData => {
        //if (responseData[0]["label"] == "CLICKBAIT") {
        if (responseData[0]["label"] == "Clickbait") {
            console.log("******was clickbait******")
            console.log(cbt_headline.textContent)
            console.log(responseData);
            cbt_headline.style.color = "#D3D3D3"
            cbt_headline.classList.toggle('clickbait');
            cbt_headline.setAttribute("id", `cb${idx}`);
            var div = document.createElement("div")
            div.insertAdjacentText('beforeend',`This link is probably (${responseData[0]["score"]}%) clickbait.`);
            div.classList.toggle('cb-information');
            div.classList.toggle('font--16px');
            div.setAttribute("id",`info${idx}`);
            let parentDiv = cbt_headline.parentNode;
            parentDiv.classList.toggle('relative');
            parentDiv.insertBefore(div, cbt_headline)
        };
    });
};









