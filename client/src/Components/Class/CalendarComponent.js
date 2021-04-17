import React from "react";
//import { Button, Modal, Form, Input, TextArea } from "semantic-ui-react";
//import { useFormik } from "formik";
//import * as Yup from "yup";
//import { useState } from "react";
import { Scheduler, Editing, Resource } from "devextreme-react/scheduler";
import { resourcesData } from "../../api/data";
import CustomStore from "devextreme/data/custom_store";
import "whatwg-fetch";

function isNotEmpty(value) {
  return value !== undefined && value !== null && value !== "";
}
function handleErrors(response) {
  if (!response.ok) throw Error(response.statusText);
  return response;
}
const schedulerDataSource = {
  store: new CustomStore({
    load: () => {
      return fetch("https://closer-server.herokuapp.com//scheduler/")
        .then(handleErrors)
        .then((response) => response.json());
    },
    insert: (values) => {
      return fetch("https://closer-server.herokuapp.com//scheduler/", {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          "Content-Type": "application/json",
        },
      }).then(handleErrors);
    },
    remove: (key) => {
      return fetch(
        `https://closer-server.herokuapp.com//scheduler/${key._id}`,
        {
          method: "DELETE",
        }
      ).then(handleErrors);
    },
    update: (key, values) => {
      return fetch(
        `https://closer-server.herokuapp.com//scheduler/${key._id}`,
        {
          method: "PUT",
          body: JSON.stringify(values),
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then(handleErrors);
    },
    paginate: false,
  }),
};
export default function CalendarComponent() {
  const views = ["day", "week", "month"];
  return (
    <div>
      <Scheduler
        dataSource={schedulerDataSource}
        showAllDayPanel={true}
        views={views}
        defaultCurrentView="month"
      >
        <Editing allowUpdating={true} allowAdding={true} allowDeleting={true} />
        <Resource
          fieldExpr="sectionId"
          allowMultiple={true}
          dataSource={resourcesData}
          label="Section"
          useColorAsDefault={true}
        />
      </Scheduler>
    </div>
  );
}
