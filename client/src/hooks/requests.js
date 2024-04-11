const API_URL = 'v1';

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  console.log(response)
  return await response.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`)
  const fetchedLaunches = await response.json();
  return fetchedLaunches.sort((a,b)=>{
      return a.flightNumber - b.flightNumber
  })
}

async function httpSubmitLaunch(launch) {

try{
    return await fetch(`${API_URL}/launches`,{
    method: "post",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(launch)
  })
  } catch(err){
    return {
      ok:false,
    }
  }



}


async function httpAbortLaunch(id) {
  try{
    return await fetch(`${API_URL}/launches/${id}`,{
  method: 'delete',
})
  } catch(err) {
    console.log(err)
    return {
      ok:false,
    }
  }

}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};