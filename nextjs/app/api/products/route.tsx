import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const products = await fetch('https://fakestoreapi.com/products');
    const data = await products.json();
    return NextResponse.json({
        message: 'Products fetched successfully',
        data: data
    });
}