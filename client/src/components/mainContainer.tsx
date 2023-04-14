import { useEffect, useState } from 'react';
import './mainContainer.css';
import CreateTask from './createTask';
import axios from 'axios';
import TaskBox from './taskBox';
import DeleteTask from './deleteTask';

interface TaskBody {
  title: string;
  section: string;
  time: string;
  date: string;
  _id: number;
}

const MainContainer = () => {
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [showDelTask, setShowDelTask] = useState(false);
  const [allTasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);

  const fetchTasks = async () => {
    await axios.get('http://localhost:5000/api').then((res) => {
      setTasks(res.data);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <>
      {showCreateTask && (
        <CreateTask hideTask={setShowCreateTask} setTasks={setTasks} allTasks={allTasks} />
      )}
      {showDelTask && (
        <DeleteTask
          hideDelTask={setShowDelTask}
          taskId={taskId}
          allTasks={allTasks}
          setTasks={setTasks}
        />
      )}

      <div className='container'>
        <div className='top-section'>
          <div className='container-left'>
            <h1>Your tasks</h1>
            <div className='tasks-stats'>
              <div className='tasks-stats-row'>
                <div className='task-stat-0'></div>
                <p>ALL TASKS</p>
                <p>0</p>
              </div>
              <div className='tasks-stats-row'>
                <div className='task-stat-1'></div>
                <p>PERSONAL</p>
                <p>0</p>
              </div>
              <div className='tasks-stats-row'>
                <div className='task-stat-2'></div>
                <p>WORK</p>
                <p>0</p>
              </div>
              <div className='tasks-stats-row'>
                <div className='task-stat-3'></div>
                <p>SCHOOL</p>
                <p>0</p>
              </div>
            </div>
          </div>
          <div className='container-right'>
            <h2>{new Date().toLocaleDateString()}</h2>
            <button
              className='new-task-btn'
              onClick={() => {
                setShowCreateTask(true);
              }}>
              ADD TASK
            </button>
          </div>
        </div>
        <div className='bottom-section'>
          {allTasks.map((task: TaskBody, key) => (
            <TaskBox
              key={key}
              title={task.title}
              section={task.section}
              time={task.time}
              id={task._id}
              date={task.date}
              showDelTask={setShowDelTask}
              setTaskId={setTaskId}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainContainer;
