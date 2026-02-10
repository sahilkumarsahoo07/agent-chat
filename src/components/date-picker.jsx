'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DatePicker({ value, onChange, placeholder = "Select Date" }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value || null);
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const popupRef = useRef(null);

    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];
        // Add empty slots for days before start of month
        for (let i = 0; i < startingDayOfWeek; i++) {
            days.push(null);
        }
        // Add days of month
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(new Date(year, month, i));
        }
        return days;
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        onChange?.(date.toISOString().split('T')[0]);
        setIsOpen(false);
    };

    const handleToday = () => {
        const today = new Date();
        setSelectedDate(today);
        setCurrentMonth(today);
        onChange?.(today.toISOString().split('T')[0]);
        setIsOpen(false);
    };

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleYearChange = (e) => {
        setCurrentMonth(new Date(parseInt(e.target.value), currentMonth.getMonth()));
    };

    const formatDisplayDate = () => {
        if (!selectedDate) return '';
        const date = new Date(selectedDate);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const currentYear = currentMonth.getFullYear();
    const years = Array.from({ length: 20 }, (_, i) => currentYear - 10 + i);

    return (
        <div className="relative" ref={popupRef}>
            <div className="relative">
                <input
                    type="text"
                    readOnly
                    value={formatDisplayDate()}
                    placeholder={placeholder}
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg py-2 px-3 pr-10 text-sm focus:outline-none focus:border-[var(--sidebar-foreground)]/30 transition-colors text-[var(--foreground)] cursor-pointer"
                />
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-[var(--card)] border border-[var(--border)] hover:bg-[var(--border)]/40 px-2 py-1 rounded text-[10px] font-bold transition-colors"
                >
                    <Calendar size={12} />
                    Select Date
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-full left-0 mt-2 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl z-50 p-4 w-[280px]">
                    {/* Year selector and Today button */}
                    <div className="flex items-center gap-2 mb-4">
                        <div className="relative flex-1">
                            <select
                                value={currentYear}
                                onChange={handleYearChange}
                                className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg py-1.5 px-2 text-sm text-[var(--foreground)] appearance-none cursor-pointer pr-8"
                            >
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[var(--sidebar-foreground)] opacity-50 pointer-events-none" />
                        </div>
                        <button
                            onClick={handleToday}
                            className="bg-white text-black px-3 py-1.5 rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
                        >
                            Today
                        </button>
                    </div>

                    {/* Month navigation */}
                    <div className="flex items-center justify-between mb-3">
                        <button
                            onClick={handlePrevMonth}
                            className="p-1 hover:bg-[var(--border)]/40 rounded transition-colors"
                        >
                            <ChevronLeft size={16} className="text-[var(--foreground)]" />
                        </button>
                        <div className="text-sm font-bold text-[var(--foreground)]">
                            {monthNames[currentMonth.getMonth()]} {currentYear}
                        </div>
                        <button
                            onClick={handleNextMonth}
                            className="p-1 hover:bg-[var(--border)]/40 rounded transition-colors"
                        >
                            <ChevronRight size={16} className="text-[var(--foreground)]" />
                        </button>
                    </div>

                    {/* Day names */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {dayNames.map(day => (
                            <div key={day} className="text-center text-[10px] text-[var(--sidebar-foreground)] opacity-50 py-1">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {getDaysInMonth(currentMonth).map((day, idx) => {
                            if (!day) {
                                return <div key={`empty-${idx}`} />;
                            }

                            const isSelected = selectedDate &&
                                day.toDateString() === new Date(selectedDate).toDateString();
                            const isToday = day.toDateString() === new Date().toDateString();

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleDateSelect(day)}
                                    className={cn(
                                        "aspect-square flex items-center justify-center text-xs rounded-lg transition-colors",
                                        isSelected
                                            ? "bg-white text-black font-bold"
                                            : isToday
                                                ? "bg-[var(--border)] text-[var(--foreground)] font-bold"
                                                : "text-[var(--foreground)] hover:bg-[var(--border)]/40"
                                    )}
                                >
                                    {day.getDate()}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
