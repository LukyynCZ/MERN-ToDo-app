import './taskBox.css';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { BiTimeFive, BiCalendar } from 'react-icons/bi';

interface TaskBody {
  title: string;
  section: string;
  time: string;
  id: number;
  date: string;
  showDelTask: any;
  setTaskId: (arg0: number) => void;
}

const TaskBox = ({ title, section, date, time, id, showDelTask, setTaskId }: TaskBody) => {
  return (
    <div className='task-wrapper'>
      <div className='task-wrapper-left'>
        <div className='complete-btn'></div>
        <div>
          <div>
            <div className='task-header-div'>
              <div className={`SECTION-div ${section}-div`}></div>
              <p>{title}</p>
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
        <div className='edit-btn'>
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
