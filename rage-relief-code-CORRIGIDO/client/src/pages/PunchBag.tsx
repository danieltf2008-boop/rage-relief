import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ParticleEffect } from '@/components/ParticleEffect';
import { RageMessage } from '@/components/RageMessage';
import { ArrowLeft, Zap } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * DESIGN: Cathartic Energetic - Interactive Punch Bag Activity
 * - Full-screen interactive experience
 * - Responsive feedback with particles and messages
 * - Energy meter that fills with each punch
 */

export default function PunchBag() {
  const [, setLocation] = useLocation();
  const [punches, setPunches] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [particlePos, setParticlePos] = useState<{ x: number; y: number } | null>(null);
  const [rageMessage, setRageMessage] = useState<{ x: number; y: number } | null>(null);
  const [shake, setShake] = useState(false);
  const bagRef = useRef<HTMLDivElement>(null);

  const handlePunch = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setParticlePos({ x, y });
    setRageMessage({ x, y });
    setPunches((p) => p + 1);
    setEnergy((e) => Math.min(100, e + 10));
    setShake(true);

    setTimeout(() => setShake(false), 200);
  };

  const handleReset = () => {
    setPunches(0);
    setEnergy(0);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {particlePos && <ParticleEffect x={particlePos.x} y={particlePos.y} count={50} />}
      {rageMessage && <RageMessage x={rageMessage.x} y={rageMessage.y} />}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-background to-transparent p-6">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setLocation('/')}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-6 h-6 mr-2" />
            Voltar
          </Button>

          <div className="text-center">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              SACO DE PANCADAS
            </h1>
            <p className="text-gray-400 text-sm">Descarrega a tua raiva</p>
          </div>

          <div className="w-32" />
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-32 pb-8">
        {/* Punch Bag */}
        <div
          ref={bagRef}
          onClick={handlePunch}
          className={`relative w-48 h-64 md:w-64 md:h-80 mb-12 cursor-pointer transition-transform duration-200 ${
            shake ? 'scale-95' : 'scale-100'
          }`}
        >
          {/* Bag */}
          <div className="absolute inset-0 bg-gradient-to-b from-red-600 to-red-800 rounded-full shadow-2xl glow-effect-intense flex items-center justify-center">
            <div className="text-6xl md:text-8xl">👊</div>
          </div>

          {/* Pulse effect */}
          <div className="absolute inset-0 bg-red-500 rounded-full opacity-20 animate-pulse" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-8 mb-12 max-w-md">
          <div className="bg-card border border-red-600/30 rounded-lg p-6 text-center glow-effect">
            <Zap className="w-8 h-8 text-red-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-2">Pancadas</p>
            <p className="text-4xl font-bold text-red-500">{punches}</p>
          </div>

          <div className="bg-card border border-orange-600/30 rounded-lg p-6 text-center glow-effect">
            <Zap className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-gray-400 text-sm mb-2">Energia</p>
            <p className="text-4xl font-bold text-orange-500">{energy}%</p>
          </div>
        </div>

        {/* Energy Bar */}
        <div className="w-full max-w-md mb-12">
          <div className="h-8 bg-gray-800 rounded-full overflow-hidden border-2 border-orange-600">
            <div
              className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 transition-all duration-300"
              style={{ width: `${energy}%` }}
            />
          </div>
          <p className="text-center text-gray-400 text-sm mt-2">Enche a barra para desbloquear poder total!</p>
        </div>

        {/* Instructions */}
        <div className="bg-card border border-gray-800 rounded-lg p-6 max-w-md mb-8">
          <h3 className="text-lg font-bold mb-3 text-orange-500">Como Funciona:</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li>✓ Clica no saco para socar</li>
            <li>✓ Cada pancada aumenta a tua energia</li>
            <li>✓ Atinge 100% de energia para libertação máxima</li>
            <li>✓ Sem limite de pancadas - continua enquanto precisares</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            onClick={handleReset}
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-800"
          >
            Reiniciar
          </Button>
          <Button onClick={() => setLocation('/')} className="bg-red-600 hover:bg-red-700 text-white">
            Voltar ao Menu
          </Button>
        </div>

        {/* Motivational Text */}
        {energy === 100 && (
          <div className="mt-12 text-center animate-bounce">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
              🔥 PODER MÁXIMO ATIVADO! 🔥
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
