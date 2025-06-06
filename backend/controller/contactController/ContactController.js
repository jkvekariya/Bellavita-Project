import ContactModel from "../../model/contactModel/ContactModel.js";

const Controller = {
    async contact (req, res) {
        try {
          const { name, email, phone, comment } = req.body;
      
          if (!email) {
            return res.status(400).json({ message: 'Email is required' });
          }
      
          const contact = new ContactModel({ name, email, phone, comment });
          await contact.save();
      
          res.status(201).json({ message: 'Inquiry submitted successfully', contact  });
        } catch (error) {
          res.status(500).json({ message: 'Server error', error: error.message });
        }
      },
}
export default Controller;