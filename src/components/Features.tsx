import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const featuresList = [
  {
    title: 'Effortless Appointment Requests',
    desc: 'Request appointments with healthcare providers through a user-friendly form',
  },
  {
    title: 'Real-Time Availability',
    desc: 'View real-time availability and select suitable appointment slots',
  },
  {
    title: 'Mobile Compatibility',
    desc: 'Connectient is accessible and optimized for use on various devices, including smartphones and tablets',
  },
  {
    title: 'Appointment Reminders',
    desc: 'Automated appointment reminders via email to reduce no-shows and improve patient adherence',
  },
];

const Features = () => {
  return (
    <section className="mb-12 py-4 flex flex-col gap-4 md:flex-row">
      {featuresList.map((feature) => (
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
            <CardContent className="py-2">
              <p>{feature.desc}</p>
            </CardContent>
          </Card>
        </div>
      ))}
    </section>
  );
};
export default Features;
