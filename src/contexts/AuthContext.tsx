import React, { PropsWithChildren, useEffect } from "react";
import axios from "../utils/axios";
import { wait } from "../utils/helper";

export enum ActionType {
	SIGN_IN = "SIGN_IN",
	LOGOUT = "LOGOUT",
	SET_ERROR = "SET_ERROR",
	SET_LOADING = "SET_LOADING",
}

interface IUser {
	email: string;
	id: number;
}

interface IAction {
	type: ActionType;
	userData?: IUser;
	loading?: boolean;
	error?: string | null;
}

interface IAuthState {
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

interface ILoginResponse {
	accessToken: string;
	user: IUser;
}

const initialState: IAuthState = {
	userData: null,
	loading: true,
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
			return { ...state, userData: null, loading: false };
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

const setSession = (accessToken: string | null | undefined) => {
	if (accessToken) {
		localStorage.setItem("Token", accessToken);
		axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
	} else {
		localStorage.removeItem("Token");
		delete axios.defaults.headers.common.Authorization;
	}
	console.log("Loaded access token", accessToken);
	return null;
};

const AuthContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
	const [state, dispatch] = React.useReducer(
		Reducer,
		initialState as IAuthState
	);

	const onSignIn = async (email: string, password: string) => {
		dispatch({ type: ActionType.SET_LOADING, loading: true });

		try {
			const request = await axios.post("/login", { email, password });
			const response: ILoginResponse = await request.data;

			if (response.accessToken) {
				setSession(response.accessToken);
				dispatch({ type: ActionType.SIGN_IN, userData: response.user });
				dispatch({ type: ActionType.SET_ERROR, error: null });
			}
		} catch (error) {
			if (typeof error === "string") {
				console.log("ERROR", error);
				dispatch({ type: ActionType.SET_ERROR, error });
			}
		}

		dispatch({ type: ActionType.SET_LOADING, loading: false });
	};

	const onLogout = () => {
		dispatch({ type: ActionType.LOGOUT });
		setSession(null);
		return true;
	};

	const loadProfile = async () => {
		dispatch({ type: ActionType.SET_LOADING, loading: true });
		try {
			await wait();
			await axios.get("/products");
			// BUG: Rest api servisinde token verify olmadığı icin yapılamadı.
			// Onun yerine localStorage daki tokeni ile ürün listesi sorgulayıp
			// Bir sorun olmama durumunda yüklenen user listesinden ilk kullanıcı set ediyorum.

			const req = await axios.get("/users");
			const { data } = req;
			if (data) {
				dispatch({
					type: ActionType.SIGN_IN,
					userData: { email: data[0].email, id: data[0].id },
				});
			}
		} catch (error) {
			onLogout();
		}

		dispatch({ type: ActionType.SET_LOADING, loading: false });
	};

	const loggedIn = () => {
		return !!state.userData;
	};

	useEffect(() => {
		const accessToken = localStorage.getItem("Token");
		if (accessToken) {
			setSession(accessToken);
			loadProfile();
		} else {
			dispatch({ type: ActionType.SET_LOADING, loading: false });
		}
	}, []);

	const value = { state, dispatch, onSignIn, onLogout, loggedIn };
	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthContextProvider };
