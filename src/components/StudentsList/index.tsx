import {useEffect, useState} from "react";
import axios from "axios";

import StudentListItem from "../StudentListItem";

import styles from "./styles.module.css";
import Config from "../../config";

const StudentsList = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axios
      .get(Config.studentsApi)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("There was an error getting students from API");
      });
  }, []);

  return (
    <>
      <div className={styles.studentsListContainer}>
        {
          students.map((student: any) => {
            return (
              <StudentListItem key={student.id} student={student}/>
            );
          })
        }
      </div>
      <div>
        <a href={"/student/new"} type={"button"}>Add</a>
      </div>
    </>
  );
}


export default StudentsList;
