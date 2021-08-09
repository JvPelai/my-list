import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Edit as EditIcon } from '@material-ui/icons';
import Modal from '@material-ui/core/Modal';
import { ActionButton } from '../Inputs/ActionButtons';
import { TodoItemTextFields } from '../Inputs/Fields';
import TodoItem from '../../interfaces/todoItem';
import useTodoItem from '../../hooks/useTodoItem';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  })
);

const NewTodoItemModal: React.FC = () => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">New Item</h2>
      <TodoItemTextFields onClose={handleClose} />
    </div>
  );
  return (
    <div>
      <div className="position-fixed mt-1 ms-1" style={{ zIndex: 1 }}>
        <ActionButton handleClick={handleOpen} />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
};

type EditTodoItemModalProps = {
  formValues: TodoItem;
};
const EditTodoItemModal: React.FC<EditTodoItemModalProps> = ({
  formValues
}: EditTodoItemModalProps) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Edit Item</h2>
      <TodoItemTextFields onClose={handleClose} formValues={formValues} />
    </div>
  );
  return (
    <>
      <IconButton aria-label="Edit" size="small" onClick={handleOpen}>
        <EditIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

type ConfirmDeleteItemModalProps = {
  id: number;
};
const ConfirmDeleteItemModal: React.FC<ConfirmDeleteItemModalProps> = ({
  id
}: ConfirmDeleteItemModalProps) => {
  const classes = useStyles();
  const { deleteTodoItem } = useTodoItem();
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const deleteItem = async (itemId: number) => {
    try {
      await deleteTodoItem(itemId);
      handleClose();
      window.location.reload();
    } catch (error) {
      throw new Error('could not delete item');
    }
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">
        Are you sure you want to delete this item?
      </h2>
      <hr />
      <Button variant="outlined" onClick={handleClose}>
        Cancel
      </Button>
      <Button
        className="bg-danger bg-gradient"
        onClick={() => {
          deleteItem(id);
        }}
      >
        Delete
      </Button>
    </div>
  );
  return (
    <>
      <IconButton
        aria-label="delete"
        size="small"
        color="secondary"
        onClick={handleOpen}
      >
        <DeleteIcon />
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
};

export { NewTodoItemModal, EditTodoItemModal, ConfirmDeleteItemModal };
