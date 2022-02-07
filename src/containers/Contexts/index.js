import { createContext, useContext } from 'react';

export const ConfirmDialogContext = createContext({});

export const useConfirmDialog = () => {
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
