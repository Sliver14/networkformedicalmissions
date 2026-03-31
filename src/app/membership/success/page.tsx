import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

const SuccessPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-12 lg:p-20 shadow-2xl text-center space-y-8 border border-gray-100">
          <div className="bg-green-100 text-green-500 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
            <CheckCircle size={48} />
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 leading-tight">Payment Successful!</h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Thank you for your support and for joining the Network for Medical Missions. Your contribution will make a significant impact on our medical outreach programs.
          </p>
          <div className="pt-8">
            <Link href="/" className="inline-flex items-center bg-cyan-500 text-white px-10 py-5 rounded-2xl font-black hover:bg-cyan-600 transition-all transform hover:scale-105 shadow-xl shadow-cyan-100">
              <ArrowRight className="mr-2" size={24} /> Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
