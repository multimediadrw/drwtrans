import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bus, ArrowLeft, Phone, Mail, MapPin, MessageSquare } from "lucide-react";
import { Link } from "wouter";

export default function Contact() {
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
          <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
          <p className="text-lg text-muted-foreground">Tim kami siap membantu Anda 24/7</p>
        </div>
      </section>
      <section className="py-16"><div className="container max-w-4xl"><div className="grid md:grid-cols-2 gap-6">
        <Card><CardHeader><Phone className="h-12 w-12 text-primary mb-4" /><CardTitle>Telepon</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-primary">0811-2050-800</p><p className="text-sm text-muted-foreground mt-2">Layanan 24 jam</p></CardContent></Card>
        <Card><CardHeader><MessageSquare className="h-12 w-12 text-primary mb-4" /><CardTitle>WhatsApp</CardTitle></CardHeader><CardContent><a href="https://wa.me/6281120508 00" target="_blank" rel="noopener noreferrer"><Button className="w-full">Chat di WhatsApp</Button></a></CardContent></Card>
        <Card><CardHeader><Mail className="h-12 w-12 text-primary mb-4" /><CardTitle>Email</CardTitle></CardHeader><CardContent><p className="text-lg">info@drwtrans.com</p><p className="text-sm text-muted-foreground mt-2">Respon dalam 24 jam</p></CardContent></Card>
        <Card><CardHeader><MapPin className="h-12 w-12 text-primary mb-4" /><CardTitle>Alamat</CardTitle></CardHeader><CardContent><p>Yogyakarta, Indonesia</p></CardContent></Card>
      </div></div></section>
    </div>
  );
}
