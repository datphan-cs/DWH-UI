"use client";

import { SessionProvider } from "next-auth/react";
import { store } from "./store"
import { Provider } from "react-redux";

type Props = {
    children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export const ReduxProvider = ({ children }: Props) => {
    return <Provider store={store}> {children} </Provider>;
};