import { Shield, Users, MapPin } from "lucide-react";

export function Privacy() {
  return (
    <section id="privacy" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Privasi dan Keamanan Data Terjamin
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Sistem kami mengutamakan privasi Anda. Semua data video diproses
            dengan aman menggunakan deteksi yang dianonimkan, sesuai dengan UU
            Perlindungan Data Pribadi (UU PDP). Tidak ada data pribadi yang
            disimpan atau dibagikan tanpa izin.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="flex items-start space-x-3">
              <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">
                  Enkripsi End-to-End
                </h4>
                <p className="text-sm text-muted-foreground">
                  Data terenkripsi dari kamera hingga server
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Users className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">
                  Anonimisasi Otomatis
                </h4>
                <p className="text-sm text-muted-foreground">
                  Wajah dan identitas diblur secara otomatis
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MapPin className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-foreground">
                  Akses Terbatas
                </h4>
                <p className="text-sm text-muted-foreground">
                  Hanya petugas berwenang yang dapat mengakses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
