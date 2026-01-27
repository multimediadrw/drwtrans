import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, ArrowLeft, Wifi, Tv, Music, Wind } from "lucide-react";
import { Link } from "wouter";

export default function Facilities() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
        <div className="container flex h-16 items-center">
          <Link href="/"><div className="flex items-center gap-2 cursor-pointer"><Bus className="h-8 w-8 text-primary" /><span className="text-2xl font-bold text-primary">DRWTRANS</span></div></Link>
        </div>
      </nav>
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
        <div className="container">
          <Link href="/"><Button variant="ghost" className="mb-6"><ArrowLeft className="mr-2 h-4 w-4" />Kembali</Button></Link>
          <h1 className="text-4xl font-bold mb-4">Fasilitas & Kenyamanan</h1>
          <p className="text-lg text-muted-foreground">Nikmati perjalanan dengan fasilitas modern</p>
        </div>
      </section>
      <section className="py-16"><div className="container"><div className="grid md:grid-cols-4 gap-6">
        <Card><CardHeader><Wind className="h-12 w-12 text-primary mb-4" /><CardTitle>AC Dingin</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">AC berkualitas dengan suhu yang dapat diatur untuk kenyamanan maksimal</p></CardContent></Card>
        <Card><CardHeader><Tv className="h-12 w-12 text-primary mb-4" /><CardTitle>TV & Audio</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Layar TV dan sistem audio berkualitas untuk hiburan selama perjalanan</p></CardContent></Card>
        <Card><CardHeader><Music className="h-12 w-12 text-primary mb-4" /><CardTitle>Karaoke</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Sistem karaoke lengkap untuk menghibur rombongan Anda</p></CardContent></Card>
        <Card><CardHeader><Wifi className="h-12 w-12 text-primary mb-4" /><CardTitle>Wi-Fi</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">Koneksi internet gratis untuk tetap terhubung selama perjalanan</p></CardContent></Card>
      </div></div></section>
    </div>
  );
}
