import { useEffect, useState } from "react";
import axios from "axios";

import StudentListItem from "../StudentListItem";

import styles from "./styles.module.css";
import Config from "../../config";
import { Box, Button, Stack, TablePagination } from "@mui/material";

const StudentsList = () => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  }

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  useEffect(() => {
    axios
      .get(Config.studentsApi)
      .then((response) => {
        setStudents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("There was an error getting students from API");
      });
  }, []);

  return (
    <Box
      display={"flex"}
      overflow="hidden"
    >
      <Stack
        spacing={4}
        maxWidth="50%"
        width="50%"
        overflow="auto"
        alignItems={"flex-start"}
        py={4}
      >
        {
          students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((student: any) => {
              return (
                <StudentListItem key={student.id} student={student} />
              );
            })
        }
      </Stack>
      <TablePagination
        rowsPerPageOptions={[5,10]}
        component="div"
        count={students.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}


export default StudentsList;
