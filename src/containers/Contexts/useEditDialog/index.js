import { useContext } from 'react';

import { EditDialogContext } from '..';

const useEditDialog = () => {
  const { editDialog } = useContext(EditDialogContext);

  const edit = (options) =>
    new Promise((resolve) => {
      editDialog({
        ...options,
        action: resolve
      });
    });

  return { edit };
};

export default useEditDialog;
