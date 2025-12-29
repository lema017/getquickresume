import { User } from 'lucide-react';

interface AuthorBioProps {
  name?: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
}

export function AuthorBio({
  name = "GetQuickResume Team",
  role = "Career & Resume Experts",
  bio = "Our team of HR professionals and career coaches share insights to help you land your dream job. We combine industry expertise with AI technology to make resume building effortless.",
  imageUrl
}: AuthorBioProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-6 my-8">
      <div className="flex items-start gap-4">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <User className="w-8 h-8 text-white" />
          </div>
        )}
        
        <div>
          <div className="text-sm text-gray-500 uppercase tracking-wide mb-1">Written by</div>
          <h4 className="font-semibold text-gray-900">{name}</h4>
          <p className="text-sm text-blue-600 mb-2">{role}</p>
          <p className="text-gray-600 text-sm">{bio}</p>
        </div>
      </div>
    </div>
  );
}

