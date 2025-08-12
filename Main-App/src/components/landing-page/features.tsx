import { Eye, Bell, Clock } from "lucide-react";
import { Badge as BadgeComponent } from "@/components/ui/badge";
import { NumberTicker } from "@/components/magicui/number-ticker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const featuresData = [
  {
    value: "panel-0",
    icon: Eye,
    title: "Deteksi Real-Time",
    shortDescription: "Mendeteksi aktivitas mencurigakan dengan AI",
    description:
      "Sistem kami menggunakan teknologi YOLOv8 untuk mendeteksi berbagai aktivitas mencurigakan seperti perkelahian, vandalisme, dan objek yang ditinggalkan dengan akurasi tinggi di area pemantauan.",
    features: [
      {
        title: "Deteksi Perkelahian",
        description:
          "Identifikasi otomatis aktivitas perkelahian dengan akurasi >85%",
        imgSrc: "https://cdn-icons-png.flaticon.com/512/4727/4727266.png",
      },
      {
        title: "Deteksi Vandalisme",
        description: "Pemantauan real-time untuk mencegah tindakan vandalisme",
        imgSrc: "https://cdn-icons-png.flaticon.com/512/584/584796.png",
      },
    ],
    imageSrc: "/cctv-monitoring.jpg",
  },
  {
    value: "panel-1",
    icon: Bell,
    title: "Notifikasi Instan",
    shortDescription: "Pemberitahuan real-time melalui multi-channel",
    description:
      "Sistem notifikasi terintegrasi yang mengirim peringatan instan ke tim keamanan melalui dashboard, WhatsApp Bot, dan email dengan informasi lokasi dan cuplikan video kejadian.",
    features: [
      {
        title: "Dashboard Alert",
        description: "Notifikasi real-time di dashboard monitoring utama",
        imgSrc: "https://cdn-icons-png.flaticon.com/512/6106/6106288.png",
      },
      {
        title: "WhatsApp Bot",
        description: "Peringatan otomatis melalui WhatsApp untuk respons cepat",
        imgSrc: "https://cdn-icons-png.flaticon.com/512/2313/2313906.png",
      },
    ],
    imageSrc: "/notification-system.jpg",
  },
  {
    value: "panel-2",
    icon: Clock,
    title: "Respons Cepat",
    shortDescription: "Optimasi waktu respons untuk keamanan maksimal",
    description:
      "Target pengurangan waktu respons hingga 30% dengan uptime sistem 99.9% untuk menjamin keamanan yang optimal dan berkelanjutan di seluruh area pemantauan Kota Bandung.",
    features: [
      {
        title: "Uptime 99.9%",
        description: "Sistem monitoring yang stabil dan dapat diandalkan 24/7",
        imgSrc: "https://cdn-icons-png.flaticon.com/512/3340/3340200.png",
      },
      {
        title: "Respons 30% Lebih Cepat",
        description:
          "Optimasi alur kerja untuk respons tim keamanan yang lebih efisien",
        imgSrc: "https://cdn-icons-png.flaticon.com/512/5405/5405929.png",
      },
    ],
    imageSrc: "/response-system.jpg",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="w-full pb-12 pt-12 md:pb-20 md:pt-20 lg:pb-32 lg:pt-32 bg-background"
      aria-labelledby="features-heading"
    >
      <div className="container mx-auto px-4">
        <header className="text-center space-y-4 pb-12 md:pb-16 mx-auto max-w-4xl">
          <BadgeComponent className="bg-primary/10 text-primary hover:bg-primary/10">
            FITUR SISTEM
          </BadgeComponent>
          <h2
            id="features-heading"
            className="mx-auto mt-4 text-2xl font-bold sm:text-3xl lg:text-5xl tracking-tight text-foreground"
          >
            Teknologi AI untuk Keamanan Kota
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground pt-1 px-4">
            Sistem keamanan berbasis AI yang canggih untuk meningkatkan respons
            cepat dan monitoring berkelanjutan di Kota Bandung
          </p>
        </header>

        <Tabs defaultValue="panel-0">
          <TabsList className="flex h-auto w-full flex-col gap-2 bg-background sm:flex-row">
            {featuresData.map((feature) => (
              <TabsTrigger
                key={feature.value}
                value={feature.value}
                className="flex w-full flex-col items-start justify-start gap-1 whitespace-normal rounded-md border p-3 sm:p-4 text-left text-primary hover:border-primary/40 data-[state=active]:border-primary"
              >
                <div className="flex items-center gap-2 sm:flex-col sm:items-start lg:gap-4">
                  <span className="flex size-8 items-center justify-center rounded-full bg-accent sm:size-8 lg:size-10">
                    <feature.icon className="size-4 text-primary" />
                  </span>
                  <p className="text-base font-semibold sm:text-lg md:text-xl lg:text-xl text-primary">
                    {feature.title}
                  </p>
                </div>
                <p className="font-normal text-muted-foreground text-sm sm:text-base sm:block">
                  {feature.shortDescription}
                </p>
              </TabsTrigger>
            ))}
          </TabsList>

          {featuresData.map((panel) => (
            <TabsContent
              key={panel.value}
              value={panel.value}
              className="mt-8 md:mt-12 lg:mt-20"
            >
              <PanelContent
                title={panel.title}
                description={panel.description}
                features={panel.features}
                imageSrc={panel.imageSrc}
              />
            </TabsContent>
          ))}
        </Tabs>

        {/* Metrics Highlight */}
        <aside
          className="mt-16 md:mt-20 lg:mt-24 bg-primary/5 rounded-2xl p-6 md:p-8 border border-border"
          aria-labelledby="metrics-heading"
        >
          <h3 id="metrics-heading" className="sr-only">
            Statistik Sistem
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 text-center">
            <div>
              <NumberTicker
                value={337}
                className="text-2xl md:text-3xl font-bold text-primary mb-2"
              />
              <p className="text-muted-foreground text-sm md:text-base">
                CCTV Terintegrasi
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center">
                <NumberTicker
                  value={30}
                  className="text-2xl md:text-3xl font-bold text-primary mb-2"
                />
                <span className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  %
                </span>
              </div>
              <p className="text-muted-foreground text-sm md:text-base">
                Pengurangan Waktu Respons
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center">
                <NumberTicker
                  value={24}
                  className="text-2xl md:text-3xl font-bold text-primary mb-2"
                />
                <span className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  /
                </span>
                <NumberTicker
                  value={7}
                  className="text-2xl md:text-3xl font-bold text-primary mb-2"
                />
              </div>
              <p className="text-muted-foreground text-sm md:text-base">
                Monitoring Berkelanjutan
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function PanelContent({
  title,
  description,
  features,
}: {
  title: string;
  description: string;
  features: {
    title: string;
    description: string;
    imgSrc: string;
  }[];
  imageSrc: string;
}) {
  return (
    <div className="gap-6 space-y-8 lg:space-y-12 lg:flex">
      <div className="relative lg:w-1/2">
        <div className="flex flex-col justify-center">
          <h3 className="text-lg font-bold md:text-xl lg:text-2xl text-start text-foreground">
            {title}
          </h3>
          <p className="mt-3 md:mt-4 text-muted-foreground text-start text-sm md:text-base">
            {description}
          </p>
          <div className="mt-8 md:mt-10 lg:mt-12 space-y-4 md:space-y-6">
            {features.map((feature, index) => (
              <Feature
                key={index}
                title={feature.title}
                description={feature.description}
                imgSrc={feature.imgSrc}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="-m-2 overflow-hidden p-2 sm:-m-4 sm:p-4 md:-mx-8 md:px-8 lg:mx-0 lg:w-1/2 lg:overflow-visible lg:px-0">
        <div className="relative bg-muted before:absolute before:inset-0 before:scale-x-110 before:border-y before:border-border after:absolute after:inset-0 after:scale-y-110 after:border-x after:border-border">
          <div className="relative overflow-clip p-6 md:p-8 lg:p-10">
            <div className="mx-auto h-64 w-full rounded-2xl md:rounded-3xl border bg-gradient-to-br from-primary/20 to-primary/5 object-cover object-top shadow-2xl border-border sm:h-80 lg:h-[28rem] flex items-center justify-center">
              <div className="text-center p-4 md:p-6 lg:p-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Eye className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                </div>
                <h4 className="text-base md:text-lg font-semibold text-foreground mb-2">
                  Demo Visualisasi
                </h4>
                <p className="text-muted-foreground text-xs md:text-sm">
                  Tampilan sistem monitoring akan ditampilkan di sini
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Feature({
  title,
  description,
  imgSrc,
}: {
  title: string;
  description: string;
  imgSrc: string;
}) {
  return (
    <div className="flex items-center gap-4 md:gap-6">
      <div className="flex h-16 w-16 md:h-20 md:w-20 rounded-2xl md:rounded-3xl border border-border bg-card p-3 md:p-4">
        <img
          className="m-auto h-6 w-auto md:h-8"
          src={imgSrc}
          alt={`${title} icon`}
        />
      </div>
      <div className="flex-1 flex flex-col items-start">
        <h4 className="text-base md:text-lg font-semibold text-start text-foreground">
          {title}
        </h4>
        <p className="mt-1 text-muted-foreground text-start text-sm md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
