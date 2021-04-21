import React from 'react';
import Query from 'devextreme/data/query';
import { resourcesData } from '../../api/data';

function getSectionById(id) {
  return Query(resourcesData).filter(['id', id]).toArray()[0];
}
export default function Appointment(model) {
  const documentData = JSON.parse(localStorage.getItem("user"));
  const { appointmentData } = model.data;
 const dd = getSectionById(appointmentData.sectionId) || {};
  return (
    <div style={{height:100}} >
      <div>Text: <strong>{appointmentData.text}</strong></div>
      <div>
      Description: <strong>{ appointmentData.description }</strong>
      </div>
      <div>
      Owner: <strong>{ appointmentData.postOwner.name }</strong>
      </div>
      <div>
      Type: <strong>{ dd.text }</strong>
      </div>
     
    </div>
  );
}