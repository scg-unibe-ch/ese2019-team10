import {NgIterable} from '@angular/core';

export const ValidationMessages = {
  firstName: [
    {type: 'required', message: 'First name is required.'},
    {type: 'maxlength', message: 'First name must be shorter than 100 characters.'},
  ] as NgIterable<object>,
  lastName: [
    {type: 'required', message: 'Last name is required.'},
    {type: 'maxlength', message: 'Last name must be shorter than 100 characters.'},
  ] as NgIterable<object>,
  email: [
    {type: 'required', message: 'E-mail address is required.'},
    {type: 'email', message: 'Format: ex.ample@example.com'},
    {type: 'pattern', message: 'Format: ex.ample@example.com'},
    {type: 'maxlength', message: 'E-mail address must be shorter than 100 characters.'}
  ] as NgIterable<object>,
  phone: [
    {type: 'required', message: 'Phone number is required.'},
    {type: 'pattern', message: 'Only numbers, spaces, and a + at the start are allowed.'},
    {type: 'minlength', message: 'Phone number must be longer than 3 characters.'},
    {type: 'maxlength', message: 'Phone number must be shorter than 100 characters.'}
  ] as NgIterable<object>,
  gender: [
    {type: 'required', message: 'Gender is required.'},
  ] as NgIterable<object>,
  birthday: [
    {type: 'datePattern', message: 'Allowed formats: 1/1/1911, 19/09/1999, 31/12/2000'},
    {type: 'required', message: 'Birthday is required.'},
    {type: 'maxlength', message: 'Birthday must be shorter than 11 characters.'}
  ] as NgIterable<object>,
  street: [
    {type: 'required', message: 'Street is required.'},
    {type: 'maxlength', message: 'Street must be shorter than 100 characters.'}
  ] as NgIterable<object>,
  city: [
    {type: 'required', message: 'City is required.'},
    {type: 'maxlength', message: 'City must be shorter than 100 characters.'}
  ] as NgIterable<object>,
  postalCode: [
    {type: 'required', message: 'Postal code is required.'},
    {type: 'pattern', message: 'Postal code must only have numbers'},
    {type: 'maxlength', message: 'Postal code must be shorter than 20 characters.'}
  ] as NgIterable<object>,
  country: [
    {type: 'required', message: 'Country is required.'},
    {type: 'maxlength', message: 'Country must be shorter than 100 characters.'}
  ] as NgIterable<object>,
  password: [
    {type: 'required', message: 'Password is required.'},
    {type: 'minlength', message: 'Password must be longer than 5 characters.'},
    {type: 'pattern', message: 'Password must contain at least one uppercase, one lowercase, and one number.'},
    {type: 'maxlength', message: 'Password must be shorter than 500 characters.'}
  ] as NgIterable<object>,
  confirmPassword: [
    {type: 'required', message: 'You must confirm your password.'}
  ] as NgIterable<object>,
  matchingPasswords: [
    {type: 'areEqual', message: 'Your passwords don\'t match.'}
  ] as NgIterable<object>,
  terms: [
    {type: 'pattern', message: 'You must accept the terms and conditions.'}
  ] as NgIterable<object>,
};
