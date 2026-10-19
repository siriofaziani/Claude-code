import { shop } from "@/data/content";
import { hasWhatsapp, whatsappHref } from "@/lib";
import { PhoneIcon, PinIcon, WhatsAppIcon } from "./Icons";

/**
 * The order actions. With no WhatsApp number configured the order is a phone call;
 * once `shop.whatsapp` is filled in, "Ordina su WhatsApp" leads and the call follows.
 */
export default function OrderActions({ className = "", stacked = false, directions = true, light = false }) {
  const wrap = `flex ${stacked ? "flex-col" : "flex-col sm:flex-row sm:flex-wrap"} gap-2.5 ${className}`;
  return (
    <div className={wrap}>
      {hasWhatsapp && (
        <a href={whatsappHref()} target="_blank" rel="noopener" className={`btn ${light ? "btn-chiaro" : "btn-cacao"} justify-between`}>
          Ordina su WhatsApp <WhatsAppIcon />
        </a>
      )}
      <a href={shop.phoneHref} className={`btn ${hasWhatsapp || light ? "btn-chiaro" : "btn-cacao"} justify-between`}>
        <span className="flex flex-col items-start leading-tight">
          <span>{hasWhatsapp ? "Chiamata diretta" : "Chiama per ordinare"}</span>
          <span className="tel text-[0.92rem]">Tel. {shop.phone}</span>
        </span>
        <PhoneIcon />
      </a>
      {directions && (
        <a href={shop.directions} target="_blank" rel="noopener" className={`btn ${light ? "btn-chiaro" : "btn-crema"} justify-between`}>
          Raggiungici <PinIcon />
        </a>
      )}
    </div>
  );
}
