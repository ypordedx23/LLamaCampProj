import styles from "./styles.module.css";

const StudentItem = (props: any) => {
  const student = props.student;
  return (
    <a href={`/student/${student.id}`}>{student?.first_name ?? ""}</a>
  );
}

export default StudentItem;
