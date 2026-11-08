import { handleContactPost } from "@/lib/contact-security";

export async function POST(request: Request): Promise<Response> {
  return handleContactPost(request);
}
