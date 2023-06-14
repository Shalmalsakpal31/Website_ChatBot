const chatInput = document.querySelector(".chat-input textarea");
const sendChatbtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chat-bot");


let userMessage;

const createChatLi = (message, className) => {
    // create a chat <li> element with passed message and classname

    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : ` <span class="material-symbols-outlined"> smart_toy </span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;

}



const handlechat = () => {
    userMessage = chatInput.value.trim();
    //    console.log(userMessage);
    if (!userMessage) return;


    //    Append the user message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        // Display " thinking.. " Message While waiting for the response
        chatbox.appendChild(createChatLi("Thinking....", "incoming"));
    }, 600);

}

sendChatbtn.addEventListener("click", handlechat);