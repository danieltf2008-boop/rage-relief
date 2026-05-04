import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ParticleEffect } from '@/components/ParticleEffect';
import { SoundWave } from '@/components/SoundWave';
import { RageMessage } from '@/components/RageMessage';
import { Zap, Volume2, Trash2, Flame, Heart } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * DESIGN: Cathartic Energetic
 * - Dark background (#0F0F0F) with vibrant red, orange, yellow accents
 * - Explosive animations and particle effects on interactions
 * - Energetic typography with Bebas Neue for headings, Poppins for body
 * - High-contrast, high-energy aesthetic that validates emotional release
 */

export default function Home() {
  const [, setLocation] = useLocation();
  const [particlePos, setParticlePos] = useState<{ x: number; y: number } | null>(null);
  const [soundWave, setSoundWave] = useState<{ x: number; y: number; color: string } | null>(null);
  const [rageMessage, setRageMessage] = useState<{ x: number; y: number } | null>(null);
  const [stats, setStats] = useState({ punches: 0, screams: 0, destroys: 0 });

  const handleActivity = (
    e: React.MouseEvent<HTMLButtonElement>,
    type: 'punch' | 'scream' | 'destroy'
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    setParticlePos({ x, y });
    setRageMessage({ x, y });

    if (type === 'scream') {
      setSoundWave({ x, y, color: '#FF6F00' });
    }

    // Update stats based on type
    if (type === 'punch') {
      setStats((prev) => ({ ...prev, punches: prev.punches + 1 }));
    } else if (type === 'scream') {
      setStats((prev) => ({ ...prev, screams: prev.screams + 1 }));
    } else {
      setStats((prev) => ({ ...prev, destroys: prev.destroys + 1 }));
    }

    // Add shake effect
    if (e.currentTarget) {
      e.currentTarget.classList.add('shake');
      setTimeout(() => {
        if (e.currentTarget) {
          e.currentTarget.classList.remove('shake');
        }
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {particlePos && <ParticleEffect x={particlePos.x} y={particlePos.y} count={40} />}
      {soundWave && <SoundWave x={soundWave.x} y={soundWave.y} color={soundWave.color} />}
      {rageMessage && <RageMessage x={rageMessage.x} y={rageMessage.y} />}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 py-20">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'url(https://d2xsxph8kpxj0f.cloudfront.net/310519663332582053/JpgDv7VhXUcYrj8ZsMUVoA/hero-explosion-ED33jbKh35osjgnQrN5Y32.webp)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="relative z-10 max-w-2xl text-center">
          <h1 className="text-6xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500">
            DESCARGA DE RAIVA
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 font-light">
            Um espaço seguro para libertar a tua raiva. Sem julgamentos. Sem limites. Apenas libertação.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white text-lg h-14 glow-effect"
            >
              Começar Agora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-orange-500 text-orange-500 hover:bg-orange-500/10 text-lg h-14"
              onClick={() => setLocation('/stats')}
            >
              Ver Estatísticas
            </Button>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            ATIVIDADES
          </h2>
          <p className="text-center text-gray-400 mb-16 text-lg">
            Escolhe a tua forma de libertação
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Punch Activity */}
            <Card className="bg-card border-gray-800 hover:border-red-600 transition-all duration-300 overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663332582053/JpgDv7VhXUcYrj8ZsMUVoA/activity-punch-5nC7sxVHmikknuvJmutmsV.webp"
                  alt="Punch"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Zap className="w-6 h-6 text-red-500" />
                  <h3 className="text-2xl font-bold">SOCAR</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Sente o poder de cada pancada. Liberta a tua força com cada clique.
                </p>
                <Button
                  onClick={() => setLocation('/punch-bag')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 glow-effect"
                >
                  SOCAR AGORA
                </Button>
              </div>
            </Card>

            {/* Scream Activity */}
            <Card className="bg-card border-gray-800 hover:border-orange-600 transition-all duration-300 overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663332582053/JpgDv7VhXUcYrj8ZsMUVoA/activity-scream-3vdM9f743f698t2rKEq4Vt.webp"
                  alt="Scream"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Volume2 className="w-6 h-6 text-orange-500" />
                  <h3 className="text-2xl font-bold">GRITAR</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Deixa a tua voz ser ouvida. Grita sem medo, sem culpa, sem restrições.
                </p>
                <Button
                  onClick={(e) => handleActivity(e, 'scream')}
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 glow-effect"
                >
                  GRITAR AGORA
                </Button>
              </div>
            </Card>

            {/* Destroy Activity */}
            <Card className="bg-card border-gray-800 hover:border-yellow-600 transition-all duration-300 overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663332582053/JpgDv7VhXUcYrj8ZsMUVoA/activity-destroy-NwKAuRYSkSs7ZwNYrMbgyG.webp"
                  alt="Destroy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Trash2 className="w-6 h-6 text-yellow-500" />
                  <h3 className="text-2xl font-bold">DESTRUIR</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Quebra, rasga, destrói. Deixa tudo cair em cacos digitais.
                </p>
                <Button
                  onClick={(e) => handleActivity(e, 'destroy')}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-3 glow-effect"
                >
                  DESTRUIR AGORA
                </Button>
              </div>
            </Card>

            {/* Chat Activity */}
            <Card className="bg-card border-gray-800 hover:border-purple-600 transition-all duration-300 overflow-hidden group cursor-pointer">
              <div className="relative h-48 overflow-hidden">
                <img
                  src="https://d2xsxph8kpxj0f.cloudfront.net/310519663332582053/JpgDv7VhXUcYrj8ZsMUVoA/activity-write-red-5DhBuYjqrdhfwD8sAv2zVj.webp"
                  alt="Write"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60" />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-6 h-6 text-purple-500">✍️</div>
                  <h3 className="text-2xl font-bold">ESCREVER</h3>
                </div>
                <p className="text-gray-400 mb-6">
                  Descarrega por escrito. Sem filtros, sem julgamentos. Apenas palavras puras.
                </p>
                <Button
                  onClick={() => setLocation('/rage-chat')}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 glow-effect"
                >
                  ESCREVER AGORA
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            A TUA LIBERTAÇÃO
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-card border-red-600/30 p-8 text-center glow-effect">
              <Zap className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Pancadas Descarregadas</p>
              <p className="text-5xl font-bold text-red-500">{stats.punches}</p>
            </Card>

            <Card className="bg-card border-orange-600/30 p-8 text-center glow-effect">
              <Volume2 className="w-12 h-12 text-orange-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Gritos Libertados</p>
              <p className="text-5xl font-bold text-orange-500">{stats.screams}</p>
            </Card>

            <Card className="bg-card border-yellow-600/30 p-8 text-center glow-effect">
              <Trash2 className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
              <p className="text-gray-400 mb-2">Coisas Destruídas</p>
              <p className="text-5xl font-bold text-yellow-500">{stats.destroys}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-background">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Heart className="w-8 h-8 text-red-500" />
            <h2 className="text-4xl font-bold">Porque é que isto funciona?</h2>
          </div>

          <div className="space-y-6 text-gray-300 text-lg">
            <p>
              A raiva é uma emoção válida e natural. Muitas vezes, tentamos reprimi-la, o que pode levar a
              problemas de saúde mental e física. Este espaço oferece uma forma segura e criativa de libertar
              essa energia.
            </p>

            <p>
              Através de atividades interativas e satisfatórias, podes canalizar a tua raiva de forma
              controlada. Sem prejudicar ninguém. Sem culpa. Apenas libertação pura e simples.
            </p>

            <p>
              Estudos mostram que atividades catárticas podem ajudar a reduzir o stress e a ansiedade. Este
              site é uma ferramenta terapêutica para ajudar-te a gerir as tuas emoções.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-950 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p className="mb-4">Descarga de Raiva © 2026 - Um espaço seguro para libertação emocional</p>
          <p className="text-sm">
            Lembra-te: Esta é uma ferramenta de bem-estar. Se sentires que a tua raiva está fora de controlo,
            procura ajuda profissional.
          </p>
        </div>
      </footer>
    </div>
  );
}
