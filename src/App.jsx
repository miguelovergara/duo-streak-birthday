import React, { useState, useEffect, useRef } from 'react';
import { Flame, Calendar, Trophy, Star, Languages, ChevronDown, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Analytics } from '@vercel/analytics/react';

const getCalendarDaysDiff = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);
  const diffTime = end - start;
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

export default function App() {
  const { t, i18n } = useTranslation();
  const [streak, setStreak] = useState('');
  const [milestones, setMilestones] = useState([]);
  const [error, setError] = useState('');
  
  // New state for the motivational message
  const [motivationalMessage, setMotivationalMessage] = useState(null);
  const [showMotivation, setShowMotivation] = useState(false);
  const [shouldRenderMotivation, setShouldRenderMotivation] = useState(false);

  const inactivityTimerRef = useRef(null);
  const autoHideTimerRef = useRef(null);
  const hideAnimationTimerRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const streakRef = useRef('');
  const lastSavedStreakRef = useRef(null);

  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const languages = [
    { code: 'en', name: "English" },
    { code: 'es', name: "Español" },
    { code: 'pt', name: "Português" },
    { code: 'fr', name: "Français" },
    { code: 'it', name: "Italiano" },
    { code: 'de', name: "Deutsch" },
  ];

  const saveStreakToLocalStorage = (currentStreak) => {
    if (currentStreak > 0 && !isNaN(currentStreak)) {
      const data = {
        streak: currentStreak,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('duo-streak-data', JSON.stringify(data));
    }
  };

  // Format dates according to the language
  const formatDate = (date) => {
    return new Intl.DateTimeFormat(i18n.language, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  // Helper function to add months accurately, maintaining the day of the month
  // if possible, or adjusting to the end of the month (e.g., Jan 31st to Feb 28th/29th)
  const addMonths = (date, months) => {
      const d = new Date(date);
      const day = d.getDate();
      
      d.setDate(1); // Move to day 1 to avoid month skips (e.g., Jan 31st -> Mar 3rd)
      d.setMonth(d.getMonth() + months);
      
      // Find the last day of the new month
      const lastDayOfMonth = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
      
      // Restore the day, or use the last day of the month if the original was greater
      d.setDate(Math.min(day, lastDayOfMonth));
      return d;
  };

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

  const hideMotivation = () => {
    setShowMotivation(false);

    if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    if (hideAnimationTimerRef.current) clearTimeout(hideAnimationTimerRef.current);

    // Wait for the fade-out animation (500ms) to complete before unrendering
    hideAnimationTimerRef.current = setTimeout(() => {
      setShouldRenderMotivation(false);
      setMotivationalMessage(null);
      hideAnimationTimerRef.current = null;
    }, 500);
  };

  const triggerMotivation = (currentStreak) => {
    // Clear existing timers
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    if (hideAnimationTimerRef.current) {
        clearTimeout(hideAnimationTimerRef.current);
        hideAnimationTimerRef.current = null;
    }

    const msg = generateMotivationalMessage(currentStreak);
    if (msg) {
      setMotivationalMessage(msg);
      setShouldRenderMotivation(true);
      // Small delay to ensure the component is in the DOM before starting the entrance animation
      setTimeout(() => setShowMotivation(true), 10);

      // Save the current scroll position
      lastScrollYRef.current = window.scrollY;

      // Hide after 5 seconds
      autoHideTimerRef.current = setTimeout(hideMotivation, 5000);
    }
  };

  // Input handler to validate streak integers >= 0
  const handleStreakChange = (e) => {
    const value = e.target.value;
    
    // If the user changes the input, hide with fade-out
    if (showMotivation) {
        hideMotivation();
    }

    // Clear timers
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);

    if (value === '') {
      setStreak('');
      streakRef.current = '';
      setError('');
      return;
    }

    // Allow only positive integers
    if (/^\d+$/.test(value)) {
      setStreak(value);
      streakRef.current = value;
      setError('');
      setActiveDropdown(null);

      // Start a 3-second inactivity timer
      const currentStreak = Number(value);
      if (currentStreak > 0) {
        inactivityTimerRef.current = setTimeout(() => {
          triggerMotivation(currentStreak);
        }, 3000);
      }
    } else {
      // Keep current value if input is invalid but allow correction
      setError(t('input.error'));
    }
  };
  
  // Handler for when the input loses focus
  const handleBlur = () => {
      const currentStreak = Number(streak);
      if (currentStreak > 0 && !isNaN(currentStreak)) {
          triggerMotivation(currentStreak);
          if (currentStreak !== lastSavedStreakRef.current) {
            saveStreakToLocalStorage(currentStreak);
            lastSavedStreakRef.current = currentStreak;
          }
      }
  };

  useEffect(() => {
    document.title = t('app.title').toUpperCase();
  }, [i18n.language, t]);

  useEffect(() => {
    const savedData = localStorage.getItem('duo-streak-data');
    if (savedData) {
      try {
        const { streak: savedStreak, timestamp } = JSON.parse(savedData);
        const daysPassed = getCalendarDaysDiff(timestamp, new Date());
        const updatedStreak = Number(savedStreak) + daysPassed;

        if (!isNaN(updatedStreak) && updatedStreak >= 0) {
          const streakStr = updatedStreak.toString();
          setStreak(streakStr);
          streakRef.current = streakStr;
          // Save back updated streak with current timestamp
          saveStreakToLocalStorage(updatedStreak);
          lastSavedStreakRef.current = updatedStreak;
        }
      } catch (e) {
        console.error("Failed to parse saved streak data", e);
      }
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown && dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Only close if we didn't click on another milestone card
        if (!event.target.closest('[role="listitem"]')) {
          setActiveDropdown(null);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeDropdown]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const isScrollingDown = currentScroll > lastScrollYRef.current;

      if (showMotivation && isScrollingDown) {
        hideMotivation();
      }

      // Save to localStorage when scrolling down, even if motivation is not showing
      if (isScrollingDown) {
        const currentStreakValue = Number(streakRef.current);
        if (currentStreakValue > 0 && !isNaN(currentStreakValue) && currentStreakValue !== lastSavedStreakRef.current) {
          saveStreakToLocalStorage(currentStreakValue);
          lastSavedStreakRef.current = currentStreakValue;
        }
      }

      lastScrollYRef.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
      if (hideAnimationTimerRef.current) clearTimeout(hideAnimationTimerRef.current);
    };
  }, [showMotivation]);

  useEffect(() => {
    if (!streak) {
      setMilestones([]);
      return;
    }

    const currentStreak = Number(streak);
    if (isNaN(currentStreak) || currentStreak < 0) return;
    
    const today = new Date();
    const futureMilestones = new Map(); // We use a Map to store {days: label}
    const limit = currentStreak + 2000; // Search for milestones in the next 2000 days

    // Determine the streak start date
    const streakStartDate = new Date(today);
    streakStartDate.setDate(today.getDate() - currentStreak);
    
    // Days in milliseconds
    const MS_PER_DAY = 1000 * 60 * 60 * 24;

    // --- MILESTONE CALCULATION LOGIC ---
    
    // 1. Multiples of Months (Using real months) - LIMITED TO THE NEXT 3 AND UP TO 365 DAYS.
    let monthsFound = 0;
    let monthCount = 1; // Counter for the anniversary month number (1 month, 2 months, etc.)

    while (monthsFound < 3) {
        const nextMilestoneDate = addMonths(streakStartDate, monthCount);
        
        // Calculate total days from streak start to exact monthly milestone
        const daysToMilestone = Math.ceil((nextMilestoneDate - streakStartDate) / MS_PER_DAY);
        
        // 1a. If milestone is after the first year (365 days), stop searching for months.
        if (daysToMilestone > 365) {
            break;
        }
        
        // 1b. If milestone hasn't been reached yet, add it to the map
        if (daysToMilestone > currentStreak) {
            futureMilestones.set(daysToMilestone, { key: 'milestone.month', count: monthCount });
            monthsFound++;
        }
        
        monthCount++;

        // Fallback: If month 12 has passed and we haven't found 3 milestones (e.g., currentStreak=364), stop loop.
        if (monthCount > 12 && monthsFound < 3) { 
            break; 
        }
    }

    // 2. Multiples of 100 - LIMITED TO THE NEXT 3 (up to 1000)
    let hundredsFound = 0;
    for (let i = 100; i <= 1000; i += 100) { 
      if (i > currentStreak) {
        // Only add if it's not a more precise monthly milestone already calculated
        if (!futureMilestones.has(i)) {
          futureMilestones.set(i, ''); // No predefined label (will be handled below)
        }
        hundredsFound++;
        if (hundredsFound >= 3) break; 
      }
    }
    
    // 3. Multiples of 250
    for (let i = 250; i <= limit; i += 250) {
      if (i > currentStreak && !futureMilestones.has(i)) {
        futureMilestones.set(i, '');
      }
    }
    
    // 4. Multiples of 500 / 1000 (Major milestones)
    for (let i = 500; i <= limit; i += 500) {
      if (i > currentStreak && !futureMilestones.has(i)) {
        futureMilestones.set(i, '');
      }
    }

    // 5. Multiples of Years (365, 730, etc.)
    // Leap Year Logic Implemented
    let yearCount = 1;
    // We search up to 6 years into the future for a 2000-day limit
    while (yearCount <= (limit / 365) + 1) { 
        // Clone streak start date and add exact number of years
        const nextMilestoneDate = new Date(streakStartDate);
        nextMilestoneDate.setFullYear(nextMilestoneDate.getFullYear() + yearCount);
        
        // Calculate exact number of days (including leap years)
        const daysToMilestone = Math.ceil((nextMilestoneDate - streakStartDate) / MS_PER_DAY);
        
        if (daysToMilestone > currentStreak) {
            // Label generated directly here, replacing any monthly or 100-day milestones that might overlap
            futureMilestones.set(daysToMilestone, { key: 'milestone.year', count: yearCount });
        }

        yearCount++;
    }

    // Get only keys (days), sort, and limit
    const sortedMilestones = Array.from(futureMilestones.keys())
      .filter(m => m > currentStreak)
      .sort((a, b) => a - b)
      .slice(0, 15);

    // Create objects with full data
    const results = sortedMilestones.map(m => {
      const daysDiff = m - currentStreak;
      const targetDate = new Date();
      targetDate.setDate(today.getDate() + daysDiff);
      
      const labelData = futureMilestones.get(m); // Get precise label from map
      
      // Determine styles
      let isMajor = false; // Gold (Years, 500s)
      let isMedium = false; // Blue (Exact months)

      // Identify if it's an exact yearly milestone
      const isYearMilestone = labelData && labelData.key === 'milestone.year';

      // Identify if it's an exact monthly milestone (not yearly)
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
  }, [streak, t]);

  const getEventTitle = (item) => {
    if (item.labelData) {
      const type = item.labelData.key === 'milestone.month' ? 'month' : 'year';
      return t(`calendar.event_title_${type}`, { count: item.labelData.count });
    }
    return t('calendar.event_title_days', { count: item.target });
  };

  const formatCalendarDate = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}${m}${d}`;
  };

  const getCalendarDates = (date) => {
    const start = formatCalendarDate(date);
    const nextDay = new Date(date);
    nextDay.setDate(date.getDate() + 1);
    const end = formatCalendarDate(nextDay);
    return `${start}/${end}`;
  };

  const handleGoogleCalendar = (item) => {
    const title = getEventTitle(item);
    const dates = getCalendarDates(item.date);
    const url = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${encodeURIComponent(t('calendar.event_description'))}&sf=true&output=xml`;
    window.open(url, '_blank');
    setActiveDropdown(null);
  };

  const handleIcsDownload = (item) => {
    const title = getEventTitle(item);
    const start = formatCalendarDate(item.date);
    const nextDay = new Date(item.date);
    nextDay.setDate(item.date.getDate() + 1);
    const end = formatCalendarDate(nextDay);

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Duo Streak Birthday//EN',
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${start}`,
      `DTEND;VALUE=DATE:${end}`,
      `SUMMARY:${title}`,
      `DESCRIPTION:${t('calendar.event_description')}`,
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `duolingo-milestone-${item.target}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
    setActiveDropdown(null);
  };

  const toggleDropdown = (id, e) => {
    e.stopPropagation();
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-700 pb-10">
      
      {/* App-style Header */}
      <header className="bg-white border-b-2 border-gray-200 sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-8 h-8 text-yellow-400 fill-current" />
            {/* Updated title */}
            <h1 className="text-xl font-bold text-gray-400 tracking-wide uppercase">{t('app.title')}</h1>
          </div>

          <div className="relative">
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="bg-gray-100 hover:bg-gray-200 px-3 py-2 rounded-xl flex items-center gap-2 border-2 border-gray-200 transition-colors"
              aria-label="Languages"
            >
               <Languages className="w-5 h-5 text-gray-600" />
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
        
        {/* Main Input Card */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-gray-200 mb-8">
          <h1 className="block text-center text-lg font-bold text-gray-800 mb-4">
            <label htmlFor="streak-input" className="cursor-pointer">
              {t('input.label')}
            </label>
          </h1>
          <div className="relative max-w-xs mx-auto">
            <input
              id="streak-input"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={streak}
              onChange={handleStreakChange}
              onBlur={handleBlur} // Added onBlur event
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

        {/* Temporary Motivational Message */}
        <div className="relative h-0 z-20">
          {shouldRenderMotivation && motivationalMessage && (
              <div
                  className={`absolute top-0 left-0 right-0 bg-green-100 border-2 border-green-500 text-green-800 p-4 rounded-xl text-center shadow-lg transition-all duration-500 ease-in-out ${
                    showMotivation ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
              >
                  <button
                    onClick={hideMotivation}
                    className="absolute top-2 right-2 text-gray-400"
                    aria-label="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <Star className="w-5 h-5 inline mr-2 text-green-600 fill-current animate-pulse" />
                  <span className="font-semibold">{t(motivationalMessage.key, motivationalMessage.options)}</span>
              </div>
          )}
        </div>

        {/* Results List */}
        <div className="space-y-4 pt-6">
          {streak && milestones.length > 0 ? (
            <>
              <h2 className="text-gray-400 font-bold uppercase tracking-widest text-sm ml-2 mb-4">{t('timeline.title')}</h2>
              {milestones.map((item, index) => (
                <div 
                  key={item.target}
                  onClick={(e) => toggleDropdown(item.target, e)}
                  className={`relative group rounded-2xl border-b-4 transition-all cursor-pointer hover:scale-[1.02] ${
                    activeDropdown === item.target ? 'z-40' : ''
                  } ${
                    item.isMajor 
                      ? 'bg-yellow-400 border-yellow-600 text-white' 
                      : item.isMedium
                        ? 'bg-blue-500 border-blue-700 text-white'
                        : 'bg-white border-gray-200 text-gray-700'
                  }`}
                  role="listitem"
                >
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Left Icon */}
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
                      
                      {/* Main Info */}
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-black ${
                            item.isMajor || item.isMedium ? 'text-white' : 'text-green-500'
                          }`}>
                            {item.target}
                          </span>
                          {/* Month/Year label if exists */}
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

                    {/* Calendar icon on the right (75%) */}
                    <div className="absolute left-[75%] top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <Calendar className={`w-7 h-7 transition-colors ${
                        item.isMajor || item.isMedium
                          ? 'text-white/60 group-hover:text-white'
                          : 'text-gray-300 group-hover:text-gray-600'
                      }`} />
                    </div>

                    {/* Days remaining */}
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

                  {/* Calendar Dropdown */}
                  {activeDropdown === item.target && (
                    <div
                      ref={dropdownRef}
                      className="absolute left-[75%] -translate-x-1/2 top-full mt-1 w-48 bg-white rounded-2xl shadow-xl border-2 border-gray-100 py-2 z-50 text-gray-700 animate-in fade-in zoom-in duration-200"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => handleGoogleCalendar(item)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span className="font-medium text-sm">{t('calendar.google')}</span>
                      </button>
                      <button
                        onClick={() => handleIcsDownload(item)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        <span className="font-medium text-sm">{t('calendar.icloud')}</span>
                      </button>
                      <button
                        onClick={() => handleIcsDownload(item)}
                        className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                      >
                        <div className="w-2 h-2 bg-gray-400 rounded-full" />
                        <span className="font-medium text-sm">{t('calendar.ical')}</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </>
          ) : (
            // Empty state / Welcome
            <div className="text-gray-800 space-y-8">
              <section>
                <h1 className="text-2xl font-bold mb-4">{t('info.title1')}</h1>
                <p className="leading-relaxed">{t('info.text1')}</p>
              </section>

              <section>
                <h2 className="text-xl font-bold mb-4">{t('info.title2')}</h2>
                <p className="leading-relaxed mb-4">{t('info.text2')}</p>
                <p className="leading-relaxed mb-2">{t('info.text3')}</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>{t('info.bullet1')}</li>
                  <li>{t('info.bullet2')}</li>
                </ul>
              </section>
            </div>
          )}
        </div>
      </main>

      {!streak && (
        <footer className="mt-12 text-center text-gray-400 text-xs font-bold uppercase tracking-widest pb-8">
          {t('footer.made_by')}{' '}
          <a
            href="https://github.com/miguelovergara"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600 transition-colors underline decoration-dotted underline-offset-4"
          >
            @miguelovergara
          </a>
        </footer>
      )}

      <Analytics />
    </div>
  );
}
