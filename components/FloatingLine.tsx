import { SOCIAL } from "@/lib/config";

export default function FloatingLine() {
  return (
    <a
      href={SOCIAL.line}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="เพิ่มเพื่อน LINE Official"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full border border-gold/40 bg-midnight-deep/95 px-4 py-3 shadow-glow backdrop-blur transition hover:scale-105 hover:border-gold sm:bottom-8 sm:right-8"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#06C755]">
        <span className="absolute inset-0 rounded-full bg-[#06C755] opacity-60 animate-ping" />
        <svg
          viewBox="0 0 36 36"
          className="relative h-6 w-6"
          aria-hidden
        >
          <path
            fill="white"
            d="M18 4C9.7 4 3 9.4 3 16.1c0 6 5.4 11 12.7 12 .5.1 1.2.3 1.4.7.2.4.1 1 .1 1.4l-.2 1.4c-.1.4-.3 1.6 1.4.9 1.7-.7 9.5-5.6 13-9.6 2.4-2.7 3.6-5.4 3.6-8.8C35 9.4 28.3 4 20 4h-2zm-7.4 7.7h2.1c.3 0 .5.2.5.5v5.7h3.1c.3 0 .5.2.5.5v1.5c0 .3-.2.5-.5.5h-5.2c-.3 0-.5-.2-.5-.5v-7.7c0-.3.3-.5.5-.5zm7.6 0h2.1c.3 0 .5.2.5.5v7.7c0 .3-.2.5-.5.5h-2.1c-.3 0-.5-.2-.5-.5v-7.7c0-.3.3-.5.5-.5zm4.3 0h2.1c.2 0 .3.1.4.2l3.5 4.7v-4.4c0-.3.2-.5.5-.5h2.1c.3 0 .5.2.5.5v7.7c0 .3-.2.5-.5.5h-2.1c-.2 0-.3-.1-.4-.2l-3.5-4.7v4.4c0 .3-.2.5-.5.5h-2.1c-.3 0-.5-.2-.5-.5v-7.7c0-.3.3-.5.5-.5z"
          />
        </svg>
      </span>
      <span className="hidden pr-1 text-sm font-medium text-gold-light sm:inline">
        เพิ่มเพื่อน LINE OA
      </span>
    </a>
  );
}
