import { useEffect, useState } from 'react';

const messages = [
  '🔥 LIBERTAÇÃO TOTAL!',
  '💥 EXPLOSÃO DE ENERGIA!',
  '⚡ PODER PURO!',
  '🌪️ CAOS CONTROLADO!',
  '🎯 DIRETO AO ALVO!',
  '🚀 VAMOS LÁ!',
  '💪 FORÇA BRUTA!',
  '🔊 DEIXA OUVIR!',
  '✨ BRILHA COM RAIVA!',
  '🎆 ESPETÁCULO DE EMOÇÃO!',
];

export function RageMessage({
  x,
  y,
  duration = 1500,
}: {
  x: number;
  y: number;
  duration?: number;
}) {
  const [opacity, setOpacity] = useState(1);
  const message = messages[Math.floor(Math.random() * messages.length)];

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = elapsed / duration;
      setOpacity(Math.max(0, 1 - progress));

      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 16);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div
      className="fixed pointer-events-none font-bold text-2xl md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-bounce"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        opacity,
        transform: `translate(-50%, -50%) translateY(-${(1 - opacity) * 100}px)`,
        zIndex: 50,
      }}
    >
      {message}
    </div>
  );
}
