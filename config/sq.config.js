const output = "../models"
const options = { directory: output, caseFile: 'l', caseModel: 'p', caseProp: 'c', lang: 'js', useDefine: false, singularize: true, spaces: true, indentation: 2 };
 
// mysql
module.exports = {
  dbname: 'yii2-starter-kit',
  user: 'ysk_dbu',
  pass: 'ysk_pass',
  options: { dialect: 'mysql' },
  autoOptions: { dialect: 'mysql', ...options }
};
