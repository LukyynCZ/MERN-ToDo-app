import { motion } from 'framer-motion';
import './deleteTask.css';
import axios from 'axios';
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
}

export const DeleteTask = ({ hideDelTask, taskId, setTasks, allTasks }: Props) => {
  const deleteTaskFunction = async (taskId: number) => {
    const newTasks = allTasks.filter((task: { _id: number }) => {
      return taskId != task._id;
    });
    setTasks(newTasks);

    await axios.delete(`http://localhost:5000/api/${taskId}`);
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
