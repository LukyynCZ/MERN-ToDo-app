import { motion } from 'framer-motion';
import './deleteTask.css';

interface Props {
  hideDelTask: (arg0: boolean) => void;
}

export const DeleteTask = ({ hideDelTask }: Props) => {
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
          <button className='btnDel1'>Delete</button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteTask;
