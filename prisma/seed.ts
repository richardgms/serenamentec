import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Seed Videos
  console.log('📹 Seeding videos...');

  const videos = [
    // VISUAL_CALMING
    {
      title: 'Aquário Relaxante - Peixes Tropicais em 4K',
      url: 'https://www.youtube.com/watch?v=oy8K8I8cXK8',
      videoId: 'oy8K8I8cXK8',
      category: 'VISUAL_CALMING' as const,
      description: 'Aquário colorido com peixes tropicais nadando calmamente. Perfeito para relaxar e aliviar o estresse.',
      duration: 3600,
      order: 1,
    },
    {
      title: 'Aurora Boreal em Tempo Real',
      url: 'https://www.youtube.com/watch?v=nfeFFfJWPbw',
      videoId: 'nfeFFfJWPbw',
      category: 'VISUAL_CALMING' as const,
      description: 'Lindas luzes da aurora boreal dançando no céu noturno. Visão hipnotizante e calmante.',
      duration: 1800,
      order: 2,
    },
    {
      title: 'Lareira Aconchegante em 4K',
      url: 'https://www.youtube.com/watch?v=L_LUpnjgPso',
      videoId: 'L_LUpnjgPso',
      category: 'VISUAL_CALMING' as const,
      description: 'Fogo crepitante de uma lareira aconchegante. Relaxe com o som e visão do fogo queimando.',
      duration: 3600,
      order: 3,
    },

    // NATURE_SOUNDS
    {
      title: 'Som de Chuva e Trovoadas para Dormir',
      url: 'https://www.youtube.com/watch?v=nDq6TstdEi8',
      videoId: 'nDq6TstdEi8',
      category: 'NATURE_SOUNDS' as const,
      description: 'Chuva suave com trovoadas distantes. Ideal para relaxar, meditar ou dormir profundamente.',
      duration: 3600,
      order: 1,
    },
    {
      title: 'Ondas do Mar e Gaivotas - Praia Serena',
      url: 'https://www.youtube.com/watch?v=bn9F19Hi1Lk',
      videoId: 'bn9F19Hi1Lk',
      category: 'NATURE_SOUNDS' as const,
      description: 'Sons relaxantes de ondas do mar quebrando na praia com gaivotas ao fundo.',
      duration: 3600,
      order: 2,
    },
    {
      title: 'Floresta com Pássaros Cantando',
      url: 'https://www.youtube.com/watch?v=xNN7iTA57jM',
      videoId: 'xNN7iTA57jM',
      category: 'NATURE_SOUNDS' as const,
      description: 'Sons da natureza em uma floresta tranquila com diversos pássaros cantando.',
      duration: 3600,
      order: 3,
    },

    // WHITE_NOISE
    {
      title: 'Brown Noise 10 Horas para Foco',
      url: 'https://www.youtube.com/watch?v=RqzGzwTY-6w',
      videoId: 'RqzGzwTY-6w',
      category: 'WHITE_NOISE' as const,
      description: 'Ruído marrom contínuo ideal para concentração, estudo e bloqueio de sons externos.',
      duration: 36000,
      order: 1,
    },
    {
      title: 'White Noise Puro - Som de Ventilador',
      url: 'https://www.youtube.com/watch?v=1KaOrSuWZeM',
      videoId: '1KaOrSuWZeM',
      category: 'WHITE_NOISE' as const,
      description: 'Ruído branco suave similar a um ventilador. Excelente para bebês e adultos dormirem.',
      duration: 36000,
      order: 2,
    },

    // ASMR
    {
      title: 'ASMR Chuva no Telhado e Lareira',
      url: 'https://www.youtube.com/watch?v=jX6kn9_U8qk',
      videoId: 'jX6kn9_U8qk',
      category: 'ASMR' as const,
      description: 'Combinação relaxante de chuva caindo no telhado com som de lareira ao fundo.',
      duration: 3600,
      order: 1,
    },
    {
      title: 'ASMR Sussurros e Sons Suaves',
      url: 'https://www.youtube.com/watch?v=8IvJzjz0nJI',
      videoId: '8IvJzjz0nJI',
      category: 'ASMR' as const,
      description: 'Sussurros suaves e sons delicados para relaxamento profundo e alívio de ansiedade.',
      duration: 1800,
      order: 2,
    },
  ];

  for (const video of videos) {
    await prisma.video.upsert({
      where: { videoId: video.videoId },
      update: video,
      create: video,
    });
  }

  console.log(`✅ Created/updated ${videos.length} videos`);

  // Seed Daily Questions
  console.log('📝 Seeding daily questions...');

  const dailyQuestions = [
    {
      question: 'Que texturas te incomodam? Por quê?',
      category: 'sensory',
    },
    {
      question: 'Em que momentos você se sente mais confortável socialmente?',
      category: 'social',
    },
    {
      question: 'O que te ajuda quando há muito barulho ao redor?',
      category: 'sensory',
    },
    {
      question: 'Como você lida com mudanças inesperadas na sua rotina?',
      category: 'executive',
    },
    {
      question: 'Quais são seus interesses especiais ou hobbies favoritos?',
      category: 'social',
    },
    {
      question: 'Você tem algum movimento ou gesto que te acalma?',
      category: 'sensory',
    },
    {
      question: 'Como você percebe que está sobrecarregado sensorialmente?',
      category: 'sensory',
    },
    {
      question: 'Quando você se sente mais produtivo durante o dia?',
      category: 'executive',
    },
    {
      question: 'O que as pessoas não entendem sobre como você processa informações?',
      category: 'social',
    },
    {
      question: 'Quais sons você acha reconfortantes?',
      category: 'sensory',
    },
    {
      question: 'Como você prefere se comunicar em momentos difíceis?',
      category: 'social',
    },
    {
      question: 'Que tipos de luz te incomodam?',
      category: 'sensory',
    },
    {
      question: 'O que te ajuda a manter o foco em uma tarefa?',
      category: 'executive',
    },
    {
      question: 'Como você recarrega suas energias após interações sociais?',
      category: 'social',
    },
    {
      question: 'Quais cheiros te trazem bem-estar?',
      category: 'sensory',
    },
    {
      question: 'O que você faz quando se sente ansioso ou estressado?',
      category: 'emotional',
    },
    {
      question: 'Como você percebe que precisa de um tempo sozinho?',
      category: 'emotional',
    },
    {
      question: 'Quais roupas ou tecidos você prefere usar?',
      category: 'sensory',
    },
    {
      question: 'O que te motiva a começar uma nova tarefa?',
      category: 'executive',
    },
    {
      question: 'Como você percebe as emoções das outras pessoas?',
      category: 'social',
    },
    {
      question: 'Quais ambientes você considera mais acolhedores?',
      category: 'sensory',
    },
    {
      question: 'O que você gostaria que as pessoas soubessem sobre você?',
      category: 'social',
    },
    {
      question: 'Como você organiza suas tarefas diárias?',
      category: 'executive',
    },
    {
      question: 'Quais são seus sinais de que está em sobrecarga?',
      category: 'emotional',
    },
    {
      question: 'O que te faz perder a noção do tempo de forma positiva?',
      category: 'executive',
    },
  ];

  for (let i = 0; i < dailyQuestions.length; i++) {
    await prisma.dailyQuestion.upsert({
      where: { dayOfYear: i + 1 },
      update: dailyQuestions[i],
      create: {
        ...dailyQuestions[i],
        dayOfYear: i + 1,
      },
    });
  }

  console.log(`✅ Created/updated ${dailyQuestions.length} daily questions`);

  // Seed Journey Content - Será que sou autista?
  console.log('🗺️ Seeding journey content...');

  const amIAutisticJourney = [
    {
      journeyType: 'AM_I_AUTISTIC',
      step: 1,
      title: 'Bem-vindo à jornada de autoconhecimento',
      content: 'Esta jornada foi criada para ajudar você a explorar características do autismo de forma acolhedora e sem julgamentos. Lembre-se: apenas profissionais podem diagnosticar, mas conhecer a si mesmo é sempre valioso.\n\nVocê não precisa responder tudo de uma vez. Vá no seu ritmo, faça pausas quando necessário, e saiba que não existem respostas certas ou erradas.',
      reflection: 'O que te motivou a iniciar esta jornada?',
    },
    {
      journeyType: 'AM_I_AUTISTIC',
      step: 2,
      title: 'Comunicação Social',
      content: 'Pessoas autistas frequentemente têm um estilo de comunicação diferente. Isso pode incluir:\n\n• Preferência por conversas sobre tópicos específicos\n• Dificuldade em entender "entrelinhas" ou sarcasmo\n• Interpretação literal da linguagem\n• Desconforto com contato visual prolongado\n\nNenhuma dessas características faz de alguém "melhor" ou "pior" - são apenas diferenças na forma de se comunicar.',
      reflection: 'Como você se sente em conversas sociais? Existem situações que parecem mais desafiadoras?',
    },
    {
      journeyType: 'AM_I_AUTISTIC',
      step: 3,
      title: 'Sensibilidade Sensorial',
      content: 'Muitas pessoas autistas experimentam o mundo de forma mais intensa através dos sentidos:\n\n• Sons que parecem muito altos ou irritantes\n• Sensibilidade a luzes brilhantes\n• Texturas de roupas ou alimentos desconfortáveis\n• Sensibilidade a cheiros\n• Desconforto com toques inesperados\n\nEssa sensibilidade sensorial é real e válida.',
      reflection: 'Você percebe sensibilidades especiais a sons, luzes, texturas, cheiros ou toques?',
    },
    {
      journeyType: 'AM_I_AUTISTIC',
      step: 4,
      title: 'Interesses Intensos',
      content: 'Interesses especiais ou intensos são uma característica marcante do autismo:\n\n• Foco profundo em tópicos específicos\n• Prazer em aprender detalhes sobre o assunto\n• Possibilidade de falar longamente sobre o interesse\n• Esses interesses trazem alegria e conforto\n\nSeus interesses são valiosos e fazem parte de quem você é.',
      reflection: 'Você tem tópicos ou atividades que te fascinam profundamente? Como eles te fazem sentir?',
    },
    {
      journeyType: 'AM_I_AUTISTIC',
      step: 5,
      title: 'Rotinas e Previsibilidade',
      content: 'Muitas pessoas autistas se beneficiam de rotinas e previsibilidade:\n\n• Conforto em seguir a mesma sequência de atividades\n• Ansiedade com mudanças inesperadas\n• Necessidade de saber o que esperar\n• Preferência por planejar com antecedência\n\nRotinas não são "prisões" - são ferramentas que trazem segurança.',
      reflection: 'Como você se sente em relação a rotinas? O que acontece quando há mudanças inesperadas?',
    },
    {
      journeyType: 'AM_I_AUTISTIC',
      step: 6,
      title: 'Stimming e Autorregulação',
      content: 'Stimming são movimentos repetitivos que ajudam na autorregulação:\n\n• Balançar o corpo ou as mãos\n• Estalar os dedos\n• Andar de um lado para outro\n• Repetir sons ou palavras\n• Tocar texturas específicas\n\nStimming é uma forma saudável e natural de lidar com emoções e sensações.',
      reflection: 'Você tem movimentos ou comportamentos que te ajudam a se sentir calmo ou focado?',
    },
    {
      journeyType: 'AM_I_AUTISTIC',
      step: 7,
      title: 'Masking (Camuflagem)',
      content: 'Masking é quando escondemos características autistas para "se encaixar":\n\n• Forçar contato visual mesmo sendo desconfortável\n• Reprimir stimming em público\n• Copiar comportamentos de outras pessoas\n• Esconder interesses especiais\n\nMasking é exaustivo e não deveria ser necessário. Você merece ser aceito como é.',
      reflection: 'Você sente que precisa "atuar" ou esconder partes de si em situações sociais?',
    },
    {
      journeyType: 'AM_I_AUTISTIC',
      step: 8,
      title: 'Processamento de Informações',
      content: 'O cérebro autista frequentemente processa informações de forma diferente:\n\n• Necessidade de mais tempo para processar perguntas\n• Pensamento muito visual ou muito verbal\n• Dificuldade com multitarefas\n• Atenção aos detalhes que outros não notam\n\nEssa forma de processar tem forças únicas.',
      reflection: 'Como você processa informações? Você precisa de mais tempo para pensar em respostas?',
    },
    {
      journeyType: 'AM_I_AUTISTIC',
      step: 9,
      title: 'Desafios do Dia a Dia',
      content: 'Viver em um mundo não projetado para autistas pode trazer desafios:\n\n• Exaustão após interações sociais\n• Dificuldade em ambientes barulhentos\n• Mal-entendidos na comunicação\n• Necessidade de tempo sozinho para recuperar energia\n\nEsses desafios não são falhas suas - o ambiente é que precisa ser mais inclusivo.',
      reflection: 'Quais aspectos do dia a dia você considera mais desafiadores?',
    },
    {
      journeyType: 'AM_I_AUTISTIC',
      step: 10,
      title: 'Próximos Passos',
      content: 'Você completou esta jornada de autoconhecimento! Independente das suas conclusões:\n\n• Seu autoconhecimento é válido e importante\n• Se você se identificou com muitas características, considere buscar avaliação profissional\n• Conecte-se com comunidades autistas se sentir confortável\n• Continue sendo você mesmo\n\nVocê é valioso exatamente como é. 💚',
      reflection: 'O que você aprendeu sobre si mesmo nesta jornada? Como você se sente agora?',
    },
  ];

  for (const content of amIAutisticJourney) {
    await prisma.journeyContent.upsert({
      where: {
        journeyType_step: {
          journeyType: content.journeyType as any,
          step: content.step,
        },
      },
      update: content,
      create: content,
    });
  }

  console.log(`✅ Created/updated ${amIAutisticJourney.length} steps for "Am I Autistic?" journey`);

  // Seed Journey Content - Entendendo TDAH (8 steps)
  const understandingADHDJourney = [
    {
      journeyType: 'UNDERSTANDING_ADHD',
      step: 1,
      title: 'Bem-vindo à jornada sobre TDAH',
      content: 'O TDAH (Transtorno de Déficit de Atenção e Hiperatividade) é uma condição neuro desenvolvente que afeta a forma como processamos informações e regulamos nossa atenção.\n\nEsta jornada vai te ajudar a entender melhor o TDAH e como ele pode se manifestar no seu dia a dia.',
      reflection: 'O que você já sabe sobre TDAH? O que te trouxe até aqui?',
    },
    {
      journeyType: 'UNDERSTANDING_ADHD',
      step: 2,
      title: 'Atenção e Foco',
      content: 'O TDAH afeta a capacidade de direcionar e manter a atenção:\n\n• Dificuldade em manter foco em tarefas longas\n• Distração fácil por estímulos externos\n• Hiperfoco em atividades de interesse\n• Dificuldade em decidir onde focar a atenção\n\nNão é falta de vontade - é uma diferença neurológica real.',
      reflection: 'Como você descreveria sua relação com foco e atenção no dia a dia?',
    },
    {
      journeyType: 'UNDERSTANDING_ADHD',
      step: 3,
      title: 'Hiperatividade',
      content: 'A hiperatividade pode se manifestar de várias formas:\n\n• Necessidade de movimento constante\n• Dificuldade em ficar sentado por períodos longos\n• Falar muito ou interromper conversas\n• Sensação de inquietação interna\n\nEm adultos, pode ser mais uma inquietação mental do que física.',
      reflection: 'Você se identifica com alguma forma de hiperatividade? Como ela se manifesta para você?',
    },
    {
      journeyType: 'UNDERSTANDING_ADHD',
      step: 4,
      title: 'Impulsividade',
      content: 'A impulsividade no TDAH pode incluir:\n\n• Dificuldade em esperar sua vez\n• Tomar decisões rápidas sem pensar nas consequências\n• Interromper outras pessoas\n• Compras ou gastos impulsivos\n\nNão é falta de educação - é uma dificuldade real em regular impulsos.',
      reflection: 'Você nota momentos de impulsividade na sua vida? Como isso te afeta?',
    },
    {
      journeyType: 'UNDERSTANDING_ADHD',
      step: 5,
      title: 'Função Executiva',
      content: 'Função executiva são habilidades do cérebro para organizar e planejar. No TDAH, pode haver dificuldades em:\n\n• Iniciar tarefas\n• Organizar e priorizar\n• Gerenciar o tempo\n• Completar projetos\n• Lembrar de compromissos\n\nEssas dificuldades são parte da condição, não preguiça.',
      reflection: 'Quais aspectos de planejamento e organização são mais desafiadores para você?',
    },
    {
      journeyType: 'UNDERSTANDING_ADHD',
      step: 6,
      title: 'Regulação Emocional',
      content: 'Pessoas com TDAH frequentemente têm desafios com regulação emocional:\n\n• Emoções intensas que vêm rapidamente\n• Dificuldade em "desacelerar" quando chateado\n• Sensibilidade à rejeição\n• Mudanças rápidas de humor\n\nSuas emoções são válidas, mesmo que intensas.',
      reflection: 'Como você vivencia e lida com suas emoções?',
    },
    {
      journeyType: 'UNDERSTANDING_ADHD',
      step: 7,
      title: 'Hiperfoco',
      content: 'O hiperfoco é quando ficamos completamente absorvidos em uma atividade:\n\n• Perder a noção do tempo\n• Esquecer de comer ou beber\n• Dificuldade em parar mesmo quando necessário\n• Geralmente acontece com atividades de interesse\n\nO hiperfoco pode ser tanto uma força quanto um desafio.',
      reflection: 'Você experimenta momentos de hiperfoco? Em quais atividades?',
    },
    {
      journeyType: 'UNDERSTANDING_ADHD',
      step: 8,
      title: 'Vivendo com TDAH',
      content: 'Viver com TDAH em um mundo não adaptado pode ser desafiador, mas:\n\n• Existem estratégias que podem ajudar\n• Sua criatividade e energia são valiosas\n• Tratamento e suporte fazem diferença\n• Você não está sozinho\n\nSe você se identificou com essas características, considere buscar avaliação profissional. O TDAH é tratável e você merece suporte! 💚',
      reflection: 'O que você aprendeu sobre TDAH nesta jornada? Como você se sente agora?',
    },
  ];

  for (const content of understandingADHDJourney) {
    await prisma.journeyContent.upsert({
      where: {
        journeyType_step: {
          journeyType: content.journeyType as any,
          step: content.step,
        },
      },
      update: content,
      create: content,
    });
  }

  console.log(`✅ Created/updated ${understandingADHDJourney.length} steps for "Understanding ADHD" journey`);

  // Seed Journey Content - Processamento Sensorial (12 steps)
  const sensoryProcessingJourney = [
    {
      journeyType: 'SENSORY_PROCESSING',
      step: 1,
      title: 'Bem-vindo ao mundo sensorial',
      content: 'Todos nós processamos informações sensoriais de formas únicas. Para pessoas neurodivergentes, essas diferenças podem ser mais acentuadas.\n\nNesta jornada, vamos explorar os diferentes sentidos e como você os experiencia. Não existem respostas certas - apenas o seu autoconhecimento.',
      reflection: 'O que te motivou a explorar o processamento sensorial?',
    },
    {
      journeyType: 'SENSORY_PROCESSING',
      step: 2,
      title: 'Visão - O sentido da luz',
      content: 'A visão processa luz, cores, movimentos e padrões:\n\n**Hipersensibilidade:**\n• Desconforto com luzes brilhantes\n• Dificuldade em ambientes com muitos estímulos visuais\n• Preferência por ambientes com pouca iluminação\n\n**Hipossensibilidade:**\n• Atração por luzes brilhantes ou piscantes\n• Necessidade de ambientes bem iluminados\n• Interesse intenso por movimentos e padrões',
      reflection: 'Como você se relaciona com luzes e estímulos visuais? O que te conforta ou incomoda?',
    },
    {
      journeyType: 'SENSORY_PROCESSING',
      step: 3,
      title: 'Audição - O sentido dos sons',
      content: 'A audição processa sons, volumes e padrões auditivos:\n\n**Hipersensibilidade:**\n• Sons que parecem muito altos\n• Dificuldade em filtrar ruídos de fundo\n• Sobrecarga em ambientes barulhentos\n• Desconforto com sons específicos (mastigação, respiração, etc.)\n\n**Hipossensibilidade:**\n• Necessidade de volumes mais altos\n• Não perceber sons que outros notam\n• Gostar de ambientes com ruído constante',
      reflection: 'Quais sons te incomodam? Existem sons que te acalmam?',
    },
    {
      journeyType: 'SENSORY_PROCESSING',
      step: 4,
      title: 'Tato - O sentido do toque',
      content: 'O tato processa texturas, temperatura e pressão:\n\n**Hipersensibilidade:**\n• Desconforto com certas texturas de roupas\n• Dificuldade com etiquetas ou costuras\n• Toques leves podem ser irritantes\n• Preferência por roupas específicas\n\n**Hipossensibilidade:**\n• Necessidade de texturas intensas\n• Busca por pressão profunda (abraços apertados)\n• Não perceber temperatura extrema',
      reflection: 'Quais texturas você evita ou busca? Como você se sente com toques?',
    },
    {
      journeyType: 'SENSORY_PROCESSING',
      step: 5,
      title: 'Olfato - O sentido dos cheiros',
      content: 'O olfato processa odores e aromas:\n\n**Hipersensibilidade:**\n• Cheiros fortes são insuportáveis\n• Perceber odores que outros não notam\n• Náusea com certos perfumes ou alimentos\n• Dificuldade em locais com muitos cheiros\n\n**Hipossensibilidade:**\n• Busca por cheiros fortes\n• Não perceber odores desagradáveis\n• Necessidade de cheiros intensos para notar',
      reflection: 'Existem cheiros que te incomodam profundamente? Algum cheiro te traz conforto?',
    },
    {
      journeyType: 'SENSORY_PROCESSING',
      step: 6,
      title: 'Paladar - O sentido do sabor',
      content: 'O paladar processa sabores, temperaturas e texturas dos alimentos:\n\n**Hipersensibilidade:**\n• Seletividade alimentar intensa\n• Texturas de alimentos causam desconforto\n• Sabores misturados são difíceis\n• Preferência por alimentos "seguros"\n\n**Hipossensibilidade:**\n• Busca por sabores muito intensos\n• Preferência por comidas apimentadas\n• Não perceber sabores sutis',
      reflection: 'Como é sua relação com alimentos? Existem texturas ou sabores que você evita?',
    },
    {
      journeyType: 'SENSORY_PROCESSING',
      step: 7,
      title: 'Propriocepção - Consciência corporal',
      content: 'A propriocepção é a consciência de onde seu corpo está no espaço:\n\n**Hipersensibilidade:**\n• Desconforto com movimento\n• Preferência por ficar parado\n• Ansiedade com atividades físicas\n\n**Hipossensibilidade:**\n• Necessidade de movimento constante\n• Busca por pressão profunda\n• Dificuldade em perceber a força ao tocar coisas\n• Esbarrar em objetos frequentemente',
      reflection: 'Você sente necessidade de movimento? Como você percebe seu corpo no espaço?',
    },
    {
      journeyType: 'SENSORY_PROCESSING',
      step: 8,
      title: 'Sistema Vestibular - Equilíbrio e movimento',
      content: 'O sistema vestibular controla equilíbrio e senso de movimento:\n\n**Hipersensibilidade:**\n• Desconforto com alturas\n• Enjoo fácil em veículos\n• Ansiedade com mudanças de posição\n• Preferência por estar com os pés no chão\n\n**Hipossensibilidade:**\n• Busca por movimento intenso\n• Girar, balançar, pular constantemente\n• Dificuldade em ficar parado\n• Gostar de atividades radicais',
      reflection: 'Como você se sente com movimentos e balanço? Você busca ou evita essas sensações?',
    },
    {
      journeyType: 'SENSORY_PROCESSING',
      step: 9,
      title: 'Integração Sensorial',
      content: 'Nosso cérebro precisa integrar informações de todos os sentidos ao mesmo tempo:\n\n• Dificuldade em processar múltiplos sentidos simultaneamente\n• Sobrecarga quando há muitos estímulos\n• Necessidade de ambientes controlados\n• Dificuldade em filtrar informações irrelevantes\n\nQuando a integração sensorial é desafiadora, ambientes comuns podem ser exaustivos.',
      reflection: 'Como você se sente em ambientes com muitos estímulos (shoppings, festas, etc.)?',
    },
    {
      journeyType: 'SENSORY_PROCESSING',
      step: 10,
      title: 'Sobrecarga Sensorial',
      content: 'A sobrecarga acontece quando recebemos mais informação sensorial do que conseguimos processar:\n\n**Sinais de sobrecarga:**\n• Irritabilidade ou ansiedade crescente\n• Necessidade de sair do ambiente\n• Dificuldade em processar informações\n• Shutdown ou meltdown\n• Exaustão física e mental\n\nReconhecer os sinais precocemente ajuda a evitar a sobrecarga completa.',
      reflection: 'Você reconhece quando está em sobrecarga sensorial? Quais são seus sinais?',
    },
    {
      journeyType: 'SENSORY_PROCESSING',
      step: 11,
      title: 'Estratégias de Regulação',
      content: 'Existem estratégias que podem ajudar na regulação sensorial:\n\n**Para hipersensibilidade:**\n• Usar fones de cancelamento de ruído\n• Óculos escuros em ambientes claros\n• Roupas confortáveis sem etiquetas\n• Criar ambientes sensorialmente amigáveis\n• Fazer pausas em locais calmos\n\n**Para hipossensibilidade:**\n• Objetos para apertar ou tocar\n• Música ou ruídos de fundo\n• Movimentos regulares (balançar, caminhar)\n• Sabores ou cheiros intensos\n\nSuas necessidades são válidas e merecem ser atendidas.',
      reflection: 'Que estratégias você já usa ou gostaria de experimentar?',
    },
    {
      journeyType: 'SENSORY_PROCESSING',
      step: 12,
      title: 'Celebrando suas necessidades sensoriais',
      content: 'Você completou esta jornada sensorial! 🎉\n\n**Lembre-se:**\n• Suas necessidades sensoriais são reais e válidas\n• Não há nada de errado em ter sensibilidades diferentes\n• Adaptar o ambiente às suas necessidades é seu direito\n• Autoconhecimento sensorial é empoderador\n\nContinue explorando e honrando suas necessidades. Você merece viver em conforto sensorial! 💚',
      reflection: 'O que você aprendeu sobre seu processamento sensorial? Como você pode aplicar esse conhecimento?',
    },
  ];

  for (const content of sensoryProcessingJourney) {
    await prisma.journeyContent.upsert({
      where: {
        journeyType_step: {
          journeyType: content.journeyType as any,
          step: content.step,
        },
      },
      update: content,
      create: content,
    });
  }

  console.log(`✅ Created/updated ${sensoryProcessingJourney.length} steps for "Sensory Processing" journey`);

  // Seed Topic Content (8 topics)
  console.log('🧩 Seeding topic content...');

  const topics = [
    {
      topicType: 'SENSORY_SENSITIVITY',
      title: 'Sensibilidade Sensorial',
      description: 'Sensibilidade sensorial é quando nossos sentidos captam informações de forma mais ou menos intensa que a maioria das pessoas. Isso não é algo que você pode controlar - é como seu cérebro processa o mundo ao seu redor.\n\nPessoas com sensibilidades sensoriais podem ser hipersensíveis (sentir demais) ou hipossensíveis (sentir de menos) a diferentes estímulos. Ambas as experiências são válidas e reais.',
      examples: [
        'Sentir dor ou desconforto com etiquetas de roupas ou costuras',
        'Cobrir os ouvidos em ambientes barulhentos como shoppings ou festas',
        'Precisar de muito mais estímulo sensorial para se sentir "acordado" ou presente',
        'Sentir náusea com certos cheiros que outros não percebem',
        'Ter dificuldade para comer devido a texturas de alimentos',
      ],
    },
    {
      topicType: 'SOCIAL_COMMUNICATION',
      title: 'Comunicação Social',
      description: 'Comunicação social envolve todas as formas como interagimos com outras pessoas - desde conversas até linguagem corporal. Para muitas pessoas neurodivergentes, as "regras não ditas" da comunicação social não são intuitivas.\n\nIsso não significa falta de interesse em pessoas ou de empatia. Significa que a comunicação pode funcionar de forma diferente, e está tudo bem.',
      examples: [
        'Preferir conversas sobre tópicos específicos em vez de "small talk"',
        'Ter dificuldade em saber quando é sua vez de falar',
        'Interpretar linguagem de forma literal e não entender sarcasmo',
        'Sentir que conversas casuais são cansativas ou sem sentido',
        'Preferir comunicação por texto em vez de telefone ou pessoalmente',
      ],
    },
    {
      topicType: 'ROUTINES_RITUALS',
      title: 'Rotinas e Rituais',
      description: 'Rotinas e rituais são sequências de ações que trazem previsibilidade e segurança. Para muitas pessoas neurodivergentes, rotinas não são apenas preferências - são necessidades que ajudam a regular ansiedade e funcionar melhor.\n\nTer rotinas rígidas ou precisar seguir certos rituais não é "ser inflexível" - é uma forma legítima de se sentir seguro em um mundo imprevisível.',
      examples: [
        'Seguir a mesma rotina matinal todos os dias, e sentir ansiedade se algo muda',
        'Precisar comer os mesmos alimentos ou no mesmo horário',
        'Ter rotas específicas para ir a lugares e sentir desconforto com caminhos diferentes',
        'Organizar objetos de formas específicas e se sentir incomodado se forem movidos',
        'Ter rituais antes de dormir que não podem ser pulados',
      ],
    },
    {
      topicType: 'HYPERFOCUS',
      title: 'Hiperfoco',
      description: 'Hiperfoco é quando ficamos tão absorvidos em uma atividade que perdemos noção do tempo e do que acontece ao redor. Isso geralmente ocorre com atividades de interesse intenso e pode ser tanto uma força quanto um desafio.\n\nDurante o hiperfoco, podemos produzir trabalho incrível, mas também podemos esquecer de comer, beber água ou ir ao banheiro.',
      examples: [
        'Passar horas em um hobby ou projeto e não perceber o tempo passar',
        'Esquecer de comer ou ir ao banheiro quando focado em algo',
        'Ter dificuldade em parar uma atividade mesmo quando necessário',
        'Produzir trabalho excepcional quando está em hiperfoco',
        'Sentir frustração quando alguém interrompe durante o hiperfoco',
      ],
    },
    {
      topicType: 'STIMMING',
      title: 'Stimming',
      description: 'Stimming (comportamento autorregulatório) são movimentos ou ações repetitivas que ajudam a processar emoções, manter foco ou lidar com estímulos sensoriais. É uma forma natural e saudável de autorregulação.\n\nTodos fazem stimming em algum nível (balançar a perna, morder caneta), mas para pessoas neurodivergentes pode ser mais frequente ou intenso. Stimming não precisa ser suprimido - ele serve a uma função importante.',
      examples: [
        'Balançar as mãos ou o corpo quando animado ou ansioso',
        'Estalar os dedos ou pescoço repetidamente',
        'Tocar texturas específicas para se acalmar',
        'Fazer sons vocais repetitivos',
        'Andar de um lado para o outro enquanto pensa',
      ],
    },
    {
      topicType: 'MASKING',
      title: 'Masking (Camuflagem Social)',
      description: 'Masking é quando escondemos características neurodivergentes para "se encaixar" ou atender expectativas sociais. Isso pode incluir forçar contato visual, reprimir stimming, copiar comportamentos de outros ou esconder interesses.\n\nMasking é extremamente exaustivo e pode levar a burnout, ansiedade e perda de identidade. Você não deveria precisar esconder quem você é para ser aceito.',
      examples: [
        'Forçar contato visual mesmo sendo extremamente desconfortável',
        'Reprimir movimentos de stimming em público',
        'Ensaiar mentalmente conversas ou respostas "apropriadas"',
        'Copiar expressões faciais e linguagem corporal de outras pessoas',
        'Sentir exaustão extrema após interações sociais por ter que "atuar"',
      ],
    },
    {
      topicType: 'SENSORY_OVERLOAD',
      title: 'Sobrecarga Sensorial',
      description: 'Sobrecarga sensorial acontece quando nosso cérebro recebe mais informação sensorial do que consegue processar. Isso não é uma "escolha" ou "drama" - é uma resposta neurológica real a estímulos excessivos.\n\nDurante sobrecarga, capacidades normais podem diminuir drasticamente, e a pessoa pode precisar de um ambiente calmo para se recuperar.',
      examples: [
        'Sentir crescente irritabilidade ou ansiedade em ambientes barulhentos',
        'Ter dificuldade em processar o que as pessoas estão dizendo',
        'Necessidade urgente de sair do ambiente ou ir para um local silencioso',
        'Sentir como se "desligasse" ou não conseguisse responder (shutdown)',
        'Experimentar meltdown - uma resposta emocional intensa quando a sobrecarga é demais',
      ],
    },
    {
      topicType: 'EXECUTIVE_FUNCTION',
      title: 'Função Executiva',
      description: 'Função executiva é como um "gerente" do cérebro que ajuda a planejar, organizar, iniciar tarefas, gerenciar tempo e controlar impulsos. Muitas pessoas neurodivergentes têm desafios com função executiva.\n\nIsso NÃO é preguiça, falta de inteligência ou não se importar. É uma diferença neurológica real em como o cérebro organiza e executa tarefas.',
      examples: [
        'Saber o que precisa fazer mas não conseguir começar (paralisia de tarefa)',
        'Perder a noção do tempo constantemente',
        'Dificuldade em priorizar tarefas ou decidir por onde começar',
        'Esquecer compromissos mesmo quando anotados',
        'Dificuldade em dividir grandes projetos em etapas menores',
      ],
    },
  ];

  for (const topic of topics) {
    await prisma.topicContent.upsert({
      where: { topicType: topic.topicType as any },
      update: topic,
      create: topic,
    });
  }

  console.log(`✅ Created/updated ${topics.length} topics`);

  console.log('✅ Seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
