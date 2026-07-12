import type { Vehicle } from "../types/vehicle";


const API_URL = "http://localhost:5000/api/vehicles";


interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}



// GET ALL VEHICLES

export async function getVehicles(): Promise<Vehicle[]> {

  const response = await fetch(
    API_URL,
    {
      method: "GET",

      credentials: "include",
    }
  );


  if (!response.ok) {
    throw new Error("Failed to fetch vehicles");
  }


  const result: ApiResponse<Vehicle[]> =
    await response.json();


  return result.data;

}




// CREATE VEHICLE

export async function createVehicle(
  vehicle: Vehicle
): Promise<Vehicle> {


  const response = await fetch(
    API_URL,
    {
      method: "POST",

      credentials: "include",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(vehicle),

    }
  );



  if (!response.ok) {

    throw new Error(
      "Failed to create vehicle"
    );

  }



  const result: ApiResponse<Vehicle> =
    await response.json();


  return result.data;

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

      credentials: "include",

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



  const result: ApiResponse<Vehicle> =
    await response.json();


  return result.data;

}




// DELETE VEHICLE

export async function deleteVehicle(
  id: string
): Promise<void> {


  const response = await fetch(
    `${API_URL}/${id}`,
    {
      method: "DELETE",

      credentials: "include",

    }
  );



  if (!response.ok) {

    throw new Error(
      "Failed to delete vehicle"
    );

  }

}