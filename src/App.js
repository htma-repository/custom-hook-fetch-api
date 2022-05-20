import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useFetch from "./components/hooks/use-fetch";

function App() {
  const [tasks, setTasks] = useState([]);
  const { isLoading, error, requestHttp: fetchTasks } = useFetch();

  useEffect(() => {
    const taskConf = (newData) => {
      const loadedTasks = [];

      for (const taskKey in newData) {
        loadedTasks.push({ id: taskKey, text: newData[taskKey].text });
      }

      setTasks(loadedTasks);
    };
    fetchTasks(
      {
        url: "https://custom-hooks-fetch-82ad9-default-rtdb.asia-southeast1.firebasedatabase.app/tasks.json",
      },
      taskConf
    );
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
