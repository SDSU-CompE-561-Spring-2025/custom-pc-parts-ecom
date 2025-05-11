// This file would go in your API routes, e.g., /pages/api/reviews.js or /app/api/reviews/route.js
import fs from 'fs';
import path from 'path';

// Helper function to get all reviews
function getReviews() {
  const filePath = path.join(process.cwd(), 'data', 'reviews.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// For Next.js Pages Router
export default function handler(req, res) {
  const { productId, limit = 6, random = true } = req.query;
  
  try {
    // Get all reviews
    const allReviews = getReviews();
    
    // If productId is provided, filter by it, but if empty productId, show all reviews
    // This allows us to use the same reviews for all components
    let filteredReviews = productId && productId !== "" 
      ? allReviews.filter(review => review.productId === productId)
      : allReviews;
    
    // Return random reviews if requested
    if (random && filteredReviews.length > limit) {
      // Shuffle the array using Fisher-Yates algorithm
      for (let i = filteredReviews.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredReviews[i], filteredReviews[j]] = [filteredReviews[j], filteredReviews[i]];
      }
      
      // Slice to get the requested number of reviews
      filteredReviews = filteredReviews.slice(0, limit);
    } else if (limit) {
      // Just get the first N reviews if not random
      filteredReviews = filteredReviews.slice(0, limit);
    }
    
    res.status(200).json(filteredReviews);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
}

/* 
// For Next.js App Router
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId');
  const limit = parseInt(searchParams.get('limit') || '6');
  const random = searchParams.get('random') !== 'false';

  try {
    // Get all reviews
    const allReviews = getReviews();
    
    // If productId is provided, filter by it, but if empty productId, show all reviews
    // This allows us to use the same reviews for all components
    let filteredReviews = productId && productId !== "" 
      ? allReviews.filter(review => review.productId === productId)
      : allReviews;
    
    // Return random reviews if requested
    if (random && filteredReviews.length > limit) {
      // Shuffle the array using Fisher-Yates algorithm
      for (let i = filteredReviews.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [filteredReviews[i], filteredReviews[j]] = [filteredReviews[j], filteredReviews[i]];
      }
      
      // Slice to get the requested number of reviews
      filteredReviews = filteredReviews.slice(0, limit);
    } else if (limit) {
      // Just get the first N reviews if not random
      filteredReviews = filteredReviews.slice(0, limit);
    }
    
    return NextResponse.json(filteredReviews);
  } catch (error) {
    console.error('Failed to fetch reviews:', error);
    return NextResponse.json({ error: 'Failed to fetch reviews' }, { status: 500 });
  }
}
*/