import { Building2 } from "lucide-react";

export default function Logo() {
    return (
           <div className="flex items-center space-x-3">
            <div className="bg-blue-600 text-white p-2 rounded-lg">
              <Building2 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-400">CivicConnect</h1>
              <p className="text-xs text-gray-300">Community Management Platform</p>
            </div>
          </div>
    );
}