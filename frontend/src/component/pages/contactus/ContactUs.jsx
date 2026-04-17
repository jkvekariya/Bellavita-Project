import React, { useState } from "react";
import Api from "../../../Apis/backendApi";
import toast from 'react-hot-toast'
import Layout from "../../layout/layout";
import Context from "../../context/Context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const ContactUs = () => {
    const { user } = useContext(Context);
    const navigate = useNavigate();

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
                body: JSON.stringify({ ...formData, user_id: user?._id }),
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
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 font-['Lato']">
                <div className="text-center mb-16">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-['Jost'] tracking-wide uppercase">
                        Drop Us A Line
                    </h1>
                    <p className="text-base md:text-lg text-gray-600 mb-3 leading-relaxed max-w-3xl mx-auto">
                        Have a question or comment? Use the form below to send us a message and our team will get back to you ASAP.
                    </p>
                    <p className="text-gray-700 mb-2">
                        Or reach us at <a href="tel:+919945678720" className="font-semibold border-b-2 border-gray-800 hover:text-gray-600 transition-colors">+91 9945678720</a>
                    </p>
                    <p className="text-sm text-gray-500">(10:00 AM to 7:00 PM, Monday to Sunday)</p>
                    <p className="text-sm text-gray-600 font-medium mt-6 bg-gray-50 inline-block px-6 py-3 rounded-md">
                        <i className="fa-brands fa-whatsapp text-green-500 mr-2"></i>
                        <strong>For instant resolution, chat with us on WhatsApp</strong>
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white shadow-lg rounded-lg p-8 md:p-12">
                            {/* Your Queries Button */}
                            {user && (
                                <div className="mb-6">
                                    <button
                                        onClick={() => navigate('/myqueries')}
                                        className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-black transition-colors border-2 border-gray-300 hover:border-black px-4 py-2 rounded-md"
                                    >
                                        <i className="fa-solid fa-clipboard-list"></i>
                                        <span>Your Queries</span>
                                    </button>
                                </div>
                            )}

                            <h2 className="font-bold text-3xl md:text-4xl mb-10 text-gray-900 font-['Jost']">Get in Touch</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter your full name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-200 p-4 text-sm focus:outline-none focus:border-gray-800 transition-colors rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter your email address"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-200 p-4 text-sm focus:outline-none focus:border-gray-800 transition-colors rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-200 p-4 text-sm focus:outline-none focus:border-gray-800 transition-colors rounded-md"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                                    <textarea
                                        name="comment"
                                        placeholder="How can we help you?"
                                        rows="5"
                                        value={formData.comment}
                                        onChange={handleChange}
                                        className="w-full border-2 border-gray-200 p-4 text-sm focus:outline-none focus:border-gray-800 transition-colors rounded-md resize-none"
                                        required
                                    />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <button
                                        type="submit"
                                        className="w-full sm:w-auto bg-black text-white px-12 py-4 text-sm font-bold uppercase tracking-widest hover:bg-gray-800 transition-all duration-300 rounded-md shadow-md hover:shadow-lg"
                                    >
                                        Send Message
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => navigate(-1)}
                                        className="w-full sm:w-auto border-2 border-gray-300 text-gray-700 px-12 py-4 text-sm font-bold uppercase tracking-widest hover:border-black hover:text-black transition-all duration-300 rounded-md"
                                    >
                                        Back
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md border border-gray-100">
                            <h3 className="font-bold text-xl mb-4 text-gray-900 font-['Jost'] flex items-center">
                                <i className="fa-solid fa-building mr-3 text-gray-700"></i>
                                Marketed By
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                BellaVita Organic<br />
                                B-45, Capital Square<br />
                                Near Yogi Chowk, Varachha<br />
                                Surat, Gujarat - 395006<br />
                                India
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md border border-gray-100">
                            <h3 className="font-bold text-xl mb-4 text-gray-900 font-['Jost'] flex items-center">
                                <i className="fa-solid fa-industry mr-3 text-gray-700"></i>
                                Manufactured By
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                                Idam Natural Wellness Pvt. Ltd<br />
                                Ground Floor, Plot 417<br />
                                Udyog Vihar III Rd, Phase III<br />
                                Gurugram, Haryana - 122008<br />
                                India
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md border border-gray-100">
                            <h3 className="font-bold text-xl mb-4 text-gray-900 font-['Jost'] flex items-center">
                                <i className="fa-solid fa-envelope mr-3 text-gray-700"></i>
                                Email
                            </h3>
                            <a href="mailto:shop@bellavitaorganic.com" className="text-sm text-gray-700 hover:text-black transition-colors font-medium">
                                shop@bellavitaorganic.com
                            </a>
                        </div>

                        <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-lg shadow-md border border-gray-100">
                            <h3 className="font-bold text-xl mb-4 text-gray-900 font-['Jost'] flex items-center">
                                <i className="fa-solid fa-phone mr-3 text-gray-700"></i>
                                Contact Number
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 mb-1">Call:</p>
                                    <a href="tel:+919945678720" className="text-sm text-gray-700 hover:text-black transition-colors">
                                        +91 9945678720
                                    </a>
                                    <p className="text-xs text-gray-500 mt-1">Monday–Sunday, 9:00 AM - 9:00 PM</p>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-900 mb-1">WhatsApp:</p>
                                    <a href="https://wa.me/919945678720" className="text-sm text-gray-700 hover:text-black transition-colors">
                                        +91 9945678720
                                    </a>
                                    <p className="text-xs text-gray-500 mt-1">Monday-Sunday, 9:00 AM - 9:00 PM</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );

};


export default ContactUs;
