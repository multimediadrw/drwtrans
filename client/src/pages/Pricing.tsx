import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";
import { Bus, MapPin, ArrowLeft, Calculator, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";

export default function Pricing() {
  const { data: routes, isLoading } = trpc.routes.list.useQuery();

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Bus className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-primary">DRWTRANS</span>
            </div>
          </Link>
        </div>
      </nav>

      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-background py-16">
        <div className="container">
          <Link href="/">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Harga & Rute</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Harga transparan dengan rincian lengkap. Tidak ada biaya tersembunyi.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container">
          {isLoading ? (
            <div>Loading...</div>
          ) : routes && routes.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {routes.map((route) => (
                <Card key={route.id}>
                  <CardHeader>
                    <CardTitle>{route.origin} → {route.destination}</CardTitle>
                    <CardDescription>{route.distanceKm} km • {route.estimatedDuration}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary">
                      Rp {route.totalFare.toLocaleString("id-ID")}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div>Belum ada rute</div>
          )}
        </div>
      </section>
    </div>
  );
}
