import {
  DELIMITERS_REGEXP,
  TEMPLATE_VARS_REGEXP,
  MESSAGES,
  replacer
} from '../../constants';

const {
  NO_VARS_IN_TEMPLATE,
  MISSING_VAR,
  EXTRA_VAR
} = MESSAGES;

const Output = ({
  output,
  template,
  variables,
  onSetOutput
}) => {
  const removeDelimiters = (value) => value.replace(DELIMITERS_REGEXP, '');

  const checkErrors = (templateVarsName) => {
    const missingVars = templateVarsName.reduce((previous, current) => {
      if (variables.every((val) => val.key !== current)) {
        previous.push(replacer(MISSING_VAR, [current]));
      }

      return previous;
    }, []);

    const extraVars = variables.reduce((previous, current) => {
      if (templateVarsName.every((val) => val !== current.key)) {
        previous.push(replacer(EXTRA_VAR, [current.key]));
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
      onSetOutput(NO_VARS_IN_TEMPLATE);
      return;
    }

    const templateVarsName = templateVars.map(removeDelimiters);

    const { errors } = checkErrors(templateVarsName);
    if (errors) {
      onSetOutput(errors.join(', '));
    } else {
      const result = templateVars.reduce((previous, current) => {
        const varName = removeDelimiters(current);
        const varValue = variables.find((variable) => variable.key === varName).value;
        return previous.replace(current, varValue);
      }, template);

      onSetOutput(result);
    }
  };

  const canRunTemplate = () => {
    return (template !== '') && (variables.length > 0);
  };

  return (
    <div>
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
    </div>
  );
};

export default Output;
