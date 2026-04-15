
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, LogOut, Menu, X } from 'lucide-react';
import { useAdminAuth } from '@/context/AdminAuthContext';
import JvcLogo from '@/assets/icons/jvc_logo_3.png';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileEnrollmentOpen, setIsMobileEnrollmentOpen] = useState(false);
  const { isAuthenticated, user } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isWhitePage = location.pathname.startsWith('/merchants');

  return (
    <>
    {/*React based pages link*/}
    {/*
      <header className={`absolute top-0 left-0 right-0 z-50 px-4 py-6 lg:px-8 ${isWhitePage ? 'bg-jvc-blue-950' : ''}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-white">
          JVC
        </Link>
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-blue-200 transition-colors">Home</Link>
          <div className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
            <button className="text-white hover:text-blue-200 transition-colors flex items-center gap-1">
              Merchant Enrollment
              <ChevronDown className="w-4 h-4" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                <Link
                  to="/merchant-admin-application/review-queue"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Review Queue
                </Link>
                <Link
                  to="/merchant-admin-application/pending"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Pending Applications
                </Link>
                <Link
                  to="/merchant-admin-application/completed"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Completed Applications
                </Link>
              </div>
            )}
          </div>

          <Link to="/merchants" className="text-white hover:text-blue-200 transition-colors">Merchants</Link>
          <Link to ="/pricing" className="text-white hover:text-blue-200 transition-colors">Pricing</Link>
          <Link to ="/about" className="text-white hover:text-blue-200 transition-colors">About</Link>
          <Link to ="/contact" className="text-white hover:text-blue-200 transition-colors">Contact</Link>

        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <span className="text-white text-sm hidden lg:block">
                {user.email}
              </span>
              <Button
                onClick={() => navigate('/admin/logout')}
                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button
              onClick={() => navigate('/merchant-application')}
              className="bg-white text-jvc-blue-950 hover:bg-gray-100 px-6 py-2 rounded-lg font-medium">
              Get Started
            </Button>
          )}
        </div>
      </div>
    </header>
    */}

    {/*Wordpress site links*/}
    <header className={`absolute top-0 left-0 right-0 z-50 px-4 py-4 sm:py-6 lg:px-8 ${isWhitePage ? 'bg-jvc-blue-950' : ''}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="https://jvcpayments.com/" className="inline-block">
        <img
          src={JvcLogo}
          alt="JVC Payments"
          className="h-8 md:h-10 w-auto hover:opacity-90 transition-opacity"
        />
        </a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          <a href="https://jvcpayments.com/" className="text-sm font-semibold text-white px-6 py-1 rounded transition-colors hover:bg-white hover:text-jvc-blue-950">Home</a>

          {/*For Admin*/}
          {isAuthenticated && (
            <div className="relative" onMouseEnter={() => setIsDropdownOpen(true)} onMouseLeave={() => setIsDropdownOpen(false)}>
              <button className="text-sm font-semibold text-white px-6 py-1 rounded transition-colors hover:bg-white hover:text-jvc-blue-950 flex items-center gap-1">
                Merchant Enrollment
                <ChevronDown className="w-4 h-4" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-0 pt-2 w-56">
                  <div className="bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <Link
                      to="/merchant-admin-application/review-queue"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Review Queue
                    </Link>
                    <Link
                      to="/merchant-admin-application/pending"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Pending Applications
                    </Link>
                    <Link
                      to="/merchant-admin-application/completed"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Completed Applications
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {isAuthenticated && (
            <Link
              to="/consumer-admin-application"
              className="text-sm font-semibold text-white px-6 py-1 rounded transition-colors hover:bg-white hover:text-jvc-blue-950"
            >
              Consumer Applications
            </Link>
          )}

          <a href="https://jvccard.com/" className="text-sm font-semibold text-white px-6 py-1 rounded transition-colors hover:bg-white hover:text-jvc-blue-950">Consumer Site</a>
          <a href="https://jvcpayments.com/merchants/" className="text-sm font-semibold text-white px-6 py-1 rounded transition-colors hover:bg-white hover:text-jvc-blue-950">Merchants</a>
          <a href="https://jvcpayments.com/about-us/" className="text-sm font-semibold text-white px-6 py-1 rounded transition-colors hover:bg-white hover:text-jvc-blue-950">About</a>
          <a href="https://jvcpayments.com/contact/" className="text-sm font-semibold text-white px-6 py-1 rounded transition-colors hover:bg-white hover:text-jvc-blue-950">Contact</a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user ? (
            <>
              <span className="text-white text-sm hidden lg:block">
                {user.email}
              </span>
              <Button
                onClick={() => navigate('/admin/logout')}
                className="bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg font-medium flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <Button 
              onClick={() => navigate('/merchant-application')}
              className="bg-white text-jvc-blue-950 hover:bg-teal-300 px-6 py-2 rounded-lg font-medium">
              Get Started
            </Button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Drawer */}
          <div className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-jvc-blue-950 z-50 md:hidden overflow-y-auto shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Drawer Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                <img src={JvcLogo} alt="JVC Payments" className="h-8 w-auto" />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Drawer Content */}
              <nav className="flex-1 py-4">
                {/* User Info */}
                {isAuthenticated && user && (
                  <div className="px-4 py-3 mb-2 border-b border-white/20">
                    <p className="text-white text-sm font-medium">{user.email}</p>
                  </div>
                )}

                {/* Navigation Links */}
                <div className="space-y-1 px-2">
                  <a 
                    href="https://jvcpayments.com/" 
                    className="block px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Home
                  </a>

                  {/* Admin Merchant Enrollment */}
                  {isAuthenticated && (
                    <div>
                      <button
                        onClick={() => setIsMobileEnrollmentOpen(!isMobileEnrollmentOpen)}
                        className="w-full flex items-center justify-between px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
                      >
                        <span>Merchant Enrollment</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${isMobileEnrollmentOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isMobileEnrollmentOpen && (
                        <div className="ml-4 mt-1 space-y-1">
                          <Link
                            to="/merchant-admin-application/review-queue"
                            className="block px-4 py-2 text-white/80 text-sm hover:bg-white/10 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Review Queue
                          </Link>
                          <Link
                            to="/merchant-admin-application/pending"
                            className="block px-4 py-2 text-white/80 text-sm hover:bg-white/10 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Pending Applications
                          </Link>
                          <Link
                            to="/merchant-admin-application/completed"
                            className="block px-4 py-2 text-white/80 text-sm hover:bg-white/10 rounded-lg transition-colors"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            Completed Applications
                          </Link>
                        </div>
                      )}
                    </div>
                  )}

                  {isAuthenticated && (
                    <Link
                      to="/consumer-admin-application"
                      className="block px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Consumer Applications
                    </Link>
                  )}

                  <a
                    href="https://jvccard.com/"
                    className="block px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Consumer Site
                  </a>

                  <a 
                    href="https://jvcpayments.com/merchants/" 
                    className="block px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Merchants
                  </a>

                  <a 
                    href="https://jvcpayments.com/about-us/" 
                    className="block px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    About
                  </a>

                  <a 
                    href="https://jvcpayments.com/contact/" 
                    className="block px-4 py-3 text-white font-medium hover:bg-white/10 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Contact
                  </a>
                </div>
              </nav>

              {/* Drawer Footer - Actions */}
              <div className="p-4 border-t border-white/20">
                {isAuthenticated && user ? (
                  <Button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/admin/logout');
                    }}
                    className="w-full bg-red-600 text-white hover:bg-red-700 px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                ) : (
                  <Button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      navigate('/merchant-application');
                    }}
                    className="w-full bg-white text-jvc-blue-950 hover:bg-teal-300 px-6 py-3 rounded-lg font-medium"
                  >
                    Get Started
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
    </>
  );
};

export default Header;
