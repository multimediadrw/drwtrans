import { describe, expect, it, beforeAll } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createTestContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("Fleet Procedures", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createTestContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should list all buses", async () => {
    const result = await caller.fleet.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should list available buses only", async () => {
    const result = await caller.fleet.available();
    expect(Array.isArray(result)).toBe(true);
    // All returned buses should be available
    result.forEach((bus) => {
      expect(bus.isAvailable).toBe(1);
    });
  });

  it("should get bus by id", async () => {
    const allBuses = await caller.fleet.list();
    if (allBuses.length > 0) {
      const firstBus = allBuses[0];
      const result = await caller.fleet.getById({ id: firstBus!.id });
      expect(result).toBeDefined();
      expect(result?.id).toBe(firstBus!.id);
      expect(result?.name).toBe(firstBus!.name);
    }
  });
});

describe("Routes Procedures", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createTestContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should list all routes", async () => {
    const result = await caller.routes.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should list popular routes only", async () => {
    const result = await caller.routes.popular();
    expect(Array.isArray(result)).toBe(true);
    // All returned routes should be popular
    result.forEach((route) => {
      expect(route.isPopular).toBe(1);
    });
  });

  it("should get route by id", async () => {
    const allRoutes = await caller.routes.list();
    if (allRoutes.length > 0) {
      const firstRoute = allRoutes[0];
      const result = await caller.routes.getById({ id: firstRoute!.id });
      expect(result).toBeDefined();
      expect(result?.id).toBe(firstRoute!.id);
      expect(result?.origin).toBe(firstRoute!.origin);
    }
  });

  it("should have valid pricing breakdown", async () => {
    const routes = await caller.routes.list();
    routes.forEach((route) => {
      // Total fare should equal sum of all components
      const calculatedTotal =
        route.baseFare +
        route.fuelCost +
        route.tollCost +
        route.parkingCost +
        route.driverTip;
      expect(route.totalFare).toBe(calculatedTotal);
    });
  });
});

describe("Testimonials Procedures", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createTestContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should list featured testimonials", async () => {
    const result = await caller.testimonials.featured();
    expect(Array.isArray(result)).toBe(true);
    // All returned testimonials should be featured
    result.forEach((testimonial) => {
      expect(testimonial.isFeatured).toBe(1);
    });
  });

  it("should list all testimonials", async () => {
    const result = await caller.testimonials.list();
    expect(Array.isArray(result)).toBe(true);
  });

  it("should have valid rating values", async () => {
    const testimonials = await caller.testimonials.list();
    testimonials.forEach((testimonial) => {
      expect(testimonial.rating).toBeGreaterThanOrEqual(1);
      expect(testimonial.rating).toBeLessThanOrEqual(5);
    });
  });
});

describe("Promos Procedures", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createTestContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should list active promos", async () => {
    const result = await caller.promos.active();
    expect(Array.isArray(result)).toBe(true);
    // All returned promos should be active
    result.forEach((promo) => {
      expect(promo.isActive).toBe(1);
    });
  });

  it("should list all promos", async () => {
    const result = await caller.promos.list();
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("Bookings Procedures", () => {
  let caller: ReturnType<typeof appRouter.createCaller>;

  beforeAll(() => {
    const ctx = createTestContext();
    caller = appRouter.createCaller(ctx);
  });

  it("should create booking and return WhatsApp URL", async () => {
    const result = await caller.bookings.create({
      customerName: "Test Customer",
      customerPhone: "08123456789",
      customerEmail: "test@example.com",
      pickupLocation: "Yogyakarta",
      destination: "Gunung Kidul",
      tripDate: new Date("2026-02-01"),
      tripTime: "08:00",
      passengerCount: 25,
      estimatedPrice: 1000000,
      specialRequests: "Test booking",
    });

    expect(result.success).toBe(true);
    expect(result.whatsappUrl).toBeDefined();
    expect(result.whatsappUrl).toContain("wa.me");
    expect(result.whatsappUrl).toContain("6281120508 00".replace(/\s/g, ""));
  });

  it("should include booking details in WhatsApp message", async () => {
    const result = await caller.bookings.create({
      customerName: "John Doe",
      customerPhone: "08111111111",
      pickupLocation: "Jakarta",
      destination: "Bandung",
      tripDate: new Date("2026-03-01"),
      tripTime: "09:00",
      passengerCount: 30,
    });

    expect(result.whatsappUrl).toContain(encodeURIComponent("John Doe"));
    expect(result.whatsappUrl).toContain(encodeURIComponent("Jakarta"));
    expect(result.whatsappUrl).toContain(encodeURIComponent("Bandung"));
  });
});
