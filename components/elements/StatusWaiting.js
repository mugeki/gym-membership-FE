import { useRouter } from "next/router";

export default function StatusWaiting({ hrefTo }) {
	return (
		<>
			<div className="d-flex bg-body rounded justify-content-center">
				<div
					className={`p-3 shadow-lg rounded-3 d-flex flex-column col-10  align-items-start mt-6`}
				>
					<p className="text-primary fw-bold fs-4">Hi!</p>
					<p className="m-0">
						At the moment your payment still processing to verification.
					</p>
					<p>Please kindly wait for an update from us</p>
					<p className="m-0">We&apos;re sorry for incovenience, </p>
					<p className="m-0">Your Payment will be confirmed in very soon</p>
				</div>
			</div>
		</>
	);
}
