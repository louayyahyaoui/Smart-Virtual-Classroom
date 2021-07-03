import React from "react";
import { useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
const LanguageOptions = [
  { key: "af", value: "English", flag: "uk", text: "English" },
  { key: "ax", value: "French", flag: "fr", text: "French" },
  { key: "al", value: "Spanich", flag: "es", text: "Spanich" },
  { key: "dz", value: "Arabe", flag: "sa", text: "Arabe" },
  { key: "as", value: "Germany", flag: "de", text: "Germany" },
  { key: "ad", value: "Japanaase", flag: "jp", text: "Japanaase" },
  { key: "ao", value: "Korean", flag: "kp", text: "Korean" },
];
export default function ComponentLanguages(
  { triggerNextStep, refreshLanguages }
) {
  const [languages, SetLanguages] = useState([]);

  const handleChange = (e, { name, value }) => {
    console.log(value);
    SetLanguages(value);

  }

  const handleClickButton = () => {
    triggerNextStep({ trigger: "skillsAsk" });
    refreshLanguages(languages);
  };

  return (
    <>
      <Dropdown
        clearable
        fluid
        search
        multiple
        selection
        options={LanguageOptions}
        placeholder="Select Languages"
        value={languages}
        onChange={handleChange}
      />
      <div style={{ maxHeight: "10%" }}>
        <Button onClick={handleClickButton} basic color="red">
          Next
        </Button>
      </div>
    </>
  );
}
