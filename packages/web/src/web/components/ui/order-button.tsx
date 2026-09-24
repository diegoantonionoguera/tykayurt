import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { whatsappLink } from '../../lib/brand';

type OrderButtonProps = { children: ReactNode; message: string; className?: string; tracking?: string };
export function OrderButton({ children, message, className = '', tracking }: OrderButtonProps) {
  return <a className={`order-button ${className}`} href={whatsappLink(message)} target="_blank" rel="noreferrer" aria-label={typeof children === 'string' ? children : undefined} data-track={tracking}><FaWhatsapp className="order-icon" /><span className="order-label">{children}</span><ArrowUpRight className="order-arrow" aria-hidden="true" /></a>;
}
