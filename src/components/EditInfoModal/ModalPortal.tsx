import { createPortal } from 'react-dom';
import { ReactNode } from 'react';

interface ModalPortalProps {
  children: ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const modal = document.getElementById('modal') as Element;

  if (!modal || !children) return <></>;

  return createPortal(children, modal);
};

export default ModalPortal;
