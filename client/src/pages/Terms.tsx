import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function Terms() {
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
          <h1 className="text-4xl font-bold mb-4">Syarat & Ketentuan</h1>
        </div>
      </section>
      <section className="py-16"><div className="container max-w-4xl"><Card><CardHeader><CardTitle>Kebijakan Pembatalan</CardTitle></CardHeader><CardContent className="space-y-4"><p>Pembatalan 7 hari sebelum keberangkatan: Refund 100%</p><p>Pembatalan 3-6 hari sebelum: Refund 50%</p><p>Pembatalan kurang dari 3 hari: Tidak ada refund</p></CardContent></Card>
      <Card className="mt-6"><CardHeader><CardTitle>Ketentuan Pembayaran</CardTitle></CardHeader><CardContent className="space-y-4"><p>DP minimal 30% untuk konfirmasi booking</p><p>Pelunasan maksimal H-3 sebelum keberangkatan</p><p>Pembayaran dapat dilakukan via transfer bank atau tunai</p></CardContent></Card></div></section>
    </div>
  );
}
