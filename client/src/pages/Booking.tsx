import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Bus, Calendar, Clock, MapPin, Users, Phone, Mail, MessageSquare, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function Booking() {
  const { data: buses } = trpc.fleet.available.useQuery();
  const { data: routes } = trpc.routes.popular.useQuery();
  const bookingMutation = trpc.bookings.create.useMutation();

  const [formData, setFormData] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    busId: "",
    routeId: "",
    pickupLocation: "",
    destination: "",
    tripDate: "",
    tripTime: "",
    passengerCount: "",
    specialRequests: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.customerName || !formData.customerPhone || !formData.pickupLocation || 
        !formData.destination || !formData.tripDate || !formData.tripTime || !formData.passengerCount) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    try {
      const result = await bookingMutation.mutateAsync({
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        customerEmail: formData.customerEmail || undefined,
        busId: formData.busId ? parseInt(formData.busId) : undefined,
        routeId: formData.routeId ? parseInt(formData.routeId) : undefined,
        pickupLocation: formData.pickupLocation,
        destination: formData.destination,
        tripDate: new Date(formData.tripDate),
        tripTime: formData.tripTime,
        passengerCount: parseInt(formData.passengerCount),
        estimatedPrice: formData.routeId 
          ? routes?.find(r => r.id === parseInt(formData.routeId))?.totalFare 
          : undefined,
        specialRequests: formData.specialRequests || undefined,
      });

      toast.success("Booking berhasil! Anda akan diarahkan ke WhatsApp...");
      
      // Redirect to WhatsApp after 1 second
      setTimeout(() => {
        window.open(result.whatsappUrl, "_blank");
      }, 1000);

      // Reset form
      setFormData({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        busId: "",
        routeId: "",
        pickupLocation: "",
        destination: "",
        tripDate: "",
        tripTime: "",
        passengerCount: "",
        specialRequests: "",
      });
    } catch (error) {
      toast.error("Terjadi kesalahan saat membuat booking. Silakan coba lagi.");
      console.error(error);
    }
  };

  const selectedRoute = formData.routeId 
    ? routes?.find(r => r.id === parseInt(formData.routeId)) 
    : null;

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
            <Link href="/fleet">
              <a className="text-sm font-medium hover:text-primary transition-colors">Armada</a>
            </Link>
            <Link href="/pricing">
              <a className="text-sm font-medium hover:text-primary transition-colors">Harga</a>
            </Link>
            <Link href="/booking">
              <a className="text-sm font-medium text-primary">Booking</a>
            </Link>
            <Link href="/about">
              <a className="text-sm font-medium hover:text-primary transition-colors">Tentang Kami</a>
            </Link>
            <Link href="/contact">
              <a className="text-sm font-medium hover:text-primary transition-colors">Kontak</a>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Booking Bus</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Isi formulir di bawah ini untuk melakukan reservasi. Setelah submit, Anda akan diarahkan ke WhatsApp 
            untuk konfirmasi booking dengan tim kami.
          </p>
        </div>
      </section>

      {/* Booking Form */}
      <section className="py-16">
        <div className="container max-w-4xl">
          <form onSubmit={handleSubmit}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Informasi Pemesan</CardTitle>
                    <CardDescription>Data diri Anda untuk keperluan booking</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="customerName">Nama Lengkap *</Label>
                      <Input
                        id="customerName"
                        placeholder="Masukkan nama lengkap"
                        value={formData.customerName}
                        onChange={(e) => handleInputChange("customerName", e.target.value)}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="customerPhone">Nomor Telepon *</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="customerPhone"
                            type="tel"
                            placeholder="08123456789"
                            className="pl-10"
                            value={formData.customerPhone}
                            onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="customerEmail">Email (Opsional)</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="customerEmail"
                            type="email"
                            placeholder="email@example.com"
                            className="pl-10"
                            value={formData.customerEmail}
                            onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Trip Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detail Perjalanan</CardTitle>
                    <CardDescription>Informasi rute dan jadwal perjalanan</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="routeId">Pilih Rute Populer (Opsional)</Label>
                      <Select value={formData.routeId} onValueChange={(value) => {
                        handleInputChange("routeId", value);
                        const route = routes?.find(r => r.id === parseInt(value));
                        if (route) {
                          handleInputChange("pickupLocation", route.origin);
                          handleInputChange("destination", route.destination);
                        }
                      }}>
                        <SelectTrigger id="routeId">
                          <SelectValue placeholder="Pilih rute atau isi manual" />
                        </SelectTrigger>
                        <SelectContent>
                          {routes?.map((route) => (
                            <SelectItem key={route.id} value={route.id.toString()}>
                              {route.origin} → {route.destination} (Rp {route.totalFare.toLocaleString("id-ID")})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="pickupLocation">Lokasi Jemput *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="pickupLocation"
                            placeholder="Alamat penjemputan"
                            className="pl-10"
                            value={formData.pickupLocation}
                            onChange={(e) => handleInputChange("pickupLocation", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destination">Tujuan *</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="destination"
                            placeholder="Alamat tujuan"
                            className="pl-10"
                            value={formData.destination}
                            onChange={(e) => handleInputChange("destination", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="tripDate">Tanggal *</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="tripDate"
                            type="date"
                            className="pl-10"
                            value={formData.tripDate}
                            onChange={(e) => handleInputChange("tripDate", e.target.value)}
                            min={new Date().toISOString().split("T")[0]}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tripTime">Waktu *</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="tripTime"
                            type="time"
                            className="pl-10"
                            value={formData.tripTime}
                            onChange={(e) => handleInputChange("tripTime", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="passengerCount">Jumlah Penumpang *</Label>
                        <div className="relative">
                          <Users className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="passengerCount"
                            type="number"
                            min="1"
                            placeholder="0"
                            className="pl-10"
                            value={formData.passengerCount}
                            onChange={(e) => handleInputChange("passengerCount", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="busId">Pilih Bus (Opsional)</Label>
                      <Select value={formData.busId} onValueChange={(value) => handleInputChange("busId", value)}>
                        <SelectTrigger id="busId">
                          <SelectValue placeholder="Pilih bus atau biarkan kami yang pilihkan" />
                        </SelectTrigger>
                        <SelectContent>
                          {buses?.map((bus) => (
                            <SelectItem key={bus.id} value={bus.id.toString()}>
                              {bus.name} - {bus.capacity} seat (Rp {bus.pricePerDay.toLocaleString("id-ID")}/hari)
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">Permintaan Khusus (Opsional)</Label>
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Textarea
                          id="specialRequests"
                          placeholder="Contoh: Perlu kursi roda, makanan halal, dll."
                          className="pl-10 min-h-[100px]"
                          value={formData.specialRequests}
                          onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Summary Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Ringkasan Booking</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {formData.customerName && (
                      <div>
                        <div className="text-sm text-muted-foreground">Nama</div>
                        <div className="font-medium">{formData.customerName}</div>
                      </div>
                    )}
                    {formData.pickupLocation && formData.destination && (
                      <div>
                        <div className="text-sm text-muted-foreground">Rute</div>
                        <div className="font-medium">
                          {formData.pickupLocation} → {formData.destination}
                        </div>
                      </div>
                    )}
                    {formData.tripDate && (
                      <div>
                        <div className="text-sm text-muted-foreground">Tanggal & Waktu</div>
                        <div className="font-medium">
                          {new Date(formData.tripDate).toLocaleDateString("id-ID")} {formData.tripTime && `• ${formData.tripTime}`}
                        </div>
                      </div>
                    )}
                    {formData.passengerCount && (
                      <div>
                        <div className="text-sm text-muted-foreground">Penumpang</div>
                        <div className="font-medium">{formData.passengerCount} orang</div>
                      </div>
                    )}
                    {selectedRoute && (
                      <div className="pt-4 border-t">
                        <div className="text-sm text-muted-foreground mb-2">Estimasi Harga</div>
                        <div className="text-2xl font-bold text-primary">
                          Rp {selectedRoute.totalFare.toLocaleString("id-ID")}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Sudah termasuk BBM, tol, parkir, dan tips driver
                        </div>
                      </div>
                    )}
                    <Button 
                      type="submit" 
                      className="w-full" 
                      size="lg"
                      disabled={bookingMutation.isPending}
                    >
                      {bookingMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Memproses...
                        </>
                      ) : (
                        <>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Kirim ke WhatsApp
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      Dengan klik tombol di atas, data booking akan dikirim ke WhatsApp kami untuk konfirmasi
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </form>
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
