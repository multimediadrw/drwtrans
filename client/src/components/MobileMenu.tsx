import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Bus, Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  const menuItems = [
    { href: "/", label: "Beranda" },
    { href: "/fleet", label: "Armada" },
    { href: "/pricing", label: "Harga" },
    { href: "/booking", label: "Booking" },
    { href: "/safety", label: "Keamanan" },
    { href: "/facilities", label: "Fasilitas" },
    { href: "/about", label: "Tentang Kami" },
    { href: "/promos", label: "Promo" },
    { href: "/terms", label: "Syarat & Ketentuan" },
    { href: "/contact", label: "Kontak" },
  ];

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <Bus className="h-6 w-6 text-primary" />
            <span className="text-primary">DRWTRANS</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`text-lg font-medium transition-colors hover:text-primary ${
                location === item.href ? "text-primary" : "text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/booking" onClick={() => setOpen(false)}>
            <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
              Pesan Sekarang
            </Button>
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
