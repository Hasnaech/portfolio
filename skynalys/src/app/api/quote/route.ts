import { fail, isEmail, isSpam, missing, notify, ok, readJson, reference, str } from "@/lib/server";

const required = ["name", "email", "organisation", "organisationType", "items"];

export async function POST(req: Request) {
  const data = await readJson(req);
  if (!data) return fail("Requête invalide.");
  if (isSpam(data)) return ok({ reference: reference("DEV") });
  if (missing(data, required).length) return fail("Merci de compléter tous les champs obligatoires.");
  if (!isEmail(str(data.email))) return fail("Adresse email invalide.");

  const ref = reference("DEV");
  const fields: Record<string, string> = { Référence: ref };
  for (const [k, v] of Object.entries(data)) if (k !== "website") fields[k] = str(v);
  await notify(`Demande de devis ${ref} : ${str(data.organisation) || str(data.email)}`, fields, str(data.email));
  return ok({ reference: ref });
}
