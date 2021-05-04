import React from 'react';
import ReactDOM from 'react-dom';
import Hologram from '../../src/components/Hologram';

window.hologram = function (element, option) {
  ReactDOM.render(
    <div>
      <Hologram {... option}/>
    </div>,
    element
  );
}
