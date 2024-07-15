
import { NextResponse } from 'next/server'
import { musicInfo } from './musicApiData';




export async function GET(res: Request) {
  const response = musicInfo


  return NextResponse.json(response);
}