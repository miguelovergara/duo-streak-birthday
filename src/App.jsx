import React, { useState, useEffect } from 'react';
import { Flame, Calendar, Trophy, Star, Languages, ChevronDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function App() {
  const { t, i18n } = useTranslation();
  const [streak, setStreak] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [error, setError] = useState('');
  
  // Nuevo estado para el mensaje motivacional
  const [motivationalMessage, setMotivationalMessage] = useState(null);
  const [showMotivation, setShowMotivation] = useState(false);

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const languages = [
    { code: 'en', name: t('languages.en') },
    { code: 'es', name: t('languages.es') },
    { code: 'pt', name: t('languages.pt') },
    { code: 'fr', name: t('languages.fr') },
    { code: 'it', name: t('languages.it') },
    { code: 'de', name: t('languages.de') },
  ];

  // Función para formatear fechas según el idioma
  const formatDate = (date) => {
    return new Intl.DateTimeFormat(i18n.language, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Función auxiliar para sumar meses de forma precisa, manteniendo el día del mes
  // si es posible, o ajustando al final del mes (ej. 31 de Ene a 28/29 de Feb)
  const addMonths = (date, months) => {
      const d = new Date(date);
      const day = d.getDate();
      
      d.setDate(1); // Mover a día 1 para evitar saltos de mes (e.g., 31 Jan -> 3 Mar)
      d.setMonth(d.getMonth() + months);
      
      // Encontrar el último día del nuevo mes
      const lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      
      // Restaurar el día, o usar el último día del mes si el original era mayor
      d.setDate(Math.min(day, lastDayOfMonth));
      return d;
  };

  // Lógica para generar mensajes de sorpresa
  const generateMotivationalMessage = (s) => {
      if (s > 1000)      return { key: 'motivation.gt1000' };
      else if (s == 730) return { key: 'motivation.eq730' };
      else if (s >= 500) return { key: 'motivation.ge500', options: { count: s } };
      else if (s == 365) return { key: 'motivation.eq365' };
      else if (s == 180)  return { key: 'motivation.eq180' };
      else if (s >= 100) return { key: 'motivation.ge100' };
      else if (s == 90)  return { key: 'motivation.eq90' };
      else if (s == 60)  return { key: 'motivation.eq60' };
      else if (s == 30)  return { key: 'motivation.eq30' };
      else if (s > 0)    return { key: 'motivation.gt0' };
      else               return null;
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLangMenuOpen(false);
  };

  // Manejador del input para validar enteros >= 0
  const handleStreakChange = (e) => {
    const value = e.target.value;
    
    // Si el usuario comienza a escribir, oculta el mensaje
    if (showMotivation) {
        setShowMotivation(false);
    }

    // Si el valor está vacío, limpia el error y la racha.
    if (value === '') {
      setStreak('');
      setError('');
      return;
    }

    // Permite solo números enteros positivos
    if (/^\d+$/.test(value)) {
      setStreak(value);
      setError('');
    } else {
      // Mantiene el valor actual si la entrada es inválida pero permite la corrección
      setError(t('input.error'));
    }
  };
  
  // Manejador cuando el input pierde el foco
  const handleBlur = () => {
      const currentStreak = Number(streak);
      if (currentStreak > 0 && !isNaN(currentStreak)) {
          const msg = generateMotivationalMessage(currentStreak);
          if (msg) {
              setMotivationalMessage(msg);
              setShowMotivation(true);
              
              // Ocultar el mensaje después de 4 segundos
              setTimeout(() => {
                  setShowMotivation(false);
                  setMotivationalMessage(null); // Limpiar el mensaje después de ocultarlo
              }, 5*1000); 
          }
      } else {
           setMotivationalMessage(null);
           setShowMotivation(false);
      }
  };

  useEffect(() => {
    if (!streak) {
      setMilestones([]);
      return;
    }

    const currentStreak = Number(streak);
    if (isNaN(currentStreak) || currentStreak < 0) return;
    
    const today = new Date();
    const futureMilestones = new Map(); // Usamos Map para almacenar {días: etiqueta}
    const limit = currentStreak + 2000; // Buscamos hitos en los próximos 2000 días

    // Determinar la fecha de inicio de la racha
    const streakStartDate = new Date(today);
    streakStartDate.setDate(today.getDate() - currentStreak);
    
    // Días en milisegundos
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    // --- LÓGICA DE CÁLCULO DE HITOS ---
    
    // 1. Múltiplos de Meses (Usando meses reales) - LIMITADO A LOS PRÓXIMOS 3 Y A 365 DÍAS.
    let monthsFound = 0;
    let monthCount = 1; // Contador para el número del mes de aniversario (1 mes, 2 meses, etc.)

    while (monthsFound < 3) {
        const nextMilestoneDate = addMonths(streakStartDate, monthCount);
        
        // Calcular el total de días desde el inicio de la racha hasta el hito mensual exacto
        const daysToMilestone = Math.ceil((nextMilestoneDate - streakStartDate) / MS_PER_DAY);
        
        // 1a. Si el hito es después del primer año (365 días), detenemos la búsqueda de meses.
        if (daysToMilestone > 365) {
            break;
        }
        
        // 1b. Si el hito no ha sido alcanzado, lo agregamos al mapa
        if (daysToMilestone > currentStreak) {
            futureMilestones.set(daysToMilestone, { key: 'milestone.month', count: monthCount });
            monthsFound++;
        }
        
        monthCount++;

        // Fallback: Si el mes 12 ya pasó y no encontramos 3 hitos (ej: currentStreak=364), detenemos el bucle.
        if (monthCount > 12 && monthsFound < 3) { 
            break; 
        }
    }

    // 2. Múltiplos de 100 - LIMITADO A LOS PRÓXIMOS 3 (hasta 1000)
    let hundredsFound = 0;
    for (let i = 100; i <= 1000; i += 100) { 
      if (i > currentStreak) {
        // Solo agregar si no es un hito de mes más preciso que ya se calculó
        if (!futureMilestones.has(i)) {
          futureMilestones.set(i, ''); // Sin etiqueta predefinida (se manejará abajo)
        }
        hundredsFound++;
        if (hundredsFound >= 3) break; 
      }
    }
    
    // 3. Múltiplos de 250
    for (let i = 250; i <= limit; i += 250) {
      if (i > currentStreak && !futureMilestones.has(i)) {
        futureMilestones.set(i, '');
      }
    }
    
    // 4. Múltiplos de 500 / 1000 (Grandes hitos)
    for (let i = 500; i <= limit; i += 500) {
      if (i > currentStreak && !futureMilestones.has(i)) {
        futureMilestones.set(i, '');
      }
    }

    // 5. Múltiplos de Años (365, 730, etc.) - ¡Lógica Bisiesta Implementada!
    let yearCount = 1;
    // Buscamos hasta 6 años en el futuro para un límite de 2000 días
    while (yearCount <= (limit / 365) + 1) { 
        // Clonar la fecha de inicio de la racha y añadir el número exacto de años
        const nextMilestoneDate = new Date(streakStartDate);
        nextMilestoneDate.setFullYear(nextMilestoneDate.getFullYear() + yearCount);
        
        // Calcular el número exacto de días (incluyendo bisiestos)
        const daysToMilestone = Math.ceil((nextMilestoneDate - streakStartDate) / MS_PER_DAY);
        
        if (daysToMilestone > currentStreak) {
            // La etiqueta se genera directamente aquí, reemplazando cualquier hito mensual o de 100 que pudiera coincidir
            futureMilestones.set(daysToMilestone, { key: 'milestone.year', count: yearCount });
        }

        yearCount++;
    }

    // Obtener solo las claves (días), ordenar y limitar
    const sortedMilestones = Array.from(futureMilestones.keys())
      .filter(m => m > currentStreak)
      .sort((a, b) => a - b)
      .slice(0, 15);

    // Crear objetos con la data completa
    const results = sortedMilestones.map(m => {
      const daysDiff = m - currentStreak;
      const targetDate = new Date();
      targetDate.setDate(today.getDate() + daysDiff);
      
      const labelData = futureMilestones.get(m); // Obtenemos la etiqueta precisa del mapa
      
      // Determinar estilos
      let isMajor = false; // Dorado (Años, 500s)
      let isMedium = false; // Azul (Meses exactos)

      // Identificar si es un hito anual exacto
      const isYearMilestone = labelData && labelData.key === 'milestone.year';

      // Identificar si es un hito mensual exacto (no anual)
      const isMonthMilestone = labelData && labelData.key === 'milestone.month';

      if (isYearMilestone || m % 500 === 0 || m % 1000 === 0) {
        isMajor = true;
      } else if (isMonthMilestone) {
        isMedium = true;
      }

      return {
        target: m,
        date: targetDate,
        daysLeft: daysDiff,
        labelData: labelData,
        isMajor: isMajor,
        isMedium: isMedium
      };
    });
    
    setMilestones(results);
  }, [streak]);

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-700 pb-10">
      
      {/* Header estilo App */}
      <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-400 fill-current" />
            {/* Título actualizado */}
            <h1 className="text-xl font-bold text-gray-400 tracking-wide uppercase">{t('app.title')}</h1>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl flex items-center gap-2 border-2 border-gray-200 transition-colors"
            >
               <Languages className="w-5 h-5 text-gray-600" />
               <span className="font-bold text-gray-600 uppercase text-sm">{i18n.language.split('-')[0]}</span>
               <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border-2 border-gray-100 py-2 z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center justify-between ${
                      i18n.language.startsWith(lang.code) ? 'text-green-600 font-bold' : 'text-gray-600'
                    }`}
                  >
                    {lang.name}
                    {i18n.language.startsWith(lang.code) && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 mt-8">
        
        {/* Card de Input Principal */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-200 mb-8">
          <label className="block text-center text-lg font-bold text-gray-700 mb-4">
            {t('input.label')}
          </label>
          <div className="relative max-w-xs mx-auto">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={streak}
              onChange={handleStreakChange}
              onBlur={handleBlur} // Agregado el evento onBlur
              placeholder={t('input.placeholder')}
              className={`w-full text-center text-4xl font-black text-gray-800 border-2 rounded-xl py-4 focus:outline-none focus:ring-4 transition-all placeholder-gray-300 ${
                error 
                  ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' 
                  : 'border-gray-200 focus:border-green-500 focus:ring-green-500/20'
              }`}
              aria-invalid={!!error}
              aria-describedby="input-error"
              autoFocus
            />
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Flame className="w-8 h-8 text-gray-200" />
            </div>
          </div>
          {error && (
            <p id="input-error" role="alert" className="text-red-500 text-sm mt-2 text-center font-medium">
              {error}
            </p>
          )}
          <p className="text-center text-gray-400 text-sm mt-4 font-medium">
            {t('input.helper')}
          </p>
        </div>

        {/* Mensaje Motivacional Temporal */}
        {showMotivation && motivationalMessage && (
            <div 
                className="bg-green-100 border-2 border-green-500 text-green-800 p-4 rounded-xl mb-6 text-center shadow-lg transition-opacity duration-500"
                style={{ opacity: showMotivation ? 1 : 0 }}
            >
                <Star className="w-5 h-5 inline mr-2 text-green-600 fill-current animate-pulse" />
                <span className="font-semibold">{t(motivationalMessage.key, motivationalMessage.options)}</span>
            </div>
        )}

        {/* Lista de Resultados */}
        <div className="space-y-4">
          {streak && milestones.length > 0 ? (
            <>
              <h2 className="text-gray-400 font-bold uppercase tracking-widest text-sm ml-2 mb-4">{t('timeline.title')}</h2>
              {milestones.map((item, index) => (
                <div 
                  key={item.target}
                  className={`relative group overflow-hidden rounded-2xl border-b-4 transition-all hover:scale-[1.02] ${
                    item.isMajor 
                      ? 'bg-yellow-400 border-yellow-600 text-white' 
                      : item.isMedium
                        ? 'bg-blue-500 border-blue-700 text-white' // Nuevo estilo para meses
                        : 'bg-white border-gray-200 text-gray-700'
                  }`}
                  role="listitem"
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Icono izquierdo */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                        item.isMajor ? 'bg-white/20' : item.isMedium ? 'bg-white/20' : 'bg-green-100'
                      }`}>
                        {item.isMajor ? (
                          <Trophy className="w-6 h-6 text-white" />
                        ) : item.isMedium ? (
                          <Calendar className="w-6 h-6 text-white" />
                        ) : (
                          <Flame className="w-6 h-6 text-green-500" />
                        )}
                      </div>
                      
                      {/* Info principal */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-black ${
                            item.isMajor || item.isMedium ? 'text-white' : 'text-green-500'
                          }`}>
                            {item.target}
                          </span>
                          {/* Etiqueta de Mes/Año si existe */}
                          {item.labelData && (
                            <span className={`text-xs font-bold px-2 py-0.5 rounded-lg uppercase tracking-wide ${
                              item.isMajor 
                                ? 'bg-yellow-600/30 text-yellow-50' 
                                : item.isMedium 
                                  ? 'bg-blue-700/30 text-blue-50'
                                  : 'bg-gray-100 text-gray-500'
                            }`}>
                              {t(item.labelData.key, { count: item.labelData.count })}
                            </span>
                          )}
                        </div>
                        <span className={`text-sm font-bold opacity-90 capitalize`}>
                          {formatDate(item.date)}
                        </span>
                      </div>
                    </div>

                    {/* Días restantes */}
                    <div className="text-right">
                      <span className={`text-xs font-bold uppercase tracking-wide block ${
                        item.isMajor || item.isMedium ? 'text-white/70' : 'text-gray-400'
                      }`}>
                        {t('milestone.days_left_label')}
                      </span>
                      <span className={`text-lg font-bold ${
                        item.isMajor || item.isMedium ? 'text-white' : 'text-gray-600'
                      }`}>
                        {t('milestone.days_left', { count: item.daysLeft })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            // Estado vacío / Bienvenida
            <div className="text-center py-10 opacity-50">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/616/616490.png" 
                alt="Icono calendario"
                className="w-24 h-24 mx-auto mb-4 grayscale opacity-50" 
                onError={(e) => e.target.style.display = 'none'}
              />
              <p className="font-bold text-gray-400">{t('empty.text')}</p>
            </div>
          )}
        </div>
      </main>

      <footer className="mt-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest pb-8">
        {t('footer.text')}
      </footer>
    </div>
  );
}
