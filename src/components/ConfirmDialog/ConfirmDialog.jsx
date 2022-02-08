const ConfirmDialog = ({
  open,
  title,
  message,
  onConfirm,
  onDismiss
}) => {
  return (
    open && (
      <div className='dialog'>
        <div className='dialog-box'>
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

export default ConfirmDialog;
