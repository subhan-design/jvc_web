
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FAQSection = () => {
  return (
    <section className="py-20 bg-jvc-gradient">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-blue-100">
            Get answers to common questions about our payment platform.
          </p>
        </div>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-white/10 backdrop-blur-sm rounded-lg border-none">
            <AccordionTrigger className="text-white hover:text-blue-200 px-6 py-4 text-left">
              Is my payment information secure?
            </AccordionTrigger>
            <AccordionContent className="text-blue-100 px-6 pb-4">
              Yes, we use bank-level encryption and comply with PCI DSS standards to ensure your payment information is completely secure. All transactions are processed through our encrypted servers.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-2" className="bg-white/10 backdrop-blur-sm rounded-lg border-none">
            <AccordionTrigger className="text-white hover:text-blue-200 px-6 py-4 text-left">
              What payment methods do you accept?
            </AccordionTrigger>
            <AccordionContent className="text-blue-100 px-6 pb-4">
              We accept all major credit and debit cards, digital wallets like Apple Pay and Google Pay, and QR code payments. We're constantly adding new payment methods to meet customer preferences.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-3" className="bg-white/10 backdrop-blur-sm rounded-lg border-none">
            <AccordionTrigger className="text-white hover:text-blue-200 px-6 py-4 text-left">
              How long does setup take?
            </AccordionTrigger>
            <AccordionContent className="text-blue-100 px-6 pb-4">
              Most merchants can complete setup in under 15 minutes. Once approved, you can start accepting payments immediately. Our support team is available to help you through the process.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="item-4" className="bg-white/10 backdrop-blur-sm rounded-lg border-none">
            <AccordionTrigger className="text-white hover:text-blue-200 px-6 py-4 text-left">
              What are your processing fees?
            </AccordionTrigger>
            <AccordionContent className="text-blue-100 px-6 pb-4">
              Our competitive rates start at 2.9% + 30¢ per transaction. We offer volume discounts for high-volume merchants and transparent pricing with no hidden fees.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
