import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";

interface Props {
  arrayKey: string
  list?: string[]
  onChange: (values: string[], arrayKey: string) => void
  disabled: boolean
  onDelete: (index: number, arrayKey: string) => void
}

const StudentSkillItem = (props: Props) => {
  const { onChange, disabled, onDelete, arrayKey } = props;
  const [newSkill, setNewSkill] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    let values = props.list ?? []
    values[index] = e.target.value;
    onChange(values, arrayKey)
  }

  const handleAdd = () => {
    if (props.list) {
      onChange([...props.list, newSkill], arrayKey)
      setNewSkill("")
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 260
      }}
    >
      <p>{arrayKey.replace("_", " ").toLocaleUpperCase()}</p>
      <div
        style={{ display: "flex", marginBottom: 10 }}
      >
        <input
          value={newSkill}
          disabled={disabled}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter new skill..."
        />
        <button
          style={{ marginLeft: 10 }}
          type="button"
          onClick={() => handleAdd()}
        >
          Agregar
        </button>
      </div>
      {
        props.list?.map((skill, index) => (
          <div
            key={index + arrayKey}
            style={{ display: "flex" }}
          >
            <input
              value={skill}
              disabled={disabled}
              onChange={(e) => handleChange(e, index)}
            />
            <button
              style={{ marginLeft: 10 }}
              type="button"
              onClick={() => onDelete(index, arrayKey)}
            >
              Borrar
            </button>
          </div>
        ))
      }
    </div>
  );
}

export default StudentSkillItem;
