import LegalPage from "../components/LegalPage";
import { PRIVACY_SECTIONS } from "../lib/legal";

export default function Privacy() {
  return (
    <LegalPage
      type="Privacy Policy"
      eyebrow="Luna Spa · Sayulita"
      title="Privacy Policy"
      intro="Luna Spa respects your privacy. This policy explains the information we collect when you browse our site or book a service, and how we use it."
      sections={SECTIONS}
    />
  );
}