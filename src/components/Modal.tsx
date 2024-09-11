import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import classes from "./Modal.module.css";

interface ModalProps {
  title: string;
  message: string;
  children: React.ReactNode;
  onCancel: () => void;
  onConfirm: () => void;
}

export interface ModalHandle {
  open: () => void;
  close: () => void;
}

const Modal = forwardRef<ModalHandle, ModalProps>(
  ({ title, message, children, onCancel, onConfirm }, ref) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null);

    useImperativeHandle(ref, () => ({
      open: () => {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
      },
      close: () => {
        if (dialogRef.current) {
          dialogRef.current.close();
        }
      },
    }));

    useEffect(() => {
      const modal = dialogRef.current;

      return () => {
        if (modal) {
          modal.close();
        }
      };
    }, []);

    return createPortal(
      <dialog className={classes["modal"]} ref={dialogRef} onClose={onCancel}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div>{children}</div>
        <div className={classes["modal-actions"]}>
          <button onClick={onCancel}>Close</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </dialog>,
      document.getElementById("modal") as HTMLElement
    );
  }
);

export default Modal;
