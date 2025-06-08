// src/components/ConfirmModal.tsx
import React from 'react';

interface ConfirmModalProps {
  isOpen: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  title = 'Confirm Action',
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-xl">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex justify-end gap-3">
          {/* Cancel button - black on hover */}
          <button
            className="px-4 py-2 text-sm font-semibold text-gray-800 border border-gray-400 rounded hover:bg-black hover:text-white transition-colors duration-300"
            onClick={onCancel}
          >
            Cancel
          </button>

          {/* Confirm button - blue by default, black on hover */}
          <button
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-black transition-colors duration-300 rounded"
            onClick={onConfirm}
            style={{color:"blue"}}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
