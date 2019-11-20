export const ServiceValidation = {
  name: [
    {type: 'required', message: 'Your service should have a name.'},
    {type: 'maxlength', message: 'Your service\'s name should be less than 100 characters long.'},
  ],
  category: [
    {type: 'required', message: 'Your service should have a category.'},
    {type: 'maxlength', message: 'Your service\'s category should be less than 100 characters long.'},
  ],
  available: [
    {type: 'required', message: 'Your service should have an availability.'},
    {type: 'maxlength', message: 'Your service\'s availability should be less than 100 characters long.'},
  ],
  availability: [
    {type: 'required', message: 'Your service should have an availability.'},
    {type: 'maxlength', message: 'Your service\'s availability should be less than 100 characters long.'},
  ],
  place: [
    {type: 'required', message: 'Your service should have a place.'},
    {type: 'maxlength', message: 'Your service\'s place should be less than 100 characters long.'},
  ],
  price: [
    {type: 'required', message: 'Your service should have a price.'},
    {type: 'maxlength', message: 'Your service\'s price should be less than 100 characters long.'},
  ],
  quantity: [
    {type: 'required', message: 'Your service should have a quantity.'},
    {type: 'maxlength', message: 'Your service\'s quantity should be less than 100 characters long.'},
  ],
  description: [
    {type: 'required', message: 'Your service should have a description.'},
    {type: 'maxlength', message: 'Your service\'s description should be less than 1000 characters long.'},
  ],
};
