import { useState } from 'react';
import { MOCK_FILES } from '../data/mockData';

function FileIcon() {
  return (
    <svg className="w-5 h-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
    </svg>
  );
}

export default function FilesTab({ canEdit }) {
  const [files, setFiles] = useState(MOCK_FILES);

  const handleUpload = () => {
    alert('Upload functionality coming soon');
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this file?')) {
      setFiles((prev) => prev.filter((f) => f.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">{files.length} file{files.length !== 1 ? 's' : ''}</p>
        {canEdit && (
          <button
            onClick={handleUpload}
            className="flex items-center gap-2 bg-[#1A56A0] text-white text-sm px-3 py-1.5 rounded-lg hover:bg-[#154a8e] transition-colors"
          >
            <span>↑</span> Upload file
          </button>
        )}
      </div>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-medium text-gray-600">File</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Uploaded</th>
              <th className="text-left px-4 py-3 font-medium text-gray-600">Author</th>
              {canEdit && <th className="px-4 py-3"></th>}
            </tr>
          </thead>
          <tbody>
            {files.map((file, i) => (
              <tr key={file.id} className={`${i < files.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <FileIcon />
                    <span className="text-gray-800 font-medium">{file.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{file.date}</td>
                <td className="px-4 py-3 text-gray-500">{file.author}</td>
                {canEdit && (
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => handleDelete(file.id)}
                      className="text-red-400 hover:text-red-600 text-xs px-2 py-1 rounded hover:bg-red-50 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {files.length === 0 && (
              <tr>
                <td colSpan={canEdit ? 4 : 3} className="px-4 py-8 text-center text-gray-400">
                  No files uploaded yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
