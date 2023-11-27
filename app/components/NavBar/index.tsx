"use client";
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import "./index.scss";
const NavBar = () => {
	const [address, setAddress] = useState("22222");
	return (
		<div className="narbar-wrap">
			<div className="icon icon-sort" />
			<div className="address-wrap">
				<div className="icon icon-location"/>
				<div className="address-text">{address}</div>
			</div>
			<Avatar alt="Travis Howard" src="../../static/image/sort.svg" sizes="32"/>
		</div>
	);
};

export default NavBar;
