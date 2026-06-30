import { NextResponse } from "next/server";

import { saveReadingProgressAction } from "@/app/reading-progress/actions";

export async function POST(request: Request) {
  let input: unknown;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Dữ liệu tiến độ không hợp lệ." },
      { status: 400 },
    );
  }

  const result = await saveReadingProgressAction(input);
  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
  });
}
