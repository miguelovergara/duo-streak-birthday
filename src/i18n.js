import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      app: {
        title: "Duolingo Streak Birthdays"
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
      empty: {
        text: "Type your streak above!"
      },
      footer: {
        text: "Keep it up, you're doing great!"
      }
    }
  },
  es: {
    translation: {
      app: {
        title: "Cumpleaños de Racha en Duolingo"
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
      empty: {
        text: "¡Escribe tu racha arriba!"
      },
      footer: {
        text: "¡Sigue así, vas genial!"
      }
    }
  },
  pt: {
    translation: {
      app: {
        title: "Aniversários de Ofensiva no Duolingo"
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
        gt0: "Excelente começo! Cada dia conta. Continue assim!"
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
      empty: {
        text: "Digite sua ofensiva acima!"
      },
      footer: {
        text: "Continue assim, você está indo muito bem!"
      }
    }
  },
  fr: {
    translation: {
      app: {
        title: "Anniversaires de Série Duolingo"
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
      empty: {
        text: "Écrivez votre série ci-dessus !"
      },
      footer: {
        text: "Continue comme ça, vous assurez !"
      }
    }
  },
  it: {
    translation: {
      app: {
        title: "Compleanni dello Slancio Duolingo"
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
      empty: {
        text: "Scrivi il tuo slancio qui sopra!"
      },
      footer: {
        text: "Continua così, vai alla grande!"
      }
    }
  },
  de: {
    translation: {
      app: {
        title: "Duolingo Streak-Geburtstage"
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
      empty: {
        text: "Gib deinen Streak oben ein!"
      },
      footer: {
        text: "Mach weiter so, du bist toll!"
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
