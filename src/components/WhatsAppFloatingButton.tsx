import { FC } from 'react'

interface WhatsAppFloatingButtonProps {
  href: string
  label?: string
}

export const WhatsAppFloatingButton: FC<WhatsAppFloatingButtonProps> = ({
  href,
  label = 'Precisa de ajuda?',
}) => {
  return (
    <aside
      aria-label="Atendimento via WhatsApp"
      className="pointer-events-none fixed bottom-5 right-5 z-50 sm:bottom-6 sm:right-6"
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group pointer-events-auto inline-flex items-center gap-2.5 rounded-full no-underline transition-all duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 sm:gap-3"
        aria-label={`${label} — Falar com a Dra. Rafaela Saes no WhatsApp`}
      >
        {/* Balão com mensagem de estímulo visível em desktop e telas móveis */}
        <span className="flex items-center rounded-full border border-[#DCCFB8] bg-[#FAF7F0] px-3.5 py-1.5 text-xs font-semibold tracking-wide text-[#111008] shadow-[0_4px_16px_rgba(17,16,8,0.12)] transition-colors group-hover:border-[#b08d45] group-hover:bg-white sm:text-sm">
          {label}
        </span>

        {/* Círculo com logotipo oficial do WhatsApp em SVG inline */}
        <span
          className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_6px_22px_rgba(37,211,102,0.45)] transition-all duration-300 group-hover:bg-[#20bd5a] group-hover:shadow-[0_8px_26px_rgba(37,211,102,0.6)]"
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM8.53 7.33C8.37 7.33 8.1 7.39 7.87 7.64C7.65 7.89 7.02 8.48 7.02 9.69C7.02 10.9 7.9 12.07 8.02 12.23C8.15 12.39 9.73 14.83 12.16 15.88C14.18 16.75 14.59 16.58 15.03 16.54C15.48 16.5 16.46 15.96 16.66 15.39C16.86 14.82 16.86 14.34 16.8 14.24C16.74 14.14 16.58 14.08 16.34 13.96C16.1 13.84 14.92 13.26 14.7 13.18C14.48 13.1 14.32 13.06 14.16 13.3C14 13.54 13.54 14.08 13.4 14.24C13.26 14.4 13.12 14.42 12.88 14.3C12.64 14.18 11.87 13.93 10.95 13.11C10.24 12.47 9.75 11.69 9.61 11.45C9.47 11.21 9.6 11.08 9.72 10.96C9.83 10.85 9.97 10.67 10.09 10.53C10.21 10.39 10.25 10.29 10.33 10.13C10.41 9.97 10.37 9.83 10.31 9.71C10.25 9.59 9.78 8.44 9.58 7.96C9.39 7.49 9.19 7.55 9.04 7.55C8.9 7.54 8.74 7.54 8.58 7.54L8.53 7.33Z" />
          </svg>
        </span>
      </a>
    </aside>
  )
}

export default WhatsAppFloatingButton
