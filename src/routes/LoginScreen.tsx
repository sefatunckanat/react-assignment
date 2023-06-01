import AuthLayout from "../layouts/AuthLayout";
import { LoginForm } from "../sections/auth/login";

export default function LoginScreen() {
	return (
		<AuthLayout>
			<LoginForm />
		</AuthLayout>
	);
}
