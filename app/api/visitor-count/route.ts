import { NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/mongodb'

export async function GET() {
  try {
    const { db } = await connectToDatabase()
    
    // Get current visitor count from database
    const visitorDoc = await db.collection('visitorCount').findOne({ type: 'main' })
    const count = visitorDoc ? visitorDoc.count : 0
    
    return NextResponse.json({ count }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error fetching visitor count:', error)
    // Always return JSON, even on error
    return NextResponse.json(
      { count: 0, error: 'Failed to fetch visitor count' },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}

export async function POST() {
  try {
    const { db } = await connectToDatabase()
    
    // Increment visitor count
    await db.collection('visitorCount').updateOne(
      { type: 'main' },
      { 
        $inc: { count: 1 },
        $set: { lastUpdated: new Date() }
      },
      { upsert: true }
    )
    
    // Get updated count
    const visitorDoc = await db.collection('visitorCount').findOne({ type: 'main' })
    const count = visitorDoc ? visitorDoc.count : 1
    
    return NextResponse.json({ count, success: true }, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.error('Error updating visitor count:', error)
    // Always return JSON, even on error
    return NextResponse.json(
      { success: false, error: 'Failed to update visitor count' },
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
  }
}
