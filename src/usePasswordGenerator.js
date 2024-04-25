import React, { useState } from "react";

const usePasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const generatePassword = (checkboxData, length) => {
    let charset = "",
      generatedPassword = "";
    const selectedOptions = checkboxData.filter((x) => x.state);

    if (!selectedOptions.length) {
      setErrorMessage("Select at least one option");
      setPassword("");
      return;
    }

    selectedOptions.forEach((option) => {
      switch (option.title) {
        case "Uppercase letters":
          charset += "ABCDEFGHIJLKMNOPQRSTUVWXYZ";
          break;
        case "Lowercase letters":
          charset += "abcdefghijklmnopqrstuvwxyz";
          break;
        case "Numbers":
          charset += "0123456789";
          break;
        case "Symbols":
          charset += "!@#$%^&*()_+{}[]<>/?";
        default:
          break;
      }
    });
    console.log(charset);
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }
    setPassword(generatedPassword);
    setErrorMessage("");
  };

  return { password, errorMessage, generatePassword };
};

export default usePasswordGenerator;
