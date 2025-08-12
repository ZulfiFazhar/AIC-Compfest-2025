import { Camera, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section id="hero" className="container mx-auto px-4 py-12 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <header className="space-y-6">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/10">
            AI-Powered Security System
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Keamanan Berbasis AI untuk{" "}
            <span className="text-primary">Kota Bandung</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Analisis video real-time untuk mendeteksi aktivitas mencurigakan dan
            melindungi kota kita menggunakan sistem Pelindung CCTV yang canggih.
          </p>
          <nav
            className="flex flex-col sm:flex-row gap-4"
            aria-label="Aksi utama"
          >
            <Link href="/event">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 cursor-pointer"
                aria-label="Lihat demo sistem Pelindung CCTV"
              >
                <Eye className="w-5 h-5 mr-2" aria-hidden="true" />
                Lihat Demo
              </Button>
            </Link>
          </nav>
        </header>

        <aside className="relative" aria-label="Contoh dashboard monitoring">
          <div className="border bg-card rounded-t-lg p-3 flex items-center space-x-2">
            <div
              className="w-3 h-3 bg-red-500 rounded-full"
              aria-hidden="true"
            ></div>
            <div
              className="w-3 h-3 bg-yellow-500 rounded-full"
              aria-hidden="true"
            ></div>
            <div
              className="w-3 h-3 bg-green-500 rounded-full"
              aria-hidden="true"
            ></div>
          </div>
          <div className="border bg-background rounded-b-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-foreground">
                Live Monitoring - Alun-Alun Bandung
              </h3>
              <Badge variant="destructive">ALERT</Badge>
            </div>
            <div className="bg-muted rounded-lg h-48 flex items-center justify-center relative">
              <Camera
                className="w-12 h-12 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="absolute top-2 left-2 bg-destructive text-white px-2 py-1 rounded text-sm font-medium">
                Perkelahian Terdeteksi
              </div>
              <time className="absolute bottom-2 right-2 bg-foreground/80 text-background px-2 py-1 rounded text-sm">
                15:42:33
              </time>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Akurasi: 92%</span>
              <span className="text-green-600 font-medium">
                Petugas Diberitahu
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
