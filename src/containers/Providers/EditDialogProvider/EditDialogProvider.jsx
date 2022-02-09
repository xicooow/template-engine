import { useState } from 'react';

import { EditDialogContext } from '../../Contexts';
import EditDialog from '../../../components/EditDialog';

const EditDialogProvider = ({
  children
}) => {
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState({});
  const [varKey, editVarKey] = useState('');
  const [varValue, editVarValue] = useState('');

  const editDialog = ({
    title,
    message,
    variable,
    action
  }) => {
    setOpen(true);
    setConfig({ title, message, action });

    editVarKey(variable.key);
    editVarValue(variable.value);
  };

  const onConfirm = () => {
    config.action({
      key: varKey,
      value: varValue
    });
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
    <EditDialogContext.Provider value={{ editDialog }}>
      <EditDialog
        open={open}
        title={config?.title}
        message={config?.message}
        varKey={varKey}
        editVarKey={editVarKey}
        varValue={varValue}
        editVarValue={editVarValue}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
      {children}
    </EditDialogContext.Provider>
  );
};

export default EditDialogProvider;
