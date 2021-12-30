import NavbarTop from "../../../components/elements/NavbarTop";
import Layout from "../../../components/Layout";
import dataSchedule from "../../../mock_data/classes.json";
import ScheduleItem from "../../../components/elements/ScheduleItem";

export default function MySchedule() {
	return (
		<Layout>
			<NavbarTop title={"My Schedule"} />
			<div className="d-flex flex-column pb-5 mb-5">
				{dataSchedule.data.map((item) => (
					<ScheduleItem key={item.id} entries={item} />
				))}
			</div>
		</Layout>
	);
}
