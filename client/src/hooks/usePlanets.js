// import { useCallback, useEffect, useState } from "react";

// import { httpGetPlanets } from "./requests";

// function usePlanets() {
//   const [planets, savePlanets] = useState([]);

//   const getPlanets = useCallback(async () => {
//     const fetchedPlanets = await httpGetPlanets();
//     savePlanets(fetchedPlanets);
//   }, []);

//   useEffect(() => {
//     getPlanets();
//     console.log(planets)
//   }, [getPlanets]);

//   return planets;
// }

// export default usePlanets;

import { useCallback, useEffect, useState } from "react";

import { httpGetPlanets } from "./requests";

function usePlanets() {
  const [planets, savePlanets] = useState([]);

  const getPlanets = useCallback(async () => {
    const fetchedPlanets = await httpGetPlanets();
    savePlanets(fetchedPlanets);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await getPlanets();
      console.log(planets);
    };

    fetchData();
  }, [getPlanets, planets]); // Include getPlanets and planets in the dependency array

  return planets;
}

export default usePlanets;
