const form = document.querySelector('#form')
form.addEventListener('submit', function formSubmit(event) {
    if (!form.checkValidity()) {
      event.preventDefault()
      event.stopPropagation()
      form.classList.add('was-validated')
    }
  form.classList.add('was-validated')
  })