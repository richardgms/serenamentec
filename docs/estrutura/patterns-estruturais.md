# 🏗️ Padrões Estruturais - Serenamente

## Design Patterns e Arquitetura de Componentes de Alto Nível

**Versão:** 1.0  
**Data:** 21 de Outubro de 2025  
**Baseado em:** Apps de referência (Calm, Headspace, Duolingo, Notion)

---

## 📋 Índice

1. [Filosofia Estrutural](#filosofia-estrutural)
2. [Layouts e Templates](#layouts-e-templates)
3. [Patterns de Navegação](#patterns-de-navegação)
4. [Patterns de Conteúdo](#patterns-de-conteúdo)
5. [Patterns de Feedback](#patterns-de-feedback)
6. [Patterns de Personalização](#patterns-de-personalização)
7. [Patterns de Gamificação](#patterns-de-gamificação)
8. [Hierarquia de Informação](#hierarquia-de-informação)

---

## 🎯 Filosofia Estrutural

### Princípios Fundamentais

#### 1. **Progressive Disclosure**
Revelar informação gradualmente, evitando sobrecarga cognitiva.

**Aplicação:**
- Onboarding em steps (não tudo de uma vez)
- Expandir detalhes on-demand
- Tabs para organizar conteúdo denso

#### 2. **Context-Aware**
O app se adapta ao estado e histórico do usuário.

**Aplicação:**
- Home muda baseado em hora do dia
- Recomendações baseadas em uso passado
- Mensagens personalizadas

#### 3. **Frictionless Flow**
Reduzir steps entre intenção e ação.

**Aplicação:**
- Quick actions na home
- Continue where you left off
- Smart defaults

#### 4. **Emotional Design**
Estrutura que transmite cuidado e acolhimento.

**Aplicação:**
- Celebrations em conquistas
- Mensagens empáticas em empty states
- Preparação antes de sessões intensas

#### 5. **Data-Informed, Not Data-Driven**
Usar dados para guiar, não ditar comportamento.

**Aplicação:**
- Mostrar progresso, não pressionar
- Insights construtivos, não comparações negativas
- Sugestões, não obrigações

---

## 📐 Layouts e Templates

### 1. **Landing Page Layout**

```tsx
<LandingLayout>
  {/* Hero Section */}
  <Hero height="100vh" align="center">
    <Container maxW="800px">
      <Headline size="display">
        Sua mente merece cuidado
      </Headline>
      <Subheadline size="xl" color="secondary">
        Ferramentas baseadas em ciência para ansiedade, 
        sono e bem-estar emocional
      </Subheadline>
      <CTAGroup spacing="4">
        <Button size="lg" variant="primary">
          Começar gratuitamente
        </Button>
        <Button size="lg" variant="ghost">
          Ver como funciona
        </Button>
      </CTAGroup>
      <SocialProof>
        <AvatarGroup />
        <Text>+10.000 pessoas melhoraram sua saúde mental</Text>
      </SocialProof>
    </Container>
  </Hero>

  {/* Features Section */}
  <Section id="features" bg="surface-subtle">
    <Container>
      <SectionHeader
        tag="Recursos"
        title="Tudo que você precisa"
        subtitle="Ferramentas cientificamente comprovadas"
      />
      <FeaturesGrid cols={3}>
        <Feature
          icon={Wind}
          title="Respiração Guiada"
          description="Técnicas comprovadas para reduzir ansiedade"
        />
        <Feature
          icon={VideoCamera}
          title="Vídeos Relaxantes"
          description="Conteúdo curado para acalmar sua mente"
        />
        <Feature
          icon={Book}
          title="Jornadas de Autoconhecimento"
          description="Aprenda sobre sua mente passo a passo"
        />
      </FeaturesGrid>
    </Container>
  </Section>

  {/* How It Works */}
  <Section id="how-it-works">
    <Container>
      <SectionHeader
        title="Como funciona"
        subtitle="3 passos simples"
      />
      <StepsTimeline>
        <Step number="1">
          <Title>Conte-nos sobre você</Title>
          <Description>
            Responda algumas perguntas para personalizarmos 
            sua experiência
          </Description>
        </Step>
        <Step number="2">
          <Title>Pratique diariamente</Title>
          <Description>
            Apenas 5 minutos por dia podem fazer 
            uma grande diferença
          </Description>
        </Step>
        <Step number="3">
          <Title>Acompanhe seu progresso</Title>
          <Description>
            Veja como você está evoluindo e 
            celebre suas conquistas
          </Description>
        </Step>
      </StepsTimeline>
    </Container>
  </Section>

  {/* Testimonials */}
  <Section bg="primary-subtle">
    <Container>
      <SectionHeader
        title="O que dizem sobre nós"
      />
      <TestimonialsCarousel>
        <Testimonial
          quote="O Serenamente me ajudou a controlar 
                 minha ansiedade de forma surpreendente"
          author="Maria S."
          role="Usuária há 3 meses"
          avatar="/testimonial-1.jpg"
        />
        {/* Mais 2-3 testimonials */}
      </TestimonialsCarousel>
    </Container>
  </Section>

  {/* Final CTA */}
  <Section size="lg">
    <Container maxW="600px" align="center">
      <Headline size="2xl">
        Comece sua jornada hoje
      </Headline>
      <Text size="lg" color="secondary">
        Junte-se a milhares de pessoas cuidando 
        de sua saúde mental
      </Text>
      <Button size="xl">
        Criar conta grátis
      </Button>
      <Caption>
        Sem cartão de crédito necessário
      </Caption>
    </Container>
  </Section>

  <Footer />
</LandingLayout>
```

**Anatomia:**
- Hero full-height com CTA claro
- Features em grid 3 colunas
- How it Works em timeline vertical
- Social proof espalhado
- Final CTA reforçado

---

### 2. **Auth Screen Layout (Split)**

```tsx
<AuthLayout variant="split">
  {/* Left Panel - Branding */}
  <BrandPanel width="40%" bg="gradient-primary">
    <Container padding="xl">
      <Logo variant="light" size="lg" />
      
      <Spacer />
      
      <BrandContent>
        <Tagline size="xl" color="white">
          Cuide da sua mente com carinho
        </Tagline>
        <Description color="white-80">
          Ferramentas baseadas em ciência para 
          ansiedade, sono e bem-estar
        </Description>
      </BrandContent>
      
      <Spacer />
      
      <RotatingTestimonial>
        <Quote color="white">
          "Mudou completamente minha relação com ansiedade"
        </Quote>
        <Author color="white-70">
          - Ana, 32 anos
        </Author>
      </RotatingTestimonial>
      
      <IllustrationOrPhoto
        src="/auth-illustration.svg"
        alt="Pessoa meditando"
        opacity={0.1}
      />
    </Container>
  </BrandPanel>

  {/* Right Panel - Form */}
  <FormPanel width="60%">
    <Container maxW="400px" padding="xl">
      <BackButton />
      
      <FormHeader>
        <Heading size="2xl">
          {isSignIn ? 'Bem-vindo de volta' : 'Criar conta'}
        </Heading>
        <Subheading color="secondary">
          {isSignIn 
            ? 'Entre para continuar sua jornada' 
            : 'Comece sua jornada de autocuidado'
          }
        </Subheading>
      </FormHeader>

      <SocialLogins>
        <Button
          variant="outline"
          size="lg"
          icon={GoogleLogo}
          fullWidth
        >
          Continuar com Google
        </Button>
        <Button
          variant="outline"
          size="lg"
          icon={AppleLogo}
          fullWidth
        >
          Continuar com Apple
        </Button>
      </SocialLogins>

      <Divider>ou</Divider>

      <EmailPasswordForm>
        <Input
          type="email"
          label="Email"
          placeholder="seu@email.com"
          required
        />
        <Input
          type="password"
          label="Senha"
          placeholder="••••••••"
          required
          helperText={!isSignIn && "Mínimo 8 caracteres"}
        />
        
        {isSignIn && (
          <ForgotPassword align="right">
            <Link to="/reset-password">
              Esqueceu a senha?
            </Link>
          </ForgotPassword>
        )}

        <Button
          type="submit"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
        >
          {isSignIn ? 'Entrar' : 'Criar conta'}
        </Button>
      </EmailPasswordForm>

      <ToggleAuthMode>
        <Text color="secondary">
          {isSignIn 
            ? 'Não tem uma conta?' 
            : 'Já tem uma conta?'
          }
        </Text>
        <Link onClick={toggleMode}>
          {isSignIn ? 'Criar conta' : 'Entrar'}
        </Link>
      </ToggleAuthMode>

      {!isSignIn && (
        <TermsAcceptance>
          <Text size="sm" color="tertiary">
            Ao criar uma conta, você concorda com nossos{' '}
            <Link>Termos de Uso</Link> e{' '}
            <Link>Política de Privacidade</Link>
          </Text>
        </TermsAcceptance>
      )}
    </Container>
  </FormPanel>
</AuthLayout>
```

**Características:**
- 40/60 split (branding/form)
- Social login em destaque
- Divider visual claro
- Toggle fácil entre sign-in/sign-up
- Termos visíveis (transparência)

---

### 3. **App Shell (Mobile-First)**

```tsx
<AppShell>
  {/* Top Bar */}
  <TopBar
    sticky
    variant={hasScrolled ? 'elevated' : 'flat'}
  >
    <Container>
      <TopBarContent>
        <Left>
          {hasBackButton ? (
            <BackButton />
          ) : (
            <Logo size="sm" />
          )}
        </Left>

        <Center>
          <PageTitle>{currentPageTitle}</PageTitle>
        </Center>

        <Right>
          <IconButton
            icon={theme === 'dark' ? Sun : Moon}
            onClick={toggleTheme}
            label="Alternar tema"
          />
          <IconButton
            icon={Bell}
            badge={unreadNotifications}
            label="Notificações"
          />
        </Right>
      </TopBarContent>
    </Container>
  </TopBar>

  {/* Main Content Area */}
  <MainContent paddingBottom="bottomNav">
    <PageTransition>
      {children}
    </PageTransition>
  </MainContent>

  {/* Bottom Navigation (Mobile) */}
  <BottomNavigation>
    <NavItem
      icon={House}
      label="Início"
      to="/home"
      isActive={pathname === '/home'}
    />
    <NavItem
      icon={Wind}
      label="Respirar"
      to="/breathe"
      isActive={pathname.startsWith('/breathe')}
    />
    <NavItem
      icon={Compass}
      label="Descobrir"
      to="/discover"
      isActive={pathname.startsWith('/discover')}
      badge={hasNewContent}
    />
    <NavItem
      icon={User}
      label="Perfil"
      to="/profile"
      isActive={pathname.startsWith('/profile')}
    />
  </BottomNavigation>

  {/* Floating Action (Contextual) */}
  {showFAB && (
    <FAB
      icon={Plus}
      label={fabLabel}
      onClick={fabAction}
    />
  )}

  {/* Modals/Overlays */}
  <ModalManager />
  <ToastManager />
</AppShell>
```

**Características:**
- Bottom nav padrão mobile
- Top bar adaptável
- FAB contextual
- Transições entre páginas
- Sistema de modals/toasts

---

## 🧭 Patterns de Navegação

### 1. **Progressive Onboarding**

```tsx
<OnboardingFlow
  totalSteps={6}
  canSkip={false}
  persistence="localStorage"
>
  {/* Welcome Screen */}
  <OnboardingStep id="welcome" skippable={false}>
    <IllustrationHero
      src="/onboarding-welcome.svg"
      size="lg"
    />
    <Heading>Olá! Que bom ter você aqui</Heading>
    <Description>
      Vamos conhecer você melhor para criar uma 
      experiência personalizada. Leva só 2 minutos.
    </Description>
    <ProgressPreview>
      <Icon>⏱️</Icon>
      <Text>~2 minutos</Text>
      <Text>5 perguntas</Text>
    </ProgressPreview>
    <Button size="lg" fullWidth>
      Vamos lá!
    </Button>
  </OnboardingStep>

  {/* Question Steps */}
  <OnboardingStep id="name" progress="1/5">
    <StepHeader>
      <ProgressBar value={20} showLabel={false} />
      <BackButton />
    </StepHeader>
    
    <QuestionContent>
      <Label>Como podemos te chamar?</Label>
      <Input
        placeholder="Seu primeiro nome"
        autoFocus
        onChange={handleNameChange}
      />
      <HelperText>
        Usaremos isso para personalizar sua experiência
      </HelperText>
    </QuestionContent>

    <StepFooter>
      <Button
        size="lg"
        fullWidth
        disabled={!name}
        onClick={nextStep}
      >
        Continuar
      </Button>
    </StepFooter>
  </OnboardingStep>

  <OnboardingStep id="goal" progress="2/5">
    <QuestionContent>
      <Label>O que te trouxe aqui hoje?</Label>
      <OptionGrid cols={2}>
        <OptionCard
          icon="😰"
          label="Controlar ansiedade"
          selected={goal === 'anxiety'}
          onClick={() => setGoal('anxiety')}
        />
        <OptionCard
          icon="😔"
          label="Melhorar humor"
          selected={goal === 'mood'}
          onClick={() => setGoal('mood')}
        />
        <OptionCard
          icon="😴"
          label="Dormir melhor"
          selected={goal === 'sleep'}
          onClick={() => setGoal('sleep')}
        />
        <OptionCard
          icon="🧘"
          label="Praticar mindfulness"
          selected={goal === 'mindfulness'}
          onClick={() => setGoal('mindfulness')}
        />
      </OptionGrid>
    </QuestionContent>
  </OnboardingStep>

  {/* Completion */}
  <OnboardingStep id="complete">
    <CelebrationAnimation />
    <Heading>Tudo pronto, {name}!</Heading>
    <Description>
      Preparamos um plano personalizado focado em {goalLabel}.
      Vamos começar?
    </Description>
    <PersonalizedRecommendations>
      <RecommendationCard
        type="breathing"
        title="Comece com respiração"
        duration="5 min"
      />
    </PersonalizedRecommendations>
    <Button size="lg" fullWidth>
      Ir para o app
    </Button>
  </OnboardingStep>
</OnboardingFlow>
```

**Características:**
- Welcome screen setup expectations
- Progress visível
- Uma pergunta por vez
- Explicação do "porquê" de cada dado
- Completion personalizada

---

### 2. **Contextual Navigation**

```tsx
{/* Adaptável ao contexto */}

{/* Contexto 1: Primeira vez na Home */}
<Home variant="first-time">
  <WelcomeBanner>
    <Greeting>Bem-vindo, {name}! 👋</Greeting>
    <Message>
      Comece completando seu check-in diário
    </Message>
    <Arrow pointing="down" />
  </WelcomeBanner>
  
  <MoodCheckIn highlighted />
  {/* resto do conteúdo */}
</Home>

{/* Contexto 2: Usuário regular, manhã */}
<Home variant="morning-regular">
  <Greeting>Bom dia, {name}! ☀️</Greeting>
  <QuickAction priority>
    <Title>Comece o dia com respiração</Title>
    <Button>Iniciar sessão matinal</Button>
  </QuickAction>
  {/* resto */}
</Home>

{/* Contexto 3: Usuário com jornada incompleta */}
<Home variant="has-progress">
  <ContinueSection priority="high">
    <Title>Continue de onde parou</Title>
    <JourneyCard
      progress={60}
      title="Jornada: Ansiedade"
      nextStep="Entender gatilhos"
    />
  </ContinueSection>
  {/* resto */}
</Home>
```

---

## 📄 Patterns de Conteúdo

### 1. **Content Hub (Discover)**

```tsx
<DiscoverHub layout="tabbed">
  <TabBar sticky>
    <Tab icon={Sparkle}>Para Você</Tab>
    <Tab icon={Path}>Jornadas</Tab>
    <Tab icon={Books}>Biblioteca</Tab>
  </TabBar>

  {/* Tab 1: Para Você (Personalizado) */}
  <TabPanel id="for-you">
    {/* Daily Reflection - Always First */}
    {!hasDoneReflectionToday && (
      <DailyReflectionCard priority="highest">
        <Badge>Reflexão do dia</Badge>
        <Question>{todayReflection.question}</Question>
        <TextArea
          placeholder="Escreva seus pensamentos..."
          rows={4}
        />
        <Button>Salvar reflexão</Button>
      </DailyReflectionCard>
    )}

    {/* Continue Learning */}
    {hasInProgressJourney && (
      <Section title="Continue aprendendo">
        <JourneyProgressCard />
      </Section>
    )}

    {/* Recommended Content */}
    <Section title="Recomendado para você">
      <ContentGrid>
        {recommendedContent.map(item => (
          <ContentCard
            key={item.id}
            type={item.type}
            {...item}
          />
        ))}
      </ContentGrid>
    </Section>

    {/* New Content Alert */}
    {hasNewContent && (
      <Section title="Novo conteúdo">
        <NewContentBanner>
          <Icon>✨</Icon>
          <Text>3 novos tópicos adicionados esta semana</Text>
          <Button variant="ghost">Ver tudo</Button>
        </NewContentBanner>
      </Section>
    )}
  </TabPanel>

  {/* Tab 2: Jornadas (Organized) */}
  <TabPanel id="journeys">
    <FilterBar>
      <FilterChip active={filter === 'all'}>
        Todas
      </FilterChip>
      <FilterChip active={filter === 'in-progress'}>
        Em progresso ({inProgressCount})
      </FilterChip>
      <FilterChip active={filter === 'completed'}>
        Completas ({completedCount})
      </FilterChip>
    </FilterBar>

    <JourneysList>
      {filteredJourneys.map(journey => (
        <JourneyCard
          key={journey.id}
          {...journey}
          showProgress
          showNextStep
        />
      ))}
    </JourneysList>
  </TabPanel>

  {/* Tab 3: Biblioteca (Exploração) */}
  <TabPanel id="library">
    <SearchBar
      placeholder="Buscar tópicos..."
      onSearch={handleSearch}
    />

    <CategoryFilter>
      <CategoryChip>Todos</CategoryChip>
      <CategoryChip>Ansiedade</CategoryChip>
      <CategoryChip>Sono</CategoryChip>
      <CategoryChip>Relacionamentos</CategoryChip>
      <CategoryChip>Autocuidado</CategoryChip>
    </CategoryFilter>

    <TopicGrid>
      {topics.map(topic => (
        <TopicCard
          key={topic.id}
          {...topic}
          showReadingTime
          showResonateCount
        />
      ))}
    </TopicGrid>
  </TabPanel>
</DiscoverHub>
```

**Características:**
- Tabs para organizar 3 tipos de conteúdo
- "Para Você" sempre prioriza personalização
- Filtros claros em "Jornadas"
- Busca e categorias em "Biblioteca"

---

### 2. **Session Flow (Breathing)**

```tsx
<SessionFlow
  type="breathing"
  pattern={selectedPattern}
  stages={['prep', 'active', 'complete']}
>
  {/* Stage 1: Preparação */}
  <PreparationStage>
    <Header>
      <BackButton />
      <Title>Preparação</Title>
    </Header>

    <Content>
      <PatternInfo>
        <Name>{pattern.name}</Name>
        <Description>{pattern.description}</Description>
        <MetaInfo>
          <Duration>5 minutos</Duration>
          <Difficulty>Fácil</Difficulty>
        </MetaInfo>
      </PatternInfo>

      <Instructions>
        <Heading>Prepare-se</Heading>
        <Checklist>
          <CheckItem>
            <Icon>✓</Icon>
            <Text>Encontre um lugar confortável</Text>
          </CheckItem>
          <CheckItem>
            <Icon>✓</Icon>
            <Text>Sente-se ou deite-se</Text>
          </CheckItem>
          <CheckItem>
            <Icon>✓</Icon>
            <Text>Deixe os ombros relaxados</Text>
          </CheckItem>
        </Checklist>
      </Instructions>

      <Preferences>
        <PreferenceGroup>
          <Label>Sons ambiente</Label>
          <SegmentedControl>
            <Option value="none">Silêncio</Option>
            <Option value="nature">Natureza</Option>
            <Option value="rain">Chuva</Option>
          </SegmentedControl>
        </PreferenceGroup>

        <PreferenceGroup>
          <Label>Número de ciclos</Label>
          <Stepper min={5} max={20} value={10} />
        </PreferenceGroup>
      </Preferences>
    </Content>

    <Footer>
      <Button size="lg" fullWidth>
        Estou pronto
      </Button>
    </Footer>
  </PreparationStage>

  {/* Stage 2: Sessão Ativa */}
  <ActiveStage fullscreen immersive>
    <MinimalHeader>
      <PauseButton />
      <CycleCounter>3/10</CycleCounter>
      <ExitButton />
    </MinimalHeader>

    <CenterContent>
      <BreathingCircle
        phase={currentPhase}
        duration={phaseDuration}
        animated
      >
        <PhaseLabel size="2xl">
          {phaseLabels[currentPhase]}
        </PhaseLabel>
        <Countdown size="xl">
          {countdown}s
        </Countdown>
      </BreathingCircle>

      <PhaseInstruction>
        {getInstructionForPhase(currentPhase)}
      </PhaseInstruction>
    </CenterContent>

    <BottomHints>
      <Hint>Dica: Mantenha um ritmo natural</Hint>
    </BottomHints>
  </ActiveStage>

  {/* Stage 3: Conclusão */}
  <CompletionStage>
    <Celebration>
      <AnimatedIcon>🎉</AnimatedIcon>
      <Confetti />
    </Celebration>

    <Heading>Muito bem!</Heading>
    <Message>
      Você completou {completedCycles} ciclos de {pattern.name}
    </Message>

    <StatsCard>
      <Stat label="Duração total" value="5min 30s" />
      <Stat label="Ciclos" value="10" />
      <Stat label="Frequência média" value="12/min" />
    </StatsCard>

    <MoodCheckAfter>
      <Label>Como você se sente agora?</Label>
      <MoodSelector
        compact
        onChange={handleMoodAfter}
      />
    </MoodCheckAfter>

    <Actions>
      <Button
        size="lg"
        fullWidth
        onClick={goToHome}
      >
        Voltar ao início
      </Button>
      <Button
        variant="ghost"
        fullWidth
        onClick={repeatSession}
      >
        Fazer novamente
      </Button>
    </Actions>

    <ShareSection>
      <Button
        variant="ghost"
        icon={Share}
        onClick={shareProgress}
      >
        Compartilhar conquista
      </Button>
    </ShareSection>
  </CompletionStage>
</SessionFlow>
```

**Fluxo:**
1. Prep → Explica + Configura
2. Active → Foco total (minimal UI)
3. Complete → Celebra + Captura feedback

---

## 💬 Patterns de Feedback

### 1. **Empty States**

```tsx
{/* Empty State - Sem vídeos favoritos */}
<EmptyState
  variant="friendly"
  illustration={<HeartIllustration />}
>
  <Icon size="xl">💙</Icon>
  <Heading>Nenhum favorito ainda</Heading>
  <Description>
    Favorite vídeos tocando no coração ❤️ 
    para encontrá-los facilmente aqui
  </Description>
  <Action>
    <Button onClick={() => router.push('/calm')}>
      Explorar vídeos
    </Button>
  </Action>
</EmptyState>

{/* Empty State - Primeira vez em Jornadas */}
<EmptyState
  variant="educational"
  illustration={<CompassIllustration />}
>
  <Heading>Comece sua primeira jornada</Heading>
  <Description>
    Jornadas são conteúdos estruturados que te guiam 
    passo a passo em temas importantes para sua saúde mental
  </Description>
  <Benefits>
    <Benefit icon={Check}>Aprenda no seu ritmo</Benefit>
    <Benefit icon={Check}>Acompanhe seu progresso</Benefit>
    <Benefit icon={Check}>Reflita sobre aprendizados</Benefit>
  </Benefits>
  <Button size="lg">Ver jornadas disponíveis</Button>
</EmptyState>

{/* Empty State - Erro/Sem conexão */}
<EmptyState
  variant="error"
  illustration={<CloudOffIllustration />}
>
  <Icon size="xl">📡</Icon>
  <Heading>Sem conexão</Heading>
  <Description>
    Verifique sua conexão com a internet e tente novamente
  </Description>
  <Actions>
    <Button onClick={retry}>Tentar novamente</Button>
    <Button variant="ghost" onClick={goBack}>
      Voltar
    </Button>
  </Actions>
</EmptyState>
```

**Características:**
- Sempre com ícone/ilustração
- Mensagem empática (não técnica)
- CTA claro quando aplicável
- Explica "o que é" em first-time experiences

---

### 2. **Success Celebrations**

```tsx
{/* Achievement Unlocked */}
<AchievementToast
  priority="high"
  duration={4000}
  sound="celebration"
  haptic="heavy"
>
  <Animation type="tada" />
  <Badge variant="gold">Nova conquista!</Badge>
  <Title>Sequência de 7 dias 🔥</Title>
  <Description>
    Você está no caminho certo! Continue assim.
  </Description>
  <XPGain>+50 XP</XPGain>
</AchievementToast>

{/* Milestone Reached */}
<MilestoneModal
  show={showMilestone}
  onClose={closeMilestone}
>
  <Confetti />
  <Trophy size="xl" animated />
  <Heading>100 minutos respirando!</Heading>
  <Message>
    Isso representa aproximadamente 750 respirações 
    conscientes. Incrível!
  </Message>
  <ShareButton>
    Compartilhar no Twitter
  </ShareButton>
  <ContinueButton>Continuar</ContinueButton>
</MilestoneModal>

{/* Session Complete */}
<CompletionBanner variant="subtle">
  <Icon>✓</Icon>
  <Message>Sessão concluída</Message>
  <Stat>+5 XP</Stat>
</CompletionBanner>
```

**Níveis de Celebration:**
- **Subtle:** Banner/toast pequeno (ações pequenas)
- **Medium:** Toast com animação (conquistas)
- **High:** Modal full-screen (milestones)

---

### 3. **Loading States**

```tsx
{/* Context-Aware Skeletons */}

{/* Loading - Video Grid */}
<VideoGridSkeleton>
  {Array(6).fill(0).map((_, i) => (
    <VideoCardSkeleton key={i}>
      <ThumbnailSkeleton aspectRatio="16/9" />
      <TitleSkeleton width="80%" />
      <MetaSkeleton width="40%" />
    </VideoCardSkeleton>
  ))}
</VideoGridSkeleton>

{/* Loading - Journey */}
<JourneyCardSkeleton>
  <IconSkeleton size="48px" />
  <TitleSkeleton width="60%" />
  <DescriptionSkeleton lines={2} />
  <ProgressBarSkeleton />
</JourneyCardSkeleton>

{/* Loading - Stats */}
<StatsLoader>
  <Shimmer direction="horizontal" />
  <PlaceholderText>
    Carregando seus dados...
  </PlaceholderText>
</StatsLoader>
```

**Princípio:** O skeleton deve parecer com o conteúdo real (match de estrutura)

---

## 🎯 Patterns de Personalização

### 1. **Recommendation Engine**

```tsx
<RecommendationSystem>
  {/* Baseado em objetivo inicial */}
  {user.goal === 'anxiety' && (
    <RecommendedSection>
      <Tag>Para você</Tag>
      <Title>Recomendado para ansiedade</Title>
      <ContentCards>
        <BreathingCard pattern="4-7-8" />
        <JourneyCard journey="anxiety-management" />
        <VideoCard category="calming-nature" />
      </ContentCards>
    </RecommendedSection>
  )}

  {/* Baseado em hora do dia */}
  {isEvening && (
    <RecommendedSection>
      <Tag>Noite</Tag>
      <Title>Prepare-se para dormir</Title>
      <SleepRoutine>
        <Step>Respiração para relaxar</Step>
        <Step>Vídeo de ondas do mar</Step>
        <Step>Reflexão sobre o dia</Step>
      </SleepRoutine>
    </RecommendedSection>
  )}

  {/* Baseado em histórico */}
  {hasWatchedNatureVideos && (
    <RecommendedSection>
      <Title>Mais vídeos de natureza</Title>
      <VideoCarousel category="nature" />
    </RecommendedSection>
  )}
</RecommendationSystem>
```

---

### 2. **Progressive Profiling**

```tsx
{/* Ao invés de coletar tudo no onboarding,
    perguntar gradualmente durante uso */}

{/* Após 3 sessões de respiração */}
<ProgressiveQuestion trigger="after-3-breathing-sessions">
  <Title>Como você prefere praticar?</Title>
  <Options>
    <Option>Com música relaxante</Option>
    <Option>Em silêncio total</Option>
    <Option>Com sons da natureza</Option>
  </Options>
  <SkipButton>Perguntar depois</SkipButton>
</ProgressiveQuestion>

{/* Após 1 semana de uso */}
<ProgressiveQuestion trigger="after-1-week">
  <Title>Quer definir um horário para lembretes?</Title>
  <Description>
    Usuários que praticam no mesmo horário têm 
    3x mais chances de manter o hábito
  </Description>
  <TimePicker />
  <DismissButton>Não, obrigado</DismissButton>
</ProgressiveQuestion>
```

---

## 🎮 Patterns de Gamificação

### 1. **Progression System**

```tsx
<ProgressionSystem>
  {/* XP e Níveis */}
  <LevelSystem>
    <CurrentLevel>
      <Number>5</Number>
      <Label>Explorador</Label>
    </CurrentLevel>

    <XPProgress>
      <Bar value={350} max={500} />
      <Label>350/500 XP</Label>
      <UntilNext>150 XP para nível 6</UntilNext>
    </XPProgress>

    <RecentXPGains>
      <XPGain>+10 XP - Sessão de respiração</XPGain>
      <XPGain>+25 XP - Jornada completa</XPGain>
      <XPGain>+5 XP - Check-in diário</XPGain>
    </RecentXPGains>
  </LevelSystem>

  {/* Achievements */}
  <AchievementShowcase>
    <RecentUnlocks>
      <Achievement
        icon="🔥"
        title="Sequência de 7 dias"
        rarity="rare"
        unlockedAt="2 dias atrás"
      />
    </RecentUnlocks>

    <Progress>
      <Unlocked>{unlockedCount}</Unlocked>
      <Total>/{totalAchievements}</Total>
    </Progress>

    <NextAchievement>
      <Label>Próxima conquista</Label>
      <Name>Mestre da respiração</Name>
      <Requirement>
        Complete 50 sessões de respiração (35/50)
      </Requirement>
      <ProgressBar value={70} />
    </NextAchievement>
  </AchievementShowcase>

  {/* Streaks */}
  <StreakTracker>
    <CurrentStreak>
      <Icon>🔥</Icon>
      <Number>{streakDays}</Number>
      <Label>dias seguidos</Label>
    </CurrentStreak>

    <Calendar>
      {last7Days.map(day => (
        <DayDot
          key={day}
          active={hasActivityOnDay(day)}
          isToday={isToday(day)}
        />
      ))}
    </Calendar>

    <Motivation>
      {streakDays >= 7 
        ? "Você está incrível! Continue assim 💪"
        : "Pratique hoje para manter sua sequência"
      }
    </Motivation>
  </StreakTracker>
</ProgressionSystem>
```

**Táticas:**
- XP por ações (criar senso de progresso)
- Achievements por milestones
- Streaks para criar hábito
- Próximo objetivo sempre visível

---

## 📊 Hierarquia de Informação

### Prioridade de Elementos na Home

```
1. Greeting personalizado
2. Streak indicator (se ativo)
3. Daily check-in (se não feito)
4. Continue where you left off (se aplicável)
5. Recommended for you
6. Quick actions
7. Daily reflection (se disponível)
8. Progress stats
9. Explore sections
```

### Prioridade em Perfil

```
1. Avatar + Nome + Current level
2. Weekly summary (engajamento)
3. Recent achievements
4. Activity chart
5. Manage menu
6. Danger zone (sempre no final)
```

---

## 🎯 Checklist de Qualidade Estrutural

Ao criar/refatorar uma página, verificar:

- [ ] Progressive disclosure (não mostrar tudo de uma vez)
- [ ] Context-aware (adapta ao usuário)
- [ ] Clear hierarchy (título > seção > item)
- [ ] Empty states definidos
- [ ] Loading states específicos
- [ ] Success celebrations planejadas
- [ ] Personalization hooks (onde aplicável)
- [ ] Mobile-first (funciona em 320px)
- [ ] Accessible (keyboard nav, screen readers)
- [ ] Semantic HTML (header, main, section, article)

---

## 📚 Referências de Patterns

### Apps Benchmarks
- **Calm:** Onboarding, sessões, curadoria
- **Headspace:** Content organization, progress
- **Duolingo:** Gamification, streaks, celebrations
- **Notion:** Content hierarchy, navigation
- **Linear:** Empty states, loading states
- **Apple Health:** Data viz, insights
- **Strava:** Achievements, social proof

### Pattern Libraries
- [Material Design 3 Patterns](https://m3.material.io/patterns)
- [iOS HIG Patterns](https://developer.apple.com/design/human-interface-guidelines/patterns)
- [Refactoring UI](https://www.refactoringui.com/)

---

**Este documento deve ser usado como referência para decisões estruturais em toda implementação.**

