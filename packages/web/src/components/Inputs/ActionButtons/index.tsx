import React from 'react';
import { Fab } from '@material-ui/core';
import { Add as AddIcon } from '@material-ui/icons';

type ActionButtoProps = {
  handleClick: () => void;
};

const ActionButton: React.FC<ActionButtoProps> = ({
  handleClick
}: ActionButtoProps) => {
  return (
    <Fab
      color="primary"
      aria-label="add"
      variant="extended"
      className="mt-3"
      onClick={handleClick}
    >
      <AddIcon />
      new Item
    </Fab>
  );
};

export { ActionButton };
