import { Grid, IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const Input = ({
  name,
  handleChange,
  label,
  autoFocus,
  half,
  type,
  handleShowPassword,
}) => {
  return (
    <Grid item xs={6} sm={half ? 6 : 12}>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        style={{ margn: "8px 8px" }}
        fullWidth
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {type === "password" ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
