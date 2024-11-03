const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDWYxNYRUSESb3j3ikBTDOFM6UJeYI5i6o", {
  method: "POST",
  body: JSON.stringify({"contents":[{"parts":[{"text":"Explain how AI works"}]}]}), 
  headers: myHeaders,
});

console.log(response.candidates.contents.parts.text)