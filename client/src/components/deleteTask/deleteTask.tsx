import { motion } from 'framer-motion';
import './deleteTask.css';
import axios, { all } from 'axios';
interface TaskBody {
  title: string;
  section: string;
  time: string;
  date: string;
  _id: number;
}
interface Props {
  hideDelTask: (arg0: boolean) => void;
  taskId: number;
  allTasks: TaskBody[] | null | [] | any;
  setTasks: (arg0: []) => void;
  setAllTasksCounter: (arg0: number) => void;
  allTasksCounter: number;
  setPersonalCounter: (arg0: any) => void;
  personalCounter: number;
  setWorkCounter: (arg0: number) => void;
  workCounter: number;
  setSchoolCounter: (arg0: number) => void;
  schoolCounter: number;
}

export const DeleteTask = ({
  hideDelTask,
  taskId,
  setTasks,
  allTasks,
  setAllTasksCounter,
  allTasksCounter,
  setPersonalCounter,
  personalCounter,
  setWorkCounter,
  workCounter,
  setSchoolCounter,
  schoolCounter,
}: Props) => {
  const deleteTaskFunction = async (taskId: number) => {
    allTasks.forEach((task: { section: string; _id: number }) => {
      if (task._id == taskId) {
        if (task.section == 'PERSONAL') setPersonalCounter(personalCounter - 1);
        if (task.section == 'WORK') setWorkCounter(workCounter - 1);
        if (task.section == 'SCHOOL') setSchoolCounter(schoolCounter - 1);
      }
    });
    const newTasks = allTasks.filter((task: { _id: number }) => {
      return taskId != task._id;
    });
    setAllTasksCounter(allTasksCounter - 1);
    setTasks(newTasks);

  
    await axios.delete(`http://localhost:5000/api/${taskId}`).catch((err) => console.log(err));
  };

  return (
    <motion.div className='divWrapperDel' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className='deleteTaskDiv' initial={{ scale: 0 }} animate={{ scale: 1 }}>
        <p>Delete Task</p>
        <div className='deleteBtnGroup'>
          <button
            className='btnCancel2'
            onClick={() => {
              hideDelTask(false);
            }}>
            Cancel
          </button>
          <button
            className='btnDel1'
            onClick={() => {
              hideDelTask(false);
              deleteTaskFunction(taskId);
            }}>
            Delete
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteTask;
