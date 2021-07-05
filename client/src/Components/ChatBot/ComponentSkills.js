import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";

export default function ComponentSkills(
  { triggerNextStep, refreshSkills }
) {
  const [skills, SetSkills] = useState([]);

  const handleChangeTag = (tag) => {
    SetSkills(tag);
  };

  const handleClickButton = () => {
    triggerNextStep({ trigger: "interests-ask" });
    refreshSkills(skills);
  };

  return (
    <>
      <TagsInput value={skills} onChange={handleChangeTag} />
      <div style={{ maxHeight: "10%" }}>
        <Button onClick={handleClickButton} basic color="red">
          Next
        </Button>
      </div>
    </>
  );
}
