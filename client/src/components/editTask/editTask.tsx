import { useState } from 'react';
import './editTask.css';
import axios from 'axios';

interface TaskBody {
  title: string;
  showEdit: (arg0: boolean) => void;
  id: number;
  date: string;
  time: string;
  section: string;
  setTasks: (arg0: any) => void;
  allTasks: any;
  setPersonalTasksCounter: (arg0: number) => void;
  personalTasksCounter: number;
  setWorkTasksCounter: (arg0: number) => void;
  workTasksCounter: number;
  setSchoolTasksCounter: (arg0: number) => void;
  schoolTasksCounter: number;
}

const EditTask = ({
  showEdit,
  title,
  date,
  time,
  section,
  id,
  setTasks,
  allTasks,
  setPersonalTasksCounter,
  personalTasksCounter,
  setWorkTasksCounter,
  workTasksCounter,
  setSchoolTasksCounter,
  schoolTasksCounter,
}: TaskBody) => {
  const [editedTitle, setEditedTitle] = useState('');
  const [editedSection, setSection] = useState('');
  const [editedTime, setTime] = useState('');
  const [editedDate, setDate] = useState('');

  const handleSubmit = async () => {
    const newTitle = editedTitle.length === 0 ? title : editedTitle;
    const newSection = editedSection.length === 0 ? section : editedSection;
    const newTime = editedTime.length === 0 ? time : editedTime;
    const newDate = editedDate.length === 0 ? date : editedDate;

    allTasks.forEach((task: any) => {
      if (task._id == id) {
        task.title = newTitle;
        task.section = newSection;
        task.time = newTime;
        task.date = newDate;
      }
    });
    await axios
      .put(`http://localhost:5000/api/${id}`, {
        title: newTitle,
        section: newSection,
        time: newTime,
        date: newDate,
      })
      .catch((err) => {
        console.log(err);
      });
    if (newSection === 'PERSONAL') {
      setPersonalTasksCounter((personalTasksCounter += 1));
    }
    if (newSection === 'WORK') {
      setWorkTasksCounter((workTasksCounter += 1));
    }
    if (newSection === 'SCHOOL') {
      setSchoolTasksCounter((schoolTasksCounter += 1));
    }

    if (section === 'PERSONAL') {
      setPersonalTasksCounter((personalTasksCounter -= 1));
    }
    if (section === 'WORK') {
      setWorkTasksCounter((workTasksCounter -= 1));
    }
    if (section === 'SCHOOL') {
      setSchoolTasksCounter((schoolTasksCounter -= 1));
    }

    setEditedTitle('');
    setSection('');
    setTime('');
    setDate('');
    setTasks(allTasks);
  };

  return (
    <div className='editTaskWrapper'>
      <div className='editTaskBody'>
        <p>Task : {title}</p>
        <div className='inputsEdit'>
          <input
            type='text'
            placeholder='Change task name'
            onChange={(e) => setEditedTitle(e.target.value)}
          />
          <input type='time' onChange={(e) => setTime(e.target.value)} />
          <input type='date' onChange={(e) => setDate(e.target.value)} />
        </div>
        <div className='radio-buttons'>
          <div>
            <input
              type='radio'
              id='personal'
              value='PERSONAL'
              name='sectionType'
              onChange={(e) => setSection(e.target.value)}
            />
            <label htmlFor='personal'>PERSONAL</label>
          </div>
          <div>
            <input
              type='radio'
              id='work'
              value='WORK'
              name='sectionType'
              onChange={(e) => setSection(e.target.value)}
            />
            <label htmlFor='work'>WORK</label>
          </div>
          <div>
            <input
              type='radio'
              id='school'
              value='SCHOOL'
              name='sectionType'
              onChange={(e) => setSection(e.target.value)}
            />
            <label htmlFor='school'>SCHOOL</label>
          </div>
        </div>
        <div className='buttonGroupEdit'>
          <button
            className='submitBtnEdit'
            onClick={() => {
              handleSubmit();
              showEdit(false);
            }}>
            SUBMIT
          </button>
          <button
            className='cancelBtnEdit'
            onClick={() => {
              showEdit(false);
            }}>
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
