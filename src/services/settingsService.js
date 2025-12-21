import { db } from '../db/database';
import { getFinancialMonthStart, getFinancialMonthEnd } from "../utils/dateUtils";


export const setMonthlyIncome = async amount => {
    await db.settings.put({ key: 'monthlyIncome', value: amount });
};

export const getMonthlyIncome = async (currentDate = new Date()) => {
    // Sum all income records for the current month
    const start = getFinancialMonthStart(currentDate);
    const end = getFinancialMonthEnd(currentDate);
    const incomeRecords = await db.income
        .where("date")
        .between(start.toISOString(), end.toISOString(), true, true)
        .toArray();
    return incomeRecords.reduce((sum, i) => sum + (i.amount || 0), 0);
};

// LocalStorage-based settings for theme and payDay
const SETTINGS_KEY = 'expenseTrackerSettings';

const defaultSettings = {
    theme: 'light',
    payDay: 1,
};

/**
 * Get all settings from localStorage
 */
export const getSettings = () => {
    try {
        const stored = localStorage.getItem(SETTINGS_KEY);
        return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch (error) {
        console.error('Error reading settings:', error);
        return defaultSettings;
    }
};

/**
 * Save settings to localStorage
 */
export const saveSettings = (settings) => {
    try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    } catch (error) {
        console.error('Error saving settings:', error);
    }
};

/**
 * Get a specific setting
 */
export const getSetting = (key) => {
    const settings = getSettings();
    return settings[key];
};

/**
 * Update a specific setting
 */
export const updateSetting = (key, value) => {
    const settings = getSettings();
    settings[key] = value;
    saveSettings(settings);
};
