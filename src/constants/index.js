/*eslint no-useless-escape: 0*/
/*eslint no-template-curly-in-string: 0*/
export const DELIMITERS_REGEXP = /[\$\{\}]/g;
export const TEMPLATE_VARS_REGEXP = /\$\{[\w\-]+\}/gi;
export const DEFAULT_TEMPLATE = 'Hello ${name}!';
export const DEFAULT_VARIABLES = [{ key: 'name', value: 'World' }];

export const TEMPLATE_VAR_PATTERNS = [
  '${varname}',
  '${var-name}',
  '${var_name}',
  '${VARNAME}',
  '${VAR-NAME}',
  '${VAR_NAME}',
  '${VarName}',
  '${Var-Name}',
  '${Var_Name}'
];

export const MESSAGES = {
  UNIQUE_VAR_NAME: 'variables\' name must be unique',
  NO_VARS_IN_TEMPLATE: 'template does not have any variables',
  MISSING_VAR: '${%s} is missing in variables map',
  EXTRA_VAR: '"%s" variable is not defined in template',
  CONFIRM_DELETE_VAR: 'Are you sure you want to delete the "%s" variable?',
  EDIT_VAR_TITLE: 'You are editing the variable "%s"'
};

export const replacer = (string, values) => {
  const temp = string.split(/(\%s)/g);
  values.forEach((value) => {
    temp.every((val, _index) => {
      if (val === '%s') {
        temp[_index] = value;
        return false;
      }

      return true;
    });
  });

  return temp.join('').trim();
};
