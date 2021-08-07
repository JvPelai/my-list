import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    }
  })
);

const FormPropsTextFields: React.FC = () => {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField id="title" label="title" />
        <TextField id="category" label="category" />
        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="outlined"
        />
      </div>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className="ms-2"
      >
        Add
      </Button>
    </form>
  );
};

export { FormPropsTextFields };
