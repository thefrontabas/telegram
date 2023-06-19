import React, { useState } from "react";

export default class Web extends React.Component {
	state = {
		val: [],
	};

	render() {
		let count = 0;
		let num = (text) => {
			for (let index = 0; index < text.length; index++) {
				for (let x = 0; x < text.length; x++) {
					if (text[index] == text[x]) {
						count += 1;
						console.log(`{${text[index]}:${index}}`);
					}
				}
			}
		};
		num("abbas");
		return <>{this.state.val}</>;
	}
}
