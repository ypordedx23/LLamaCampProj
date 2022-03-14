import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Config from "../../config";
import
StudentSkillItem from "../StudentSkillItem";
import { IStudent } from "../types/student";

type StudentFormProp = {
  student?: any,
  isNew?: boolean,
}

const StudentForm = (props: StudentFormProp) => {
  const studentId = props?.student?.id;
  const [student, setStudent] = useState<IStudent>(props.student);
  const [isNew, setIsNew] = useState(props?.isNew ?? false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(JSON.stringify(props.student))
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
          } as IStudent)
          console.log("Create user response", response.data);
        })
        .catch((error) => {
          console.error("There was an error creating a student.", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      console.log(JSON.stringify(student));
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

  return (
    <React.Fragment>
      {
        loading
          ? <h2>cargando..</h2>
          : <form style={{ paddingLeft: 20, paddingBottom: 40 }}>
            {/* <label htmlFor="fname">First name:</label><br /> */}
            <TextField
              type="text"
              id="first_name"
              name="first_name"
              value={student?.first_name ?? ""}
              onChange={handleInputsValues}
              disabled={loading}
              label="First name"
            />
            <br />
            {/* <label htmlFor="lname">Last name:</label> */}
            <br />
            <TextField
              type="text"
              id="last_name"
              name="last_name"
              value={student?.last_name ?? ""}
              onChange={handleInputsValues}
              disabled={loading}
              label="Last name"
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
            <br />
            <div>
              <StudentSkillItem
                arrayKey="soft_skills"
                list={student?.soft_skills}
                disabled={loading}
                onChange={(values, key) => {
                  setStudent({
                    ...student,
                    [key]: values
                  })
                }}
                onDelete={(index, key) => {
                  setStudent({
                    ...student,
                    [key]: (student[key as keyof IStudent] as string[]).filter((_, i) => i !== index)
                  })
                }}
              />
            </div>
            <div>
              <StudentSkillItem
                arrayKey="tech_skills"
                list={student?.tech_skills}
                disabled={loading}
                onChange={(values, key) => {
                  setStudent({
                    ...student,
                    [key]: values
                  })
                }}
                onDelete={(index, key) => {
                  setStudent({
                    ...student,
                    [key]: (student[key as keyof IStudent] as string[]).filter((_, i) => i !== index)
                  })
                }}
              />
            </div>
            <div>
              <StudentSkillItem
                arrayKey="work_experience"
                list={student?.work_experience}
                disabled={loading}
                onChange={(values, key) => {
                  setStudent({
                    ...student,
                    [key]: values
                  })
                }}
                onDelete={(index, key) => {
                  setStudent({
                    ...student,
                    [key]: (student[key as keyof IStudent] as string[]).filter((_, i) => i !== index)
                  })
                }}
              />
            </div>
            <div style={{ paddingTop: 20 }}>
              <Button
                type="submit"
                disabled={loading}
                onClick={handleSaveStudent}
              >
                Submit
              </Button>
              <a href="/">
                <Button
                  sx={{ mx: 2 }}
                  variant="outlined"
                >
                  Go to Students List
                </Button>
              </a>
              {
                !!error && <span>{error}</span>
              }
              {
                !!message && <span>{message}</span>
              }
            </div>
          </form>
      }
    </React.Fragment>
  );
}

export default StudentForm;
