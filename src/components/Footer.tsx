import { Link} from 'react-router-dom';
import { AtSign, Phone, MapPin } from "lucide-react";
import JvcLogo from '@/assets/icons/jvc_logo_3.png';

const Footer = () => {
//   return (
//     <footer className="bg-jvc-blue-950 text-white py-16">
//       <div className="max-w-7xl mx-auto px-4 lg:px-8">
//         <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
//           <div className="space-y-4">
//             <h3 className="text-xl font-bold">Contact Information</h3>
//             <div className="space-y-2 text-blue-200">
//               <p>Email: support@jvc.com</p>
//               <p>Phone: 1-800-JVC-PAY</p>
//               <p>Address: 123 Payment St, Finance City, FC 12345</p>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Product</h3>
//             <div className="space-y-2 text-blue-200">
//               <Link to ="/features" className="block hover:text-white transition-colors">
//                 Features
//               </Link>
//               <Link to ="/pricing" className="block hover:text-white transition-colors">
//                 Pricing
//               </Link>
//               <Link to ="/security" className="block hover:text-white transition-colors">
//                 Security
//               </Link>
//               <Link to ="/integrations" className="block hover:text-white transition-colors">
//                 Integrations
//               </Link>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Company</h3>
//             <div className="space-y-2 text-blue-200">
//               <Link to="/about" className="block hover:text-white transition-colors">
//                 About Us
//               </Link>
//               <Link to ="/careers" className="block hover:text-white transition-colors">
//                 Careers
//               </Link>
//               <Link to ="/press" className="block hover:text-white transition-colors">
//                 Press
//               </Link>
//               <Link to="/contact" className="block hover:text-white transition-colors">
//                 Contact
//               </Link>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold">Support</h3>
//             <div className="space-y-2 text-blue-200">
//               <Link to ="/help-center" className="block hover:text-white transition-colors">
//                 Help Center
//               </Link>
//               <Link to ="/api-documentation" className="block hover:text-white transition-colors">
//                 API Documentation
//               </Link>
//               <Link to ="/system-status" className="block hover:text-white transition-colors">
//                 System Status
//               </Link>
//               <Link to ="/community" className="block hover:text-white transition-colors">
//                 Community
//               </Link>
//             </div>
//           </div>
//         </div>

//         <div className="border-t border-blue-800 pt-8">
//           <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
//             <div className="text-2xl font-bold">JVC</div>
//             <div className="text-blue-200 text-sm">
//               © 2024 JVC. All rights reserved.
//             </div>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

return (
    <footer className="bg-jvc-blue-950 text-white rounded-t-[30px] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 py-20">

        {/* Top Contact Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center 
                px-10 md:px-24 py-3 md:py-3">
          <div>
            <h2 className="text-4xl font-semibold mb-6">
              Contact information
            </h2>

            <button className="mt-4 px-6 py-3 rounded-lg bg-jvc-blue-800 hover:bg-jvc-blue-700 transition text-sm font-semibold text-teal-300">
              <a href="https://jvcpayments.com/contact" className="hover:text-teal-300">Contact Us</a>
            </button>
          </div>

          <div className="space-y-2 text-sm text-blue-100">
            <div className="flex items-center gap-3  hover:text-teal-300 transition-colors cursor-pointer">
              <AtSign className="w-4 h-4 text-teal-300" />
              <span>hello@jvcpayments.com</span>
            </div>

            <div className="flex items-center gap-3  hover:text-teal-300 transition-colors cursor-pointer">
              <Phone className="w-4 h-4 text-teal-300" />
              <span>855.588.3688</span>
            </div>

            <a
              href="https://www.google.com/search?q=101+E.+Convention+Center+Drive%2C+Las+Vegas%2C+NV+89109&rlz=1C5CHFA_enUS971US971&oq=101+E.+Convention+Center+Drive%2C+Las+Vegas%2C+NV+89109&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIICAEQABgWGB4yCggCEAAYChgWGB4yCAgDEAAYFhgeMggIBBAAGBYYHjIICAUQABgWGB4yCAgGEAAYFhgeMggIBxAAGBYYHjIICAgQABgWGB4yCAgJEAAYFhge0gEHNTU0ajBqN6gCALACAA&sourceid=chrome&ie=UTF-8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 hover:text-teal-300 transition-colors cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-teal-300" />
              <span>
                101 E. Convention Center Drive, Las Vegas, NV 89109
              </span>
            </a>
          </div>
        </div>
      </div>

      {/*Divider */}
      <div className="border-t border-blue-800 mb-14" />

      <div className="max-w-7xl mx-auto px-8 pb-20">
        {/* Links Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm px-10 md:px-24">
          <div>
            <h4 className="mb-4 font-semibold text-blue-200">Product</h4>
            <ul className="text-[16px] font-semibold space-y-3">
              <li><a href="/merchant-application" className="hover:text-teal-300">Merchant Application</a></li>
              <li><a href="https://jvcpayments.com/merchants/" className="hover:text-teal-300">Merchants</a></li>
              <li><a href="https://jvccard.com/" className="hover:text-teal-300">Consumer Site</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-blue-200">Company</h4>
            <ul className="text-[16px] font-semibold space-y-3">
              <li><a href="https://jvcpayments.com/about-us/" className="hover:text-teal-300">About us</a></li>
              <li><a href="https://jvcpayments.com/contact" className="hover:text-teal-300">Contact</a></li>
              <li><a href="https://jvcpayments.com/wp-content/uploads/2025/03/Financial-Privacy-Notice-1.3.docx.pdf" className="hover:text-teal-300">Financial Privacy Notice</a></li>
              <li><a href="https://jvcpayments.com/wp-content/uploads/2025/03/Online-Privacy-Policy-1.1.docx.pdf" className="hover:text-teal-300">Online Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-blue-200">Resources</h4>
            <ul className="text-[16px] font-semibold space-y-3">
              <li><a href="https://jvcpayments.com/merchants/#:~:text=FAQ-,Frequently,-Asked%20Questions" className="hover:text-teal-300">FAQ</a></li>
              <li><a href="https://jvcpayments.com/contact" className="hover:text-teal-300">Help Center</a></li>
              <li><a href="https://jvcpayments.com/contact" className="hover:text-teal-300">Customer Support</a></li>
              <li><a href="https://jvcpayments.com/otp-terms-of-service/" className="hover:text-teal-300">OTP Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-blue-200">Social</h4>
            <ul className="text-[16px] font-semibold space-y-3">
              <li><a href="https://www.linkedin.com/company/jvc-card" className="hover:text-teal-300">LinkedIn</a></li>
              <li><a href="https://x.com/jvccard" className="hover:text-teal-300">X | Twitter</a></li>
              <li><a href="https://www.instagram.com/jvccard/" className="hover:text-teal-300">Instagram</a></li>
              <li><a href="https://www.facebook.com/people/JVCCard/61572848828154/" className="hover:text-teal-300">Facebook</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-blue-800" />

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-8 pb-20">
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 px-10 md:px-24">
          <img
          src={JvcLogo}
          alt="JVC Payments"
          className="h-8 md:h-12 w-auto hover:opacity-90 transition-opacity"
          />
          <div className="text-bold text-blue-300">
            © 2025 Joint Venture Card Holdings, Inc.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
