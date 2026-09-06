export type Portfolio = {
  id: number;
  cover: string;
  images: string;
  pdf: string;
  namaSekolah: string;
  namaAkun: string;
  tahun: number;
  password: string;
  tanggalCreate: string;
};

const BASE_URL = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");

// GET all portfolios data
export async function getAllData(): Promise<Portfolio[]> {
  const response = await fetch(`${BASE_URL}/api/portfolios`);

  if (!response.ok) throw new Error("Failed to fetch data");

  const data = await response.json();
  return data;
}

// GET single portfolio data
export async function getDataById(
  id: string,
  token: string,
): Promise<Portfolio> {
  const response = await fetch(
    `${BASE_URL}/api/portfolios/${id}/view`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error("Failed to fetch data");

  const data = await response.json();
  return data;
}

// PUT portfolio data
export async function updateDataById(
  id: string,
  updatedData: FormData,
  token: string,
) {
  const response = await fetch(
    `${BASE_URL}/api/portfolios/${id}`,
    {
      method: "PUT",
      body: updatedData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error("Failed to update data");

  return response.json();
}

// DEL portfolio data
export async function deleteDataById(id: number, token: string): Promise<void> {
  const response = await fetch(
    `${BASE_URL}/api/portfolios/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) throw new Error("Failed to delete data");
}
