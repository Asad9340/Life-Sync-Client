import { Link } from 'react-router-dom';

function Funding() {
  return (
    <div className="flex justify-center">
      <Link to="/checkout">
        <button className="btn btn-primary my-12 lg:my-16">
          Donate some Money
        </button>
      </Link>
    </div>
  );
}

export default Funding;
