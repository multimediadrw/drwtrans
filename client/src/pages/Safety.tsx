import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, ArrowLeft, Shield, FileCheck, AlertTriangle } from "lucide-react";
import { Link } from "wouter";

export default function Safety() {
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
          <h1 className="text-4xl font-bold mb-4">Keamanan & Legalitas</h1>
          <p className="text-lg text-muted-foreground">Keselamatan penumpang adalah prioritas utama kami</p>
        </div>
      </section>
      <section className="py-16"><div className="container"><div className="grid md:grid-cols-3 gap-6">
        <Card><CardHeader><Shield className="h-12 w-12 text-primary mb-4" /><CardTitle>Fitur Keamanan</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm"><li>✓ Sabuk pengaman di setiap kursi</li><li>✓ Pemecah kaca darurat</li><li>✓ APAR (Alat Pemadam Api Ringan)</li><li>✓ Kotak P3K lengkap</li><li>✓ GPS tracking real-time</li></ul></CardContent></Card>
        <Card><CardHeader><FileCheck className="h-12 w-12 text-primary mb-4" /><CardTitle>Dokumen Legal</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm"><li>✓ STNK aktif dan valid</li><li>✓ KIR (Uji Kelayakan) up to date</li><li>✓ Izin Trayek resmi</li><li>✓ Asuransi kendaraan</li><li>✓ SIM driver profesional</li></ul></CardContent></Card>
        <Card><CardHeader><AlertTriangle className="h-12 w-12 text-primary mb-4" /><CardTitle>Protokol Darurat</CardTitle></CardHeader><CardContent><ul className="space-y-2 text-sm"><li>✓ Driver terlatih first aid</li><li>✓ Kontak darurat 24/7</li><li>✓ Prosedur evakuasi jelas</li><li>✓ Jalur komunikasi backup</li><li>✓ Koordinasi dengan pihak berwenang</li></ul></CardContent></Card>
      </div></div></section>
    </div>
  );
}
