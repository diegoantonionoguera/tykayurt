import { FaInstagram } from "react-icons/fa6";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_DISPLAY } from "../../lib/brand";
import { OrderButton } from "../ui/order-button";

export function Footer() {
  return (
    <footer className="bg-surface-alt py-14">
      <div className="site-container">
        <div className="footer-main flex flex-col gap-8 border-t border-line pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div>
              <p className="brand-wordmark text-2xl">TykaYurt</p>
              <p className="text-sm text-content-muted">
                Iogurte artesanal · Curitiba — Hauer / Boqueirão
              </p>
            </div>
          </div>

          <div className="footer-actions flex flex-wrap items-center gap-3">
            <OrderButton message="Oi! Quero pedir um TykaYurt." tracking="whatsapp_footer">
              {WHATSAPP_DISPLAY}
            </OrderButton>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="button-press flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-content hover:border-brand hover:text-brand"
            >
              <FaInstagram className="h-4 w-4" />@{INSTAGRAM_HANDLE}
            </a>
          </div>
        </div>

        <p className="footer-copyright mt-10 text-xs text-content-muted">
          © {new Date().getFullYear()} TykaYurt. Produto artesanal sem conservantes.
        </p>
      </div>
    </footer>
  );
}
