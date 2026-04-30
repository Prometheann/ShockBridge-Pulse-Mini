import { Accordion } from "@/components/ui/Accordion";

const faqs = [
  {
    question: "What is ShockBridge Pulse?",
    answer:
      "A macro-intelligence product that maps how shocks in financial markets and the economy transmit across exposures, sectors, and decision environments. It turns macro events, earnings surprises, and geopolitical stress into structured Intelligence Briefs — so you can move from noise to structure with speed.",
  },
  {
    question: "What is the difference between Bridge and Analyst?",
    answer:
      "Bridge is the recurring macro-intelligence subscription — structured, automated, and productized. It delivers 4 Intelligence Briefs per month plus alerts, watchpoints, and workflow-ready formats. Analyst is a separate custom engagement: a founder-led, tailored analysis built specifically around your business, portfolio, or real exposure. Products deliver briefs. Analyst delivers judgment.",
  },
  {
    question: "Why is Bridge priced lower right now?",
    answer:
      "Current pricing reflects founding access while ShockBridge expands its proprietary modeling and macro-intelligence capabilities. The price will rise as deeper analytical layers are integrated.",
  },
  {
    question: "Is Analyst a subscription?",
    answer:
      "No. The Analyst Report is a one-time custom engagement. Pricing starts at $199 and depends on scope and complexity. Ongoing arrangements can be discussed separately.",
  },
  {
    question: "How often does Bridge update?",
    answer:
      "Bridge includes 4 Intelligence Briefs per month plus event-driven alerts when relevant conditions emerge. The cadence follows the macro environment — not a fixed calendar.",
  },
  {
    question: "Who is Analyst for?",
    answer:
      "Analyst is for users who need tailored interpretation applied to a real situation — a specific business exposure, portfolio risk, sector, or decision context. It is not for general market monitoring. That is what Bridge is for.",
  },
  {
    question: "Is this investment advice?",
    answer:
      "No. ShockBridge Pulse is a macro-intelligence and research product. It provides structured transmission analysis and scenario interpretation — not investment recommendations or buy/sell advice.",
  },
  {
    question: "How do I access Bridge after purchasing?",
    answer:
      "After purchase you receive an access code by email. Go to the Generate page, enter your code in the Redeem section, and your Intelligence Briefs are unlocked immediately.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 max-w-3xl mx-auto px-6">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-[#f0f0f0] mb-3">A few things worth knowing</h2>
      </div>
      <Accordion items={faqs} />
    </section>
  );
}
