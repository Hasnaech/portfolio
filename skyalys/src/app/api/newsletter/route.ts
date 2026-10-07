import { fail, isEmail, notify, ok, readJson, str } from "@/lib/server";

// Double opt-in a brancher sur l'outil d'emailing choisi (Brevo, Resend Audiences, etc.).
export async function POST(req: Request) {
  const data = await readJson(req);
  const email = str(data?.email, 200);
  if (!isEmail(email)) return fail("Adresse email invalide.");
  await notify("Inscription newsletter", { Email: email });
  return ok();
}
