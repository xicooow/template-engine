import React, {
  createContext,
  useContext,
  useState
} from 'react';

const Context = createContext({});

const ConfirmDialog = ({
  open,
  title,
  message,
  onConfirm,
  onDismiss
}) => {
  return (
    (!!open) && (
      <div className='confirm-dialog'>
        <div className='confirm-dialog-box'>
          <header>
            <h2>{title}</h2>
          </header>
          <section>
            <p>{message}</p>
          </section>
          <footer>
            <button
              type='button'
              onClick={onConfirm}
            >
              Yes
            </button>
            <button
              type='button'
              onClick={onDismiss}
            >
              Cancel
            </button>
          </footer>
        </div>
      </div>
    )
  );
};

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
    <Context.Provider value={{ openDialog }}>
      <ConfirmDialog
        open={open}
        title={config?.title}
        message={config?.message}
        onConfirm={onConfirm}
        onDismiss={onDismiss}
      />
      {children}
    </Context.Provider>
  );
};

const useConfirmDialog = () => {
  const { openDialog } = useContext(Context);

  const confirm = (options) =>
    new Promise((resolve) => {
      openDialog({
        ...options,
        action: resolve
      });
    });

  return { confirm };
};

export default ConfirmDialogProvider;
export { useConfirmDialog };
