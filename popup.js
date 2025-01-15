document.getElementById("read-email").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: readEmailContent
    });
  });
  
  function readEmailContent() {
    const emailContent = document.querySelector('.a3s'); // מחלקה שמייצגת תוכן מייל בג'ימייל
    if (emailContent) {
      const msg = new SpeechSynthesisUtterance(emailContent.innerText);
      window.speechSynthesis.speak(msg);
    } else {
      alert("No email content found!");
    }
  }
  