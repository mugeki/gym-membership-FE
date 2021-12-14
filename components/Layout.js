import Navbar from "./elements/navbar";


export default function Layout (props) {
    return (<div>
        <div>
            {props.children}
        </div>
        <Navbar/>
    </div>)
}