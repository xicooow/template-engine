import { useState } from 'react';

import Variables from '../../components/Variables';
import Template from '../../components/Template';
import Output from '../../components/Output';

import {
  DEFAULT_TEMPLATE,
  DEFAULT_VARIABLES
} from '../../constants';

import './App.css';

const App = () => {
  const [output, setOutput] = useState('');
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [variables, setVariables] = useState(DEFAULT_VARIABLES);

  const handleAddVariable = (newVar) => {
    setVariables([...variables, newVar]);
    setOutput('');
  };

  const handleDeleteVariable = (_key) => {
    setVariables(variables.filter((val) => val.key !== _key));
  };

  const handleClearTemplate = () => {
    setTemplate('');
    setOutput('');
  };

  const canRunTemplate = () => {
    return (template !== '') && (variables.length > 0);
  };

  return (
    <div className='app'>
      <section id='variables'>
        <Variables
          onDeleteVariable={handleDeleteVariable}
          onAddVariable={handleAddVariable}
          onError={setOutput}
          variables={variables}
        />
      </section>
      <section id='template'>
        <Template
          onClearTemplate={handleClearTemplate}
          onSetTemplate={setTemplate}
          template={template}
        />
      </section>
      <section id='output'>
        <hr />
        <Output
          output={output}
          template={template}
          variables={variables}
          onSetOutput={setOutput}
          canRunTemplate={canRunTemplate()}
        />
      </section>
    </div>
  );
};

export default App;
