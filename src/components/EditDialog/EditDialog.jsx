const EditDialog = ({
  open,
  title,
  message,
  varKey,
  editVarKey,
  varValue,
  editVarValue,
  onConfirm,
  onDismiss
}) => {
  const canSave = () => {
    return (varKey !== '') && (varValue !== '');
  };

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
          <section>
            <p>
              <label htmlFor='edit-var-key'>Name: </label>
              <input
                type='text'
                id='edit-var-key'
                value={varKey}
                onInput={e => editVarKey(e.target.value)}
              />
            </p>
            <p>
              <label htmlFor='edit-var-value'>Value: </label>
              <input
                type='text'
                id='edit-var-value'
                value={varValue}
                onInput={e => editVarValue(e.target.value)}
              />
            </p>
          </section>
          <footer>
            <button
              type='button'
              onClick={onConfirm}
              disabled={!canSave()}
            >
              Save
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

export default EditDialog;
