import { Link } from 'react-router-dom';

export default function TopBar({ breadcrumbs = [] }) {
  return (
    <div className="h-12 bg-white border-b border-gray-200 flex items-center px-6 gap-2 text-sm text-gray-500 flex-shrink-0">
      {breadcrumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <span className="text-gray-300">›</span>}
          {crumb.to ? (
            <Link to={crumb.to} className="hover:text-[#1A56A0] transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-gray-800 font-medium">{crumb.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}
