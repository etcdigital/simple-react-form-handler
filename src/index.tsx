import dot from "dot-object";
import React, { FC, FormEvent, useCallback } from "react";

const getAttrs = (element: any): { name: string; value: string | boolean } => {
	const type = element.type;
	const name = element.getAttribute("name");
	let value = element.value || "";
	if (!type || type === "button" || type === "submit") {
		return { name: "", value: "" };
	}
	if (type === "checkbox") {
		value = element.getAttribute("checked") || false;
	}
	return { name, value };
};

export const Form: FC<
	JSX.IntrinsicElements["form"] & { onSubmit: (values: any) => void }
> = ({ onSubmit, children, ...props }) => {
	const handleSubmit = useCallback(
		(event: FormEvent) => {
			if (event) {
				event.preventDefault();
			}
			const target = event.target as any;
			const elementsKeys = Object.keys(target.elements);

			const objects: any = {};

			elementsKeys.forEach((key: any) => {
				if ([target.elements[key]].toString() === "[object RadioNodeList]") {
					target.elements[key].forEach((el) => {
						const { name, value } = getAttrs(el);
						if (name) {
							dot.set(name, value, objects, true);
						}
					});
				} else {
					const { name, value } = getAttrs(target.elements[key]);
					if (name) {
						dot.set(name, value, objects, true);
					}
				}
			});

			onSubmit(objects);
		},
		[onSubmit],
	);

	return (
		<form {...props} onSubmit={handleSubmit}>
			{children}
		</form>
	);
};

export default Form;
