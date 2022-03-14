import { Box, Chip, Paper, Typography } from "@mui/material";
import { IStudent } from "../types/student";
import styles from "./styles.module.css";

interface Props {
  student: IStudent
}

const StudentItem = (props: Props) => {
  const student = props.student;
  return (
    <Paper
      sx={{ mx: 1, width: '80%', maxWidth: '80%' }}
    >
      <a
        href={`/student/${student.id}`}
        style={{
          display: "flex",
          padding: 14,
          alignItems: "center",
          width: "100%"
        }}
      >
        <img
          width={90}
          height={90}
          style={{
            borderRadius: "100vw",
            objectFit: "cover"
          }}
          src={student.picture}
        />
        <Box px={2}>
          <Typography>
            {student?.first_name ?? ""}
          </Typography>
          <Typography variant="caption">
            {student?.description ?? ""}
          </Typography>
          <Chip
            label={student?.years_experience ? `Experience years: ${student?.years_experience}` : `No experience years`}
            variant="outlined"
            size="small"
            color={student?.years_experience ? "primary" : undefined}
          />
          {
            student?.soft_skills?.length > 0 &&
            <Box
              display="flex"
              flexDirection={"column"}
              py={2}
            >
              <Typography color="textSecondary" variant="caption">
                {"Soft skills"}
              </Typography>
              <div>
                {
                  student?.soft_skills.map(skill => (
                    <Chip
                      key={skill+"chip"}
                      label={skill}
                      size="small"
                      color={"primary"}
                      sx={{ mr: 1 }}
                    />
                  ))
                }
              </div>
            </Box>
          }
          {
            student?.tech_skills?.length > 0 &&
            <Box
              display="flex"
              flexDirection={"column"}
              py={2}
            >
              <Typography color="textSecondary" variant="caption">
                {"Tech skills"}
              </Typography>
              <div>
                {
                  student?.tech_skills.map(skill => (
                    <Chip
                    key={skill+"chip2"}
                      label={skill}
                      size="small"
                      color={"primary"}
                      sx={{ mr: 1 }}
                    />
                  ))
                }
              </div>
            </Box>
          }
        </Box>
      </a>
    </Paper>
  );
}

export default StudentItem;
