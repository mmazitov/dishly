'use client';

import { useEffect, useState } from 'react';

// Define available themes
export const colorSchemes = {
	DARK: '(prefers-color-scheme: dark)',
	LIGHT: '(prefers-color-scheme: light)',
};

export default function useDetectColorScheme(defaultScheme = 'light') {
	// Hook state
	const [scheme, setScheme] = useState(defaultScheme);

	useEffect(() => {
		// No support for detection
		if (!window.matchMedia) {
			return;
		}

		// The listener
		const listener = (e: MediaQueryListEvent) => {
			if (!e || !e.matches) {
				return;
			}

			const schemeNames = Object.keys(colorSchemes) as Array<
				keyof typeof colorSchemes
			>;
			for (let i = 0; i < schemeNames.length; i++) {
				const schemeName = schemeNames[i];

				if (e.media === colorSchemes[schemeName]) {
					setScheme(schemeName.toLowerCase());
					break;
				}
			}
		};

		// Loop through and setup listeners for the
		// media queries we want to monitor
		let activeMatches: MediaQueryList[] = [];
		Object.keys(colorSchemes).forEach((schemeName) => {
			const mq = window.matchMedia(
				colorSchemes[schemeName as keyof typeof colorSchemes],
			);

			// Call the listener manually for the initial check
			if (mq.matches) {
				const schemeNames = Object.keys(colorSchemes) as Array<
					keyof typeof colorSchemes
				>;
				for (let i = 0; i < schemeNames.length; i++) {
					const schemeName = schemeNames[i];
					if (mq.media === colorSchemes[schemeName]) {
						setScheme(schemeName.toLowerCase());
						break;
					}
				}
			}

			// Add event listener
			mq.addEventListener('change', listener);
			activeMatches.push(mq);
		});

		// Remove listeners, no memory leaks
		return () => {
			activeMatches.forEach((mq) => mq.removeEventListener('change', listener));
			activeMatches = [];
		};
		// Run on first load of hook only
	}, []);

	// Return the current scheme from state
	return scheme;
}
