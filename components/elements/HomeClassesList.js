import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import useHandleDate from "../../hooks/useHandleDate";
import HomeClassesItem from "./HomeClassesItem";

export default function HomeClassesList({ entries, error, setError }) {
	const { parseDateList } = useHandleDate();
	const splitData = (array, chunkSize) =>
		Array(Math.ceil(array.length / chunkSize))
			.fill()
			.map((_, index) => index * chunkSize)
			.map((begin) => array.slice(begin, begin + chunkSize));

	const processData = () => {
		let result = [];
		for (const entry of entries) {
			const dateArr = parseDateList(entry.date);
			if (dateArr) {
				for (const date of dateArr) {
					result.push({ ...entry, date: date });
				}
			}
		}
		return result;
	};
	const classesData = processData();
	if (!error && classesData.length === 0) {
		setError("No upcoming class in the next 1 week");
	}
	return (
		<>
			{classesData.length === 0 ? (
				<p className="text-center text-light mt-5"></p>
			) : (
				<Carousel showIndicators={false} showThumbs={false} showStatus={false}>
					{splitData(classesData, 3).map((chunk, i) => (
						<div key={i} className="d-flex justify-content-evenly">
							{chunk.map((item, i) => (
								<HomeClassesItem key={i} entries={item} />
							))}
						</div>
					))}
				</Carousel>
			)}
		</>
	);
}
