import { Accordion } from "@/components/ui/Accordion";

const faqs = [
  {
    question: "What is ShockBridge Pulse?",
    answer:
      "A micro-tool that turns a macro event, earnings surprise, or market shock into a structured analyst-style memo. You enter the event details, and it returns a clean scenario note with first-order effects, second-order risks, bullish/bearish paths, and what to watch next.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. ShockBridge Pulse is a research and writing tool designed to help users think more clearly about market scenarios. It does not provide investment recommendations or buy/sell advice.",
  },
  {
    question: "Do I need trading experience to use it?",
    answer:
      "No. It helps both experienced market participants and curious users who want cleaner market logic. The outputs are written in clear financial language without unnecessary jargon.",
  },
  {
    question: "What counts as one memo?",
    answer:
      "One completed scenario generation counts as one memo credit. If the generation fails due to a server error, it does not consume a credit.",
  },
  {
    question: "What is the difference between Basic and Creator?",
    answer:
      "Basic gives you 5 memos with the full scenario analysis. Creator gives you 20 memos plus X post output, LinkedIn post output, and PDF export. Built for people who want to publish or share their analysis.",
  },
  {
    question: "How do I access the tool after purchasing?",
    answer:
      "After payment you will receive an access code. Go to the Generate page, click 'Redeem a code', enter your code, and your memos will be unlocked immediately.",
  },
  {
    question: "Is there a subscription?",
    answer:
      "Not at launch. The current version uses a one-time purchase model. You buy a credit pack and use it at your own pace.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-20 max-w-3xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-[#f0f0f0] mb-3">Questions</h2>
      </div>
      <Accordion items={faqs} />
    </section>
  );
}
