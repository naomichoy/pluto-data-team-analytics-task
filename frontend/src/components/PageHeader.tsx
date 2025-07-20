import React from "react";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, onBack }) => (
  <div className="flex items-center mb-6">
    {onBack && (
      <button
        onClick={onBack}
        className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft size={24} className="text-gray-600" />
      </button>
    )}
    <h2 className="text-3xl font-bold text-gray-700">{title}</h2>
  </div>
);

export default PageHeader;
