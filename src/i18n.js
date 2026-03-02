import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      app: {
        title: "Duolingo Streak Calculator"
      },
      input: {
        label: "What is your current streak?",
        placeholder: "0",
        error: "Only integers greater than or equal to 0 are allowed.",
        helper: "Enter your Duolingo streak days to see your upcoming achievements!"
      },
      motivation: {
        gt1000: "WOW! Over a thousand days! Your consistency is epic. Keep it up.",
        eq730: "Two years! What an inspiring achievement! Keep it going.",
        ge500: "Incredible, {{count}} days! You're in the league of streak masters!",
        eq365: "A whole year! What an inspiring achievement! Keep it going.",
        eq180: "A half year! Congratulations! Keep this streak going.",
        ge100: "Great! You already have a three-digit streak! Nothing stops you.",
        eq90: "Three months! Congratulations! Keep this streak going.",
        eq60: "Two months! Congratulations! Keep this streak going.",
        eq30: "One month! Congratulations! Keep this streak going.",
        gt0: "Excellent start! Every day counts. Keep it up!"
      },
      timeline: {
        title: "Your Timeline"
      },
      milestone: {
        month: "{{count}} Month",
        month_other: "{{count}} Months",
        year: "{{count}} Year",
        year_other: "{{count}} Years",
        days_left_label: "Remaining",
        days_left: "{{count}} day",
        days_left_other: "{{count}} days"
      },
      info: {
        title1: "What is a Duolingo streak and why is it so important?",
        text1: "A Duolingo streak represents the number of consecutive days you've completed a lesson. It's the driving force behind the platform's gamification; losing it can be demotivating, while maintaining it reinforces the daily habit of learning a new language. A long streak not only demonstrates consistency but also becomes a personal trophy within the learning community.",
        title2: "Why track your streak with our tool?",
        text2: "While the official app shows you your current streak number, our Duolingo streak calculator goes a step further. We help you visualize specific milestones and \"birthdays\" in your streak (like your first 100, 365, or 1000 days).",
        text3: "By entering your days of streak, our tool analyzes your stats so you can:",
        bullet1: "Predict milestones: Know exactly when you'll reach your next big goal.",
        bullet2: "Visualize your progress: Understand your consistency through a clean and optimized interface."
      },
      footer: {
        made_by: "Made by"
      }
    }
  },
  es: {
    translation: {
      app: {
        title: "Calculadora de Racha en Duolingo"
      },
      input: {
        label: "¿Cuál es tu racha actual?",
        placeholder: "0",
        error: "Solo se permiten números enteros mayores o iguales a 0.",
        helper: "¡Ingresa tus días de racha en Duolingo para ver tus próximos logros!"
      },
      motivation: {
        gt1000: "¡GUAU! ¡Más de un millar de días! Tu consistencia es épica. Sigue así.",
        eq730: "¡Dos años! ¡Qué logro tan inspirador! A seguir sumando.",
        ge500: "¡Increíble, {{count}} días! ¡Estás en la liga de los maestros de la racha!",
        eq365: "¡Un año entero! ¡Qué logro tan inspirador! A seguir sumando.",
        eq180: "¡Un semestre! ¡Felicitaciones! Sigue con esta racha.",
        ge100: "¡Genial! ¡Ya tienes una racha de tres cifras! Nada te detiene.",
        eq90: "¡Tres meses! ¡Felicitaciones! Sigue con esta racha.",
        eq60: "¡Dos meses! ¡Felicitaciones! Sigue con esta racha.",
        eq30: "¡Un mes! ¡Felicitaciones! Sigue con esta racha.",
        gt0: "¡Excelente comienzo! Cada día cuenta. ¡Sigue así!"
      },
      timeline: {
        title: "Tu Línea de Tiempo"
      },
      milestone: {
        month: "{{count}} Mes",
        month_other: "{{count}} Meses",
        year: "{{count}} Año",
        year_other: "{{count}} Años",
        days_left_label: "Faltan",
        days_left: "{{count}} día",
        days_left_other: "{{count}} días"
      },
      info: {
        title1: "¿Qué es una racha de Duolingo y por qué es tan importante?",
        text1: "Una racha de Duolingo representa el número de días consecutivos que has completado una lección. Es la fuerza impulsora detrás de la gamificación de la plataforma; perderla puede ser desmotivador, mientras que mantenerla refuerza el hábito diario de aprender un nuevo idioma. Una racha larga no solo demuestra constancia, sino que también se convierte en un trofeo personal dentro de la comunidad de aprendizaje.",
        title2: "¿Por qué seguir tu racha con nuestra herramienta?",
        text2: "Aunque la aplicación oficial te muestra tu número de racha actual, nuestra calculadora de racha de Duolingo va un paso más allá. Te ayudamos a visualizar hitos específicos y \"cumpleaños\" en tu racha (como tus primeros 100, 365 o 1000 días).",
        text3: "Al ingresar tus días de racha, nuestra herramienta analiza tus estadísticas para que puedas:",
        bullet1: "Predecir hitos: Sabe exactamente cuándo alcanzarás tu próximo gran objetivo.",
        bullet2: "Visualizar tu progreso: Comprende tu consistencia a través de una interfaz limpia y optimizada."
      },
      footer: {
        made_by: "Hecho por"
      }
    }
  },
  pt: {
    translation: {
      app: {
        title: "Calculadora de Sequência Duolingo"
      },
      input: {
        label: "Qual é a sua ofensiva atual?",
        placeholder: "0",
        error: "Apenas números inteiros maiores ou iguais a 0 são permitidos.",
        helper: "Insira seus dias de ofensiva no Duolingo para ver suas próximas conquistas!"
      },
      motivation: {
        gt1000: "UAU! Mais de mil dias! Sua consistência é épica. Continue assim.",
        eq730: "Dois anos! Que conquista inspiradora! Continue somando.",
        ge500: "Incrível, {{count}} dias! Você está na liga dos mestres da ofensiva!",
        eq365: "Um ano inteiro! Que conquista inspiradora! Continue somando.",
        eq180: "Um semestre! Parabéns! Continue com essa ofensiva.",
        ge100: "Legal! Você já tem uma ofensiva de três dígitos! Nada te detém.",
        eq90: "Três meses! Parabéns! Continue com essa ofensiva.",
        eq60: "Dois meses! Parabéns! Continue com essa ofensiva.",
        eq30: "Um mês! Parabéns! Continue com essa ofensiva.",
        gt0: "Excelente começo! Cada día conta. Continue assim!"
      },
      timeline: {
        title: "Sua Linha do Tempo"
      },
      milestone: {
        month: "{{count}} Mês",
        month_other: "{{count}} Meses",
        year: "{{count}} Ano",
        year_other: "{{count}} Anos",
        days_left_label: "Faltam",
        days_left: "{{count}} dia",
        days_left_other: "{{count}} dias"
      },
      info: {
        title1: "O que é uma ofensiva no Duolingo e por que ela é tão importante?",
        text1: "Uma ofensiva no Duolingo representa o número de dias consecutivos em que você completou uma lição. É a força motriz por trás da gamificação da plataforma; perdê-la pode ser desmotivador, enquanto mantê-la reforça o hábito diário de aprender um novo idioma. Uma longa ofensiva não apenas demonstra consistência, mas também se torna um troféu pessoal dentro da comunidade de aprendizagem.",
        title2: "Por que acompanhar sua ofensiva com nossa ferramenta?",
        text2: "Embora o aplicativo oficial mostre seu número atual de ofensiva, nossa calculadora de ofensiva do Duolingo vai um passo além. Ajudamos você a visualizar marcos específicos e \"aniversários\" em sua ofensiva (como seus primeiros 100, 365 ou 1000 dias).",
        text3: "Ao inserir seus dias de ofensiva, nossa ferramenta analisa suas estatísticas para que você possa:",
        bullet1: "Prever marcos: Saiba exatamente quando você alcançará sua próxima grande meta.",
        bullet2: "Visualizar seu progresso: Entenda sua consistência por meio de uma interface limpa e otimizada."
      },
      footer: {
        made_by: "Feito por"
      }
    }
  },
  fr: {
    translation: {
      app: {
        title: "Calculateur de séries Duolingo"
      },
      input: {
        label: "Quelle est votre série actuelle ?",
        placeholder: "0",
        error: "Seuls les nombres entiers supérieurs ou égaux à 0 sont autorisés.",
        helper: "Entrez vos jours de série Duolingo pour voir vos prochaines réussites !"
      },
      motivation: {
        gt1000: "WOUAH ! Plus de mille jours ! Votre régularité est épique. Continuez ainsi.",
        eq730: "Deux ans ! Quel accomplissement inspirant ! Continuez comme ça.",
        ge500: "Incroyable, {{count}} jours ! Vous faites partie des maîtres de la série !",
        eq365: "Une année entière ! Quel accomplissement inspirant ! Continuez comme ça.",
        eq180: "Un semestre ! Félicitations ! Continuez sur cette lancée.",
        ge100: "Génial ! Vous avez déjà une série à trois chiffres ! Rien ne vous arrête.",
        eq90: "Trois mois ! Félicitations ! Continuez sur cette lancée.",
        eq60: "Deux mois ! Félicitations ! Continuez sur cette lancée.",
        eq30: "Un mois ! Félicitations ! Continuez sur cette lancée.",
        gt0: "Excellent début ! Chaque jour compte. Continuez ainsi !"
      },
      timeline: {
        title: "Votre Chronologie"
      },
      milestone: {
        month: "{{count}} Mois",
        month_other: "{{count}} Mois",
        year: "{{count}} An",
        year_other: "{{count}} Ans",
        days_left_label: "Restant",
        days_left: "{{count}} jour",
        days_left_other: "{{count}} jours"
      },
      info: {
        title1: "Qu'est-ce qu'une série Duolingo et pourquoi est-ce si important ?",
        text1: "Une série Duolingo représente le nombre de jours consécutifs où vous avez terminé une leçon. C'est le moteur de la gamification de la plateforme ; la perdre peut être démotivant, tandis que la maintenir renforce l'habitude quotidienne d'apprendre une nouvelle langue. Une longue série démontre non seulement la régularité, mais devient également un trophée personnel au sein de la communauté d'apprentissage.",
        title2: "Pourquoi suivre votre série avec notre outil ?",
        text2: "Alors que l'application officielle vous indique votre nombre de jours de série actuel, notre calculateur de série Duolingo va plus loin. Nous vous aidons à visualiser les étapes spécifiques et les « anniversaires » de votre série (comme vos 100, 365 ou 1000 premiers jours).",
        text3: "En saisissant vos jours de série, notre outil analyse vos statistiques afin que vous puissiez :",
        bullet1: "Prédire les jalons : sachez exactement quand vous atteindrez votre prochain grand objectif.",
        bullet2: "Visualisez vos progrès : comprenez votre régularité grâce à une interface propre et optimisée."
      },
      footer: {
        made_by: "Fait par"
      }
    }
  },
  it: {
    translation: {
      app: {
        title: "Calcolatore di serie Duolingo"
      },
      input: {
        label: "Qual è il tuo slancio attuale?",
        placeholder: "0",
        error: "Sono consentiti solo numeri interi maggiori o uguali a 0.",
        helper: "Inserisci i tuoi giorni di slancio Duolingo per vedere i tuoi prossimi traguardi!"
      },
      motivation: {
        gt1000: "WOW! Più di mille giorni! La tua costanza è epica. Continua così.",
        eq730: "Due anni! Che traguardo stimolante! Continua a sommare.",
        ge500: "Incredibile, {{count}} giorni! Sei nella lega dei maestri dello slancio!",
        eq365: "Un anno intero! Che traguardo stimolante! Continua a sommare.",
        eq180: "Un semestre! Congratulazioni! Continua con questo slancio.",
        ge100: "Grande! Hai già uno slancio a tre cifre! Nulla ti ferma.",
        eq90: "Tre mesi! Congratulazioni! Continua con questo slancio.",
        eq60: "Due mesi! Congratulazioni! Continua con questo slancio.",
        eq30: "Un mese! Congratulazioni! Continua con questo slancio.",
        gt0: "Ottimo inizio! Ogni giorno conta. Continua così!"
      },
      timeline: {
        title: "La tua Cronologia"
      },
      milestone: {
        month: "{{count}} Mese",
        month_other: "{{count}} Mesi",
        year: "{{count}} Anno",
        year_other: "{{count}} Anni",
        days_left_label: "Mancano",
        days_left: "{{count}} giorno",
        days_left_other: "{{count}} giorni"
      },
      info: {
        title1: "Cos'è uno slancio di Duolingo e perché è così importante?",
        text1: "Uno slancio di Duolingo rappresenta il numero di giorni consecutivi in cui hai completato una lezione. È la forza trainante della gamification della piattaforma; perderlo può essere demotivante, mentre mantenerlo rafforza l'abitudine quotidiana di imparare una nuova lingua. Un lungo slancio non solo dimostra costanza, ma diventa anche un trofeo personale all'interno della comunità di apprendimento.",
        title2: "Perché monitorare il tuo slancio con il nostro strumento?",
        text2: "Mentre l'app ufficiale ti mostra il numero del tuo slancio attuale, il nostro calcolatore di slancio Duolingo fa un passo avanti. Ti aiutiamo a visualizzare traguardi specifici e \"compleanni\" nel tuo slancio (como i tuoi primi 100, 365 o 1000 giorni).",
        text3: "Inserendo i tuoi giorni di slancio, il nostro strumento analizza le tue statistiche così puoi:",
        bullet1: "Prevedere i traguardi: sappi esattamente quando raggiungerai il tuo prossimo grande obiettivo.",
        bullet2: "Visualizzare i tuoi progressi: comprendi la tua costanza attraverso un'interfaccia pulita e ottimizzata."
      },
      footer: {
        made_by: "Fatto da"
      }
    }
  },
  de: {
    translation: {
      app: {
        title: "Duolingo-Streak-Rechner"
      },
      input: {
        label: "Wie hoch ist dein aktueller Streak?",
        placeholder: "0",
        error: "Es sind nur ganze Zahlen größer oder gleich 0 erlaubt.",
        helper: "Gib deine Duolingo-Streak-Tage ein, um deine nächsten Erfolge zu sehen!"
      },
      motivation: {
        gt1000: "WOW! Über tausend Tage! Deine Beständigkeit ist episch. Mach weiter so.",
        eq730: "Zwei Jahre! Was für eine inspirierende Leistung! Immer weiter so.",
        ge500: "Unglaublich, {{count}} Tage! Du spielst in der Liga der Streak-Meister!",
        eq365: "Ein ganzes Jahr! Was für eine inspirierende Leistung! Immer weiter so.",
        eq180: "Ein halbes Jahr! Herzlichen Glückwunsch! Mach weiter so mit diesem Streak.",
        ge100: "Super! Du hast bereits einen dreistelligen Streak! Nichts hält dich auf.",
        eq90: "Drei Monate! Herzlichen Glückwunsch! Mach weiter so mit diesem Streak.",
        eq60: "Zwei Monate! Herzlichen Glückwunsch! Mach weiter so mit diesem Streak.",
        eq30: "Ein Monat! Herzlichen Glückwunsch! Mach weiter so mit diesem Streak.",
        gt0: "Hervorragender Start! Jeder Tag zählt. Mach weiter so!"
      },
      timeline: {
        title: "Deine Zeitachse"
      },
      milestone: {
        month: "{{count}} Monat",
        month_other: "{{count}} Monate",
        year: "{{count}} Jahr",
        year_other: "{{count}} Jahre",
        days_left_label: "Noch",
        days_left: "{{count}} Tag",
        days_left_other: "{{count}} Tage"
      },
      info: {
        title1: "Was ist ein Duolingo-Streak und warum ist er so wichtig?",
        text1: "Ein Duolingo-Streak stellt die Anzahl der aufeinanderfolgenden Tage dar, an denen du eine Lektion abgeschlossen hast. Er ist die treibende Kraft hinter der Gamifizierung der Plattform; ihn zu verlieren kann demotivierend sein, während sein Erhalt die tägliche Gewohnheit des Erlernens einer neuen Sprache verstärkt. Ein langer Streak beweist nicht nur Beständigkeit, sondern wird auch zu einer persönlichen Trophäe innerhalb der Lerngemeinschaft.",
        title2: "Warum solltest du deinen Streak mit unserem Tool verfolgen?",
        text2: "Während die offizielle App dir deine aktuelle Streak-Zahl anzeigt, geht unser Duolingo-Streak-Rechner einen Schritt weiter. Wir helfen dir, bestimmte Meilensteine und „Geburtstage“ in deinem Streak zu visualisieren (wie deine ersten 100, 365 oder 1000 Tage).",
        text3: "Durch Eingabe deiner Streak-Tage analysiert unser Tool deine Statistiken, sodass du:",
        bullet1: "Meilensteine vorhersagen kannst: Erfahre genau, wann du dein nächstes großes Ziel erreichst.",
        bullet2: "Deinen Fortschritt visualisieren kannst: Verstehe deine Beständigkeit durch eine saubere und optimierte Benutzeroberfläche."
      },
      footer: {
        made_by: "Erstellt von"
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
