import { GoogleGenerativeAI } from "@google/generative-ai";
  
// Fetch your API_KEY
const API_KEY = "AIzaSyAliq2aXd5BF51vve-OHmfAp82Wp1Z1AVA";

// Access your API key (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(API_KEY);

// ...

// Declare model variable in the broader scope
let model;
  
async function run() {
    // For text-only input, use the gemini-pro model
    model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Hello, I have 2 dogs in my house." }],
            },
            {
                role: "model",
                parts: [{ text: "Great to meet you. What would you like to know?" }],
            },
        ],
        generationConfig: {
            maxOutputTokens: 100,
        },
    });
}

run();

// Function to send user message and receive bot response
// Function to send user message and receive bot response
// Function to send user message and receive bot response
async function sendMessage(message) {
    // Display user message in chat box
    displayMessage(message, 'user');

    // Check if the message contains code
    const containsCode = /```[\s\S]*?```/.test(message);

    // If the message contains code, apply code formatting
    if (containsCode) {
        // Replace code block with formatted HTML
        message = message.replace(/```([\s\S]*?)```/g, '<code>$1</code>');
    }

    // Generate bot response based on user message
    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    // Display bot response in chat box
    displayMessage(text, 'bot');
}

function formatMessage(message) {
    // Replace **text** with bold tags
    message = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Replace *text* with italic tags
    message = message.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Replace <br> with line breaks
    message = message.replace(/<br>/g, '<br>');

    return message;
}

function displayMessage(message, sender) {
    const chatOptionElement = document.querySelector('.chat-box .option'); // Select the option div
    const messageElement = document.createElement('div'); // Create a <div> element
    
    // Add appropriate classes based on the sender
    messageElement.classList.add('message');
    messageElement.classList.add(`${sender}-message`);

    // Format the message
    const formattedMessage = formatMessage(message);

    // Set the HTML content of the message element
    messageElement.innerHTML = formattedMessage;

    chatOptionElement.appendChild(messageElement);

    // Add a line break after each message
    chatOptionElement.appendChild(document.createElement('br'));

    // Scroll to bottom of chat box
    chatOptionElement.scrollTop = chatOptionElement.scrollHeight;
}

// Function to handle user input
function handleUserInput() {
    const userInput = document.getElementById('user-input').value.trim();

    // Check if user input is not empty
    if (userInput !== '') {
        // Send user message to the bot
        sendMessage(userInput);

        // Clear input field
        document.getElementById('user-input').value = '';
    }
}

// Event listener for send button click
document.getElementById('send-btn').addEventListener('click', () => {
    handleUserInput();
});

// Event listener for pressing enter key in input field
document.getElementById('user-input').addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        handleUserInput();
    }
});