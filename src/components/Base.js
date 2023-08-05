import CustomNavbar from "./CustomNavbar";

const Base = ({ title = "Welcome to our Webasite", children }) => {
    return (
        <div className="container-fluid p-0 m-0">
            <CustomNavbar></CustomNavbar>
            {children}
        </div>
    )
}

export default Base;