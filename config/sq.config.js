const output = "../models"
const options = { directory: output, caseFile: 'l', caseModel: 'p', caseProp: 'c', lang: 'js', useDefine: false, singularize: true, spaces: true, indentation: 2 };
 
// mysql
module.exports = {
  dbname: 'homestead',
  user: 'homestead',
  pass: 'secret',
  options: { dialect: 'mysql' },
  autoOptions: { dialect: 'mysql', ...options }
};