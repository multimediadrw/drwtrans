import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  fleet: router({
    list: publicProcedure.query(async () => {
      const { getAllBuses } = await import("./db");
      return getAllBuses();
    }),
    available: publicProcedure.query(async () => {
      const { getAvailableBuses } = await import("./db");
      return getAvailableBuses();
    }),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      const { getBusById } = await import("./db");
      return getBusById(input.id);
    }),
  }),

  routes: router({
    list: publicProcedure.query(async () => {
      const { getAllRoutes } = await import("./db");
      return getAllRoutes();
    }),
    popular: publicProcedure.query(async () => {
      const { getPopularRoutes } = await import("./db");
      return getPopularRoutes();
    }),
    getById: publicProcedure.input(z.object({ id: z.number() })).query(async ({ input }) => {
      const { getRouteById } = await import("./db");
      return getRouteById(input.id);
    }),
  }),

  testimonials: router({
    featured: publicProcedure.query(async () => {
      const { getFeaturedTestimonials } = await import("./db");
      return getFeaturedTestimonials();
    }),
    list: publicProcedure.query(async () => {
      const { getAllTestimonials } = await import("./db");
      return getAllTestimonials();
    }),
  }),

  promos: router({
    active: publicProcedure.query(async () => {
      const { getActivePromos } = await import("./db");
      return getActivePromos();
    }),
    list: publicProcedure.query(async () => {
      const { getAllPromos } = await import("./db");
      return getAllPromos();
    }),
  }),

  bookings: router({
    create: publicProcedure
      .input(
        z.object({
          customerName: z.string().min(1),
          customerPhone: z.string().min(10),
          customerEmail: z.string().email().optional(),
          busId: z.number().optional(),
          routeId: z.number().optional(),
          pickupLocation: z.string().min(1),
          destination: z.string().min(1),
          tripDate: z.date(),
          tripTime: z.string(),
          passengerCount: z.number().min(1),
          estimatedPrice: z.number().optional(),
          specialRequests: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const { insertBooking } = await import("./db");
        
        // Insert booking into database
        await insertBooking({
          ...input,
          status: "pending",
          whatsappSent: 0,
        });

        // Format WhatsApp message
        const message = `*BOOKING BARU DRWTRANS*\n\n` +
          `Nama: ${input.customerName}\n` +
          `Telepon: ${input.customerPhone}\n` +
          `Email: ${input.customerEmail || "-"}\n\n` +
          `Lokasi Jemput: ${input.pickupLocation}\n` +
          `Tujuan: ${input.destination}\n` +
          `Tanggal: ${input.tripDate.toLocaleDateString("id-ID")}\n` +
          `Waktu: ${input.tripTime}\n` +
          `Jumlah Penumpang: ${input.passengerCount}\n` +
          `Estimasi Harga: ${input.estimatedPrice ? `Rp ${input.estimatedPrice.toLocaleString("id-ID")}` : "-"}\n\n` +
          `Permintaan Khusus: ${input.specialRequests || "-"}`;

        // Generate WhatsApp URL
        const whatsappNumber = "6281120508 00".replace(/\s/g, "");
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

        return {
          success: true,
          whatsappUrl,
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
