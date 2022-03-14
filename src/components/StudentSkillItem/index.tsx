import styles from "./styles.module.css";
import {useEffect, useState} from "react";

const StudentSkillItem = (props: any) => {
 // const [studentSkills, setStudentSkills] = useState();
  const {onChange} = props;
  //console.log(props)
 /* useEffect(() => {
    if(props.soft_skills){
      setStudentSkills(props.soft_skills)
    }
  }, [props.soft_skills]);*/

  /*const handleInputsValues = (event: any, index: any) => {
    const { name, value, files } = event.target;
    setStudentSkills({[index]: value });
  }*/

  const handleChange = (e:any, index:number) =>{
    const values = [...(props.soft_skills??[])]
    values[index] = e.target.value;
    onChange([...values])
  }

  return (
    <div>
     {
        props.soft_skils?.map((skill: any, index:number) => {
          return (
            <div>
              <input  
                key={index+"skill"} 
                type="text" 
                value={skill}
                onChange={(e)=>handleChange(e,index)}
                />
            </div>
          );
        })
      }
    </div>
  );
}

export default StudentSkillItem;
