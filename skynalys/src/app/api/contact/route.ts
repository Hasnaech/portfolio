import { fail, isEmail, isSpam, missing, notify, ok, readJson, reference, str } from "@/lib/server";

const required = ["name", "email", "organisation", "subject", "message"];

export async function POST(req: Request) {
  const data = await readJson(req);
  if (!data) return fail("Requête invalide.");
  if (isSpam(data)) return ok({ reference: reference("MSG") });
  if (missing(data, required).length) return fail("Merci de compléter tous les champs obligatoires.");
  if (!isEmail(str(data.email))) return fail("Adresse email invalide.");

  const ref = reference("MSG");
  const fields: Record<string, string> = { Référence: ref };
  for (const [k, v] of Object.entries(data)) if (k !== "website") fields[k] = str(v);
  await notify(`Message de contact ${ref} : ${str(data.organisation) || str(data.email)}`, fields, str(data.email));
  return ok({ reference: ref });
}
