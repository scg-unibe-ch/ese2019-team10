import {NgIterable} from '@angular/core';

export const EventValidation = {
  name: [
    {type: 'required', message: 'Name is required.'},
    {type: 'maxlength', message: 'Name must be shorter than 100 characters.'},
  ] as NgIterable<object>,
  place: [
    {type: 'required', message: 'Place is required.'},
    {type: 'maxlength', message: 'Place must be shorter than 100 characters.'},
  ] as NgIterable<object>,
  date: [
    {type: 'required', message: 'Date is required.'},
    {type: 'maxlength', message: 'Date must be shorter than 100 characters.'},
  ] as NgIterable<object>,
  description: [
    {type: 'required', message: 'Description is required.'},
    {type: 'maxlength', message: 'Description must be shorter than 1000 characters.'},
  ] as NgIterable<object>,
};
