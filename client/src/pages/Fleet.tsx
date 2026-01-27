import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { trpc } from "@/lib/trpc";
import { 
  Bus, 
  Users, 
  Calendar, 
  Shield, 
  Wifi, 
  Tv, 
  Music, 
  Usb, 
  Wind, 
  Armchair,
  FileCheck,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import { Link } from "wouter";
import { SEO, fleetStructuredData } from "@/components/SEO";

export default function Fleet() {
  const { data: buses, isLoading } = trpc.fleet.list.useQuery();

  const getFacilityIcon = (facility: string) => {
    const icons: Record<string, any> = {
      AC: Wind,
      TV: Tv,
      Karaoke: Music,
      "USB Charger": Usb,
      "Wi-Fi": Wifi,
      Toilet: Armchair,
      Legrest: Armchair,
    };
    return icons[facility] || CheckCircle2;
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO 
        title="Armada Bus - DRWTRANS"
        description="Lihat armada bus kami dengan spesifikasi lengkap, fasilitas modern, dan dokumen legal yang valid. Pilih bus sesuai kebutuhan perjalanan Anda."
        structuredData={fleetStructuredData}
      />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Bus className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">DRWTRANS</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-6">
            <Link href="/fleet">
              <a className="text-sm font-medium text-primary">Armada</a>
            </Link>
            <Link href="/pricing">
              <a className="text-sm font-medium hover:text-primary transition-colors">Harga</a>
            </Link>
            <Link href="/booking">
              <a className="text-sm font-medium hover:text-primary transition-colors">Booking</a>
            </Link>
            <Link href="/about">
              <a className="text-sm font-medium hover:text-primary transition-colors">Tentang Kami</a>
            </Link>
            <Link href="/contact">
              <a className="text-sm font-medium hover:text-primary transition-colors">Kontak</a>
            </Link>
            <Link href="/booking">
              <Button className="bg-primary hover:bg-primary/90">Pesan Sekarang</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Armada Bus Kami</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Pilih bus yang sesuai dengan kebutuhan perjalanan Anda. Semua armada kami dilengkapi dengan fasilitas modern 
            dan dokumen legal yang lengkap untuk menjamin kenyamanan dan keamanan perjalanan Anda.
          </p>
        </div>
      </section>

      {/* Fleet List */}
      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-video bg-muted rounded-t-lg" />
                  <CardHeader>
                    <div className="h-6 bg-muted rounded w-3/4 mb-2" />
                    <div className="h-4 bg-muted rounded w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded" />
                      <div className="h-4 bg-muted rounded w-2/3" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : buses && buses.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {buses.map((bus) => {
                const facilities = [];
                if (bus.hasAC === 1) facilities.push("AC");
                if (bus.hasTV === 1) facilities.push("TV");
                if (bus.hasKaraoke === 1) facilities.push("Karaoke");
                if (bus.hasUSBCharger === 1) facilities.push("USB Charger");
                if (bus.hasWiFi === 1) facilities.push("Wi-Fi");
                if (bus.hasToilet === 1) facilities.push("Toilet");
                if (bus.hasLegrest === 1) facilities.push("Legrest");

                const safetyFeatures = [];
                if (bus.hasSeatBelts === 1) safetyFeatures.push("Sabuk Pengaman");
                if (bus.hasEmergencyHammer === 1) safetyFeatures.push("Pemecah Kaca");
                if (bus.hasFireExtinguisher === 1) safetyFeatures.push("APAR");

                const currentYear = new Date().getFullYear();
                const busAge = currentYear - bus.yearManufactured;

                return (
                  <Card key={bus.id} className="overflow-hidden hover:shadow-xl transition-all">
                    {/* Bus Image Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative">
                      <Bus className="h-24 w-24 text-primary/40" />
                      {bus.isAvailable === 1 ? (
                        <Badge className="absolute top-4 right-4 bg-green-500">Tersedia</Badge>
                      ) : (
                        <Badge className="absolute top-4 right-4 bg-red-500">Tidak Tersedia</Badge>
                      )}
                    </div>

                    <CardHeader>
                      <CardTitle className="text-2xl">{bus.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Kapasitas {bus.capacity} penumpang • {bus.seatConfig}
                      </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6">
                      {/* Description */}
                      {bus.description && (
                        <p className="text-sm text-muted-foreground">{bus.description}</p>
                      )}

                      <Separator />

                      {/* Vehicle Info */}
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          Informasi Kendaraan
                        </h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Tahun:</span>
                            <p className="font-medium">{bus.yearManufactured}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Usia:</span>
                            <p className="font-medium">{busAge} tahun</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Tipe:</span>
                            <p className="font-medium capitalize">{bus.type}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Kursi:</span>
                            <p className="font-medium">{bus.seatConfig}</p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Facilities */}
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          Fasilitas
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {facilities.map((facility) => {
                            const Icon = getFacilityIcon(facility);
                            return (
                              <Badge key={facility} variant="secondary" className="flex items-center gap-1">
                                <Icon className="h-3 w-3" />
                                {facility}
                              </Badge>
                            );
                          })}
                        </div>
                      </div>

                      <Separator />

                      {/* Safety Features */}
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Shield className="h-4 w-4 text-primary" />
                          Fitur Keamanan
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {safetyFeatures.map((feature) => (
                            <Badge key={feature} variant="outline" className="border-green-500 text-green-700">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Separator />

                      {/* Legal Documents */}
                      <div className="space-y-3">
                        <h4 className="font-semibold flex items-center gap-2">
                          <FileCheck className="h-4 w-4 text-primary" />
                          Dokumen Legal
                        </h4>
                        <div className="space-y-2 text-sm">
                          {bus.stnkExpiry && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">STNK berlaku s/d:</span>
                              <span className="font-medium">
                                {new Date(bus.stnkExpiry).toLocaleDateString("id-ID")}
                              </span>
                            </div>
                          )}
                          {bus.kirExpiry && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">KIR berlaku s/d:</span>
                              <span className="font-medium">
                                {new Date(bus.kirExpiry).toLocaleDateString("id-ID")}
                              </span>
                            </div>
                          )}
                          {bus.trayekLicense && (
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Izin Trayek:</span>
                              <span className="font-medium">{bus.trayekLicense}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      <Separator />

                      {/* Price & CTA */}
                      <div className="space-y-4">
                        <div className="bg-primary/5 rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">Harga Sewa</div>
                          <div className="text-3xl font-bold text-primary">
                            Rp {bus.pricePerDay.toLocaleString("id-ID")}
                          </div>
                          <div className="text-sm text-muted-foreground">per hari (sudah termasuk driver)</div>
                        </div>
                        <Link href="/booking">
                          <Button className="w-full" size="lg" disabled={bus.isAvailable !== 1}>
                            {bus.isAvailable === 1 ? "Pesan Bus Ini" : "Tidak Tersedia"}
                          </Button>
                        </Link>
                        <p className="text-xs text-center text-muted-foreground">
                          Harga belum termasuk BBM, tol, parkir, dan tips driver
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bus className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Belum Ada Armada</h3>
              <p className="text-muted-foreground">
                Armada bus sedang dalam proses penambahan. Silakan hubungi kami untuk informasi lebih lanjut.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Tidak Menemukan Bus yang Sesuai?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Hubungi tim kami untuk konsultasi gratis. Kami akan membantu Anda menemukan solusi transportasi terbaik 
            sesuai kebutuhan dan budget Anda.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                Hubungi Kami
              </Button>
            </Link>
            <a href="https://wa.me/6281120508 00" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container">
          <div className="text-center text-sm text-muted-foreground">
            <p>&copy; 2026 DRWTRANS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
