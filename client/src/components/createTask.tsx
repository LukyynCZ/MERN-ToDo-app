import { useState } from 'react';
import './createTask.css';
import { CiCircleRemove } from 'react-icons/ci';
import axios from 'axios';
import { motion } from 'framer-motion';

interface TaskBody {
  title: string;
  section: string;
  time: string;
  date: string;
}

interface Props {
  [x: string]: any;
  allTasks: TaskBody[];
  hideTask(arg0: boolean): unknown;
}

const CreateTask = (props: Props) => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');
  const [section, setSection] = useState('');

  const handleAddTask = async () => {
    if (!title || !time || !date || !section) {
      alert('All fields are required!');
    } else {
      await axios
        .post('http://localhost:5000/api', {
          title,
          time,
          date,
          section,
        })
        .catch((error) => console.log(error));
      props.setTasks([...props.allTasks, { title, time, date, section }]);
      props.hideTask(false);
    }
  };

  return (
    <motion.div className='createTaskWrapper' initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div
        transition={{ duration: 0.2 }}
        initial={{ y: 500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}>
        <div className='createTaskSection'>
          <p className='createTaskText'>Create Task</p>
          <div className='inputs'>
            <input
              className='taskInput'
              type='text'
              placeholder='Task'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input className='timeInput' type='time' onChange={(e) => setTime(e.target.value)} />
            <input type='date' onChange={(e) => setDate(e.target.value)} />
          </div>
          <div className='radio-section'>
            <div className='radio-vyber'>
              <input
                type='radio'
                name='section'
                id='personal'
                value='PERSONAL'
                onChange={(e) => setSection(e.target.value)}
              />
              <label htmlFor='personal'>PERSONAL</label>
            </div>
            <div className='radio-vyber'>
              <input
                type='radio'
                name='section'
                id='work'
                value='WORK'
                onChange={(e) => setSection(e.target.value)}
              />
              <label htmlFor='work'>WORK</label>
            </div>
            <div className='radio-vyber'>
              <input
                type='radio'
                name='section'
                id='school'
                value='SCHOOL'
                onChange={(e) => setSection(e.target.value)}
              />
              <label htmlFor='school'>SCHOOL</label>
            </div>
          </div>
          <div className='btn-position'>
            <button className='new-task-btn position-btn' onClick={handleAddTask}>
              ADD TASK
            </button>
            <CiCircleRemove
              size={70}
              className='exit-btn'
              onClick={() => {
                props.hideTask(false);
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CreateTask;
