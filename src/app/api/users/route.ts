import { NextResponse, NextRequest } from 'next/server'
import mysql from 'mysql2/promise'; 
import { cookies } from 'next/headers';

const connectionParams = {
    host: 'assassin.c5aq86oycdmj.us-east-1.rds.amazonaws.com',
    port: 3306,
    database: 'assassin',
    user: 'admin',
    password: 'MXiZUMbBUnbGOdF7B1dk',
}

export async function GET(request: Request) {
    const db = await mysql.createConnection(connectionParams);
    const [results] = await db.execute('SELECT name, code FROM user;');
    db.end();

    return NextResponse.json(results);
}

export async function POST(request: Request) {
    const { name, code } = await request.json();

    const db = await mysql.createConnection(connectionParams);
    await db.execute('INSERT INTO user(name, code) VALUES (?, ?)', [name, code]);
    db.end();

    return NextResponse.json({ message: 'User added'});
}