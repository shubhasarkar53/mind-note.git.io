import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon, title, description, className = "" }: FeatureCardProps) => {
  return (
    <div className={`hero-gradient rounded-2xl p-6 text-center hover:-translate-y-1 hover:shadow-md ${className}`}>
      <div className="bg-white w-12   text-purple-600 h-12 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
