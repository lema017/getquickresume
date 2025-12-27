import { useNavigate } from 'react-router-dom';
import { X, Crown } from 'lucide-react';

interface PremiumDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PremiumDownloadModal({ isOpen, onClose }: PremiumDownloadModalProps) {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleUpgrade = () => {
    onClose();
    navigate('/premium');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6 relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-yellow-100 rounded-full p-3">
            <Crown className="w-8 h-8 text-yellow-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-4">
          Upgrade to Premium
        </h2>

        {/* Message */}
        <p className="text-gray-600 text-center mb-6">
          You've used your free download. Upgrade to Premium for unlimited downloads and unlock all premium features.
        </p>

        {/* Features list */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Unlimited resume downloads
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Unlimited resume generations
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Advanced resume scoring
            </li>
            <li className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              Priority support
            </li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Maybe Later
          </button>
          <button
            onClick={handleUpgrade}
            className="flex-1 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
}

