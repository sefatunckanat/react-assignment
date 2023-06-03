import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { expect, test } from "vitest";

import App from "../App";

test("SignIn Wrong Format Email", async () => {
	const { getByRole, debug, getByText, getByPlaceholderText } = render(<App />);

	const emailInput = getByPlaceholderText(/enter e-mail/i);
	const passwordInput = getByPlaceholderText(/enter password/i);

	fireEvent.change(emailInput, {
		target: {
			value: "formatmail",
		},
	});

	fireEvent.change(passwordInput, {
		target: {
			value: "user123",
		},
	});

	const submitButton = getByRole("button");
	fireEvent.click(submitButton);

	const findLoading = await getByText("Loading...");

	expect(findLoading).toBeInTheDocument();

	await waitFor(() =>
		expect(getByText("Email format is invalid")).toBeInTheDocument()
	);
});

test("SignIn Successfull", async () => {
	const { getByRole, debug, getByPlaceholderText, getByText } = render(<App />);

	const emailInput = getByPlaceholderText(/enter e-mail/i);
	const passwordInput = getByPlaceholderText(/enter password/i);

	fireEvent.change(emailInput, {
		target: {
			value: "user@mail.com",
		},
	});

	fireEvent.change(passwordInput, {
		target: {
			value: "user123",
		},
	});

	const submitButton = getByRole("button");
	fireEvent.click(submitButton);

	await getByText("Loading...");

	await waitFor(() => expect(getByText("Product List")));

	debug();
});
