
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { requestOtp, verifyOtp } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const PhoneVerificationPage = () => {
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [userExists, setUserExists] = useState<boolean | null>(null);
  const [error, setError] = useState('');
  const [openTypeDialog, setOpenTypeDialog] = useState(false);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);
  const [openSignupConfirmDialog, setOpenSignupConfirmDialog] = useState(false);

  const navigate = useNavigate();
  const { type } = useParams<{ type: string }>();
  const { toast } = useToast();

  const handleSend = async () => {
    setError('');
    setLoadingSend(true);
    try {
      const res = await requestOtp(phone);
      setUserExists(res.data.userExists);

      if (res.data.userExists) {
        setOtpSent(true);
        setOtpVerified(false); // reset verify state
      } else {
        setOpenSignupConfirmDialog(true);
      }
    } catch (e: any) {
      setError(e.message || 'Failed to send OTP');
    } finally {
      setLoadingSend(false);
    }
  };

  const handleVerify = async () => {
    setError('');
    setLoadingVerify(true);
    try {

      const res = await verifyOtp(phone, code);
      if (res.userExists) {
        setOtpVerified(true);
        setOtpSent(false);
        
        setOpenSuccessDialog(true);
        
        setCode('');
        setPhone('');
      } 
    } catch (e: any) {
      if (e.message?.includes('Invalid or expired OTP')) {
        setError('Verification failed. Please try again.');
        setOtpSent(false); // allow re-send
        setCode(''); // reset code input
      } else {
        setError(e.message || 'OTP verification failed');
      }
    } finally {
      setLoadingVerify(false);
      
    }
  };

  const handleContinueToSignup = () => {
    if (type === 'merchant') {
      navigate('/merchant-application');
    } else if (type === 'consumer') {
      navigate('/consumer-application');
    } else {
      setOpenTypeDialog(true);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-jvc-blue-950 text-white">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 md:px-16 bg-jvc-blue-950">
        <div className="max-w-6xl mx-auto">
          <nav className="text-sm text-gray-300 mb-4">
            <span className="text-gray-400">Home</span> &nbsp;›&nbsp;
            <span className="text-white font-medium">Phone Verification</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Verify Your<br />Phone Number
          </h1>
          <p className="text-lg mt-2 text-blue-200">
            We’ll send you an OTP to verify your mobile number.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <div className="bg-gray-50 text-black flex-1 py-20">
        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-10 space-y-8 border border-gray-200">
            <h2 className="text-2xl font-semibold text-center text-jvc-blue-950">
              Phone Number Verification
            </h2>
            <p className="text-center text-gray-600 text-sm">
              Enter your phone number and we’ll send you a one-time password (OTP) to verify your identity.
            </p>

            <div className="space-y-6">
              {/* Phone Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <Input
                  placeholder="e.g. +923001234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-11"
                />
              </div>

              {/* Send / Resend OTP Button */}
              <Button
                onClick={handleSend}
                disabled={loadingSend || (otpSent && !error)}
                className="w-full bg-jvc-blue-950 hover:bg-jvc-blue-900"
              >
                {loadingSend ? 'Sending...' : otpSent && error ? 'Resend OTP' : 'Send OTP'}
              </Button>

              {/* OTP Input + Verify */}
              {otpSent && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Enter OTP
                    </label>
                    <Input
                      placeholder="Enter OTP"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      className="h-11"
                    />
                  </div>

                  <Button
                    onClick={handleVerify}
                    disabled={loadingVerify || !code}
                    className="w-full bg-jvc-blue-950 hover:bg-jvc-blue-900"
                  >
                    {loadingVerify ? 'Verifying...' : 'Verify'}
                  </Button>
                </>
              )}

              {/* Error Display */}
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/*  Verification Success Dialog */}
      <Dialog open={openSuccessDialog} onOpenChange={setOpenSuccessDialog}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Verification Successful</DialogTitle>
          </DialogHeader>
          <p>We've sent you the app download link on your email. Please check your inbox.</p>
          <DialogFooter>
            <Button onClick={() => setOpenSuccessDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/*  User Not Found Dialog */}
      <Dialog open={openSignupConfirmDialog} onOpenChange={setOpenSignupConfirmDialog}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Verification Failed</DialogTitle>
          </DialogHeader>
          <p>This number is not associated with any account. Would you like to sign up?</p>
          <DialogFooter className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setOpenSignupConfirmDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleContinueToSignup}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/*  Missing Type Fallback */}
      <Dialog open={openTypeDialog} onOpenChange={setOpenTypeDialog}>
        <DialogContent className="space-y-4">
          <DialogHeader>
            <DialogTitle>Select application type</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate('/merchant-application')}>Merchant</Button>
            <Button onClick={() => navigate('/consumer-application')}>Consumer</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PhoneVerificationPage;
