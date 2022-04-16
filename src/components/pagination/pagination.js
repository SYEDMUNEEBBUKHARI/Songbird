import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./pagination.css";

export default function PaginationOutlined(props) {
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    
  }, []);
  useEffect(() => {
    let count = 0;
    if (props.fixedTokens) {
      for (let i = 0; i < props.fixedTokens.length; i = i + 60) {
        count++;

        setTotalCount(count);
      }
    }
  }, [props.fixedTokens]);
  return (
    <Stack spacing={2}>
      
      <Pagination
        count={totalCount}
        onChange={(e, v) => {
          props.setPaginationTokens(v);
        }}
        variant="outlined"
        color="secondary"
      />
    </Stack>
  );
}
