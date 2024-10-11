import React from "react";

const Modal = ({ children, open }) => {
  return (
    <div>
      <dialog id="my_modal_3" className={`modal ${open ? "modal-open" : ""}`}>
        <div className="modal-box">{children}</div>
      </dialog>
    </div>
  );
};

export default Modal;
