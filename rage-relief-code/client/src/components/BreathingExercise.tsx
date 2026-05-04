import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Wind } from 'lucide-react';

interface BreathingExerciseProps {
  onClose: () => void;
  rageLevel: number;
}

export function BreathingExercise({ onClose, rageLevel }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [cycleCount, setCycleCount] = useState(0);
  const [progress, setProgress] = useState(0);

  const totalCycles = 4;
  const inhaleDuration = 4000; // 4 seconds
  const holdDuration = 4000; // 4 seconds
  const exhaleDuration = 4000; // 4 seconds

  useEffect(() => {
    if (!isActive) return;

    let timer: NodeJS.Timeout;
    let startTime = Date.now();

    const runCycle = () => {
      // Inhale phase
      setPhase('inhale');
      timer = setTimeout(() => {
        setPhase('hold');
        timer = setTimeout(() => {
          setPhase('exhale');
          timer = setTimeout(() => {
            setCycleCount((prev) => {
              const newCount = prev + 1;
              if (newCount < totalCycles) {
                runCycle();
              } else {
                setIsActive(false);
                setPhase('idle');
              }
              return newCount;
            });
          }, exhaleDuration);
        }, holdDuration);
      }, inhaleDuration);
    };

    runCycle();

    return () => clearTimeout(timer);
  }, [isActive]);

  useEffect(() => {
    if (!isActive || phase === 'idle') return;

    const interval = setInterval(() => {
      const totalDuration =
        phase === 'inhale'
          ? inhaleDuration
          : phase === 'hold'
            ? holdDuration
            : exhaleDuration;

      setProgress((prev) => {
        const newProgress = prev + 50;
        return newProgress >= totalDuration ? 0 : newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const getPhaseText = () => {
    switch (phase) {
      case 'inhale':
        return 'INSPIRA';
      case 'hold':
        return 'SEGURA';
      case 'exhale':
        return 'EXPIRA';
      default:
        return 'Pronto?';
    }
  };

  const getPhaseDescription = () => {
    switch (phase) {
      case 'inhale':
        return 'Inspira lentamente pelo nariz...';
      case 'hold':
        return 'Segura a respiração...';
      case 'exhale':
        return 'Expira lentamente pela boca...';
      default:
        return 'Vamos acalmar a tua raiva com respiração guiada';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-card border-2 border-red-600/50 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Wind className="w-6 h-6 text-red-500" />
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
              Modo Respira
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Breathing Circle */}
        <div className="flex flex-col items-center mb-8">
          <div className="relative w-48 h-48 mb-6">
            {/* Outer circle */}
            <div className="absolute inset-0 rounded-full border-4 border-gray-700" />

            {/* Animated breathing circle */}
            <div
              className={`absolute inset-0 rounded-full border-4 transition-all duration-1000 ${
                phase === 'inhale'
                  ? 'border-red-500 scale-100'
                  : phase === 'hold'
                    ? 'border-orange-500 scale-110'
                    : phase === 'exhale'
                      ? 'border-yellow-500 scale-90'
                      : 'border-gray-600 scale-100'
              }`}
              style={{
                boxShadow:
                  phase !== 'idle'
                    ? `0 0 30px rgba(${
                        phase === 'inhale'
                          ? '239, 68, 68'
                          : phase === 'hold'
                            ? '249, 115, 22'
                            : '234, 179, 8'
                      }, 0.6)`
                    : 'none',
              }}
            />

            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                {getPhaseText()}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {cycleCount + 1}/{totalCycles}
              </p>
            </div>
          </div>

          {/* Phase description */}
          <p className="text-center text-gray-300 mb-6">{getPhaseDescription()}</p>

          {/* Progress indicator */}
          <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-100"
              style={{
                width: `${
                  phase === 'idle'
                    ? 0
                    : phase === 'inhale'
                      ? (progress / inhaleDuration) * 100
                      : phase === 'hold'
                        ? (progress / holdDuration) * 100
                        : (progress / exhaleDuration) * 100
                }%`,
              }}
            />
          </div>
        </div>

        {/* Info */}
        <div className="bg-gray-900 rounded-lg p-4 mb-6 border border-gray-800">
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-red-500">Nível de Raiva:</span> {Math.round(rageLevel)}%
          </p>
          <p className="text-xs text-gray-400 mt-2">
            A respiração profunda ajuda a acalmar o sistema nervoso e reduzir a raiva. Completa os 4 ciclos para sentir a diferença.
          </p>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          {!isActive ? (
            <>
              <Button
                onClick={() => {
                  setIsActive(true);
                  setCycleCount(0);
                  setProgress(0);
                }}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold glow-effect"
              >
                Começar
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-900"
              >
                Fechar
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setIsActive(false);
                  setCycleCount(0);
                  setProgress(0);
                  setPhase('idle');
                }}
                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold"
              >
                Parar
              </Button>
              <Button
                onClick={onClose}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-900"
              >
                Sair
              </Button>
            </>
          )}
        </div>

        {/* Completion message */}
        {isActive === false && cycleCount === totalCycles && cycleCount > 0 && (
          <div className="mt-6 p-4 bg-green-900/20 border border-green-600/30 rounded-lg text-center">
            <p className="text-green-400 font-semibold">✓ Parabéns!</p>
            <p className="text-sm text-gray-300 mt-2">
              Completaste os 4 ciclos de respiração. Deverias sentir-te mais calmo agora.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
