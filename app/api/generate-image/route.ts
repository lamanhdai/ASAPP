import { NextRequest, NextResponse } from 'next/server';
import { spawn } from 'child_process';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
    }

    const scriptPath = path.join(process.cwd(), 'scripts', 'generate_image.py');

    return await new Promise<NextResponse>((resolve) => {
      const pythonProcess = spawn('python', [scriptPath, prompt]);

      let stdoutData = '';
      let stderrData = '';

      pythonProcess.stdout.on('data', (data) => {
        stdoutData += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        stderrData += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          console.error(`Python script exited with code ${code}: ${stderrData}`);
          resolve(
            NextResponse.json(
              { error: 'Failed to generate image', details: stderrData },
              { status: 500 }
            )
          );
          return;
        }

        const base64Image = stdoutData.trim();
        if (!base64Image) {
          resolve(
            NextResponse.json({ error: 'No image data returned' }, { status: 500 })
          );
          return;
        }

        // Return as a JSON with the base64 string
        // Alternatively, we could return actual image binary, 
        // but base64 is easier for the client to handle in this specific case.
        resolve(
          NextResponse.json({ imageUrl: `data:image/png;base64,${base64Image}` })
        );
      });
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Internal Server Error', message: error.message },
      { status: 500 }
    );
  }
}
