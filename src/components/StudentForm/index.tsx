import { Button, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Config from "../../config";
import
StudentSkillItem from "../StudentSkillItem";
import { IStudent } from "../types/student";
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import MessageModal from "../MesaggeModal";
import Box from '@mui/material/Box';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

type StudentFormProp = {
  student?: any,
  isNew?: boolean,
  loading?: boolean
}

const StudentForm = (props: StudentFormProp) => {
  const studentId = props?.student?.id;
  const [fileName, setFileName] = useState(props?.student?.picture)
  const [student, setStudent] = useState<IStudent>(props?.student);
  const [isNew, setIsNew] = useState(props?.isNew ?? false);
  const [loading, setLoading] = useState(props?.loading ?? true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setStudent(props.student);
    setLoading(false);
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

  const handleDeleteStudent = (event: any) => {
    event.preventDefault();
    setLoading(true);
    student.student_status = "inactive";
    console.log("Deleting a student...", student);
    console.log(JSON.stringify(student))
    axios
      .put(`${Config.studentsApi}/${student.id}`, student)
      .then((response) => {
        handleSetMessage("User deleted!");
        console.log("Delete user response", response.data);
      })
      .catch((error) => {
        console.error("There was an error updating the student", error);
      })
      .finally(() => {
        setLoading(false);
      });
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
      console.log("Updating student...", student);
      //console.log(JSON.stringify(student));
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
          ? <h2>Loading..</h2>
          : <form style={{
            paddingBottom: 40
          }}>
            <div style={{
              textAlign: "-webkit-center"
            }}>
              {!isNew && < img
                width={90}
                height={90}
                style={{
                  borderRadius: "100vw",
                  objectFit: "cover"
                }}
                src={student.picture}
              />}
              {isNew && < img
                width={90}
                height={90}
                style={{
                  borderRadius: "100vw",
                  objectFit: "cover"
                }}
                src="https://students-static.s3.us-east-2.amazonaws.com/assets/image-default.png"
              />}
              <br />
              <Button
                variant="contained"
                component="label"
              >
                Upload Photo
                <input
                  type="file"
                  id="picture"
                  name="picture"
                  onChange={handleFileUpload}
                  disabled={loading}
                  hidden />
              </Button>
            </div>
            <br />
            <Stack
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={2}
              divider={<Divider orientation="vertical" flexItem />}
            >
              <Item style={{
                height: "60vh",
                maxHeight: "60vh"
              }}>
                <TextField
                  type="text"
                  id="id"
                  name="id"
                  value={student?.id ?? ""}
                  onChange={handleInputsValues}
                  disabled={true}
                  label="_ID"
                />
                <br /><br />
                <div>
                  <TextField
                    type="Text"
                    id="student_status"
                    name="student_status"
                    onChange={handleInputsValues}
                    value={student?.student_status ?? ""}
                    disabled={true}
                    label="Student Status" />
                </div>
                <br />
                <TextField
                  type="text"
                  id="first_name"
                  name="first_name"
                  required 
                  value={student?.first_name ?? ""}
                  onChange={handleInputsValues}
                  disabled={loading}
                  label="First name"
                />
                <br /><br />
                <TextField
                  type="text"
                  id="last_name"
                  name="last_name"
                  required 
                  value={student?.last_name ?? ""}
                  onChange={handleInputsValues}
                  disabled={loading}
                  label="Last name"
                />
                <br /><br />
                <div>
                  <TextField
                    type="number"
                    id="age"
                    name="age"
                    required 
                    value={student?.age ?? 0}
                    onChange={handleInputsValues}
                    disabled={loading}
                    label="Age" />
                </div>
                <br />
                <div>
                  <TextField
                    type="number"
                    id="years_experience"
                    name="years_experience"
                    required 
                    value={student?.years_experience ?? 0}
                    onChange={handleInputsValues}
                    disabled={loading}
                    label="Years of Experience" />
                </div>
                <br />
                <div>
                  <TextField
                    type="Text"
                    id="description"
                    name="description"
                    required 
                    onChange={handleInputsValues}
                    value={student?.description ?? ""}
                    disabled={loading}
                    label="Description" />
                </div>
                <br />
                <div>
                  <TextField
                    type="Text"
                    id="observations"
                    name="observations"
                    required 
                    onChange={handleInputsValues}
                    value={student?.observations ?? ""}
                    disabled={loading}
                    label="Observations" />
                </div>
              </Item>
              <Item style={{
                height: "60vh",
                maxHeight: "60vh"
              }}>

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
              </Item>
              <Item style={{
                height: "60vh",
                maxHeight: "60vh"
              }}>
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

              </Item>
              <Item style={{
                height: "60vh",
                maxHeight: "60vh"
              }}>
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

              </Item>
            </Stack>
            <div style={{ paddingTop: 20 }}>
              <a href="/">
                <Button
                  sx={{ mx: 2 }}
                  variant="outlined"
                >
                  STUDENTS LIST
                </Button>
              </a>
              {!!isNew && <Button
                type="submit"
                disabled={loading}
                onClick={handleSaveStudent}
              >
                SUBMIT
              </Button>}
              {
                !isNew && <Button
                  type="submit"
                  disabled={loading}
                  onClick={handleSaveStudent}
                >
                  UPDATE
                </Button>
              }
              {
                !isNew && <Button
                  type="submit"
                  disabled={loading}
                  onClick={handleDeleteStudent}
                >
                  DELETE
                </Button>
              }


              {
                !!error && <MessageModal
                  modal_message={error}
                  open={true}
                />
              }
              {
                !!message && <MessageModal
                  modal_message={message}
                  open={true}
                />
              }
            </div>
          </form>
      }
    </React.Fragment>
  );
}

export default StudentForm;
