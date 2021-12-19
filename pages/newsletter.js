import Newsletter from "../components/elements/Newsletter";
import Layout from "../components/Layout";
import dataNewsletter from "../mockdata/newsletter.json";


export default function newsletter (){
    const splitData = (array, chunkSize) =>
		Array(Math.ceil(array.length / chunkSize))
			.fill()
			.map((_, newsletter) => newsletter * chunkSize)
			.map((begin) => array.slice(begin, begin + chunkSize));
	return (

        <Layout>
            <div className="container p-4">
        <main className="d-flex flex-column justify-content-center">
					<h4 className="text-start fw-bolder mb-4  container">Newsletter</h4>

                    {dataNewsletter.data.map((item) => (
						<Newsletter key={item.id} entries={item} />
					))}
					</main>
                    </div>
                    </Layout>

    )
    }