export const EventValidation = {
  name: [
    {type: 'required', message: 'Your event should have a name.'},
    {type: 'maxlength', message: 'Your event\'s name should be less than 100 characters long.'},
  ],
  place: [
    {type: 'required', message: 'Your event should have a place.'},
    {type: 'maxlength', message: 'Your event\'s place should be less than 100 characters long.'},
  ],
  date: [
    {type: 'required', message: 'Your event should have a date.'},
    {type: 'maxlength', message: 'Your event\'s date should be less than 100 characters long.'},
  ],
  description: [
    {type: 'required', message: 'Your event should have a description.'},
    {type: 'maxlength', message: 'Your event\'s description should be less than 1000 characters long.'},
  ],
};
