/** Soft pastel light pooling on the paper: lilac, peach and lime blobs drifting slowly. */
export default function Aurora({ className = '', intensity = 1 }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={{ opacity: intensity }}>
      <div className="animate-aurora absolute -top-[25%] left-[2%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,var(--color-lilac),transparent_62%)] opacity-70 blur-3xl dark:opacity-[0.12]" />
      <div className="animate-aurora absolute top-[5%] -right-[18%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,var(--color-peach),transparent_62%)] opacity-70 blur-3xl [animation-delay:-6s] dark:opacity-[0.1]" />
      <div className="animate-aurora absolute -bottom-[35%] left-[30%] h-[45vmax] w-[45vmax] rounded-full bg-[radial-gradient(circle,var(--color-lime),transparent_62%)] opacity-35 blur-3xl [animation-delay:-12s] dark:opacity-[0.08]" />
    </div>
  );
}
