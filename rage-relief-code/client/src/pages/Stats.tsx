import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Zap, Volume2, Trash2, TrendingUp, Award } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * DESIGN: Cathartic Energetic - Statistics Page
 * - Display user's rage release statistics
 * - Motivational insights and achievements
 */

interface SessionStats {
  date: string;
  punches: number;
  screams: number;
  destroys: number;
  totalEnergy: number;
}

export default function Stats() {
  const [, setLocation] = useLocation();
  const [sessions, setSessions] = useState<SessionStats[]>([]);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem('rageSessions');
    if (saved) {
      setSessions(JSON.parse(saved));
    }
  }, []);

  const totalStats = sessions.reduce(
    (acc, session) => ({
      punches: acc.punches + session.punches,
      screams: acc.screams + session.screams,
      destroys: acc.destroys + session.destroys,
      totalEnergy: acc.totalEnergy + session.totalEnergy,
    }),
    { punches: 0, screams: 0, destroys: 0, totalEnergy: 0 }
  );

  const averagePerSession =
    sessions.length > 0
      ? {
          punches: Math.round(totalStats.punches / sessions.length),
          screams: Math.round(totalStats.screams / sessions.length),
          destroys: Math.round(totalStats.destroys / sessions.length),
        }
      : { punches: 0, screams: 0, destroys: 0 };

  const achievements = [
    {
      name: 'Primeira Pancada',
      description: 'Fez a primeira pancada',
      icon: '👊',
      unlocked: totalStats.punches > 0,
    },
    {
      name: 'Gritador',
      description: 'Gritou mais de 10 vezes',
      icon: '🔊',
      unlocked: totalStats.screams > 10,
    },
    {
      name: 'Destruidor',
      description: 'Destruiu mais de 20 coisas',
      icon: '💥',
      unlocked: totalStats.destroys > 20,
    },
    {
      name: 'Mestre da Raiva',
      description: 'Acumulou 1000 de energia total',
      icon: '🔥',
      unlocked: totalStats.totalEnergy > 1000,
    },
    {
      name: 'Sessões Épicas',
      description: 'Completou 5 sessões',
      icon: '⚡',
      unlocked: sessions.length >= 5,
    },
    {
      name: 'Libertador',
      description: 'Libertou mais de 100 ações',
      icon: '✨',
      unlocked: totalStats.punches + totalStats.screams + totalStats.destroys > 100,
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gradient-to-b from-background to-transparent border-b border-gray-800 p-6">
        <div className="flex items-center gap-4 max-w-6xl mx-auto">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setLocation('/')}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
            AS TUAS ESTATÍSTICAS
          </h1>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Overall Stats */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-orange-500">Estatísticas Gerais</h2>

          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-card border-red-600/30 p-6 text-center glow-effect">
              <Zap className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-2">Pancadas Totais</p>
              <p className="text-4xl font-bold text-red-500">{totalStats.punches}</p>
            </Card>

            <Card className="bg-card border-orange-600/30 p-6 text-center glow-effect">
              <Volume2 className="w-10 h-10 text-orange-500 mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-2">Gritos Totais</p>
              <p className="text-4xl font-bold text-orange-500">{totalStats.screams}</p>
            </Card>

            <Card className="bg-card border-yellow-600/30 p-6 text-center glow-effect">
              <Trash2 className="w-10 h-10 text-yellow-500 mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-2">Destruições Totais</p>
              <p className="text-4xl font-bold text-yellow-500">{totalStats.destroys}</p>
            </Card>

            <Card className="bg-card border-purple-600/30 p-6 text-center glow-effect">
              <TrendingUp className="w-10 h-10 text-purple-500 mx-auto mb-3" />
              <p className="text-gray-400 text-sm mb-2">Energia Acumulada</p>
              <p className="text-4xl font-bold text-purple-500">{totalStats.totalEnergy}</p>
            </Card>
          </div>

          {/* Average Stats */}
          {sessions.length > 0 && (
            <Card className="bg-card border-gray-800 p-6 mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-300">Média por Sessão</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Pancadas</p>
                  <p className="text-3xl font-bold text-red-500">{averagePerSession.punches}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Gritos</p>
                  <p className="text-3xl font-bold text-orange-500">{averagePerSession.screams}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 mb-2">Destruições</p>
                  <p className="text-3xl font-bold text-yellow-500">{averagePerSession.destroys}</p>
                </div>
              </div>
            </Card>
          )}
        </section>

        {/* Achievements */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-orange-500">Conquistas</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {achievements.map((achievement, idx) => (
              <Card
                key={idx}
                className={`p-6 text-center transition-all duration-300 ${
                  achievement.unlocked
                    ? 'bg-card border-yellow-600/50 glow-effect'
                    : 'bg-gray-900 border-gray-800 opacity-50'
                }`}
              >
                <div className="text-5xl mb-3">{achievement.icon}</div>
                <h3 className="text-lg font-bold mb-2">{achievement.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{achievement.description}</p>
                {achievement.unlocked ? (
                  <span className="inline-block px-3 py-1 bg-yellow-600/20 border border-yellow-600 text-yellow-500 rounded-full text-sm font-bold">
                    Desbloqueado ✓
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-gray-800 border border-gray-700 text-gray-500 rounded-full text-sm">
                    Bloqueado
                  </span>
                )}
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Sessions */}
        {sessions.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 text-orange-500">Sessões Recentes</h2>

            <div className="space-y-4">
              {sessions.slice().reverse().map((session, idx) => (
                <Card key={idx} className="bg-card border-gray-800 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold">{session.date}</h3>
                    <span className="text-sm text-gray-400">Energia: {session.totalEnergy}</span>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-red-500" />
                      <span className="text-gray-300">{session.punches} pancadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5 text-orange-500" />
                      <span className="text-gray-300">{session.screams} gritos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Trash2 className="w-5 h-5 text-yellow-500" />
                      <span className="text-gray-300">{session.destroys} destruições</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {sessions.length === 0 && (
          <Card className="bg-card border-gray-800 p-12 text-center">
            <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Sem Dados Ainda</h3>
            <p className="text-gray-400 mb-6">
              Começa uma sessão de descarga para ver as tuas estatísticas aqui!
            </p>
            <Button
              onClick={() => setLocation('/')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold"
            >
              Ir para Home
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
