import React from 'react'
import { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const Accordion = ({ product }) => {
    const AccordionItem = ({ title, content }) => {
        const [open, setOpen] = useState(false);
        return (
            <div className="border-b-gray-300 border-b">
                <button
                    onClick={() => setOpen(!open)}
                    className="w-full text-black hover:text-gray-500 text-left px-2 py-6 font-[600] flex justify-between items-center"
                >
                    {title}
                    <span>{open ? <FaMinus /> : <FaPlus />}</span>
                </button>
                {open && (
                    <div
                        className="px-2 pb-4 text-sm font-normal text-black space-y-1 pl-10"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />
                )}
            </div>
        );
    };
    return (
        <div>
            <div className="max-w-5xl mx-auto mt-8 divide-y">
                <AccordionItem
                    title="KEY BENEFITS"
                    content={`<p>${product.benefits?.join("<br>")}</p>`}
                />
                <AccordionItem
                    title="HOW TO USE"
                    content={product.howtouse || "No usage instructions available."}
                />
                <AccordionItem
                    title="FAQ's"
                    content={`<div style="background: #fff; ; border-radius: 10px;  rgba(0, 0, 0, 0.1);">

                                <div style="margin-bottom: 20px;">
                                    <h3 style="margin-bottom: 1px; font-weight: bold;">Q. How long does a perfume last?</h3>
                                    <p style="margin: 0; line-height: 1.6;">
                                    A. Our perfumes have a maximum duration of 8 hours. You will not have any lasting issues because our fragrances were formulated specifically for the Indian climate.
                                    </p>
                                </div>

                                <div style="margin-bottom: 20px;">
                                    <h3 style="margin-bottom: 1px;font-weight: bold;">Q. How should I keep/store my Perfume?</h3>
                                    <p style="margin: 0; line-height: 1.6;">
                                    A. Yes, the location of your perfume is critical. It is more beneficial to keep perfume away from bright sunlight and extreme temperatures. The perfume's quality is retained, and its shelf life is increased.
                                    </p>
                                </div>

                                <div style="margin-bottom: 20px;">
                                    <h3 style="margin-bottom: 1px; font-weight: bold;">Q. How can I make my Perfume Last Longer?</h3>
                                    <p style="margin: 0; line-height: 1.6;">
                                    A. Moisturize your skin before applying perfume to increase its impact and improve the overall quality of the fragrance. Perfume frequently fades quickly on extremely dry skin. Instead, sprinkle it on top of a small layer of petroleum jelly or unscented body lotion. These moisturizers not only keep your skin smooth and supple, but they also provide a surface for the perfume oils to adhere to, allowing your smell to stay longer.
                                    </p>
                                </div>

                                </div>`}
                />
                <AccordionItem
                    title="OTHER INFORMATION"
                    content={`<ul class="list-disc pl-5 space-y-1">
                        <li>Country of Origin: <b>India</b></li>
                        <li>Marketed By - <b>Idam Natural Wellness Private Limited</b>, Plot No. 417, Udyog Vihar Phase-iii, Gurgaon, Haryana, 122008</li>
                        <li>Manufactured By - <b>Stella Industries Limited</b>, Old Khandsa Road, Kherki Daula, Gurugram, Haryana 122001 / <b>Helios Packaging Pvt Ltd</b>, A-140, EPIP Zone, RIICO Industrial Area, Neemrana -301705, Alwar, Rajasthan, India.</li>
                    </ul>`}
                />
                <AccordionItem
                    title="ALL INGREDIENTS"
                    content={product.allingredients || "No ingredients mentioned."}
                />
            </div>
        </div>
    )
}

export default Accordion