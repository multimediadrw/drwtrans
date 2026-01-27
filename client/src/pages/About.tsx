import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Bus, ArrowLeft, Star } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  const { data: testimonials } = trpc.testimonials.list.useQuery();
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
          <h1 className="text-4xl font-bold mb-4">Tentang Kami</h1>
          <p className="text-lg text-muted-foreground max-w-3xl">DRWTRANS adalah penyedia layanan transportasi bus yang terpercaya di Yogyakarta. Kami berkomitmen memberikan pelayanan terbaik dengan armada modern dan driver profesional.</p>
        </div>
      </section>
      <section className="py-16"><div className="container">
        <h2 className="text-3xl font-bold mb-8">Testimoni Pelanggan</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials?.map((t) => (
            <Card key={t.id}><CardHeader><div className="flex gap-1">{Array.from({length: t.rating}).map((_, i) => <Star key={i} className="h-4 w-4 fill-primary text-primary" />)}</div><CardTitle className="text-base mt-2">{t.customerName}</CardTitle></CardHeader><CardContent><p className="text-sm text-muted-foreground">{t.review}</p></CardContent></Card>
          ))}
        </div>
      </div></section>
    </div>
  );
}
