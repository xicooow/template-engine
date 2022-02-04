import { useState } from 'react';

import { TEMPLATE_VAR_PATTERNS } from '../../constants';

const Template = ({
  template,
  onSetTemplate,
  onClearTemplate
}) => {
  const [showHelpText, setShowHelpText] = useState(false);

  return (
    <>
      <p><strong>Template</strong></p>
      <div>
        <p>
          <label htmlFor='modify-template'>Edit Template:</label>
          <input
            type='text'
            id='modify-template'
            className='inline-block'
            value={template}
            onInput={e => onSetTemplate(e.target.value)}
          />
        </p>
        <p>
          <button
            type='button'
            onClick={onClearTemplate}
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
      <div>
        <p>
          <button
            type='button'
            className='link'
            onClick={() => setShowHelpText(!showHelpText)}
          >
            <small>{(showHelpText) ? 'hide' : 'show'}</small>
          </button>
          <small>Expected template variables' patterns</small>
        </p>
        {
          (showHelpText) &&
          <ul>
            {
              TEMPLATE_VAR_PATTERNS.map((val, index) => {
                return (
                  <li key={index}>
                    <small>{val}</small>
                  </li>
                );
              })
            }
          </ul>
        }
      </div>
    </>
  );
};

export default Template;
