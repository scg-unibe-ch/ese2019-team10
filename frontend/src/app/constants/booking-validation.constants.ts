export const BookingValidation = {
  message: [
    {type: 'required', message: 'Your booking should have a message.'},
    {type: 'maxlength', message: 'Your message should be less than 1000 characters long.'},
  ],
  events: [
    {type: 'required', message: 'You need to add an event.'},
    {type: 'maxlength', message: 'Your event\'s place should be less than 100 characters long.'},
  ],

};
