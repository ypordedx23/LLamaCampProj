import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { Button, IconButton, TextField, Tooltip } from "@mui/material";
import { Delete } from "@mui/icons-material";

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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, index: number) => {
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
        <TextField
          value={newSkill}
          disabled={disabled}
          onChange={(e) => setNewSkill(e.target.value)}
          placeholder="Enter new skill..."
        />
        <div>
          <Button
            style={{ marginLeft: 10 }}
            type="button"
            onClick={() => handleAdd()}
          >
            Agregar
          </Button>
        </div>
      </div>
      {
        props.list?.map((skill, index) => (
          <div
            key={index + arrayKey}
            style={{ display: "flex" }}
          >
            <TextField
              value={skill}
              disabled={disabled}
              onChange={(e) => handleChange(e, index)}
            />
            <IconButton
              style={{ marginLeft: 10 }}
              type="button"
              onClick={() => onDelete(index, arrayKey)}
              size="small"
            >
              <Tooltip arrow title="Delete">
                <Delete fontSize="small" />
              </Tooltip>
            </IconButton>
          </div>
        ))
      }
    </div>
  );
}

export default StudentSkillItem;
