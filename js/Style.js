const chatInput = document.querySelector(".chat-input textarea");
const sendChatbtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chat-bot");
const chatToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn")

let userMessage;
const API_Key = "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";
const inputinitHeigth = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // create a chat <li> element with passed message and classname

    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : ` <span class="material-symbols-outlined"> smart_toy </span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;

}

const generateResponse = (incomingChatli) => {
    const API_URl = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatli.querySelector("p");


    // Define the Properties and message for the Api request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_Key}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage },]
        })
    }

    // Send Post Request to API, Get respose     
    fetch(API_URl, requestOptions).then(res => res.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.textContent = "Oops! Something went Wrong, Please try again Later";
    })
}

const handlechat = () => {
    userMessage = chatInput.value.trim();
    //    console.log(userMessage);
    if (!userMessage) return;
    chatInput.style.height = `${inputinitHeigth}px`;


    //    Append the user message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        // Display " thinking.. " Message While waiting for the response

        const incomingChatli = createChatLi("Thinking....", "incoming");
        chatbox.appendChild(incomingChatli);
        generateResponse(incomingChatli);
    }, 400);

}

chatInput.addEventListener("input", () => {
    // Adjust textarea size 
    chatInput.style.height = `${inputinitHeigth}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
})


chatInput.addEventListener("keydown", (e) => {
    // Resize textarea after sending msg
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handlechat();
    }
})

sendChatbtn.addEventListener("click", handlechat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));

