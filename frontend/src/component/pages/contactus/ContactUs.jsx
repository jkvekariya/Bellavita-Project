import React, { useState } from "react";
import Api from "../../../Apis/backendApi";
import toast from 'react-hot-toast'
import Layout from "../../layout/layout";

const ContactUs = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        comment: '',
    });

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.email || !formData.comment) {
            toast.error('Email and Comment are required.');
            return;
        }

        try {
            const response = await fetch(Api.contact.url, {
                method: Api.contact.method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            let data;
            try {
                data = await response.json();
            } catch {
                data = null;
            }

            if (response.ok) {
                toast.success('Message sent successfully!');
                setFormData({ name: '', email: '', phone: '', comment: '' });
            } else {
                toast.error(data?.message || 'Something went wrong.');
            }
        } catch (error) {
            console.error('Error submitting contact form:', error);
            toast.error('Network error. Please try again.');
        }

    };
    return (
        <Layout>
            <div className="max-w-6xl mx-auto px-4 py-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-2">DROP US A LINE</h2>
                <p className="text-center text-md text-gray-700 mb-1">
                    Have a question or comment? Use the form below to send us a message and our team will get back to you ASAP.
                </p>
                <p className="text-center text-gray-700 mb-4">
                    Or reach us at <a className=" border-b">+91 9311732440</a> (10:00 AM to 7:00 PM, Monday to Sunday)
                </p>
                <p className="text-center text-sm text-gray-600 font-medium mb-10">
                    <strong>For instant resolution, chat with us by clicking on the WhatsApp icon below</strong>
                </p>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-2">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <p className="font-semibold text-3xl my-12">Get in touch</p>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 text-xs focus:outline-none"
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 text-xs focus:outline-none"
                                required
                            />
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Phone number"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 text-xs focus:outline-none"
                                required
                            />
                            <textarea
                                name="comment"
                                placeholder="Comment"
                                rows="4"
                                value={formData.comment}
                                onChange={handleChange}
                                className="w-full border border-gray-300 p-3 text-xs focus:outline-none"
                                required
                            />
                            <button
                                type="submit"
                                className="bg-black text-white px-15 py-3 hover:bg-gray-800"
                            >
                                Send Message
                            </button>
                        </form>
                    </div>

                    <div className="flex-1 space-y-6 ml-15">
                        <div>
                            <h4 className=" mt-13 mb-6 text-lg">Marketed By:</h4>
                            <p className="text-sm text-gray-700 tracking-wide leading-5">
                                BellaVita First Floor, Plot 417, Udyog Vihar<br /> III Rd,
                                Phase III, Udyog Vihar, Sector 20,<br /> Gurugram, 122008, Haryana
                            </p>
                        </div>

                        <div>
                            <h4 className=" mt-10  mb-6 text-lg">Manufactured By:</h4>
                            <p className="text-sm text-gray-700 tracking-wide leading-5">
                                Idam Natural Wellness Pvt. Ltd Ground<br /> Floor, Plot 417, Udyog Vihar III Rd,
                                Phase<br /> III, Udyog Vihar, Sector 20, Gurugram, <br />122008, Haryana
                            </p>
                        </div>

                        <div>
                            <h4 className="text-lg mt-10 mb-4">Email:</h4>
                            <a href="mailto:shop@bellavitaorganic.com" className="text-gray-600 text-sm">
                                shop@bellavitaorganic.com
                            </a>
                        </div>

                        <div>
                            <h4 className=" mb-3 mt-8 text-lg">Contact Number:</h4>
                            <p className="text-sm text-gray-700 tracking-wide">
                                <span className="text-[15px] text-black">  Call:</span> <a href="tel:+919311732440" >+91 9311732440</a> (Monday–Sunday)<br />
                                9:00 AM - 9:00 PM
                            </p>

                            <p className="text-sm text-gray-700 mt-5 tracking-wide">
                                <span className="text-[15px] text-black">   WhatsApp:</span>  <a href="tel:+919311732440" >+91 9311732440</a><br />
                                (Monday-Sunday 9:00 AM - 9:00 PM).
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </Layout>
    );

};


export default ContactUs;


