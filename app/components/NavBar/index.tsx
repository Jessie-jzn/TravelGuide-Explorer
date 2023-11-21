"use client";
import { useState } from "react";
import "./index.scss";
const NavBar = () => {
	const [address, setAddress] = useState("");
	return (
		<div className="narbar-wrap">
			<div className="icon icon-sort" />
			<div className="adress">
				<div className="icon icon-location">
					<div>{address}</div>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
