// import { useState, useEffect } from "react";

// import { useMerchantData } from "@/context/MerchantDataContext";
// import { loadMerchantData, getTimeSinceLastSave } from "@/lib/merchantPersistence";

// const AdminHome = () => {
//   return (
//     <>
//       {/* Continue Application Modal */}
     
      
//       <div className="bg-jvc-blue-950 flex-1 pt-24">
//         <div className="border-t border-white/20 w-full" />
//         {/* Hero Section */}
//         <section className="bg-jvc-blue-950 text-white py-20 px-4 md:px-16">
//           <div className="max-w-7xl mx-auto">
//             <nav className="text-sm text-gray-300 mb-6">
//               <span className="text-gray-400">Home</span> &nbsp;›&nbsp;{" "}
//               <span className="text-white font-medium">
//                 Merchant Enrollment
//               </span>
//             </nav>
//             <h1 className="text-4xl md:text-6xl font-bold leading-tight">
//               Home
//             </h1>
//           </div>
//         </section>
//         {/* Form Content */}
//         <div className="bg-white flex-1 flex items-center justify-center min-h-96">
//           <h2 className="text-2xl font-bold text-gray-800">Under Construction</h2>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminHome;



import React from "react";

function isAdminAuthenticated() {
  try {
    const token = localStorage.getItem("admin_access_token");
    const timestamp = localStorage.getItem("admin_auth_timestamp");
    if (!token || !timestamp) return false;
    const TWENTY_FOUR_HOURS = 24 * 60 * 60 * 1000;
    return Date.now() - parseInt(timestamp, 10) < TWENTY_FOUR_HOURS;
  } catch {
    return false;
  }
}

const AdminHome = () => {
  if (!isAdminAuthenticated()) {
    window.location.href = "/admin/login";
    return null;
  }
  return (
    <div className="bg-jvc-blue-950 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          Under Construction
        </h1>
        <p className="text-xl text-gray-300">
          We're working hard to bring you something amazing!
        </p>
      </div>
    </div>
  );
};

export default AdminHome;
