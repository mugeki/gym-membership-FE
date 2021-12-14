import Image from "next/image";

export default function HomeClassesItem() {
	const imgUrl =
		"https://images.unsplash.com/photo-1594737626072-90dc274bc2bd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80";
	return (
		<div
			className="d-flex align-items-end text-white text-center rounded m-0"
			style={{
				backgroundImage: `url(${imgUrl}), linear-gradient(rgba(255,255,255,0) 0%, rgba(0,0,0,0.7) 100%)`,
				backgroundSize: "cover",
				backgroundBlendMode: "multiply",
				width: "130px",
				height: "130px",
				fontSize: "12px",
			}}
		>
			<div className="d-flex flex-column w-100 pb-2">
				<p className="d-block mb-0 fw-bolder">Zumba</p>
				<p className="d-block mb-0">Monday</p>
				<p className="d-block mb-0">07:00 - 08:00 AM</p>
			</div>
		</div>
	);
}
