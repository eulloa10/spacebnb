import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

function SpotDetail() {
  const { spotId } = useParams();
  const spotDetails = useSelector(state => state.spots[spotId])
  console.log("SPOTDETAIL", spotDetails)

  return (
    <>
      <div>{spotDetails.name}</div>
      <div>
        <img src={`${spotDetails.previewImage}`} alt="spot"/>
      </div>
      <div>{spotDetails.description}</div>
      <div>{spotDetails.price}</div>
    </>
  )
}

export default SpotDetail;
