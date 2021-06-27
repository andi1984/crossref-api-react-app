import React, { ChangeEvent, FC, useState } from "react";
import APILayer from "./APILayer";
import styled from "styled-components";

const ClickableListItem = styled.li`
  cursor: pointer;
`;

const App: FC<{}> = () => {
  const DEFAULT_REPO = "10.1123/jsep.2020-0043";
  const [dois, setDois] = useState([DEFAULT_REPO]);
  const onChange = (el: ChangeEvent<HTMLInputElement>) => {
    setDois((dois) => [el.target.value, ...dois]);
  };

  return (
    <div>
      <h1>Crossref DOI Search</h1>
      <fieldset>
        <legend>DOI</legend>
        <label htmlFor="doi">Enter a DOI:</label>
        <input id="doi" type="text" value={dois[0]} onChange={onChange} />
      </fieldset>
      <span>Latest searches</span>
      <ol>
        {Array.from(new Set(dois))
          .filter(Boolean)
          .map((doi) => (
            <ClickableListItem
              onClick={() => setDois((dois) => [doi, ...dois])}
            >
              {doi}
            </ClickableListItem>
          ))}
      </ol>

      <APILayer doi={dois[0]} />
    </div>
  );
};

export default App;
