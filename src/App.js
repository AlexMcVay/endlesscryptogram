import { useState, useEffect } from "react";

// List of cryptogram phrases with their authors
const phrases = [
  //{ text: "HELLO, WORLD!", author: "Anonymous" },
  //{ text: "ALYA.", author: "Alya" },
  { text: "IT'S A BEAUTIFUL DAY", author: "Anonymous" },
];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function Cryptogram() {
  const [phraseData, setPhraseData] = useState(null);
  const [mapping, setMapping] = useState({});
  const [inputs, setInputs] = useState([]);
  const [error, setError] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const selectedPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setPhraseData(selectedPhrase);

    let number = 1;
    const newMapping = {};
    alphabet.split("").forEach((letter) => {
      newMapping[letter] = number++;
    });
    setMapping(newMapping);
    setInputs(Array(selectedPhrase.text.length).fill(""));
  }, []);

  const handleChange = (index, value) => {
    if (!phraseData) return;
    if (value.length > 1) return;

    const uppercaseValue = value.toUpperCase();
    if (alphabet.includes(phraseData.text[index]) && uppercaseValue !== phraseData.text[index]) {
      setError(`Incorrect letter: ${uppercaseValue}`);
      return;
    }

    setError("");
    const newInputs = [...inputs];
    newInputs[index] = uppercaseValue;
    setInputs(newInputs);

    // Check if the cryptogram is complete
    const solved = phraseData.text.split("").every((char, i) => {
      return !alphabet.includes(char) || newInputs[i] === char;
    });
    setIsComplete(solved);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto", textAlign: "center" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px" }}>Cryptogram Game</h1>
      {error && <div style={{ color: "red", marginBottom: "10px" }}>{error}</div>}
      <div style={{ padding: "15px", border: "1px solid black", borderRadius: "8px", display: "inline-block" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            justifyContent: "center",
            maxWidth: "100%",
          }}
        >
          {phraseData &&
            phraseData.text.split("").map((char, index) => {
              const isLetter = alphabet.includes(char);

              return (
                <div
                  key={index}
                  style={{
                    textAlign: "center",
                    display: "inline-block",
                  }}
                >
                  {isLetter ? (
                    <>
                      <div style={{ fontSize: "14px", fontWeight: "bold" }}>
                        {mapping[char]}
                      </div>
                      <input
                        style={{
                          width: "24px",
                          height: "24px",
                          textAlign: "center",
                          border:
                            inputs[index] === char
                              ? "2px solid green"
                              : "1px solid gray",
                          fontSize: "16px",
                        }}
                        value={inputs[index] || ""}
                        onChange={(e) => handleChange(index, e.target.value)}
                        maxLength={1}
                      />
                    </>
                  ) : (
                    <div
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        height: "48px",
                        lineHeight: "48px",
                      }}
                    >
                      {char}
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      {isComplete && phraseData && (
        <div style={{ marginTop: "15px", color: "green", fontWeight: "bold" }}>
          Congratulations! You solved the cryptogram. Author: {phraseData.author}
        </div>
      )}
      <footer style={{ marginTop: "20px", color: "gray" }}>
        Created by Alex McVay <a href="https://alexmcvay.icu" target="_blank" rel="noopener noreferrer">Click here to see more</a>
      </footer>
    </div>
  );
}
