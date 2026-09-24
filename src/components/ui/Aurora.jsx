/** Animated mesh-gradient backdrop — the "wallpaper" glass refracts over. */
export default function Aurora({ className = '', intensity = 1 }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={{ opacity: intensity }}>
      <div className="animate-aurora absolute -top-[20%] left-[5%] h-[60vmax] w-[60vmax] rounded-full bg-[radial-gradient(circle,var(--color-blue),transparent_65%)] opacity-40 blur-3xl dark:opacity-50" />
      <div className="animate-aurora absolute top-[10%] -right-[15%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,var(--color-purple),transparent_65%)] opacity-30 blur-3xl [animation-delay:-6s] dark:opacity-40" />
      <div className="animate-aurora absolute -bottom-[30%] left-[25%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,var(--color-pink),transparent_65%)] opacity-25 blur-3xl [animation-delay:-12s] dark:opacity-30" />
    </div>
  );
}
