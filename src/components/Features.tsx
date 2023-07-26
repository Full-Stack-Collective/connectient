import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FeaturesProps = {
  features: {
    title: string;
    desc: string;
  }[];
};

const Features = ({ features }: FeaturesProps) => {
  return (
    <section className="mb-12 py-4 flex flex-col gap-4 lg:flex-row">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="w-full p-[2px] ease-in-out duration-300 rounded-lg hover:bg-gradient-to-r hover:from-blue-400 hover:to-rose-500"
        >
          <Card className="h-full">
            <CardHeader className="h-24 md:h-32">
              <CardTitle className="tracking-wide leading-2">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <p>{feature.desc}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </section>
  );
};
export default Features;
