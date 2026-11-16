import '@emotion/react';

// Same loose theme typing as client/app/layout.tsx
declare module '@emotion/react' {
	export interface Theme {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		[key: string]: any;
	}
}
