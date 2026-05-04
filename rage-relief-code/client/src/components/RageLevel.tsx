import { useMemo } from 'react';
import { Flame } from 'lucide-react';

interface RageLevelProps {
  text: string;
}

export function RageLevel({ text }: RageLevelProps) {
  const rageScore = useMemo(() => {
    if (!text.trim()) return 0;

    let score = 0;

    // Base score on text length (max 20 points)
    score += Math.min(text.length / 5, 20);

    // Uppercase letters (intensity indicator) - max 15 points
    const uppercaseCount = (text.match(/[A-Z]/g) || []).length;
    score += Math.min(uppercaseCount * 2, 15);

    // Exclamation marks (max 15 points)
    const exclamationCount = (text.match(/!/g) || []).length;
    score += Math.min(exclamationCount * 3, 15);

    // Question marks (frustration) - max 10 points
    const questionCount = (text.match(/\?/g) || []).length;
    score += Math.min(questionCount * 2, 10);

    // Repeated characters (emphasis) - max 15 points
    const repeatedChars = (text.match(/(.)\1{2,}/g) || []).length;
    score += Math.min(repeatedChars * 3, 15);

    // Curse words indicator (common rage words) - max 20 points
    const rageWords = [
      'ódio',
      'raiva',
      'furioso',
      'puto',
      'maldito',
      'inferno',
      'merda',
      'caralho',
      'droga',
      'desespero',
      'ira',
      'fúria',
      'cólera',
    ];
    const rageWordCount = rageWords.filter((word) =>
      text.toLowerCase().includes(word)
    ).length;
    score += Math.min(rageWordCount * 4, 20);

    // Normalize to 0-100
    return Math.min(score, 100);
  }, [text]);

  const getRageColor = (score: number) => {
    if (score < 20) return 'from-yellow-500 to-yellow-600';
    if (score < 40) return 'from-orange-500 to-orange-600';
    if (score < 60) return 'from-red-500 to-red-600';
    if (score < 80) return 'from-red-600 to-red-700';
    return 'from-red-700 to-red-900';
  };

  const getRageLabel = (score: number) => {
    if (score < 20) return 'Calmo';
    if (score < 40) return 'Irritado';
    if (score < 60) return 'Furioso';
    if (score < 80) return 'Muito Furioso';
    return 'EXPLOSIVO';
  };

  const getRageEmoji = (score: number) => {
    if (score < 20) return '😐';
    if (score < 40) return '😠';
    if (score < 60) return '😡';
    if (score < 80) return '🤬';
    return '💥';
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-500" />
          <span className="text-sm font-semibold text-gray-300">Nível de Raiva</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{getRageEmoji(rageScore)}</span>
          <span className="text-sm font-bold text-red-500">{Math.round(rageScore)}%</span>
        </div>
      </div>

      {/* Rage Bar */}
      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <div
          className={`h-full bg-gradient-to-r ${getRageColor(rageScore)} transition-all duration-300 ease-out shadow-lg`}
          style={{
            width: `${rageScore}%`,
            boxShadow: `0 0 20px rgba(${
              rageScore < 20
                ? '234, 179, 8'
                : rageScore < 40
                  ? '249, 115, 22'
                  : rageScore < 60
                    ? '239, 68, 68'
                    : rageScore < 80
                      ? '220, 38, 38'
                      : '153, 27, 27'
            }, 0.8)`,
          }}
        />
      </div>

      {/* Rage Label */}
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">Intensidade:</span>
        <span className={`font-bold ${
          rageScore < 20
            ? 'text-yellow-500'
            : rageScore < 40
              ? 'text-orange-500'
              : rageScore < 60
                ? 'text-red-500'
                : rageScore < 80
                  ? 'text-red-600'
                  : 'text-red-700'
        }`}>
          {getRageLabel(rageScore)}
        </span>
      </div>

      {/* Tips */}
      {rageScore > 0 && (
        <div className="text-xs text-gray-400 italic pt-2 border-t border-gray-800">
          💡 Dica: Maiúsculas, pontuação e palavras intensas aumentam o nível de raiva
        </div>
      )}
    </div>
  );
}
