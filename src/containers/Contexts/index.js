import { createContext } from 'react';

import useEditDialog from './useEditDialog';
import useConfirmDialog from './useConfirmDialog';

export const EditDialogContext = createContext({});
export const ConfirmDialogContext = createContext({});

export {
  useConfirmDialog,
  useEditDialog
};
