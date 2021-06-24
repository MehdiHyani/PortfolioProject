import { Container, Paper, TextField } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import React, { useState } from "react";
import useStyles from "./styles3";
import { v4 as uuidv4 } from "uuid";

function LinksScreen() {
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), projectName: "", projectLink: "" },
  ]);
  const classes2 = useStyles();

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), projectName: "", projectLink: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  return (
    <Container component="main" style={{ width: "75%" }}>
      <Paper
        className={classes2.paper}
        elevation={4}
        style={{ marginTop: "50px" }}
      >
        <h1>Add Links of your project</h1>
        <form className={classes2.root} onSubmit={(e) => e.preventDefault}>
          {inputFields.map((inputField) => (
            <div key={inputField.id}>
              <TextField
                name="Name of your project"
                label="Project name"
                variant="outlined"
                value={inputField.firstName}
                onChange={(event) => handleChangeInput(inputField.id, event)}
              />
              <TextField
                name="Link of your project"
                label="Project Link"
                variant="outlined"
                value={inputField.lastName}
                onChange={(event) => handleChangeInput(inputField.id, event)}
              />
              {inputField.id === inputFields[inputFields.length - 1].id ? (
                <>
                  {" "}
                  <IconButton
                    disabled={inputFields.length === 1}
                    onClick={() => handleRemoveFields(inputField.id)}
                  >
                    <RemoveIcon />
                  </IconButton>
                  <IconButton
                    disabled={inputFields.length === 5}
                    onClick={handleAddFields}
                  >
                    <AddIcon />
                  </IconButton>
                </>
              ) : (
                <></>
              )}
            </div>
          ))}
        </form>
      </Paper>
    </Container>
  );
}

export default LinksScreen;
