const textareaWord = document.getElementById("textarea_word");
const textareaDef = document.getElementById("def");
const statusMsg = document.getElementById('status_msg');
const addButton = document.getElementById('button_submit')
const xhttp = new XMLHttpRequest();
const url = "https://stevenctemp.com/COMP4537/labs/4/api/definitions/"

addButton.addEventListener("click", () => {

    if (textareaWord.value == ""){
        statusMsg.style.color = 'red';
        statusMsg.innerText = "Please enter a word.";
    } else {
        console.log("sending");
        const params = "?word=" + textareaWord.value;
        xhttp.open("GET", url+formatURL(params), true);
        xhttp.onreadystatechange = () => {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                console.log("received");
                statusMsg.style.color = 'green';
                statusMsg.innerText = "Success!";
                textareaDef.innerText = JSON.parse(xhttp.response).msg;
            } else if (xhttp.readyState == 4 && xhttp.status != 200){
                statusMsg.style.color = 'red';
                statusMsg.innerText = "Something went wrong, status code: " + xhttp.status;
            }
            console.log(xhttp.readyState);
        }
        xhttp.send();
    }
});

function formatURL(line){
    return line.replace(" ", "%20");
}