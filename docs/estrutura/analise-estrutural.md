# 📐 Análise Estrutural - Serenamente

## Auditoria Completa da Arquitetura Atual

**Data:** 21 de Outubro de 2025  
**Versão:** 1.0  
**Objetivo:** Identificar problemas estruturais e propor reestruturação profissional

---

## 🎯 Resumo Executivo

### Problema Principal
O Serenamente possui funcionalidades sólidas, mas a **estrutura de componentes e fluxos de usuário** não reflete o nível de profissionalismo esperado de aplicações de saúde mental de grande porte (Calm, Headspace, BetterHelp).

### Nota Geral da Estrutura Atual: **6.5/10**

**Pontos fortes:**
- ✅ Funcionalidades bem pensadas
- ✅ Sistema de autenticação robusto (Clerk)
- ✅ Banco de dados estruturado (Prisma)

**Pontos críticos:**
- ❌ Fluxos de usuário não otimizados
- ❌ Hierarquia de informação confusa
- ❌ Falta de onboarding progressivo
- ❌ Componentes genéricos (não especializados)
- ❌ Ausência de estados intermediários

---

## 📊 Análise Página por Página

### 1. **Landing Page (app/page.tsx)**

#### Estrutura Atual
```tsx
// Redirect direto para /home ou sign-in
// Sem apresentação do produto
```

#### Problemas
- ❌ **Crítico:** Perde oportunidade de vender o produto
- ❌ Não apresenta valor da aplicação
- ❌ Usuários novos vão direto para login sem contexto
- ❌ Falta de social proof

#### Estrutura Ideal (Apps Profissionais)
```tsx
<LandingPage>
  <Hero>
    <Headline>Sua mente merece cuidado</Headline>
    <Subheadline>Ferramentas baseadas em ciência...</Subheadline>
    <CTA>Começar gratuitamente</CTA>
    <SocialProof>+10.000 pessoas já melhoraram...</SocialProof>
  </Hero>
  
  <Features>
    <Feature icon="..." title="..." description="..." />
    {/* 3-4 features principais */}
  </Features>
  
  <HowItWorks>
    <Step number="1" title="Avalie seu momento" />
    <Step number="2" title="Pratique diariamente" />
    <Step number="3" title="Acompanhe progresso" />
  </HowItWorks>
  
  <Testimonials>
    {/* 2-3 depoimentos */}
  </Testimonials>
  
  <FinalCTA>
    <Headline>Comece sua jornada hoje</Headline>
    <Button>Criar conta grátis</Button>
  </FinalCTA>
</LandingPage>
```

**Referências:** Calm.com, Headspace.com

---

### 2. **Sign-In/Sign-Up**

#### Estrutura Atual
```tsx
// Clerk default UI
// Sem personalização
// Frio e técnico
```

#### Problemas
- ❌ UI genérica (não transmite valores do app)
- ❌ Falta de mensagem de boas-vindas
- ❌ Sem opções de login social visíveis
- ❌ Não explica o que acontece após login

#### Estrutura Ideal
```tsx
<AuthPage layout="split">
  <LeftPanel>
    <BrandSection>
      <Logo />
      <Tagline>Cuide da sua mente com carinho</Tagline>
    </BrandSection>
    
    <IllustrationOrImage>
      {/* Ilustração calma e acolhedora */}
    </IllustrationOrImage>
    
    <Testimonial rotating>
      "O Serenamente me ajudou a controlar minha ansiedade"
      - Maria, 28 anos
    </Testimonial>
  </LeftPanel>
  
  <RightPanel>
    <AuthForm>
      <Heading>Bem-vindo de volta</Heading>
      <SocialLogins>
        <Button>Continuar com Google</Button>
        <Button>Continuar com Apple</Button>
      </SocialLogins>
      
      <Divider>ou</Divider>
      
      <EmailPasswordForm>
        <Input type="email" label="Email" />
        <Input type="password" label="Senha" />
        <ForgotPassword />
        <Button>Entrar</Button>
      </EmailPasswordForm>
      
      <SignUpPrompt>
        Não tem conta? <Link>Criar conta</Link>
      </SignUpPrompt>
    </AuthForm>
  </RightPanel>
</AuthPage>
```

**Referências:** Notion, Linear, Figma (auth screens)

---

### 3. **Onboarding (app/onboarding/page.tsx)**

#### Estrutura Atual
```tsx
// 3 steps lineares
// Coleta dados básicos
// Pouco engajamento
```

#### Problemas
- ❌ **Crítico:** Não cria conexão emocional
- ❌ Não explica o valor de cada dado coletado
- ❌ Falta de personalização baseada em respostas
- ❌ Ausência de welcome screen
- ❌ Não define expectativas (o que vem depois?)

#### Estrutura Ideal
```tsx
<OnboardingFlow>
  {/* Step 0 - Welcome */}
  <WelcomeScreen>
    <Animation />
    <Heading>Olá! Que bom te ver aqui</Heading>
    <Description>
      Vamos conhecer você melhor para criar uma experiência 
      personalizada. Isso leva só 2 minutos.
    </Description>
    <ProgressIndicator>5 perguntas</ProgressIndicator>
    <Button>Começar</Button>
  </WelcomeScreen>
  
  {/* Step 1 - Nome */}
  <Step progress="1/5">
    <Question>Como podemos te chamar?</Question>
    <Input placeholder="Seu primeiro nome" autoFocus />
    <Helper>Usaremos isso para personalizar sua experiência</Helper>
  </Step>
  
  {/* Step 2 - Objetivo Principal */}
  <Step progress="2/5">
    <Question>O que te trouxe aqui?</Question>
    <OptionCards selectable="single">
      <Card>
        <Icon>😰</Icon>
        <Label>Controlar ansiedade</Label>
      </Card>
      <Card>
        <Icon>😔</Icon>
        <Label>Melhorar humor</Label>
      </Card>
      <Card>
        <Icon>😴</Icon>
        <Label>Dormir melhor</Label>
      </Card>
      <Card>
        <Icon>🧘</Icon>
        <Label>Praticar mindfulness</Label>
      </Card>
    </OptionCards>
  </Step>
  
  {/* Step 3 - Nível de Experiência */}
  <Step progress="3/5">
    <Question>Você já praticou meditação ou mindfulness?</Question>
    <OptionCards>
      <Card>Nunca</Card>
      <Card>Um pouco</Card>
      <Card>Regularmente</Card>
    </OptionCards>
  </Step>
  
  {/* Step 4 - Momento do Dia */}
  <Step progress="4/5">
    <Question>Quando você prefere praticar?</Question>
    <OptionCards selectable="multiple">
      <Card>🌅 Manhã</Card>
      <Card>☀️ Tarde</Card>
      <Card>🌙 Noite</Card>
    </OptionCards>
  </Step>
  
  {/* Step 5 - Notificações */}
  <Step progress="5/5">
    <Question>Quer lembretes para praticar?</Question>
    <Description>
      Estudos mostram que lembretes aumentam em 3x 
      a consistência da prática
    </Description>
    <TimeSelector />
    <Toggle>Ativar lembretes</Toggle>
  </Step>
  
  {/* Completion */}
  <CompletionScreen>
    <Animation>🎉</Animation>
    <Heading>Tudo pronto, {name}!</Heading>
    <PersonalizedMessage>
      Preparamos um plano personalizado focado em 
      {objetivo}. Vamos começar?
    </PersonalizedMessage>
    <Button>Ir para o app</Button>
  </CompletionScreen>
</OnboardingFlow>
```

**Referências:** Duolingo, Calm, Headspace (onboarding)

---

### 4. **Home (app/home/page.tsx)**

#### Estrutura Atual
```tsx
<Home>
  <MoodCheckIn />
  <Grid 2x2>
    <ModuleCard>Respirar</ModuleCard>
    <ModuleCard>Acalmar</ModuleCard>
    <ModuleCard>Descobrir</ModuleCard>
    <ModuleCard>Perfil</ModuleCard>
  </Grid>
</Home>
```

#### Problemas
- ❌ **Crítico:** Falta de personalização
- ❌ Não mostra progresso do usuário
- ❌ Ausência de conteúdo recomendado
- ❌ Sem senso de "onde estou na jornada"
- ❌ Grid genérico (não guia usuário)
- ❌ Falta de streak/engajamento

#### Estrutura Ideal
```tsx
<Home>
  <Header>
    <Greeting>Boa tarde, {name}</Greeting>
    <StreakIndicator>🔥 5 dias seguidos</StreakIndicator>
  </Header>
  
  {/* Daily Check-in (só se não fez hoje) */}
  {!hasMoodToday && (
    <DailyCheckIn priority="high">
      <Question>Como você está hoje?</Question>
      <MoodSelector />
    </DailyCheckIn>
  )}
  
  {/* Recommended for You */}
  <Section title="Recomendado para você">
    <RecommendedCard type="breathing">
      <Tag>5 min</Tag>
      <Title>Respire para acalmar</Title>
      <Description>Baseado no seu objetivo de reduzir ansiedade</Description>
      <Button>Começar</Button>
    </RecommendedCard>
  </Section>
  
  {/* Continue Where You Left Off */}
  {hasIncompleteJourney && (
    <Section title="Continue de onde parou">
      <JourneyProgressCard>
        <Title>Jornada: Ansiedade</Title>
        <Progress value={3} max={10} />
        <Label>Etapa 3 de 10</Label>
        <Button>Continuar</Button>
      </JourneyProgressCard>
    </Section>
  )}
  
  {/* Quick Actions */}
  <Section title="Acesso rápido">
    <QuickActionsGrid cols={2}>
      <QuickAction icon={Wind} to="/breathe">
        Respirar
      </QuickAction>
      <QuickAction icon={VideoCamera} to="/calm">
        Vídeos
      </QuickAction>
      <QuickAction icon={Book} to="/discover/journeys">
        Jornadas
      </QuickAction>
      <QuickAction icon={Sparkle} to="/discover/topics">
        Explorar
      </QuickAction>
    </QuickActionsGrid>
  </Section>
  
  {/* Today's Reflection (if available) */}
  {hasDailyReflection && (
    <Section title="Reflexão do dia">
      <ReflectionCard>
        <Question>{dailyReflection.question}</Question>
        <Button>Refletir</Button>
      </ReflectionCard>
    </Section>
  )}
  
  {/* Your Stats */}
  <Section title="Seu progresso">
    <StatsGrid>
      <Stat label="Dias ativos" value={stats.activeDays} />
      <Stat label="Min. respirando" value={stats.breathingMins} />
      <Stat label="Jornadas" value={`${stats.completedJourneys}/${stats.totalJourneys}`} />
    </StatsGrid>
  </Section>
</Home>
```

**Referências:** Calm app, Headspace app, Duolingo

---

### 5. **Respiração (/breathe)**

#### Estrutura Atual
```tsx
<Breathe>
  <List>
    <BreathingPatternCard>4-7-8</BreathingPatternCard>
    <BreathingPatternCard>Box</BreathingPatternCard>
    <BreathingPatternCard>Custom</BreathingPatternCard>
  </List>
</Breathe>
```

#### Problemas
- ❌ Lista sem contexto
- ❌ Não explica benefícios de cada padrão
- ❌ Falta de recomendação ("melhor para ansiedade")
- ❌ Ausência de histórico
- ❌ Sem gamificação (tempo total respirado)

#### Estrutura Ideal
```tsx
<BreathePage>
  <Header>
    <Title>Exercícios de Respiração</Title>
    <Subtitle>Respire com consciência</Subtitle>
  </Header>
  
  {/* Stats Overview */}
  <StatsBar>
    <Stat icon={Timer} value="45 min" label="Esta semana" />
    <Stat icon={Fire} value="3 dias" label="Sequência" />
    <Stat icon={Check} value="12" label="Sessões" />
  </StatsBar>
  
  {/* Recomendado */}
  <Section title="Recomendado para você">
    <FeatureCard variant="primary">
      <Badge>Melhor para ansiedade</Badge>
      <Title>Respiração 4-7-8</Title>
      <Description>
        Técnica comprovada para reduzir ansiedade e 
        melhorar o sono. Ideal para iniciantes.
      </Description>
      <Benefits>
        <Benefit>✓ Reduz ansiedade</Benefit>
        <Benefit>✓ Melhora o sono</Benefit>
        <Benefit>✓ 5 minutos</Benefit>
      </Benefits>
      <Button size="lg">Começar agora</Button>
    </FeatureCard>
  </Section>
  
  {/* Mais Praticados */}
  <Section title="Mais praticados">
    <ScrollableGrid>
      <PatternCard
        name="Box Breathing"
        duration="5 min"
        difficulty="Fácil"
        bestFor="Foco e concentração"
        timesCompleted={5}
      />
      <PatternCard
        name="Respiração Profunda"
        duration="3 min"
        difficulty="Muito fácil"
        bestFor="Relaxamento rápido"
        timesCompleted={8}
      />
    </ScrollableGrid>
  </Section>
  
  {/* Todos os Padrões */}
  <Section title="Explorar todos">
    <PatternGrid>
      {patterns.map(pattern => (
        <PatternCard key={pattern.id} {...pattern} />
      ))}
      <CustomPatternCard>
        <Icon>⚙️</Icon>
        <Title>Criar padrão personalizado</Title>
        <Button>Criar</Button>
      </CustomPatternCard>
    </PatternGrid>
  </Section>
  
  {/* Histórico Recente */}
  <Section title="Histórico recente">
    <HistoryList>
      <HistoryItem
        pattern="4-7-8"
        date="Hoje, 14:30"
        duration="5 min"
        cycles={8}
      />
      <HistoryItem
        pattern="Box"
        date="Ontem, 09:15"
        duration="10 min"
        cycles={15}
      />
    </HistoryList>
  </Section>
</BreathePage>
```

**Referências:** Calm breathing, Breathwrk app

---

### 6. **Sessão de Respiração (/breathe/session)**

#### Estrutura Atual
```tsx
<Session>
  <ExitButton />
  <BreathingCircle />
</Session>
```

#### Problemas
- ❌ **Crítico:** Sem preparação (usuário entra direto)
- ❌ Falta de instruções iniciais
- ❌ Ausência de feedback durante
- ❌ Não há celebration ao completar
- ❌ Sem opção de pausar
- ❌ Falta de música/sons ambiente (opcional)

#### Estrutura Ideal
```tsx
<BreathingSession flow="multi-step">
  {/* Step 1: Preparação */}
  <PreparationScreen>
    <Instruction>
      Encontre uma posição confortável
    </Instruction>
    <Checklist>
      <Item>✓ Sente-se ou deite-se</Item>
      <Item>✓ Deixe os ombros relaxados</Item>
      <Item>✓ Coloque uma mão no peito</Item>
    </Checklist>
    <SoundToggle>
      <Label>Sons ambiente</Label>
      <Options>
        <Option>Silêncio</Option>
        <Option>Natureza</Option>
        <Option>Chuva</Option>
      </Options>
    </SoundToggle>
    <Button>Estou pronto</Button>
  </PreparationScreen>
  
  {/* Step 2: Sessão Ativa */}
  <ActiveSession>
    <TopBar minimal>
      <ExitButton />
      <CycleCounter>Ciclo 3/10</CycleCounter>
    </TopBar>
    
    <CenterContent>
      <BreathingCircle
        phase={currentPhase}
        duration={phaseDuration}
        animated
      >
        <PhaseLabel>{phaseText}</PhaseLabel>
        <PhaseTimer>{countdown}s</PhaseTimer>
      </BreathingCircle>
      
      <PhaseDescription>
        {phase === 'inhale' && 'Inspire lentamente pelo nariz'}
        {phase === 'hold' && 'Segure o ar'}
        {phase === 'exhale' && 'Expire pela boca'}
      </PhaseDescription>
    </CenterContent>
    
    <BottomControls>
      <PauseButton />
      <SkipButton>Pular ciclo</SkipButton>
    </BottomControls>
  </ActiveSession>
  
  {/* Step 3: Pausa (se pausado) */}
  <PauseOverlay>
    <Title>Pausado</Title>
    <Button>Continuar</Button>
    <Button variant="secondary">Encerrar</Button>
  </PauseOverlay>
  
  {/* Step 4: Conclusão */}
  <CompletionScreen>
    <Celebration>🎉</Celebration>
    <Heading>Muito bem!</Heading>
    <Message>
      Você completou {cycles} ciclos de respiração {patternName}
    </Message>
    
    <Stats>
      <Stat label="Duração" value="5 min 30s" />
      <Stat label="Ciclos" value="10" />
      <Stat label="Frequência" value="12/min" />
    </Stats>
    
    <MoodAfterCheck>
      <Question>Como você se sente agora?</Question>
      <MoodSelector compact />
    </MoodAfterCheck>
    
    <Actions>
      <Button>Voltar para início</Button>
      <Button variant="secondary">Fazer novamente</Button>
    </Actions>
    
    <ShareProgress>
      <Button variant="ghost" icon={Share}>
        Compartilhar conquista
      </Button>
    </ShareProgress>
  </CompletionScreen>
</BreathingSession>
```

**Referências:** Headspace sessions, Apple Fitness+ guided sessions

---

### 7. **Vídeos Calmos (/calm)**

#### Estrutura Atual
```tsx
<Calm>
  <CategoryTabs />
  <VideoGrid>
    <VideoCard />
  </VideoGrid>
</Calm>
```

#### Problemas
- ❌ Sem personalização
- ❌ Falta de curadoria ("staff picks")
- ❌ Ausência de playlists
- ❌ Não mostra tempo assistido
- ❌ Sem filtragem por duração/mood

#### Estrutura Ideal
```tsx
<CalmPage>
  <Header>
    <Title>Vídeos Relaxantes</Title>
    <Filters>
      <DurationFilter>
        <Option>Todos</Option>
        <Option>< 5 min</Option>
        <Option>5-15 min</Option>
        <Option>> 15 min</Option>
      </DurationFilter>
      <MoodFilter>
        <Option>Todos</Option>
        <Option>Ansiedade</Option>
        <Option>Sono</Option>
        <Option>Foco</Option>
      </MoodFilter>
    </Filters>
  </Header>
  
  {/* Continuar Assistindo */}
  {hasWatching && (
    <Section title="Continue assistindo">
      <VideoCard
        progress={75}
        title="Ondas do mar ao entardecer"
      />
    </Section>
  )}
  
  {/* Escolha da Equipe */}
  <Section title="Escolha da equipe" icon={Star}>
    <FeaturedCarousel>
      <FeaturedVideoCard
        title="Floresta tropical depois da chuva"
        duration="30 min"
        views="1.2k"
        badge="Mais assistido"
      />
    </FeaturedCarousel>
  </Section>
  
  {/* Para Você */}
  <Section title="Recomendados para ansiedade">
    <VideoGrid>
      {recommendedVideos.map(video => (
        <VideoCard key={video.id} {...video} />
      ))}
    </VideoGrid>
  </Section>
  
  {/* Categorias */}
  <Section title="Natureza">
    <HorizontalScroll>
      <VideoCard />
    </HorizontalScroll>
  </Section>
  
  <Section title="Sons ambiente">
    <HorizontalScroll>
      <VideoCard />
    </HorizontalScroll>
  </Section>
  
  {/* Playlists Curadas */}
  <Section title="Playlists">
    <PlaylistGrid>
      <PlaylistCard
        title="Para dormir melhor"
        count="8 vídeos"
        duration="2h 15min"
      />
      <PlaylistCard
        title="Concentração profunda"
        count="12 vídeos"
        duration="3h 30min"
      />
    </PlaylistGrid>
  </Section>
  
  {/* Favoritos */}
  {hasFavorites && (
    <Section title="Seus favoritos">
      <VideoGrid>
        {favorites.map(video => (
          <VideoCard key={video.id} {...video} />
        ))}
      </VideoGrid>
    </Section>
  )}
</CalmPage>
```

**Referências:** YouTube, Netflix (curadoria), Calm app

---

### 8. **Descobrir (/discover)**

#### Estrutura Atual
```tsx
<Discover>
  <DailyReflection />
  <OptionsGrid>
    <Card>Jornadas</Card>
    <Card>Tópicos</Card>
    <Card>Reflexões</Card>
  </OptionsGrid>
</Discover>
```

#### Problemas
- ❌ **Crítico:** Estrutura confusa (3 tipos diferentes misturados)
- ❌ Não há progressão clara
- ❌ Falta de hub de conteúdo educacional
- ❌ Reflexão diária se perde

#### Estrutura Ideal

**Opção A: Separar em Abas**
```tsx
<DiscoverPage tabs>
  <TabBar>
    <Tab>Para Você</Tab>
    <Tab>Jornadas</Tab>
    <Tab>Biblioteca</Tab>
  </TabBar>
  
  {/* Tab: Para Você */}
  <ForYouTab>
    <DailyReflectionCard priority />
    
    <Section title="Continue aprendendo">
      <JourneyProgressCard />
    </Section>
    
    <Section title="Novos tópicos">
      <TopicGrid>
        <TopicCard />
      </TopicGrid>
    </Section>
    
    <Section title="Baseado no seu interesse">
      <RecommendedContent />
    </Section>
  </ForYouTab>
  
  {/* Tab: Jornadas */}
  <JourneysTab>
    <StatusFilter>
      <Option active>Todas</Option>
      <Option>Em progresso</Option>
      <Option>Completas</Option>
    </StatusFilter>
    
    <JourneysList>
      <JourneyCard />
    </JourneysList>
  </JourneysTab>
  
  {/* Tab: Biblioteca */}
  <LibraryTab>
    <SearchBar placeholder="Buscar conteúdos..." />
    
    <Categories>
      <CategoryChip>Ansiedade</CategoryChip>
      <CategoryChip>Sono</CategoryChip>
      <CategoryChip>Relacionamentos</CategoryChip>
    </Categories>
    
    <TopicGrid>
      <TopicCard />
    </TopicGrid>
  </LibraryTab>
</DiscoverPage>
```

**Referências:** Medium, Notion (content organization)

---

### 9. **Perfil (/profile)**

#### Estrutura Atual
```tsx
<Profile>
  <UserCard>Avatar + Nome</UserCard>
  <StatsGrid />
  <Menu>
    <Link>Editar</Link>
    <Link>Histórico</Link>
    <Link>Conquistas</Link>
    <Link>Configurações</Link>
  </Menu>
</Profile>
```

#### Problemas
- ❌ Sem senso de progresso/conquista
- ❌ Stats genéricos
- ❌ Falta de visualização de dados
- ❌ Ausência de insights ("Você está X% melhor")
- ❌ Não celebra marcos

#### Estrutura Ideal
```tsx
<ProfilePage>
  {/* Header with Achievement */}
  <ProfileHeader>
    <BackgroundGradient />
    <AvatarSection>
      <Avatar size="xl" editable />
      <UserInfo>
        <Name>{user.name}</Name>
        <JoinedDate>Membro desde {joinDate}</JoinedDate>
        <CurrentStreak>
          🔥 {streak} dias de sequência
        </CurrentStreak>
      </UserInfo>
    </AvatarSection>
  </ProfileHeader>
  
  {/* Level/Progress System */}
  <LevelCard>
    <CurrentLevel>Nível 5 - Explorador</CurrentLevel>
    <XPBar value={350} max={500} />
    <NextLevel>Próximo: Nível 6 (150 XP)</NextLevel>
  </LevelCard>
  
  {/* This Week Summary */}
  <Section title="Esta semana">
    <WeeklySummaryCard>
      <Stat
        icon={CheckCircle}
        value="5/7"
        label="Dias ativos"
        change="+2"
      />
      <Stat
        icon={Timer}
        value="45 min"
        label="Respirando"
        change="+15"
      />
      <Stat
        icon={Book}
        value="3"
        label="Tópicos lidos"
        change="+1"
      />
      <Stat
        icon={Trophy}
        value="2"
        label="Conquistas"
        badge="Novo!"
      />
    </WeeklySummaryCard>
    
    <ActivityHeatmap data={weeklyActivity} />
  </Section>
  
  {/* Achievements Highlight */}
  <Section title="Conquistas recentes">
    <AchievementShowcase>
      <AchievementBadge
        icon="🔥"
        title="Sequência de 7 dias"
        unlockedAt="Ontem"
        rarity="Raro"
      />
      <AchievementBadge
        icon="🧘"
        title="Mestre da respiração"
        unlockedAt="3 dias atrás"
        rarity="Épico"
      />
    </AchievementShowcase>
    <Button variant="ghost" to="/profile/achievements">
      Ver todas ({totalAchievements})
    </Button>
  </Section>
  
  {/* Activity Chart */}
  <Section title="Seu progresso">
    <TabBar size="sm">
      <Tab>Semana</Tab>
      <Tab active>Mês</Tab>
      <Tab>Ano</Tab>
    </TabBar>
    
    <ActivityChart
      data={monthlyActivity}
      metrics={['breathing', 'journeys', 'mood']}
    />
    
    <InsightCard>
      <Icon>📈</Icon>
      <Message>
        Você está 40% mais ativo este mês comparado ao anterior!
      </Message>
    </InsightCard>
  </Section>
  
  {/* Navigation Menu */}
  <Section title="Gerenciar">
    <MenuList>
      <MenuItem icon={User} to="/profile/edit">
        Editar perfil
      </MenuItem>
      <MenuItem icon={ClipboardText} to="/profile/crisis-log">
        Diário de crises
        {hasUnreadEntries && <Badge>3</Badge>}
      </MenuItem>
      <MenuItem icon={Trophy} to="/profile/achievements">
        Conquistas
        <Badge variant="gold">{unlockedAchievements}/{totalAchievements}</Badge>
      </MenuItem>
      <MenuItem icon={Clock} to="/profile/history">
        Histórico
      </MenuItem>
      <MenuItem icon={Gear} to="/profile/settings">
        Configurações
      </MenuItem>
    </MenuList>
  </Section>
  
  {/* Danger Zone */}
  <Section>
    <DangerZone>
      <MenuItem icon={SignOut} variant="danger" action="logout">
        Sair da conta
      </MenuItem>
      <MenuItem icon={Trash} variant="danger" to="/profile/delete">
        Excluir conta
      </MenuItem>
    </DangerZone>
  </Section>
</ProfilePage>
```

**Referências:** Duolingo profile, Strava, Apple Health

---

## 🎯 Problemas Estruturais Globais

### 1. **Navegação**

#### Atual
- Header simples (avatar + theme toggle)
- Sem bottom navigation
- Breadcrumbs básicos

#### Ideal para Mobile-First App
```tsx
<AppLayout>
  <TopBar sticky>
    <PageTitle />
    <Actions />
  </TopBar>
  
  <MainContent>
    {children}
  </MainContent>
  
  <BottomNavigation>
    <NavItem icon={House} label="Início" to="/home" />
    <NavItem icon={Wind} label="Respirar" to="/breathe" />
    <NavItem icon={Compass} label="Descobrir" to="/discover" />
    <NavItem icon={User} label="Perfil" to="/profile" />
  </BottomNavigation>
</AppLayout>
```

### 2. **Feedback e Estados**

#### Faltam:
- ❌ Loading states personalizados por contexto
- ❌ Empty states empáticos
- ❌ Success celebrations
- ❌ Error recovery guidance
- ❌ Skeleton screens contextualizados

### 3. **Personalização**

#### Atual
- Conteúdo genérico para todos

#### Ideal
- Baseado em diagnóstico inicial
- Baseado em histórico de uso
- Baseado em objetivos
- Baseado em preferências de tempo

### 4. **Gamificação**

#### Atual
- Achievements básicos
- Streaks não visíveis

#### Ideal
- Sistema de XP/Níveis
- Challenges semanais
- Comparação pessoal (não social)
- Milestones celebrados

---

## 📈 Métricas de Sucesso Estrutural

### Antes da Reestruturação
- Time to Value: ~3 minutos (onboarding + encontrar feature)
- Engagement: Usuário não sabe o que fazer depois
- Retention: Baixa (sem sistema de hábito)

### Depois da Reestruturação (Meta)
- Time to Value: ~30 segundos (homepage personalizada)
- Engagement: Conteúdo recomendado aumenta uso em 3x
- Retention: Sistema de streaks + gamificação aumenta em 5x

---

## 🎯 Prioridades de Reestruturação

### P0 (Crítico - Sem isso o app não é profissional)
1. **Landing Page** com valor claro
2. **Onboarding** progressivo e engajador
3. **Home personalizada** baseada em contexto
4. **Bottom Navigation** (padrão mobile)
5. **Sessões de respiração** com prep + completion

### P1 (Importante - Aumenta qualidade significativamente)
6. **Descobrir** com abas claras
7. **Perfil** com progresso visual
8. **Vídeos** com curadoria
9. **Feedback states** profissionais
10. **Sistema de recomendação**

### P2 (Desejável - Polish)
11. **Gamificação** completa
12. **Insights** baseados em dados
13. **Playlists** de vídeos
14. **Dark patterns** removal
15. **Micro-animations** contextuais

---

## 📚 Referências de Apps Profissionais

### Benchmarks Principais
1. **Calm** - Onboarding, sessões guiadas, curadoria
2. **Headspace** - Estrutura de conteúdo, progressão
3. **Duolingo** - Gamificação, streaks, celebration
4. **Notion** - Organização de informação
5. **Linear** - Auth screens, empty states
6. **Apple Health** - Data visualization, insights
7. **Strava** - Profile, achievements, stats

---

## ✅ Próximos Passos

1. ✅ **Análise completa** (este documento)
2. 🔄 **Proposta de arquitetura** (patterns.md)
3. 🔄 **Plano de reestruturação** (plano-estrutural.md)
4. 🔄 **Etapas de implementação** (etapas-estrutural.md)

---

**Esta análise deve ser usada como referência para todas as decisões estruturais do projeto.**

