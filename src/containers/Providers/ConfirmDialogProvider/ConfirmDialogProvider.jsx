import { useState } from 'react';

import { ConfirmDialogContext } from '../../Contexts';
import ConfirmDialog from '../../../components/ConfirmDialog';

const ConfirmDialogProvider = ({
  children
}) => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState({});

  const openDialog = ({
    title,
    message,
    action
  }) => {
    setOpen(true);
    setConfig({ title, message, action });
  };

  const onConfirm = () => {
    config.action(true);
    reset();
  };

  const onDismiss = () => {
    config.action(false);
    reset();
  };

  const reset = () => {
    setOpen(false);
    setConfig({});
  };

  return (
    <ConfirmDialogContext.Provider value={{ openDialog }}>
      <ConfirmDialog
        open={open}
        title={config?.title}
        message={config?.message}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
      {children}
    </ConfirmDialogContext.Provider>
  );
};

export default ConfirmDialogProvider;
