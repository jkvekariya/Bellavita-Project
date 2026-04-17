import ContactModel from "../../model/contactModel/ContactModel.js";

const Controller = {
  async contact(req, res) {
    try {
      const { name, email, phone, comment, user_id } = req.body;

      if (!email) {
        return res.status(400).json({ message: 'Email is required' });
      }

      const contact = new ContactModel({
        name,
        email,
        phone,
        comment,
        user_id: user_id || null // Add user_id if provided
      });
      await contact.save();

      res.status(201).json({ message: 'Inquiry submitted successfully', contact });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  },

  async getAllContacts(req, res) {
    try {
      const contacts = await ContactModel.find().sort({ createdAt: -1 });
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching contacts', error: error.message });
    }
  },

  async getUserContacts(req, res) {
    try {
      const { userId } = req.params;
      const contacts = await ContactModel.find({ user_id: userId }).sort({ createdAt: -1 });
      res.status(200).json(contacts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user contacts', error: error.message });
    }
  },

  async updateContactStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!['Processing', 'Resolved', 'Rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
      }

      const updatedContact = await ContactModel.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );

      if (!updatedContact) {
        return res.status(404).json({ message: 'Contact inquiry not found' });
      }

      res.status(200).json({ message: 'Status updated successfully', contact: updatedContact });
    } catch (error) {
      res.status(500).json({ message: 'Error updating status', error: error.message });
    }
  }
}
export default Controller;