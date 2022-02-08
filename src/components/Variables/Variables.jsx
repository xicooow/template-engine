import { useState } from 'react';

import { MESSAGES } from '../../constants';

const {
  UNIQUE_VAR_NAME
} = MESSAGES;

const Variables = ({
  variables,
  onAddVariable,
  onDeleteVariable,
  onEditVariable,
  onSetOutput
}) => {
  const [newVarKey, setNewVarKey] = useState('');
  const [newVarValue, setNewVarValue] = useState('');

  const canAddVariable = () => {
    return (newVarKey !== '') && (newVarValue !== '');
  };

  const existingVariableKey = (_key) => {
    return variables.filter((val) => val.key === _key).length > 0;
  };

  const addVariable = () => {
    if (existingVariableKey(newVarKey)) {
      onSetOutput(UNIQUE_VAR_NAME);
    } else {
      onAddVariable({
        key: newVarKey,
        value: newVarValue
      });
      clearInputs();
    }
  };

  const clearInputs = () => {
    setNewVarKey('');
    setNewVarValue('');
  };

  return (
    <>
      <p><strong>Variables</strong></p>
      <div>
        <p>
          <label htmlFor='add-var-key'>Name: </label>
          <input
            type='text'
            id='add-var-key'
            value={newVarKey}
            onInput={e => setNewVarKey(e.target.value)}
          />
        </p>
        <p>
          <label htmlFor='add-var-value'>Value: </label>
          <input
            type='text'
            id='add-var-value'
            value={newVarValue}
            onInput={e => setNewVarValue(e.target.value)}
          />
        </p>
        <p>
          <button
            type='button'
            onClick={addVariable}
            disabled={!canAddVariable()}
          >
            Add Variable
          </button>
        </p>
      </div>
      <div className='display-code'>
        <code>
          <ul className='variables-list'>
            {
              variables.map((variable, index) => {
                return (
                  <li key={index}>
                    {`"${variable.key}" => "${variable.value}"`}&nbsp;
                    <button
                      type='button'
                      className='link'
                      onClick={() => onDeleteVariable(variable.key)}
                    >
                      <small>delete</small>
                    </button>
                    <button
                      type='button'
                      className='link'
                      onClick={() => onEditVariable(variable, index)}
                    >
                      <small>edit</small>
                    </button>
                  </li>
                );
              })
            }
          </ul>
        </code>
      </div>
    </>
  );
};

export default Variables;
