import Navbar from "./elements/navbar";

export default function Layout(props) {
	return (
		<>
			{props.children}
			<Navbar />
		</>
	);
}
