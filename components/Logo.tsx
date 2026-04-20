export default function Logo() {
  return (
    <div className="absolute top-6 md:top-8 right-6 md:right-8 z-50 pointer-events-none">
      <div className="relative w-32 h-12 md:w-40 md:h-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="/logo.png" 
          alt="Celebrations Neral Logo" 
          className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]"
        />
      </div>
    </div>
  );
}
