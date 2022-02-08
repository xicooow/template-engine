import { useState } from 'react';
import { cloneDeep } from 'lodash';

import Variables from '../../components/Variables';
import Template from '../../components/Template';
import Output from '../../components/Output';

import {
  useConfirmDialog,
  useEditDialog
} from '../Contexts';

import {
  DEFAULT_TEMPLATE,
  DEFAULT_VARIABLES,
  MESSAGES,
  replacer
} from '../../constants';

const Controller = () => {
  const [output, setOutput] = useState('');
  const [template, setTemplate] = useState(DEFAULT_TEMPLATE);
  const [variables, setVariables] = useState(DEFAULT_VARIABLES);

  const { edit } = useEditDialog();
  const { confirm } = useConfirmDialog();

  const handleAddVariable = (newVar) => {
    setVariables([...variables, newVar]);
    setOutput('');
  };

  const handleEditVariable = async (_var, index) => {
    const editedVar = await edit({
      title: 'Info',
      message: replacer(MESSAGES.EDIT_VAR_TITLE, [_var.key]),
      variable: { ..._var }
    });

    if (editedVar) {
      const newVariables = cloneDeep(variables);
      newVariables[index] = editedVar;

      setVariables(newVariables);
      setOutput('');
    }
  };

  const handleDeleteVariable = async (_key) => {
    const confirmed = await confirm({
      title: 'Attention',
      message: replacer(MESSAGES.CONFIRM_DELETE_VAR, [_key]),
    });

    if (confirmed) {
      setVariables(variables.filter((val) => val.key !== _key));
      setOutput('');
    }
  };

  const handleClearTemplate = () => {
    setTemplate('');
    setOutput('');
  };

  return (
    <>
      <section id='variables'>
        <Variables
          onDeleteVariable={handleDeleteVariable}
          onEditVariable={handleEditVariable}
          onAddVariable={handleAddVariable}
          onSetOutput={setOutput}
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
      <hr />
      <section id='output'>
        <Output
          output={output}
          template={template}
          variables={variables}
          onSetOutput={setOutput}
        />
      </section>
    </>
  );
};

export default Controller;
