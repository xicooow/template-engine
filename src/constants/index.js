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