flowchart TD
    Start([Usuário Acessa App]) --> CheckAuth{Está Autenticado?}
    
    %% Fluxo de Autenticação
    CheckAuth -->|Não| Welcome[Tela Bem-Vindo<br/>Logo + Texto Acolhedor]
    Welcome --> AuthChoice[Escolher Método Auth<br/>• Google<br/>• Email/Senha<br/>• Criar Conta]
    AuthChoice --> ClerkAuth[Clerk Authentication]
    ClerkAuth -->|Sucesso| CheckProfile{Perfil Completo?}
    ClerkAuth -->|Erro| AuthError[Mensagem Erro<br/>Tentar Novamente]
    AuthError --> AuthChoice
    
    %% Onboarding
    CheckProfile -->|Não| OnboardingName[Tela: Informações Básicas<br/>• Nome<br/>• Sobrenome<br/>• Idade<br/>• Foto opcional]
    OnboardingName --> OnboardingDiagnosis[Tela: Como se Identifica?<br/>• TEA<br/>• TDAH<br/>• Ambos<br/>• Explorando<br/>• Pular]
    OnboardingDiagnosis --> SaveProfile[Salvar no Supabase]
    SaveProfile --> Home
    
    %% Fluxo Principal
    CheckAuth -->|Sim| CheckProfile
    CheckProfile -->|Sim| Home[Tela Inicial<br/>4 Cards Principais]
    
    %% Widget Mood Check-in
    Home --> MoodWidget{Widget: Como está?<br/>😌 😐 😰 😔 😤}
    MoodWidget -->|Seleciona| SaveMood[Salva Humor<br/>Supabase]
    MoodWidget -->|Pula| Home
    SaveMood --> Home
    
    %% Navegação Principal
    Home --> Breathe[Card: Respirar 🫁]
    Home --> Calm[Card: Acalmar 🎵]
    Home --> Discover[Card: Conhecer 💭]
    Home --> Profile[Card: Perfil 👤]
    
    %% Módulo Respiração
    Breathe --> BreatheSelect[Selecionar Padrão<br/>• 4-7-8 Ansiedade<br/>• 4-4-4-4 Equilíbrio<br/>• 4-6-6 Dormir<br/>• Personalizada]
    BreatheSelect --> BreatheCustom{É Personalizada?}
    BreatheCustom -->|Sim| CustomSettings[Configurar Tempos<br/>Sliders 1-10s]
    CustomSettings --> BreatheConfig
    BreatheCustom -->|Não| BreatheConfig[Definir Ciclos<br/>Vibração On/Off]
    BreatheConfig --> BreatheSession[Sessão Ativa<br/>• Círculo Animado<br/>• Countdown<br/>• Fase Atual<br/>• Vibração]
    BreatheSession --> BreatheControl{Ação Usuário}
    BreatheControl -->|Pausar| BreathePaused[Estado Pausado]
    BreathePaused -->|Continuar| BreatheSession
    BreatheControl -->|Sair| BreatheConfirm{Confirmar Saída?}
    BreatheConfirm -->|Sim| Home
    BreatheConfirm -->|Não| BreatheSession
    BreatheControl -->|Completar| BreatheEnd[Tela Conclusão<br/>✨ Parabéns!<br/>Ciclos: X<br/>Tempo: Y]
    BreatheEnd --> SaveBreathe[Salvar Sessão<br/>Supabase]
    SaveBreathe --> Home
    
    %% Módulo Acalmar
    Calm --> VideoList[Lista Vídeos<br/>• Favoritos ⭐<br/>• Visuais<br/>• Natureza<br/>• Ruído Branco<br/>• ASMR<br/>• Recentes]
    VideoList --> VideoSelect[Selecionar Vídeo]
    VideoSelect --> VideoPlayer[Player YouTube<br/>• Favoritar<br/>• Loop<br/>• Volume<br/>• Fullscreen]
    VideoPlayer --> VideoAction{Ação}
    VideoAction -->|Favoritar| SaveFavorite[Salvar Favorito<br/>Supabase]
    VideoAction -->|Assistir| SaveHistory[Salvar Histórico<br/>Supabase]
    VideoAction -->|Voltar| VideoList
    SaveFavorite --> VideoPlayer
    SaveHistory --> VideoPlayer
    
    %% Módulo Conhecer-se
    Discover --> DiscoverMenu[Menu Conhecer-se<br/>• Card Diário<br/>• Jornadas<br/>• Tópicos]
    
    %% Card Diário
    DiscoverMenu --> DailyCard[Card Reflexão<br/>Pergunta do Dia]
    DailyCard --> DailyAction{Responder?}
    DailyAction -->|Sim| DailyAnswer[Campo Texto<br/>Resposta]
    DailyAnswer --> SaveReflection[Salvar Reflexão<br/>Supabase]
    DailyAction -->|Pular| DiscoverMenu
    SaveReflection --> DiscoverMenu
    
    %% Jornadas
    DiscoverMenu --> Journeys[Escolher Jornada<br/>• Será que sou autista?<br/>• Entendendo TDAH<br/>• Processamento Sensorial]
    Journeys --> JourneyStep[Etapa X de Y<br/>• Conteúdo<br/>• Reflexão<br/>• Anotações]
    JourneyStep --> JourneyAction{Ação}
    JourneyAction -->|Próxima| SaveProgress[Salvar Progresso]
    SaveProgress --> JourneyStep
    JourneyAction -->|Sair| Journeys
    JourneyAction -->|Concluir| JourneyComplete[🎉 Jornada Completa!<br/>Conquista Desbloqueada]
    JourneyComplete --> SaveAchievement[Salvar Conquista<br/>Supabase]
    SaveAchievement --> Journeys
    
    %% Tópicos
    DiscoverMenu --> Topics[Grid de Tópicos<br/>• Sensibilidade<br/>• Comunicação<br/>• Rotinas<br/>• Hiperfoco<br/>• Stimming<br/>• Masking<br/>• Sobrecarga<br/>• Função Executiva]
    Topics --> TopicView[Visualizar Tópico<br/>• Descrição<br/>• Exemplos<br/>• Ressoa? S/N/Talvez<br/>• Anotações]
    TopicView --> TopicSave[Salvar Exploração<br/>Supabase]
    TopicSave --> Topics
    
    %% Módulo Perfil
    Profile --> ProfileView[Visualizar Perfil<br/>• Foto/Avatar<br/>• Nome/Idade<br/>• Diagnóstico<br/>• Estatísticas]
    ProfileView --> ProfileOptions{Opções}
    
    %% Editar Perfil
    ProfileOptions -->|Editar| EditProfile[Editar Dados<br/>• Foto<br/>• Nome<br/>• Idade<br/>• Diagnóstico]
    EditProfile --> SaveProfileEdit[Atualizar Supabase]
    SaveProfileEdit --> ProfileView
    
    %% Tracking Crise
    ProfileOptions -->|Registrar Crise| CrisisForm[Formulário Crise<br/>• Intensidade 1-5<br/>• Tipo<br/>• Duração<br/>• O que ajudou<br/>• Notas]
    CrisisForm --> SaveCrisis[Salvar Log<br/>Supabase]
    SaveCrisis --> CrisisConfirm[✓ Registrado<br/>Você está bem agora?]
    CrisisConfirm --> ProfileView
    
    %% Histórico
    ProfileOptions -->|Ver Histórico| History[Histórico<br/>• Lista Cronológica<br/>• Filtros<br/>• Estatísticas]
    History --> HistoryDetail[Detalhes Registro]
    HistoryDetail --> History
    
    %% Conquistas
    ProfileOptions -->|Conquistas| Achievements[Lista Conquistas<br/>✓ Desbloqueadas<br/>🔒 Bloqueadas<br/>Progresso]
    Achievements --> ProfileView
    
    %% Configurações
    ProfileOptions -->|Configurações| Settings[Configurações<br/>• Vibração<br/>• Sons<br/>• Exportar Dados<br/>• Limpar Histórico<br/>• Excluir Conta]
    Settings --> SettingsAction{Ação}
    SettingsAction -->|Salvar| SaveSettings[Atualizar Preferências<br/>Supabase]
    SaveSettings --> Settings
    SettingsAction -->|Excluir Conta| DeleteConfirm{Confirmar Exclusão?<br/>Ação Irreversível}
    DeleteConfirm -->|Sim| DeleteAccount[Remover Dados<br/>Logout]
    DeleteConfirm -->|Não| Settings
    DeleteAccount --> Start
    
    %% Logout
    ProfileOptions -->|Sair| LogoutConfirm{Confirmar Saída?}
    LogoutConfirm -->|Sim| Logout[Fazer Logout<br/>Clerk]
    LogoutConfirm -->|Não| ProfileView
    Logout --> Start
    
    %% Estilos
    classDef primary fill:#84C2BE,stroke:#333,stroke-width:2px,color:#fff
    classDef secondary fill:#ACFFF9,stroke:#333,stroke-width:2px,color:#333
    classDef surface fill:#EFFFEA,stroke:#333,stroke-width:2px,color:#333
    classDef background fill:#FFFFF9,stroke:#333,stroke-width:2px,color:#333
    classDef action fill:#84C2BE,stroke:#333,stroke-width:3px,color:#fff
    classDef success fill:#90EE90,stroke:#333,stroke-width:2px,color:#333
    
    class Start,CheckAuth,BreatheControl,VideoAction,DailyAction,JourneyAction,ProfileOptions,SettingsAction primary
    class Home,Breathe,Calm,Discover,Profile action
    class SaveMood,SaveBreathe,SaveFavorite,SaveHistory,SaveReflection,SaveProgress,SaveAchievement,SaveCrisis,SaveSettings success
    class Welcome,AuthChoice,OnboardingName,OnboardingDiagnosis secondary
    class BreatheSession,VideoPlayer,DailyCard,JourneyStep,TopicView surface