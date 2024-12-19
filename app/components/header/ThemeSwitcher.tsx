'use client';

import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { MdLightMode, MdNightlight } from 'react-icons/md';

const ThemeSwitcher = () => {
	const [themeMode, setThemeMode] = useState(
		localStorage.getItem('theme') || 'light',
	);

	const enableDarkMode = () => {
		document.documentElement.classList.add('dark');
		localStorage.setItem('theme', 'dark');
		setThemeMode('dark');
	};

	const enableLightMode = () => {
		document.documentElement.classList.remove('dark');
		localStorage.setItem('theme', 'light');
		setThemeMode('light');
	};

	const toggleTheme = () => {
		if (themeMode === 'dark') {
			enableLightMode();
		} else {
			enableDarkMode();
		}
	};

	useEffect(() => {
		if (themeMode === 'dark') {
			enableDarkMode();
		}
	}, []);

	return (
		<Button
			variant="outline"
			onClick={toggleTheme}
			className="flex justify-center items-center p-0 rounded-full !w-[50px] !h-[50px]"
		>
			{themeMode === 'dark' ? <MdLightMode /> : <MdNightlight />}
		</Button>
	);
};

export default ThemeSwitcher;
