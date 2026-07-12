import type { Vehicle } from "../types/vehicle";

const API_URL = "http://localhost:5000/api/vehicles";


// GET ALL VEHICLES
export async function getVehicles(): Promise<Vehicle[]> {

  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }

  return response.json();

}



// CREATE VEHICLE
export async function createVehicle(
  vehicle: Vehicle
): Promise<Vehicle> {


  const response = await fetch(API_URL, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(vehicle),

  });



  if (!response.ok) {

    throw new Error(
      "Failed to create vehicle"
    );

  }



  return response.json();

}




// UPDATE VEHICLE
export async function updateVehicle(
  id: string,
  vehicle: Vehicle
): Promise<Vehicle> {


  const response = await fetch(
    `${API_URL}/${id}`,
    {

      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(vehicle),

    }
  );



  if (!response.ok) {

    throw new Error(
      "Failed to update vehicle"
    );

  }



  return response.json();

}





// DELETE VEHICLE
export async function deleteVehicle(
  id: string
): Promise<void> {


  const response = await fetch(
    `${API_URL}/${id}`,
    {

      method: "DELETE",

    }
  );



  if (!response.ok) {

    throw new Error(
      "Failed to delete vehicle"
    );

  }


}