export default function NewsletterItem() {
	const imgUrl =
		"https://lh6.googleusercontent.com/1KMsaUi_iWEIAb_5M27QpvIt1UHJ55YPcMppZnoF4WhsYm6OazrTBQihtR0CbJZoe-N_0qAuPQWQ2xu7-KBwbGPi3NiDdwiiCIcDS-o8p1UITQ6sank1fODwvCdSlIDm92nzNEKt";
	return (
		<div
			className="d-flex align-items-end text-white text-center rounded m-0"
			style={{
				backgroundImage: `url(${imgUrl}), linear-gradient(rgba(255,255,255,0) 0%, rgba(0,0,0,0.7) 100%)`,
				backgroundSize: "cover",
				backgroundBlendMode: "multiply",
				width: "100%",
				height: "153px",
				fontSize: "12px",
			}}
		>
			<div className="d-flex flex-column align-items-start w-100 p-3">
				<p className="d-block mb-0 fw-bolder fs-6">Coaching Personal</p>
				<p className="d-block mb-0">7 Dec 2021</p>
			</div>
		</div>
	);
}
