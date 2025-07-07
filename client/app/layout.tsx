'use client';
import "@/styles/global.scss";
import theme from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import store from "@/store/store";
import LayoutWrapper from "./LayoutWrapper";

declare module '@emotion/react' {
  export interface Theme {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
  export interface State {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </ThemeProvider>
    </Provider>
  );
}
