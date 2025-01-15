// Add an event listener to the "read-email" button. When clicked, it will fetch the active tab and execute a script in that tab.
document.getElementById("read-email").addEventListener("click", async () => {
  // Retrieve the currently active tab in the current window
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  // Execute the readEmailContent function in the context of the current active tab
  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: readEmailContent 
  });
});

// Function to extract and read aloud the content of the email from Gmail
function readEmailContent() {
  // Select the email content by querying the Gmail-specific class '.a3s' which represents email body
  const emailContent = document.querySelector('.a3s'); // Class representing email content in Gmail
  // Check if the email content is found
  if (emailContent) {
      const msg = new SpeechSynthesisUtterance(emailContent.innerText);
      window.speechSynthesis.speak(msg);
  } else {
      alert("No email content found!");
  }
}
