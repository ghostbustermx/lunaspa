import LegalPage from "../components/LegalPage";
import { TERMS_SECTIONS } from "../lib/legal";

export default function Terms() {
  return (
    <LegalPage
      type="Terms and Conditions"
      eyebrow="Luna Spa · Sayulita"
      title="Terms and Conditions"
      intro="By using this website or booking a Luna Spa service, you agree to these Terms and Conditions."
      sections={TERMS_SECTIONS}
    />
  );
}