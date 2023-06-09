import './taskBox.css';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BiTimeFive, BiCalendar } from 'react-icons/bi';
import { useState } from 'react';

interface TaskBody {
  title: string;
  section: string;
  time: string;
  id: number;
  date: string;
  showDelTask: any;
  setTaskId: (arg0: number) => void;
  showEdit: (arg0: boolean) => void;
  setTaskTitle: (arg0: string) => void;
  setTaskTime: (arg0: string) => void;
  setTaskDate: (arg0: string) => void;
  setTaskSection: (arg0: string) => void;
}

const TaskBox = ({
  title,
  section,
  date,
  time,
  id,
  showDelTask,
  setTaskId,
  setTaskTitle,
  showEdit,
  setTaskTime,
  setTaskDate,
  setTaskSection,
}: TaskBody) => {
  const [taskDone, setTaskDone] = useState(false);

  return (
    <div className='task-wrapper'>
      <div className='task-wrapper-left'>
        <div
          className='complete-btn'
          onClick={() => {
            setTaskDone(true);
            setTaskId(id);
            setTimeout(() => {
              showDelTask(true);
            }, 1000);
          }}></div>
        <div>
          <div>
            <div className='task-header-div'>
              <div className={`SECTION-div ${section}-div`}></div>
              <p style={{ textDecoration: taskDone ? 'line-through' : 'none' }}>{title}</p>
            </div>
            <div className='task-footer-div'>
              <div className='date-icon-div'>
                <BiCalendar size={20} className='date-icon' />
                {date}
              </div>
              <div className='time-icon-div'>
                <BiTimeFive size={20} className='time-icon' />
                {time}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='task-buttons'>
        <div
          className='edit-btn'
          onClick={() => {
            setTaskId(id);
            setTaskTitle(title);
            setTaskTime(time);
            setTaskDate(date);
            setTaskSection(section);
            showEdit(true);
          }}>
          <FaEdit size={35} className='edit-btn-icon' />
        </div>
        <div
          className='delete-btn'
          onClick={() => {
            setTaskId(id);
            showDelTask(true);
          }}>
          <RiDeleteBin5Fill size={35} className='delete-btn-icon' />
        </div>
      </div>
    </div>
  );
};

export default TaskBox;
