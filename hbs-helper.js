const Handlebars = require('handlebars')

Handlebars.registerHelper('compare', function(left, operator, right, options) {
  if(arguments.length < 3) {
    throw new Error('Handlerbars Helper "compare" needs 2 parameters')
  }

  const operators = {
    '===': function (l, r) {
      return l === r
    }
  }

  if (!operators[operator]) {
    throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator)
  }

  const result = operators[operator](left, right)

  if (result) {
    return options.fn(this)
  } else {
    return options.inverse(this)
  }
})
