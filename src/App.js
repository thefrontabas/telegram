import React, { useEffect, useState } from "react";
function App() {
	const [num, setnum] = useState("");
	const [res, setres] = useState("");
	useEffect(() => {
		let red = new Intl.NumberFormat("fa-IR").format(+num);
		setres(red);
	}, [num]);
	return (
		<>
			<input
				type="text"
				value={num}
				onChange={(e) => setnum(Number(e.target.value))}
				style={{ color: "#000" }}
			/>
			<div style={{ color: "#fff" }}>{res}</div>
		</>
	);
}

export default App;
