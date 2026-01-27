import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Bus, ArrowLeft, Clock } from "lucide-react";
import { Link } from "wouter";

export default function Promos() {
  const { data: promos } = trpc.promos.list.useQuery();
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
          <h1 className="text-4xl font-bold mb-4">Promo & Penawaran</h1>
          <p className="text-lg text-muted-foreground">Dapatkan harga terbaik untuk perjalanan Anda</p>
        </div>
      </section>
      <section className="py-16"><div className="container"><div className="grid md:grid-cols-2 gap-6">
        {promos?.map((promo) => (
          <Card key={promo.id} className="border-primary/40"><CardHeader><Badge className="w-fit bg-primary">{promo.discountType === "percentage" ? `Diskon ${promo.discountValue}%` : `Hemat Rp ${promo.discountValue.toLocaleString("id-ID")}`}</Badge><CardTitle className="text-2xl mt-4">{promo.title}</CardTitle></CardHeader><CardContent><p className="text-muted-foreground mb-4">{promo.description}</p><div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="h-4 w-4" />Berlaku: {new Date(promo.validFrom).toLocaleDateString("id-ID")} - {new Date(promo.validUntil).toLocaleDateString("id-ID")}</div><Link href="/booking"><Button className="w-full mt-4">Gunakan Promo</Button></Link></CardContent></Card>
        ))}
      </div></div></section>
    </div>
  );
}
