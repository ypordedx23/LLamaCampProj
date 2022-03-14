import axios from "axios";
import { useEffect, useState } from "react";
import Config from "../../config";
import
StudentSkillItem from "../StudentSkillItem";

type StudentFormProp = {
  student?: any,
  isNew?: boolean,
}

const StudentForm = (props: StudentFormProp) => {
  const studentId = props?.student?.id;
  const [student, setStudent] = useState(props.student);
  const [isNew, setIsNew] = useState(props?.isNew ?? false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setStudent(props.student);
  }, [studentId]);

  const handleInputsValues = (event: any) => {
    const { name, value, files } = event.target;
    setStudent({ ...student, [name]: value });
  }

  const handleFileUpload = async (event: any) => {
    const file = event.target.files[0];
    const base64 = await convertBase64(file);
    const { name } = event.target;
    setStudent({ ...student, [name]: base64 });
  }

  const convertBase64 = (file: any) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSetMessage = (message: string) => {
    setMessage(message);
    const interval = setInterval(() => {
      setMessage("");
      clearInterval(interval);
    }, 3000);
  }

  const handleSaveStudent = (event: any) => {
    event.preventDefault();
    setLoading(true);

    if (isNew) {
      console.log("Creating a new student...", student);
      axios
        .post(Config.studentsApi, student)
        .then((response) => {
          handleSetMessage("User created!");
          setStudent({
            id: "",
            first_name: "",
            last_name: "",
            picture: ""
          })
          console.log("Create user response", response.data);
        })
        .catch((error) => {
          console.error("There was an error creating a student.", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log("Updating student info...", student);
      axios
        .put(`${Config.studentsApi}/${student.id}`, student)
        .then((response) => {
          handleSetMessage("User updated!");
          console.log("Create user response", response.data);
        })
        .catch((error) => {
          console.error("There was an error updating the student", error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }

  const RenderForm = () => {
    console.log(student)
    return (
      <form>
        <label htmlFor="fname">First name:</label><br />
        <input
          type="text"
          id="first_name"
          name="first_name"
          value={student?.first_name ?? ""}
          onChange={handleInputsValues}
          disabled={loading}
        />
        <br /><br />
        <label htmlFor="lname">Last name:</label><br />
        <input
          type="text"
          id="last_name"
          name="last_name"
          value={student?.last_name ?? ""}
          onChange={handleInputsValues}
          disabled={loading}
        />
        <br /><br />
        <div>
          <input
            type="file"
            id="picture"
            name="picture"
            onChange={handleFileUpload}
            disabled={loading} />
        </div>
        <br /><br />
        <div>
          <StudentSkillItem
            name="soft_skills"
            id="soft_skills"
            soft_skills={student?.soft_skills}
            disabled={loading}
            onChange={handleInputsValues}
          />
        </div>
        <div>
          <input
            type="submit"
            value="Submit"
            disabled={loading}
            onClick={handleSaveStudent}
          />
          <a href="/">Go to Students List</a>
          {
            !!error && <span>{error}</span>
          }
          {
            !!message && <span>{message}</span>
          }
        </div>
      </form>
    );
  }

  return (
    <>
      {
        loading && <h1>Loading...</h1>
      }

      {
        <RenderForm/>
      }
    </>
  );
}

export default StudentForm;
