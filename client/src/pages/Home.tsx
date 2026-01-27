import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Bus, MapPin, Shield, Star, Sparkles, Phone, Mail, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: buses, isLoading: busesLoading } = trpc.fleet.available.useQuery();
  const { data: promos, isLoading: promosLoading } = trpc.promos.active.useQuery();
  const { data: testimonials, isLoading: testimonialsLoading } = trpc.testimonials.featured.useQuery();
  const { data: routes, isLoading: routesLoading } = trpc.routes.popular.useQuery();

  return (
    <div className="min-h-screen bg-background">
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
            <Link href="/fleet" className="text-sm font-medium hover:text-primary transition-colors">
              Armada
            </Link>
            <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
              Harga
            </Link>
            <Link href="/booking" className="text-sm font-medium hover:text-primary transition-colors">
              Booking
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              Tentang Kami
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">
              Kontak
            </Link>
            <Link href="/booking">
              <Button className="bg-primary hover:bg-primary/90">Pesan Sekarang</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background py-20 md:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge className="bg-primary/10 text-primary border-primary/20">Layanan Bus Terpercaya</Badge>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Perjalanan Nyaman dengan <span className="text-primary">DRWTRANS</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Nikmati perjalanan yang aman, nyaman, dan terpercaya dengan armada bus medium dan HiAce kami. 
                Dilengkapi fasilitas modern dan driver profesional untuk pengalaman perjalanan terbaik Anda.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/booking">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    <Bus className="mr-2 h-5 w-5" />
                    Pesan Bus Sekarang
                  </Button>
                </Link>
                <Link href="/fleet">
                  <Button size="lg" variant="outline">
                    Lihat Armada
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">3+</div>
                  <div className="text-sm text-muted-foreground">Armada Bus</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">100%</div>
                  <div className="text-sm text-muted-foreground">Legal & Aman</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">Layanan</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Bus className="h-32 w-32 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mengapa Memilih DRWTRANS?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kami berkomitmen memberikan layanan transportasi terbaik dengan standar keamanan dan kenyamanan tertinggi.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Keamanan Terjamin</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Semua bus dilengkapi sabuk pengaman, APAR, dan pemecah kaca darurat. STNK & KIR selalu valid.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Fasilitas Modern</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  AC dingin, TV, karaoke, USB charger, Wi-Fi, dan toilet untuk kenyamanan maksimal perjalanan Anda.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <Star className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Driver Profesional</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Driver berpengalaman, ramah, dan menguasai rute. Tidak ugal-ugalan, mengutamakan keselamatan.
                </p>
              </CardContent>
            </Card>
            <Card className="border-primary/20 hover:border-primary/40 transition-colors">
              <CardHeader>
                <MapPin className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Harga Transparan</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Harga sudah termasuk BBM, tol, parkir, dan tips driver. Tidak ada biaya tersembunyi.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Fleet Preview */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Armada Kami</h2>
              <p className="text-lg text-muted-foreground">
                Pilih bus sesuai kebutuhan perjalanan Anda
              </p>
            </div>
            <Link href="/fleet">
              <Button variant="outline">Lihat Semua</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {busesLoading ? (
              <>
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-video bg-muted rounded-t-lg" />
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardHeader>
                  </Card>
                ))}
              </>
            ) : (
              buses?.slice(0, 3).map((bus) => (
                <Card key={bus.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <Bus className="h-20 w-20 text-primary/40" />
                  </div>
                  <CardHeader>
                    <CardTitle>{bus.name}</CardTitle>
                    <CardDescription>
                      Kapasitas {bus.capacity} penumpang • {bus.seatConfig}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {bus.hasAC === 1 && <Badge variant="secondary">AC</Badge>}
                      {bus.hasTV === 1 && <Badge variant="secondary">TV</Badge>}
                      {bus.hasKaraoke === 1 && <Badge variant="secondary">Karaoke</Badge>}
                      {bus.hasWiFi === 1 && <Badge variant="secondary">Wi-Fi</Badge>}
                      {bus.hasUSBCharger === 1 && <Badge variant="secondary">USB</Badge>}
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          Rp {bus.pricePerDay.toLocaleString("id-ID")}
                        </div>
                        <div className="text-sm text-muted-foreground">per hari</div>
                      </div>
                      <Link href="/booking">
                        <Button size="sm">Pesan</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Rute Populer</h2>
              <p className="text-lg text-muted-foreground">
                Harga transparan dengan rincian lengkap
              </p>
            </div>
            <Link href="/pricing">
              <Button variant="outline">Lihat Semua Rute</Button>
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {routesLoading ? (
              <>
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <CardHeader>
                      <div className="h-6 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-1/2" />
                    </CardHeader>
                  </Card>
                ))}
              </>
            ) : (
              routes?.slice(0, 4).map((route) => (
                <Card key={route.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="h-5 w-5 text-primary" />
                          {route.origin} → {route.destination}
                        </CardTitle>
                        <CardDescription>
                          {route.distanceKm} km • {route.estimatedDuration}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">
                          Rp {route.totalFare.toLocaleString("id-ID")}
                        </div>
                        <div className="text-xs text-muted-foreground">all-in</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tarif Dasar</span>
                        <span>Rp {route.baseFare.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">BBM</span>
                        <span>Rp {route.fuelCost.toLocaleString("id-ID")}</span>
                      </div>
                      {route.tollCost > 0 && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Tol</span>
                          <span>Rp {route.tollCost.toLocaleString("id-ID")}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Parkir</span>
                        <span>Rp {route.parkingCost.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tips Driver</span>
                        <span>Rp {route.driverTip.toLocaleString("id-ID")}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Promos */}
      {promos && promos.length > 0 && (
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="container">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Promo Spesial</h2>
                <p className="text-lg text-muted-foreground">
                  Dapatkan penawaran terbaik untuk perjalanan Anda
                </p>
              </div>
              <Link href="/promos">
                <Button variant="outline">Lihat Semua Promo</Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {promos.slice(0, 2).map((promo) => (
                <Card key={promo.id} className="border-primary/40 bg-card">
                  <CardHeader>
                    <Badge className="w-fit bg-primary text-primary-foreground">
                      {promo.discountType === "percentage" 
                        ? `Diskon ${promo.discountValue}%` 
                        : `Hemat Rp ${promo.discountValue.toLocaleString("id-ID")}`}
                    </Badge>
                    <CardTitle className="text-2xl">{promo.title}</CardTitle>
                    <CardDescription>{promo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Berlaku: {new Date(promo.validFrom).toLocaleDateString("id-ID")} - {new Date(promo.validUntil).toLocaleDateString("id-ID")}
                      </div>
                      {promo.termsConditions && (
                        <p className="text-muted-foreground text-xs">
                          S&K: {promo.termsConditions}
                        </p>
                      )}
                    </div>
                    <Link href="/booking">
                      <Button className="w-full mt-4">Gunakan Promo</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials */}
      {testimonials && testimonials.length > 0 && (
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Pelanggan Kami</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Kepuasan pelanggan adalah prioritas kami
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.slice(0, 3).map((testimonial) => (
                <Card key={testimonial.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-xl font-bold text-primary">
                          {testimonial.customerName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-base">{testimonial.customerName}</CardTitle>
                        <div className="flex gap-1">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{testimonial.review}</p>
                    {testimonial.route && (
                      <p className="text-sm text-muted-foreground mt-4">
                        Rute: {testimonial.route}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Siap Memulai Perjalanan Anda?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Hubungi kami sekarang untuk reservasi atau konsultasi gratis. Tim kami siap membantu Anda 24/7.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/booking">
              <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                <Bus className="mr-2 h-5 w-5" />
                Pesan Bus Sekarang
              </Button>
            </Link>
            <a href="https://wa.me/6281120508 00" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Phone className="mr-2 h-5 w-5" />
                WhatsApp Kami
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 py-12">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Bus className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-primary">DRWTRANS</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Layanan transportasi bus terpercaya dengan armada modern dan driver profesional.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Layanan</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/fleet"><a className="hover:text-primary">Armada Bus</a></Link></li>
                <li><Link href="/pricing"><a className="hover:text-primary">Harga & Rute</a></Link></li>
                <li><Link href="/booking"><a className="hover:text-primary">Booking Online</a></Link></li>
                <li><Link href="/promos"><a className="hover:text-primary">Promo</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Perusahaan</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about"><a className="hover:text-primary">Tentang Kami</a></Link></li>
                <li><Link href="/safety"><a className="hover:text-primary">Keamanan & Legalitas</a></Link></li>
                <li><Link href="/facilities"><a className="hover:text-primary">Fasilitas</a></Link></li>
                <li><Link href="/terms"><a className="hover:text-primary">Syarat & Ketentuan</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Kontak</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <a href="tel:08112050800" className="hover:text-primary">0811-2050-800</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <a href="mailto:info@drwtrans.com" className="hover:text-primary">info@drwtrans.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Yogyakarta, Indonesia</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2026 DRWTRANS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
