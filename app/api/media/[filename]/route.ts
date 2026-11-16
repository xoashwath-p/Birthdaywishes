import { NextRequest, NextResponse } from 'next/server';
import { isUserAuthenticated } from '@/lib/auth';
import fs from 'fs';
import path from 'path';

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  // 1. Verify Authentication
  const authenticated = await isUserAuthenticated();
  if (!authenticated) {
    return NextResponse.json(
      { error: 'Unauthorized: You must enter the magic password to unlock photographs ❤️' },
      { status: 401 }
    );
  }

  // 2. Validate filename to prevent path traversal
  const filename = params.filename;
  if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\')) {
    return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
  }

  // 3. Locate protected file
  const protectedDir = path.join(process.cwd(), 'protected_assets', 'photos');
  const filePath = path.join(protectedDir, filename);

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
  }

  // 4. Determine content type
  const ext = path.extname(filename).toLowerCase();
  let contentType = 'image/jpeg';
  if (ext === '.png') contentType = 'image/png';
  if (ext === '.webp') contentType = 'image/webp';

  try {
    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
        'Content-Length': fileBuffer.length.toString(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load asset' }, { status: 500 });
  }
}
