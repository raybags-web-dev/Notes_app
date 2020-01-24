const validator = require('validator');
const getNotes = require('../../app');

descirbe('unit test', () => {

   it('should conatain email, phone, and url', () => {
      const validateValue = {
         email: 'xxx@example.com',
         phone: '555586789',
         url: 'www.baguma/api.library'
      }

      expect(validateValue).toHaveProperty('email', 'phone', 'url');
   })
})