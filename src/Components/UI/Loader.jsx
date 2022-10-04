import Spinner from 'react-bootstrap/Spinner';

function Loader() {
    return (
        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingTop: "35vh",
        }}>
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}

export default Loader;