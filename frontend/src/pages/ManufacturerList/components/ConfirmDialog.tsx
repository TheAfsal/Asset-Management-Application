import React from "react";
import { Dialog } from "@headlessui/react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmDialog: React.FC<Props> = ({ open, onClose, onConfirm, title, message }) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white rounded max-w-sm w-full p-6">
          <Dialog.Title className="text-lg font-semibold mb-2">{title}</Dialog.Title>
          <p className="mb-4">{message}</p>
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300">
              Cancel
            </button>
            <button onClick={onConfirm} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
              Confirm
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ConfirmDialog;
