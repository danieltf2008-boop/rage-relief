import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ParticleEffect } from '@/components/ParticleEffect';
import { RageMessage } from '@/components/RageMessage';
import { ExplosiveText } from '@/components/ExplosiveText';
import { RageLevel } from '@/components/RageLevel';
import { BreathingExercise } from '@/components/BreathingExercise';
import { ArrowLeft, Send, Trash2, Heart } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * DESIGN: Cathartic Energetic - Rage Chat
 * - Interactive chat interface for written rage release
 * - Messages appear with animations and effects
 * - Supportive responses and validation
 */

interface ChatMessage {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

const supportiveResponses = [
  '🔥 Deixa sair! A tua raiva é válida!',
  '💪 Continua! Liberta tudo!',
  '⚡ Sim! Deixa isso tudo sair!',
  '🌪️ Não tenhas medo de sentir!',
  '✨ A tua voz importa!',
  '🎯 Direto ao ponto! Ótimo!',
  '💥 Que libertação!',
  '🔊 Deixa-te ouvir!',
  '🚀 Vamos lá! Mais!',
  '❤️ Tudo bem estar furioso!',
];

export default function RageChat() {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '0',
      text: '🔥 Bem-vindo ao Chat de Descarga! Aqui podes escrever tudo o que te deixa furioso, sem filtros, sem julgamentos. Deixa sair!',
      timestamp: new Date(),
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [particlePos, setParticlePos] = useState<{ x: number; y: number } | null>(null);
  const [rageMessage, setRageMessage] = useState<{ x: number; y: number } | null>(null);
  const [explosiveText, setExplosiveText] = useState<{ text: string; x: number; y: number } | null>(null);
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const [showBreathingExercise, setShowBreathingExercise] = useState(false);
  const [lastMessageRageLevel, setLastMessageRageLevel] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setInput(newValue);

    // Clear previous timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set new timeout for explosive text effect (triggered after 1 second of no typing)
    const timeout = setTimeout(() => {
      if (newValue.trim().length > 0 && inputRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        setExplosiveText({
          text: newValue.split(' ').pop() || '', // Explode the last word
          x: rect.left + rect.width / 2,
          y: rect.top - 30,
        });
      }
    }, 1000);

    setTypingTimeout(timeout);
  };

  const calculateRageScore = (text: string): number => {
    if (!text.trim()) return 0;

    let score = 0;
    score += Math.min(text.length / 5, 20);
    const uppercaseCount = (text.match(/[A-Z]/g) || []).length;
    score += Math.min(uppercaseCount * 2, 15);
    const exclamationCount = (text.match(/!/g) || []).length;
    score += Math.min(exclamationCount * 3, 15);
    const questionCount = (text.match(/\?/g) || []).length;
    score += Math.min(questionCount * 2, 10);
    const repeatedChars = (text.match(/(.)(\1){2,}/g) || []).length;
    score += Math.min(repeatedChars * 3, 15);
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
    return Math.min(score, 100);
  };

  const handleSendMessage = () => {
    if (input.trim().length === 0) return;

    // Calculate rage level for this message
    const messageRageLevel = calculateRageScore(input);
    setLastMessageRageLevel(messageRageLevel);

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      timestamp: new Date(),
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);

    // Trigger particle effect
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setParticlePos({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      });
      setRageMessage({
        x: rect.left + rect.width / 2,
        y: rect.top - 50,
      });
    }

    // Clear input
    setInput('');

    // Add supportive response after a short delay
    setTimeout(() => {
      const response: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: supportiveResponses[Math.floor(Math.random() * supportiveResponses.length)],
        timestamp: new Date(),
        isUser: false,
      };
      setMessages((prev) => [...prev, response]);
    }, 500);

    // Show breathing exercise if rage level is high (above 70)
    if (messageRageLevel > 70) {
      setTimeout(() => {
        setShowBreathingExercise(true);
      }, 1500);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: '0',
        text: '🔥 Chat limpo! Pronto para uma nova sessão de libertação?',
        timestamp: new Date(),
        isUser: false,
      },
    ]);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {particlePos && <ParticleEffect x={particlePos.x} y={particlePos.y} count={30} />}
      {rageMessage && <RageMessage x={rageMessage.x} y={rageMessage.y} />}
      {explosiveText && (
        <ExplosiveText
          text={explosiveText.text}
          x={explosiveText.x}
          y={explosiveText.y}
          onComplete={() => setExplosiveText(null)}
        />
      )}
      {showBreathingExercise && (
        <BreathingExercise
          rageLevel={lastMessageRageLevel}
          onClose={() => setShowBreathingExercise(false)}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-b from-background to-transparent border-b border-gray-800 p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setLocation('/')}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                DESCARGA ESCRITA
              </h1>
              <p className="text-gray-400 text-sm">Escreve sem filtros, sem julgamentos</p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="lg"
            onClick={handleClearChat}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg px-6 py-4 rounded-lg ${
                  message.isUser
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-br-none'
                    : 'bg-card border border-gray-800 text-gray-300 rounded-bl-none glow-effect'
                }`}
              >
                <p className="text-base leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${message.isUser ? 'text-red-100' : 'text-gray-500'}`}>
                  {message.timestamp.toLocaleTimeString('pt-PT', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="sticky bottom-0 bg-gradient-to-t from-background to-transparent border-t border-gray-800 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Rage Level Bar */}
          <div className="mb-4 p-4 bg-card rounded-lg border border-gray-800">
            <RageLevel text={input} />
          </div>

          <div className="flex gap-4">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Escreve aqui tudo o que te deixa furioso... Sem limites, sem filtros!"
              className="flex-1 bg-card border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 resize-none max-h-32"
              rows={3}
            />
            <Button
              onClick={handleSendMessage}
              disabled={input.trim().length === 0}
              className="bg-red-600 hover:bg-red-700 text-white font-bold h-auto px-6 glow-effect disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-6 h-6" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            💡 Dica: Pressiona Enter para enviar, Shift+Enter para nova linha
          </p>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-gray-900 border-t border-gray-800 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-start gap-4">
          <Heart className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
          <div className="text-sm text-gray-400">
            <p className="font-semibold text-white mb-1">Este é um espaço seguro</p>
            <p>
              Tudo o que escreveres aqui é apenas teu. Não há julgamentos, não há filtros. Deixa sair toda a
              raiva, frustração e emoção que sentires. Esta é a tua libertação.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
