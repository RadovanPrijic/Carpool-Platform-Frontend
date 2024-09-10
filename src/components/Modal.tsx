import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = dialogRef.current;
    if (modal) {
      modal.showModal();
    }
    return () => {
      if (modal) {
        modal.close();
      }
    };
  }, []);

  return createPortal(
    <dialog className="modal" ref={dialogRef} onClose={onClose}>
      {children}
    </dialog>,
    document.getElementById("modal") as HTMLElement
  );
};

export default Modal;
