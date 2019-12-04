export const ServiceValidation = {
  name: [
    {type: 'required', message: 'Name is required.'},
    {type: 'maxlength', message: 'Name must be shorter than 100 characters.'},
  ],
  category: [
    {type: 'required', message: 'Category is required.'},
    {type: 'maxlength', message: 'Category must be shorter than 100 characters.'},
  ],
  available: [
    {type: 'required', message: 'Availability is required.'},
    {type: 'maxlength', message: 'Availability must be shorter than 100 characters.'},
  ],
  availability: [
    {type: 'required', message: 'Availability is required.'},
    {type: 'maxlength', message: 'Availability must be shorter than 100 characters.'},
  ],
  place: [
    {type: 'required', message: 'Place is required.'},
    {type: 'maxlength', message: 'Place must be shorter than 100 characters.'},
  ],
  price: [
    {type: 'required', message: 'Price is required.'},
    {type: 'maxlength', message: 'Price must be shorter than 100 characters.'},
  ],
  quantity: [
    {type: 'required', message: 'Quantity is required.'},
    {type: 'maxlength', message: 'Quantity must be shorter than 100 characters.'},
  ],
  description: [
    {type: 'required', message: 'Description is required.'},
    {type: 'maxlength', message: 'Description must be shorter than 1000 characters.'},
  ],
};
