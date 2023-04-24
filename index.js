window.addEventListener("DOMContentLoaded", (_event) => {
  const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
  const synth = window.speechSynthesis;
  console.log(synth.getVoices())

  const recognition = new SpeechRecognition();

  const textContainer = document.getElementById("text-container");

  recognition.continuous = true;
  recognition.lang = "en-US";
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  const createTextElement = () => {
    const textElement = document.createElement("p")
    textElement.classList.add("text-lg")
    textContainer.appendChild(textElement)
  }

  const textToSpeech = (text) => {
    const utterThis = new SpeechSynthesisUtterance(text);
    utterThis.pitch = 0.5
    synth.speak(utterThis);
  }

  document.onclick = () => {
    recognition.start();
    console.log("LETS GOOOOO.");
  };


  recognition.onresult = (event) => {
    const textData = event.results[event.resultIndex]
    const text = textData[0]
    console.log("Confidence:", text.confidence)
    console.log("Speech:", text.transcript)

    const textElement = textContainer.lastElementChild || createTextElement();
    textElement.innerHTML = text.transcript;

    console.log(textData.isFinal)
    if(textData.isFinal) {
      textToSpeech(text.transcript);
      createTextElement();
    }
  };
});
