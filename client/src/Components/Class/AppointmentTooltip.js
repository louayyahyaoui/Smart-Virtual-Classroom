import React from 'react';

export default function AppointmentTooltip(model) {
  const { appointmentData } = model.data;
 
  return (
    <div style={{height:100}} >
      <div>Text: <strong>{appointmentData.text}</strong></div>
      <div>
      Description: <strong>{ appointmentData.description }</strong>
      </div>
     
    </div>
  );
}