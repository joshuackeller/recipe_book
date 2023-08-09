export async function POST(req: Request) {
  const { code, phone } = await req.json();
}
