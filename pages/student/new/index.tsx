import styles from "./styles.module.css";
import {StudentForm} from "../../../src/components";

const StudentNew = () => {
  return (
    <div>
      <h1>Create Student Form</h1>
      <StudentForm 
        isNew={true}
        student = {{soft_skills:[], tech_skills:[], work_experience:[]}}
        />
    </div>
  );
}

export default StudentNew;
