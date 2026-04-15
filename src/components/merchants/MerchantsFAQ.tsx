
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const MerchantsFAQ = () => {
  const faqs = [
    {
      question: "What credit cards do you support?",
      answer: "We support all major credit cards including Visa, Mastercard, American Express, and Discover. We also support digital wallets and alternative payment methods."
    },
    {
      question: "How long does the application process take?",
      answer: "Our streamlined application process takes under 5 minutes to complete, and you can get approved instantly in most cases."
    },
    {
      question: "Are there any setup fees or monthly costs?",
      answer: "No, we don't charge any setup fees or monthly costs. You only pay per transaction with our transparent pricing model."
    },
    {
      question: "How quickly do I receive my payments?",
      answer: "We offer fast settlements with next-day funding available for approved merchants. Some qualifying businesses can receive same-day settlements."
    },
    {
      question: "What kind of support do you provide?",
      answer: "We provide 24/7 customer support through live chat, phone, and email. Our dedicated support team is always ready to help you with any questions or issues."
    },
    {
      question: "Do I need special equipment?",
      answer: "No special equipment is required. Our solutions work with your existing setup and devices. We support both online and in-person transactions."
    },
    {
      question: "Can I integrate JVC with my existing systems?",
      answer: "Yes, we offer comprehensive APIs and integrations for most popular e-commerce platforms, point-of-sale systems, and accounting software."
    }
  ];

  return (
    <section className="py-20 bg-jvc-blue-950">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-blue-200">
            Get answers to the most common questions about our merchant services
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-6">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 px-2"
            >
              <AccordionTrigger className="text-white hover:text-blue-200 px-6 py-6 text-left text-lg font-semibold">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-blue-100 px-6 pb-6 text-lg leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default MerchantsFAQ;
