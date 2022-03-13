import styles from "./styles.module.css";
import {StudentForm} from "../../../src/components";

const StudentNew = () => {
  return (
    <>
      <h1>Create a student</h1>
      <StudentForm isNew={true}/>
    </>
  );
}

export default StudentNew;
