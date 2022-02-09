import { useContext } from 'react';

import { ConfirmDialogContext } from '..';

const useConfirmDialog = () => {
  const { openDialog } = useContext(ConfirmDialogContext);

  const confirm = (options) =>
    new Promise((resolve) => {
      openDialog({
        ...options,
        action: resolve
      });
    });

  return { confirm };
};

export default useConfirmDialog;
