//
export default function Receipt({entries, productType}){
    
    return(
        <>
            <div className="mt-4 d-flex flex-column align-items-center">
                <div className="col-12 d-flex flex-column align-items-center">
                    <div className="bg-dark col-3"><p>a</p></div>
                    <p className="fw-bold">Company.Inc</p>
                </div>
                <p></p>
                <p className="fs-2 text-primary mb-0">
                    Rp {entries.price.toLocaleString().replace(/,/g, ".")}
                </p>
                <p className="text-light text-capitalize">{productType}</p>
                <div className="d-flex flex-column align-self-start card shadow rounded-3  m-4 py-5 px-3"> 
                    <div className="d-flex">
                        <p className="fs-4 fw-bold ">Receipt ID </p>
                        <p className="fs-4 ms-3 text-light">{`#${entries.id}`} </p>
                    </div>
                    <table class="table table-borderless">
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
                            <td className="fs-6 ms-3 col-4 align-top">{`: ${entries.name}`}</td>
                        </tr>
                    </table>
                    <div className='hr'></div>
                    <table class="table table-borderless mt-4">
                        <tr>
                            <td className="fs-6  col-4 align-top">Discount</td>
                            <td className="fs-6 ms-3 col-4 align-top">: -</td>
                            <td className="fs-6 ms-3 col-4 align-top">Rp 0</td>
                        </tr>
                        <tr>
                            <td className="fs-6  col-4 align-top">Total</td>
                            <td className="fs-6 ms-3 col-4 align-top">: </td>
                            <td className="fs-6 ms-3 col-4 align-top">Rp {entries.price.toLocaleString().replace(/,/g, ".")}</td>
                        </tr>
                    </table>
                </div>
                

                
            </div>
        </>
    );
    
}