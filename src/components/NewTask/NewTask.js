import React from "react";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useFetch from "../hooks/use-fetch";

const NewTask = (props) => {
  const { isLoading, error, requestHttp } = useFetch();

  const enterTaskHandler = (taskText) => {
    const taskConf = (newData) => {
      const generatedId = newData.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };

      props.onAddTask(createdTask);
    };

    requestHttp(
      {
        url: "https://custom-hooks-fetch-82ad9-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: { text: taskText },
      },
      taskConf
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
