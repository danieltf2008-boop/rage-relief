#!/bin/bash

# Script para compilar o projeto para GitHub Pages

echo "🔨 Compilando para GitHub Pages..."

# Define variável de ambiente
export GITHUB_PAGES=true

# Instala dependências se necessário
if [ ! -d "node_modules" ]; then
  echo "📦 Instalando dependências..."
  npm install
fi

# Compila o projeto
echo "🏗️  Compilando o projeto..."
npm run build

# Verifica se a compilação foi bem-sucedida
if [ $? -eq 0 ]; then
  echo "✅ Compilação concluída com sucesso!"
  echo ""
  echo "📁 Estrutura do dist:"
  ls -la dist/
  echo ""
  echo "🚀 Próximos passos:"
  echo "1. git add ."
  echo "2. git commit -m 'Build for GitHub Pages'"
  echo "3. git push origin main"
  echo ""
  echo "⏳ GitHub Pages atualizará em 1-2 minutos"
else
  echo "❌ Erro na compilação!"
  exit 1
fi
