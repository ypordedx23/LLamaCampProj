import React, { useEffect, useState } from "react";
import axios from "axios";

import StudentListItem from "../StudentListItem";

import styles from "./styles.module.css";
import Config from "../../config";
import MessageModal from "../MesaggeModal"
import { Box, Button, Stack, TablePagination } from "@mui/material";


type StudentListProp = {
  loading?: boolean
}

const StudentsList = (props: StudentListProp) => {
  const [students, setStudents] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [loading, setLoading] = useState(props?.loading ?? true);

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
        setLoading(false)
      })
      .catch((error) => {
        console.error("There was an error getting students from API");
      });
  }, []);

  return (
    <React.Fragment>
      {
        loading
          ?
          <MessageModal
            modal_message="Loading.."
            open={true}
          />
          :
          <Box
            display={"flex"}
            overflow="hidden"
            minWidth="100vh"
          >
            <Stack
              spacing={4}
              overflow="auto"
              justifyContent="space-evenly"
              alignItems={"flex-start"}
              py={4}
            >
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                count={students.length}
                component="div"
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
              {
                students.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((student: any) => {
                    return (
                      <StudentListItem key={student.id} student={student} />
                    );
                  })
              }
            </Stack>

          </Box>
      }
    </React.Fragment>
  );
}

export default StudentsList;
