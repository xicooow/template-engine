import React, { useState } from 'react';
import './App.css';

/*eslint no-useless-escape: 0*/
const DELIMITERS_REGEXP = /[\$\{\}]/g;
const TEMPLATE_VARS_REGEXP = /\$\{\w+\}/gi;

const App = () => {
  const [output, setOutput] = useState('');
  const [template, setTemplate] = useState('');
  const [newVarKey, setNewVarKey] = useState('');
  const [variables, setVariables] = useState([]);
  const [newVarValue, setNewVarValue] = useState('');

  const canAddVariable = () => {
    return (newVarKey !== '') && (newVarValue !== '');
  };

  const canRunTemplate = () => {
    return (template !== '') && (variables.length > 0);
  };

  const addNewVariable = () => {
    const newVariables = [
      ...variables,
      {
        key: newVarKey,
        value: newVarValue
      }
    ];
    setVariables(newVariables);
    clearInputs();
  };

  const clearVariables = () => {
    setVariables([]);
    clearInputs();
  };

  const clearInputs = () => {
    setNewVarKey('');
    setNewVarValue('');
  };

  const clearTemplate = () => {
    setTemplate('');
  };

  const checkErrors = (templateVarsName) => {
    const missingVars = templateVarsName.reduce((previous, current) => {
      if (variables.every((val) => val.key !== current)) {
        previous.push(`\${${current}} is missing in variables map`);
      }

      return previous;
    }, []);

    const extraVars = variables.reduce((previous, current) => {
      if (templateVarsName.every((val) => val !== current.key)) {
        previous.push(`"${current.key}" variable is not defined in template`);
      }

      return previous;
    }, []);

    if (missingVars.length > 0 || extraVars.length > 0) {
      return {
        errors: missingVars.concat(extraVars)
      };
    }

    return {
      errors: null
    };
  };

  const runTemplate = () => {
    const templateVars = template.match(TEMPLATE_VARS_REGEXP);
    if (!templateVars) {
      setOutput('template does not have any variables');
      return;
    }

    const templateVarsName = templateVars.map((val) => val.replace(DELIMITERS_REGEXP, ''));

    const { errors } = checkErrors(templateVarsName);
    if (errors) {
      setOutput(errors.join(', '));
    } else {
      const result = templateVars.reduce((previous, current) => {
        const templateVar = current.replace(DELIMITERS_REGEXP, '');
        const varValue = variables.find((variable) => variable.key === templateVar).value;
        return previous.replace(current, varValue);
      }, template);

      setOutput(result);
    }
  };

  const renderVariablesComma = (index) => {
    return ((index + 1) < variables.length) ? ', ' : '';
  };

  const renderVariablesForm = () => {
    return (
      <>
        <div>
          <p>
            <label htmlFor='add-var-key'>Key: </label>
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
              onClick={addNewVariable}
              disabled={!canAddVariable()}
            >
              Add Variable
            </button>
            <button
              type='button'
              onClick={clearVariables}
            >
              Clear Variables
            </button>
          </p>
        </div>
        <div className='display-code'>
          <code>
            ({
              variables.map((variable, index) => {
                return (
                  <span key={index}>
                    {`"${variable.key}" => "${variable.value}"`}{renderVariablesComma(index)}
                  </span>
                );
              })
            })
          </code>
        </div>
      </>
    );
  };

  const renderTemplateForm = () => {
    return (
      <>
        <div>
          <p>
            <label htmlFor='modify-template'>Edit Template: </label>
            <input
              type='text'
              id='modify-template'
              value={template}
              onInput={e => setTemplate(e.target.value)}
            />
          </p>
        </div>
        <div>
          <p>
            <button
              type='button'
              onClick={clearTemplate}
            >
              Clear Template
            </button>
          </p>
        </div>
        <div className='display-code'>
          <code>
            {`${template}`}
          </code>
        </div>
      </>
    );
  };

  const renderOutput = () => {
    return (
      <>
        <button
          type='button'
          onClick={runTemplate}
          disabled={!canRunTemplate()}
        >
          Show Output
        </button>
        {
          (output !== '') &&
          <div className='display-code'>
            <code>
              {`${output}`}
            </code>
          </div>
        }
      </>
    );
  };

  return (
    <div className='app'>
      <section>
        <p><strong>Variables Map</strong></p>
        <div>{renderVariablesForm()}</div>
      </section>
      <section>
        <p><strong>Template</strong></p>
        <div>{renderTemplateForm()}</div>
      </section>
      <section>
        <br />
        <hr />
        <div>{renderOutput()}</div>
      </section>
    </div>
  );
};

export default App;
