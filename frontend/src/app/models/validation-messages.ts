export const ValidationMessages = {
  firstName: [
    {type: 'required', message: 'Your first name is required.'},
    {type: 'maxlength', message: 'Your first name should be less than 100 characters long.'},
  ],
  lastName: [
    {type: 'required', message: 'Your last name is required.'},
    {type: 'maxlength', message: 'Your last name should be less than 100 characters long.'},
  ],
  email: [
    {type: 'required', message: 'Your e-mail address is required.'},
    {type: 'email', message: 'Please enter a valid e-mail address.'},
    {type: 'pattern', message: 'Please enter a valid e-mail address.'},
    {type: 'maxlength', message: 'Your e-mail address must be less than 100 characters long.'}
  ],
  phone: [
    {type: 'required', message: 'Your phone number is required.'},
    {type: 'maxlength', message: 'Your phone number should be less than 100 characters long.'}
  ],
  gender: [
    {type: 'required', message: 'Your gender is required.'},
  ],
  birthday: [
    {type: 'required', message: 'Your birthday is required.'},
  ],
  street: [
    {type: 'required', message: 'Your street is required.'},
    {type: 'maxlength', message: 'Your street should be less than 100 characters long.'}
  ],
  city: [
    {type: 'required', message: 'Your city is required.'},
    {type: 'maxlength', message: 'Your city should be less than 100 characters long.'}
  ],
  postalCode: [
    {type: 'required', message: 'Your postal code is required.'},
    {type: 'pattern', message: 'Please enter a valid postal code.'},
    {type: 'maxlength', message: 'Your postal code should be less than 20 characters long.'}
  ],
  country: [
    {type: 'required', message: 'Your country is required.'},
    {type: 'maxlength', message: 'Your country should be less than 100 characters long.'}
  ],
  password: [
    {type: 'required', message: 'Your password is required.'},
    {type: 'minlength', message: 'Your password must be at least 5 characters long.'},
    {type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.'},
    {type: 'maxlength', message: 'Your password should be less than 500 characters long.'}
  ],
  confirmPassword: [
    {type: 'required', message: 'Please confirm your password.'}
  ],
  matchingPasswords: [
    {type: 'areEqual', message: 'Your passwords mismatch.'}
  ],
  terms: [
    {type: 'pattern', message: 'You need to accept the terms and conditions.'}
  ],
};
