# 📱 PRD - Serenamente
**Aplicativo de Suporte para Pessoas Autistas e Neurodivergentes**

## 🎯 Visão Geral do Produto

### Objetivo
Criar uma aplicação web mobile-first que oferece ferramentas de autorregulação, autoconhecimento e suporte para pessoas com TEA (Transtorno do Espectro Autista) e TDAH, incluindo aquelas em processo de descoberta diagnóstica.

### Stack Técnica Obrigatória
- Frontend: React com Next.js
- Autenticação: Clerk
- Banco de Dados: Supabase
- Estilização: Tailwind CSS
- Deploy: Vercel ou similar

### Identidade Visual
- Cores principais:
  - Primary: #84C2BE
  - Secondary: #ACFFF9 
  - Background: #FFFFF9
  - Surface: #EFFFEA
  - Criar variações dessas cores em diferentes níveis de brilho para hierarquia e contraste
- Design: Flat design minimalista, moderno e limpo
- Logo: Usar a imagem fornecida (flor com símbolo de cérebro)
- Tipografia: Sans-serif moderna e altamente legível

### Requisitos de Design Responsivo
- Aplicação deve sempre aparecer como mobile mesmo em desktop
- Largura máxima do conteúdo: 428px
- Em telas maiores, centralizar o conteúdo com background estendido
- Interface otimizada para toque

## 📋 Funcionalidades Detalhadas

### 1. Sistema de Autenticação e Onboarding

#### Autenticação via Clerk
- Implementar login com Google
- Implementar login com email/senha  
- Opção de criar nova conta
- Recuperação de senha
- Manter usuário logado

#### Fluxo de Primeiro Acesso
Após autenticação bem-sucedida, coletar informações do perfil:

**Informações Obrigatórias:**
- Nome completo (nome e sobrenome em campos separados)
- Idade (validar para ser número entre 1-120)
- Como se identifica (opções mutuamente exclusivas ou múltipla escolha):
  - TEA (Transtorno do Espectro Autista)
  - TDAH (Transtorno de Déficit de Atenção)
  - Ambos
  - Ainda explorando
  - Opção de pular esta etapa

**Informações Opcionais:**
- Foto de perfil (upload de imagem ou seleção de avatar padrão)

Salvar todas essas informações no Supabase vinculadas ao ID do usuário do Clerk.

### 2. Tela Inicial (Home)

Exibir 4 módulos principais em formato de cards grandes e visuais:
- Card Respiração (ícone de pulmão ou similar)
- Card Acalmar (ícone de música ou ondas)
- Card Conhecer-se (ícone de lâmpada ou cérebro)
- Card Perfil (foto do usuário ou avatar)

#### Widget de Mood Check-in
Abaixo dos cards principais, incluir pergunta opcional:
- Texto: "Como você está se sentindo?"
- Opções em emojis clicáveis (feliz, neutro, ansioso, triste, irritado)
- Salvar resposta com timestamp no Supabase
- Usuário pode pular sem responder

### 3. Módulo Respiração Guiada

#### Seleção de Padrões
Mostrar cards com diferentes técnicas de respiração:

**Padrão 4-7-8 (Ansiedade)**
- Inspirar por 4 segundos
- Segurar por 7 segundos  
- Expirar por 8 segundos
- Descrição: "Ajuda a acalmar ansiedade e nervosismo"

**Padrão 4-4-4-4 (Equilíbrio)**
- Inspirar por 4 segundos
- Segurar por 4 segundos
- Expirar por 4 segundos
- Pausar por 4 segundos
- Descrição: "Para encontrar equilíbrio e foco"

**Padrão 4-6-6 (Dormir)**
- Inspirar por 4 segundos
- Segurar por 6 segundos
- Expirar por 6 segundos  
- Descrição: "Relaxamento para preparar o sono"

**Respiração Personalizada**
- Permitir usuário configurar próprios tempos
- Sliders ou inputs numéricos para cada fase
- Validar valores entre 1-10 segundos
- Salvar configurações personalizadas no Supabase

#### Execução da Respiração
Durante a sessão de respiração:

**Elementos Visuais:**
- Círculo central que expande na inspiração e contrai na expiração
- Animação suave e fluida sincronizada com os tempos
- Cor do círculo muda sutilmente em cada fase
- Contador regressivo grande mostrando segundos restantes
- Texto indicador da fase atual ("Inspire", "Segure", "Expire", "Pause")

**Feedback Tátil:**
- Vibração suave do dispositivo nas mudanças de fase (se dispositivo suportar)
- Opção para desativar vibração nas configurações

**Controles:**
- Botão pausar/continuar sempre visível
- Botão sair com confirmação se sessão em andamento
- Contador de ciclos completados
- Opção de definir número de ciclos antes de começar

**Registro da Sessão:**
Ao finalizar, salvar no Supabase:
- Tipo de respiração usada
- Número de ciclos completados
- Duração total
- Data e hora
- Se foi interrompida ou completada

### 4. Módulo Acalmar (Vídeos)

#### Organização do Conteúdo
Categorias de vídeos para exibir:
- Favoritos (se usuário tiver marcado algum)
- Visuais Calmantes
- Sons da Natureza
- Ruído Branco
- ASMR
- Vistos Recentemente

#### Vídeos Obrigatórios
Incluir estes vídeos específicos:
1. "Liquid Motion Bubbler" - https://www.youtube.com/watch?v=HNYb1NnOSm4
2. "Satisfying Visuals" - https://www.youtube.com/watch?v=e0rjECzBsO0

Adicionar mais 5-8 vídeos de sons da natureza, ruído branco e visuais relaxantes.

#### Funcionalidades do Player
- Embed responsivo do YouTube
- Botão para favoritar/desfavoritar (salvar no Supabase)
- Opção de reproduzir em loop
- Controle de volume
- Modo tela cheia
- Registrar visualização no histórico

#### Sistema de Favoritos
- Usuário pode marcar vídeos como favoritos
- Favoritos aparecem no topo da lista
- Sincronizar favoritos no Supabase
- Limite de 20 favoritos

### 5. Módulo Conhecer-se

Implementar três formatos diferentes de conteúdo para autoconhecimento:

#### A. Card de Reflexão Diária
- Exibir uma pergunta reflexiva diferente por dia
- Exemplos de perguntas:
  - "Que texturas te incomodam? Por quê?"
  - "Em que momentos você se sente mais confortável?"
  - "O que te ajuda quando há muito barulho?"
- Campo de texto para resposta opcional
- Botão para pular se não quiser responder
- Salvar respostas no Supabase com data

#### B. Jornadas Lineares (Trilhas)
Criar trilhas estruturadas com progressão:

**Trilha "Será que sou autista?"**
- 10 etapas progressivas
- Cada etapa com conteúdo educativo breve
- Uma pergunta reflexiva por etapa
- Campo para anotações pessoais
- Barra de progresso visual
- Salvar progresso no Supabase

**Trilha "Entendendo o TDAH"**
- 8 etapas sobre características do TDAH
- Formato similar à trilha anterior
- Conteúdo adaptado para TDAH

**Trilha "Processamento Sensorial"**
- 12 etapas sobre sensibilidades sensoriais
- Incluir os 5 sentidos e propriocepção
- Exercícios práticos de identificação

#### C. Exploração por Tópicos
Tópicos disponíveis para exploração livre:
- Sensibilidade Sensorial
- Comunicação Social  
- Rotinas e Rituais
- Hiperfoco
- Stimming
- Masking
- Sobrecarga Sensorial
- Função Executiva

Cada tópico contém:
- Descrição do conceito (2-3 parágrafos)
- Pergunta "Isso ressoa com você?" (Sim/Não/Talvez)
- 3-5 exemplos práticos
- Campo para anotações pessoais
- Marcar como "lido" ou "explorado"

### 6. Sistema de Perfil e Configurações

#### Visualização do Perfil
Mostrar:
- Foto de perfil ou avatar
- Nome completo
- Idade
- Como se identifica (TEA/TDAH/Ambos/Explorando)
- Estatísticas de uso:
  - Dias usando o app
  - Total de respirações completadas
  - Reflexões respondidas
  - Vídeos assistidos

#### Edição de Perfil
Permitir alterar:
- Foto de perfil
- Nome
- Idade
- Identificação diagnóstica
- Preferências de notificação

#### Configurações do App
- Ativar/desativar vibração
- Ativar/desativar sons
- Tema (se implementar dark mode)
- Limpar histórico
- Exportar dados
- Excluir conta

### 7. Sistema de Tracking de Crises

#### Registro de Momento Difícil
Formulário para registrar crises ou momentos difíceis:

**Intensidade:**
- Slider de 1 a 5
- Visual com cores (verde a vermelho) ou emojis

**Tipo de Crise:**
- Sensorial (sobrecarga de estímulos)
- Emocional (ansiedade, tristeza)
- Função Executiva (paralisia de decisão)
- Outro (campo de texto)

**Duração:**
- Menos de 5 minutos
- 5 a 30 minutos
- 30 minutos a 1 hora
- Mais de 1 hora

**O que Ajudou:**
- Técnicas de respiração
- Vídeos calmantes
- Ficar sozinho
- Stimming
- Conversar com alguém
- Outro (especificar)

**Notas Adicionais:**
- Campo de texto opcional para observações

Salvar todos os dados com timestamp no Supabase.

#### Visualização de Histórico
- Lista cronológica dos registros
- Filtros por período (semana, mês, ano)
- Estatísticas básicas:
  - Média de intensidade no período
  - Tipo mais comum
  - Estratégias mais eficazes
  - Tendências ao longo do tempo

### 8. Sistema de Gamificação Leve

#### Conquistas Desbloqueáveis
- "Primeira Respiração": Completar primeira sessão de respiração
- "Explorador": Assistir 5 vídeos diferentes
- "Autoconhecimento": Completar uma trilha inteira
- "7 Dias de Jornada": Usar o app por 7 dias consecutivos
- "Reflexivo": Responder 10 cards de reflexão
- "30 Dias de Cuidado": Usar o app por 30 dias

#### Sistema de Streaks
- Contador de dias consecutivos usando o app
- Notificação visual quando mantém streak
- Permitir "dia de descanso" sem quebrar streak

#### Feedback Positivo
- Mensagens encorajadoras após completar atividades
- Animações sutis ao desbloquear conquistas
- Som opcional de recompensa

## 🗄️ Estrutura de Dados no Supabase

### Tabelas Necessárias

**users_profiles**
- id (uuid, primary key)
- clerk_user_id (texto, unique)
- first_name (texto)
- last_name (texto)
- age (integer)
- diagnosis_type (enum: 'tea', 'tdah', 'both', 'exploring', null)
- profile_picture_url (texto)
- created_at (timestamp)
- updated_at (timestamp)

**breathing_sessions**
- id (uuid)
- user_id (foreign key)
- pattern_type (texto)
- cycles_completed (integer)
- total_duration (integer, segundos)
- completed (boolean)
- created_at (timestamp)

**video_favorites**
- user_id (foreign key)
- video_url (texto)
- video_title (texto)
- category (texto)
- created_at (timestamp)

**video_history**
- user_id (foreign key)
- video_url (texto)
- watched_at (timestamp)
- watch_duration (integer)

**daily_reflections**
- id (uuid)
- user_id (foreign key)
- question (texto)
- answer (texto)
- skipped (boolean)
- created_at (timestamp)

**journey_progress**
- user_id (foreign key)
- journey_type (texto)
- current_step (integer)
- completed_steps (array)
- notes (jsonb)
- completed (boolean)
- started_at (timestamp)
- completed_at (timestamp)

**topic_explorations**
- user_id (foreign key)
- topic_name (texto)
- resonates (enum: 'yes', 'no', 'maybe')
- notes (texto)
- explored_at (timestamp)

**crisis_logs**
- id (uuid)
- user_id (foreign key)
- intensity (integer 1-5)
- crisis_type (array de texto)
- duration (texto)
- what_helped (array de texto)
- additional_notes (texto)
- created_at (timestamp)

**mood_checkins**
- user_id (foreign key)
- mood (texto)
- created_at (timestamp)

**achievements**
- user_id (foreign key)
- achievement_type (texto)
- unlocked_at (timestamp)

**user_preferences**
- user_id (foreign key)
- vibration_enabled (boolean)
- sound_enabled (boolean)
- theme (texto)
- updated_at (timestamp)

## 🔒 Políticas de Segurança (RLS)

Implementar Row Level Security no Supabase:
- Usuários só podem ver e modificar seus próprios dados
- Nenhum usuário pode acessar dados de outros usuários
- Implementar políticas em todas as tabelas

## 📱 Comportamentos e Interações

### Microinterações
- Transições suaves de 300ms entre telas
- Feedback visual ao tocar botões (mudança de opacidade ou escala)
- Loading states com animação de pontos ou spinner
- Pull to refresh onde aplicável
- Feedback de sucesso após ações (salvar, completar, etc)

### Tom de Voz
- Sempre acolhedor e empático
- Nunca infantilizado ou condescendente
- Uso de "você" não "tu"
- Mensagens positivas e encorajadoras
- Evitar jargões médicos complexos

### Tratamento de Erros
- Mensagens de erro claras e acionáveis
- Sempre oferecer uma alternativa ou próximo passo
- Salvar rascunhos automaticamente para prevenir perda de dados
- Retry automático para falhas de rede

## 🚀 Considerações Importantes

### Performance
- Lazy loading para listas longas
- Otimização de imagens
- Cache de dados frequentemente acessados
- Paginação para históricos

### Acessibilidade
- Suporte a leitores de tela
- Contraste adequado (WCAG AA)
- Áreas de toque mínimas de 44x44px
- Textos alternativos para imagens
- Navegação por teclado

### Analytics (Opcional)
- Tracking anônimo de features mais usadas
- Tempo médio de sessões
- Taxa de conclusão de trilhas
- Padrões de uso para melhorias

---

**Este PRD está estruturado para ser interpretado por IA geradora de código, focando na descrição funcional sem implementação específica.**