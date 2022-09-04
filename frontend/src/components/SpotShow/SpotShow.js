import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SpotShow = () => {
  const { spotId } = useParams();
  const allSpots = useSelector(state => state.spots);
  const currentUser = useSelector(state => state.session);
  const spot = allSpots[spotId]


  return (
    <section>
      Name: {spot.name}
      <br/>
      <img src={`${spot.previewImage}`} alt="spot"/>
      <br/>
      Description: {spot.description}
      <br/>
      Price: {spot.price}
      <br/>
      Additional information goes here...
      <Link to="/">Back to spots List</Link>
    </section>
  );
}

export default SpotShow;
