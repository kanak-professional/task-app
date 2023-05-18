// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: '' })
}

const BASE_URL ='https://engineering-task.elancoapps.com/api'

export async function fetchResources(): Promise<string[]> {
  try {
    const res = await fetch(BASE_URL+"/resources");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error fetching resources:", error);
    return [];
  }
}

export async function fetchRawData(): Promise<any[]> {
  try {
    const res = await fetch(BASE_URL+"/raw");
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error fetching raw data:", error);
    return [];
  }
}

export async function fetchResourceDetails(resourceId: string): Promise<any[]> {
  try {
    const res = await fetch(BASE_URL+`/resources/${resourceId}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Error fetching resource details:", error);
    return [];
  }
}
