const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.title = !isEmpty(data.title) ? data.title : ''
  data.company = !isEmpty(data.company) ? data.company : ''
  data.from = !isEmpty(data.from) ? data.from : ''
  /*data.to = !isEmpty(data.to) ? data.to : ''
  data.description = !isEmpty(data.description) ? data.description : ''
  data.current = !isEmpty(data.current) ? data.current : ''
  data.location = !isEmpty(data.location) ? data.location : ''*/


  if(Validator.isEmpty(data.title)) {
    errors.title = 'Job title fields is required'
  }

  if(Validator.isEmpty(data.company)) {
    errors.company = 'Company fields is required'
  }

  if(Validator.isEmpty(data.from)) {
    errors.from = 'From date fields is required'
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}
