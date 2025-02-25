import { useMutation } from '@apollo/client';
import { REMOVE_CAR } from '../../graphql/mutations';
import { useNavigate } from 'react-router-dom';

const SavedSearches = ({ savedCars, refetchSavedCars }) => {
  const [removeCar] = useMutation(REMOVE_CAR);
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleDeleteCar = async (carId) => {
    try {
      // Remove car mutation
      await removeCar({
        variables: { carId },
      });

      // Refetch the saved cars after deletion
      refetchSavedCars();
    } catch (error) {
      console.error('Failed to delete car', error);
    }
  };

  const handleViewCarDetails = (carName) => {
    // Navigate to the CarDetails page, passing the car name
    navigate(`/car/${carName}`);
  };

  // if (!savedCars.length) {
  //   return <p>No saved searches yet!</p>;
  // }

  return (
    <div>
      <h3>Your Saved Searches</h3>
      <div className="row justify-space-between"> 
      {savedCars.map((car, index) => (
        <div className='col-sm-12 col-md-6 col-lg-4 col-xl-3' key={index} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', marginRight: '10px'}}>
          <h3>{car.title}</h3>
          <img src={`/images/${car.image}`} alt={car.title} style={{ width: '100%',}} />
          <p>Value: {car.value}</p>
          <p>Year: {car.year}</p>
          <p>Description: {car.description}</p>
          <button
            onClick={() => handleDeleteCar(car.carId)}
            style={{
              backgroundColor: 'red',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Delete
          </button>
          <button
            onClick={() => handleViewCarDetails(car.title)} // Pass the car title to the details page
            style={{
              backgroundColor: '#007BFF',
              color: 'white',
              padding: '5px 10px',
              borderRadius: '5px',
              cursor: 'pointer',
              marginLeft: '10px', // Add space between buttons
            }}
          >
            View Wikipedia
          </button>
        </div>
      ))}
      </div>
    </div>
  );
};

export default SavedSearches;