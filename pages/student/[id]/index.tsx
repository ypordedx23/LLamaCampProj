import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

import {StudentForm} from "../../../src/components";

import styles from "./styles.module.css";
import Config from "../../../src/config";


const StudentNew = () => {
  const router = useRouter()
  const query = router.query;
  const studentId = query.id;
  const [student, setStudent] = useState(undefined);

  useEffect(() => {
    if (!!studentId) {
      axios
        .get(`${Config.studentsApi}/${studentId}`)
        .then((response) => {
          setStudent(currentStudent => ({...currentStudent, ...response.data}));
        })
        .catch((error) => {
          console.error("There was getting student info");
        });
    }
  }, [studentId]);

  return (
    <>
      <h1>Updating student info</h1>
      <StudentForm
        student={student}
        isNew={false}
      />
    </>
  );
}

export default StudentNew;
