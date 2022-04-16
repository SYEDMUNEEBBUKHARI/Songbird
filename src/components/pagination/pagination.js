import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./pagination.css";

export default function PaginationOutlined(props) {
  return (
    <Stack spacing={2}>
      <Pagination
        count={props.fixedTokens[0].length}
        onChange={(e, v) => {
          console.log(e, v);
          props.setPaginationTokens(v);
        }}
        variant="outlined"
        color="secondary"
      />
    </Stack>
  );
}
