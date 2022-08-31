import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Route, useParams } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';


const AllSpots = () => {
  // const spots = useSelector(state => {
  //   return state.spots.map(spot => state.spot);
  // });
  const spots = useSelector(state => state.spots)
  console.log("SPOTS", spots)
  const [showForm, setShowForm] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);


  if (!spots) {
    return null;
  }

  return (
    <div>Test</div>
  )
  //   <main>
  //     <nav>
  //       <Fab hidden={showForm} onClick={() => setShowForm(true)} />
  //       {pokemon.map((pokemon) => {
  //         return (
  //           <NavLink key={pokemon.name} to={`/pokemon/${pokemon.id}`}>
  //             <div
  //               className={
  //                 Number.parseInt(pokemonId) === pokemon.id
  //                   ? "nav-entry is-selected"
  //                   : "nav-entry"
  //               }
  //             >
  //               <div
  //                 className="nav-entry-image"
  //                 style={{ backgroundImage: `url('${pokemon.imageUrl}')` }}
  //               ></div>
  //               <div>
  //                 <div className="primary-text">{pokemon.name}</div>
  //                 <div className="secondary-text">
  //                   {pokemon.number} {pokemon.captured && "(Captured)"}
  //                 </div>
  //               </div>
  //             </div>
  //           </NavLink>
  //         );
  //       })}
  //     </nav>
  //     {showForm ? (
  //       <CreatePokemonForm hideForm={() => setShowForm(false)} />
  //     ) : (
  //       <Route path="/pokemon/:pokemonId">
  //         <PokemonDetail/>
  //       </Route>
  //     )}
  //   </main>
  // );
};

export default AllSpots;
