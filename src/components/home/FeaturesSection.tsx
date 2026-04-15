import {
  IncreaseSalesIcon,
  LowerOperatingCostsIcon,
  NoFearIcon,
  RewardEmployeesIcon,
} from "@/lib/icons";

const features = [
  {
    title: "Increase Sales",
    description: (
      <>
        Offer credit to your customers and <br />
        watch your sales grow, while <br />
        increasing customer loyalty to <br />
        your business.
      </>
    ),
    icon: IncreaseSalesIcon,
  },
  {
    title: "Lower Operating Costs",
    description: (
      <>
        Our fees are lower than <br />
        ACH/Bank-to-Bank transfer <br />
        companies. No special equipment <br />
        is needed.
      </>
    ),
    icon: LowerOperatingCostsIcon,
  },
  {
    title: "Reward Employees",
    description: (
      <>
        Your employees automatically <br />
        earn reward bonuses for every <br />
        customer they invite to use JVC at <br />
        checkout.
      </>
    ),
    icon: RewardEmployeesIcon,
  },
  {
    title: "No Fear",
    description: (
      <>
        We are both the card issuer and <br />
        acquirer. Don’t worry about being <br />
        suspended or shut down; we will <br />
        handle all disputes.
      </>
    ),
    icon: NoFearIcon,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-jvc-gradient">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-aquamarine font-medium mb-5">Why choose JVC?</p>
          <h2 className="text-3xl lg:text-5xl text-white mb-6">
            Finally, a digital payment <br /> solution you can rely on.
          </h2>
          <p className="text-lg text-romanSilver max-w-3xl mx-auto">
            The JVC Card is launching in June 2025, offering a seamless payment
            <br /> solution designed specifically to lower costs and ensure
            compliance for <br /> merchants.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {features.map(({ title, description, icon: Icon }, index) => (
            <div className="space-y-3 cursor-pointer" key={index}>
              <div className="h-16 w-16 rounded-full bg-ateneoBlue mx-auto flex items-center justify-center">
                <div className="h-12 w-12 rounded-full bg-ming flex items-center justify-center">
                  <Icon className="h-6 w-6 text-keyLime" />
                </div>
              </div>
              <h3 className="text-lg text-white">{title}</h3>
              <p className="text-romanSilver text-sm">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
