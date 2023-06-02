import React, { useState } from "react";

import styles from "./StarRating.module.sass";

interface IStar {
	value: number;
	readOnly?: boolean;
	onChange?: (value: number) => void;
}

export default function StarRating({
	value,
	readOnly = false,
	onChange,
}: IStar) {
	return (
		<div
			className={[
				styles.StarRating,
				readOnly ? styles.StarRating__disabled : "",
			].join(" ")}
		>
			<div>
				{[...Array(5)].map((star, index) => {
					index += 1;
					return (
						<button
							type="button"
							key={index}
							className={[
								readOnly ? styles.StarRating__button__disabled : "",
								styles.StarRating__button,
								index <= value ? styles.StarRating__button__active : "",
							].join(" ")}
							onClick={() => {
								if (onChange && !readOnly) onChange(index);
							}}
						>
							<span>&#9733;</span>
						</button>
					);
				})}
			</div>
			<span>{+value.toFixed(1)}</span>
		</div>
	);
}
