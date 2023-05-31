import React, { PropsWithChildren, useEffect } from "react";
import axios from "../utils/axios";

export enum ActionType {
	SIGN_IN = "SIGN_IN",
	LOGOUT = "LOGOUT",
	SET_ERROR = "SET_ERROR",
	SET_LOADING = "SET_LOADING",
}

interface IUser {
	email: string;
}

interface IAction {
	type: ActionType;
	token?: string;
	userData?: IUser;
	loading?: boolean;
	error?: string | undefined | null;
}

interface IAuthState {
	token: string | undefined | null;
	userData: IUser | undefined | null;
	loading: boolean | undefined | null;
	error: string | undefined | null;
	loggedIn: boolean;
}

export interface IAuthContext {
	state: IAuthState;
	dispatch: React.Dispatch<IAction>;
	onSignIn: (email: string, password: string) => void;
	onLogout: () => void;
	loggedIn: () => boolean;
}

const initialState: IAuthState = {
	token: null,
	userData: null,
	loading: false,
	error: null,
	loggedIn: false,
};

const Reducer = (state: IAuthState, action: IAction): typeof initialState => {
	switch (action.type) {
		case ActionType.SIGN_IN:
			return { ...state, userData: action.userData };
		case ActionType.SET_LOADING:
			return { ...state, loading: action.loading };
		case ActionType.SET_ERROR:
			return { ...state, error: action.error, loading: false };
		case ActionType.LOGOUT:
			return { ...state, token: null, userData: null };
		default:
			throw new Error();
	}
};

const AuthContext = React.createContext<IAuthContext>({
	state: { ...initialState },
	dispatch: () => null,
	onSignIn: (email: string, password: string) => null,
	onLogout: () => true,
	loggedIn: () => false,
});

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = React.useReducer(
		Reducer,
		initialState as IAuthState
	);

	const onSignIn = async (email: string, password: string) => {
		dispatch({ type: ActionType.SET_LOADING, loading: true });

		try {
			const request = await axios.post("/login", { email, password });
			const response = await request.data;

			console.log(response);
		} catch (error) {
			if (error instanceof Error) {
				const errorMessage: string = error.message;
				dispatch({ type: ActionType.SET_LOADING, error: errorMessage });
			}
		}

		dispatch({ type: ActionType.SET_LOADING, loading: false });
	};

	const onLogout = () => {
		dispatch({ type: ActionType.LOGOUT });
		return true;
	};

	const loggedIn = () => {
		return !!state.userData;
	};

	const value = { state, dispatch, onSignIn, onLogout, loggedIn };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
