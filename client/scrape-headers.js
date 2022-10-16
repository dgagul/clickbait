// Scrape headlines form the News websites by using the news related class attribute
var headlines1 = document.getElementsByClassName("cd__headline-text");
var headlines2 = document.getElementsByClassName("story__title");
var headlines3 = document.getElementsByClassName("news-title");
var headlines4 = document.getElementsByClassName("sc-rnw73m-7");
var headlines5 = document.getElementsByClassName("sc-abcdd5a8-0");
var headlines6 = document.getElementsByClassName("sc-64f6d9a0-0");




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
} else if (headlines4["length"] > 0) {
    var headlines = document.getElementsByClassName("sc-rnw73m-7");
    var web = "20 Minuten";
} else if (headlines5["length"] > 0 || headlines6["length"] > 0) {
    var headlines = document.querySelectorAll('.sc-abcdd5a8-0, .sc-64f6d9a0-0')  
    console.log(headlines)
    var web = "Blick";
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

// Prepare payload
var headlineTexts = []
for(i=0; i< headlines.length; i++) {
    headlineTexts[i] = headlines[i].textContent
};

// Function to send request and handle response
sendHttpRequest("POST", localhost, {headlineTexts: headlineTexts, website: web}).then(responseData => {
    for(i=0; i< responseData.length; i++) {
        const cbt_headline = headlines[i]
        const idx = i;
        if (responseData[i][0]["label"] == "Clickbait") {
            console.log("******clickbait******")
            console.log(cbt_headline.textContent)
            console.log(responseData[i]);
            cbt_headline.style.color = "#D3D3D3"
            cbt_headline.classList.toggle('clickbait');
            cbt_headline.setAttribute("id", `cb${idx}`);
            var div = document.createElement("div")
            div.insertAdjacentText('beforeend',`This link is probably (${responseData[i][0]["score"]}%) clickbait.`);
            div.classList.toggle('cb-information');
            div.classList.toggle('font--16px');
            div.setAttribute("id",`info${idx}`);
            let parentDiv = cbt_headline.parentNode;
            parentDiv.classList.toggle('relative');
            parentDiv.insertBefore(div, cbt_headline)
        };
    };
});
















