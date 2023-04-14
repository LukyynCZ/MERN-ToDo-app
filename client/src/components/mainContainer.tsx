import { useEffect, useState } from 'react';
import './mainContainer.css';
import CreateTask from './createTask';
import axios from 'axios';
import TaskBox from './taskBox';
import DeleteTask from './deleteTask';
import EditTask from './editTask';

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
  const [showEditTask, setShowEditTask] = useState(false);
  const [allTasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(0);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskTime, setTaskTime] = useState('');
  const [taskDate, setTaskDate] = useState('');
  const [taskSection, setTaskSection] = useState('');

  // Tasks counter
  const [allTasksCounter, setAllTasksCounter] = useState(0);
  const [personalTasksCounter, setPersonalTasksCounter] = useState(0);
  const [workTasksCounter, setWorkTasksCounter] = useState(0);
  const [schoolTasksCounter, setSchoolTasksCounter] = useState(0);

  const fetchTasks = async () => {
    await axios.get('http://localhost:5000/api').then((res) => {
      setTasks(res.data);
      setAllTasksCounter(res.data.length);
      setPersonalTasksCounter(
        res.data.filter((task: TaskBody) => task.section === 'PERSONAL').length
      );
      setWorkTasksCounter(res.data.filter((task: TaskBody) => task.section === 'WORK').length);
      setSchoolTasksCounter(res.data.filter((task: TaskBody) => task.section === 'SCHOOL').length);
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  console.log(allTasks);
  return (
    <>
      {showCreateTask && (
        <CreateTask
          hideTask={setShowCreateTask}
          setTasks={setTasks}
          allTasks={allTasks}
          setAllTasksCounter={setAllTasksCounter}
          allTasksCounter={allTasksCounter}
          setPersonalTasksCounter={setPersonalTasksCounter}
          personalTasksCounter={personalTasksCounter}
          setWorkTasksCounter={setWorkTasksCounter}
          workTasksCounter={workTasksCounter}
          setSchoolTasksCounter={setSchoolTasksCounter}
          schoolTasksCounter={schoolTasksCounter}
        />
      )}
      {showDelTask && (
        <DeleteTask
          hideDelTask={setShowDelTask}
          taskId={taskId}
          allTasks={allTasks}
          setTasks={setTasks}
          setAllTasksCounter={setAllTasksCounter}
          allTasksCounter={allTasksCounter}
          setPersonalCounter={setPersonalTasksCounter}
          personalCounter={personalTasksCounter}
          setWorkCounter={setWorkTasksCounter}
          workCounter={workTasksCounter}
          setSchoolCounter={setSchoolTasksCounter}
          schoolCounter={schoolTasksCounter}
        />
      )}

      {showEditTask && (
        <EditTask
          showEdit={setShowEditTask}
          time={taskTime}
          date={taskDate}
          section={taskSection}
          title={taskTitle}
          id={taskId}
          setTasks={setTasks}
          allTasks={allTasks}
          setPersonalTasksCounter={setPersonalTasksCounter}
          personalTasksCounter={personalTasksCounter}
          setWorkTasksCounter={setWorkTasksCounter}
          workTasksCounter={workTasksCounter}
          setSchoolTasksCounter={setSchoolTasksCounter}
          schoolTasksCounter={schoolTasksCounter}
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
                <p>{allTasksCounter}</p>
              </div>
              <div className='tasks-stats-row'>
                <div className='task-stat-1'></div>
                <p>PERSONAL</p>
                <p>{personalTasksCounter}</p>
              </div>
              <div className='tasks-stats-row'>
                <div className='task-stat-2'></div>
                <p>WORK</p>
                <p>{workTasksCounter}</p>
              </div>
              <div className='tasks-stats-row'>
                <div className='task-stat-3'></div>
                <p>SCHOOL</p>
                <p>{schoolTasksCounter}</p>
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
              showEdit={setShowEditTask}
              showDelTask={setShowDelTask}
              setTaskId={setTaskId}
              setTaskTitle={setTaskTitle}
              setTaskTime={setTaskTime}
              setTaskDate={setTaskDate}
              setTaskSection={setTaskSection}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainContainer;
