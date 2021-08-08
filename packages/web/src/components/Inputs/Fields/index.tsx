import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { Form, Formik, FormikValues } from 'formik';
import { useHistory } from 'react-router-dom';
import useTodoItem from '../../../hooks/useTodoItem';

type TodoFormProps = {
  onClose: () => void;
};
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

const TodoItemTextFields: React.FC<TodoFormProps> = ({
  onClose
}: TodoFormProps) => {
  const classes = useStyles();
  const history = useHistory();
  const { createTodoItem } = useTodoItem();
  const handleSubmit = async (values: FormikValues) => {
    const { title, category, description } = values;
    const newItem = await createTodoItem({ title, category, description });
    if (newItem) {
      onClose();
    }
  };

  return (
    <Formik
      initialValues={{ category: '', title: '', description: '' }}
      onSubmit={async (values) => handleSubmit(values)}
    >
      {({ values, handleChange }) => (
        <Form className={classes.root} autoComplete="off">
          <div>
            <TextField
              id="title"
              label="title"
              value={values.title}
              onChange={handleChange}
            />
            <TextField
              id="category"
              label="category"
              value={values.category}
              onChange={handleChange}
            />
            <TextField
              id="description"
              label="Description"
              value={values.description}
              onChange={handleChange}
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
        </Form>
      )}
    </Formik>
  );
};

export { TodoItemTextFields };
