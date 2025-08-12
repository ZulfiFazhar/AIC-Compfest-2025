import { MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function About() {
  return (
    <section id="about" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Tentang Kami
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Dikembangkan dalam kolaborasi dengan Diskominfo dan Polrestabes
            Bandung, sistem ini meningkatkan keamanan publik dengan memanfaatkan
            337 kamera CCTV Kota Bandung yang sudah ada.
          </p>

          <div className="bg-primary/5 rounded-2xl p-8 mb-8 border border-border">
            <h3 className="text-2xl font-semibold text-primary mb-4">
              Tujuan Kami
            </h3>
            <p className="text-foreground text-lg">
              Respons lebih cepat, jalan yang lebih aman, dan patroli yang
              dioptimalkan untuk Bandung
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <Card className="border-border shadow-md">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  Mitra Kolaborasi
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Diskominfo Kota Bandung
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Polrestabes Bandung
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    Perwakilan Masyarakat
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-border shadow-md">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-3">
                  Area Pilot
                </h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center">
                    <MapPin className="w-4 h-4 text-primary mr-3" />
                    Alun-Alun Bandung
                  </li>
                  <li className="flex items-center">
                    <MapPin className="w-4 h-4 text-primary mr-3" />
                    Area Pusat Kota
                  </li>
                  <li className="flex items-center">
                    <MapPin className="w-4 h-4 text-primary mr-3" />
                    Zona Keramaian Utama
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
