import Image from "next/image";

export default function Receipt({id, type, entries}){
    return(
        <>
            <div className="mt-4 d-flex flex-column align-items-center">
                <div className="col-12 d-flex flex-column align-items-center">
                <div className=" col-3">
                    <Image
                    layout="intrinsic"
                    objectFit="cover"
                    alt="logo"
                    src={`https://firebasestorage.googleapis.com/v0/b/gym-membership-8fe2f.appspot.com/o/Picture1.png?alt=media&token=b9fe1e67-cf3e-454b-b4ab-7643285f49ca`}
                    width={100}
                    height={80}
                    />
                    </div>
                </div>
                <p className="fw-bold fw-light fst-italic">Dare to Be Great</p>
                <p></p>
                <p className="fs-2 text-primary mb-0">
                    Rp {entries?.nominal.toLocaleString().replace(/,/g, ".")}
                </p>
                <p className="text-light text-capitalize">{`${type} payment`}</p>
                <div className="d-flex flex-column align-self-start card shadow rounded-3  m-4 py-5 px-3"> 
                    <div className="d-flex">
                        <p className="fs-4 fw-bold ">Receipt ID </p>
                        <p className="fs-4 ms-3 text-light">{`#${entries?.id}`} </p>
                    </div>
                    <table className="table table-borderless">
                        <tr>
                            <td className="fs-6  col-4 align-top">Billing Info </td>
                            <td className="fs-6 ms-3 col-9">: Transfer to BRI a/n PT Subur Jaya 3245368939 </td>
                        </tr>
                        <tr>
                            <td className="fs-6  col-4 align-top">Status </td>
                            <td className="fs-6 ms-3 col-9">: Completed</td>
                        </tr>
                        <tr>
                            <td className="fs-6  col-4 align-top"> Summary </td>
                            <td className="fs-6 ms-3 col-4 align-top text-capitalize">{`: ${entries?.product_name} (${type})`}</td>
                        </tr>
                    </table>
                    <div className='hr'></div>
                    <table className="table table-borderless mt-4">
                        <tr>
                            <td className="fs-6  col-4 align-top">Discount</td>
                            <td className="fs-6 ms-3 col-4 align-top">: -</td>
                            <td className="fs-6 ms-3 col-4 align-top">Rp 0</td>
                        </tr>
                        <tr>
                            <td className="fs-6  col-4 align-top">Total</td>
                            <td className="fs-6 ms-3 col-4 align-top">: </td>
                            <td className="fs-6 ms-3 col-4 align-top">Rp {entries?.nominal.toLocaleString().replace(/,/g, ".")}</td>
                        </tr>
                    </table>
                </div>
                

                
            </div>
        </>
    );
    
}
