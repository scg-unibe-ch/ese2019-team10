import {NgIterable} from '@angular/core';

export const BookingValidation = {
  message: [
    {type: 'required', message: 'Message is required.'},
    {type: 'maxlength', message: 'Message must be shorter than 1000 characters.'},
  ] as NgIterable<object>,
  events: [
    {type: 'required', message: 'Event is required.'},
  ] as NgIterable<object>,

};
