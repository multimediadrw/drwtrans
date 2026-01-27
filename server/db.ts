import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

import { buses, routes, testimonials, promos, bookings, InsertBus, InsertRoute, InsertTestimonial, InsertPromo, InsertBooking } from "../drizzle/schema";
import { desc } from "drizzle-orm";

// Bus queries
export async function getAllBuses() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(buses).orderBy(buses.name);
}

export async function getAvailableBuses() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(buses).where(eq(buses.isAvailable, 1)).orderBy(buses.name);
}

export async function getBusById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(buses).where(eq(buses.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function insertBus(bus: InsertBus) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(buses).values(bus);
}

// Route queries
export async function getAllRoutes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(routes).orderBy(routes.origin, routes.destination);
}

export async function getPopularRoutes() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(routes).where(eq(routes.isPopular, 1)).orderBy(routes.origin);
}

export async function getRouteById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(routes).where(eq(routes.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function insertRoute(route: InsertRoute) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(routes).values(route);
}

// Testimonial queries
export async function getFeaturedTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).where(eq(testimonials.isFeatured, 1)).orderBy(desc(testimonials.createdAt)).limit(6);
}

export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
}

export async function insertTestimonial(testimonial: InsertTestimonial) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(testimonials).values(testimonial);
}

// Promo queries
export async function getActivePromos() {
  const db = await getDb();
  if (!db) return [];
  const now = new Date();
  return db.select().from(promos)
    .where(eq(promos.isActive, 1))
    .orderBy(desc(promos.createdAt));
}

export async function getAllPromos() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(promos).orderBy(desc(promos.createdAt));
}

export async function insertPromo(promo: InsertPromo) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(promos).values(promo);
}

// Booking queries
export async function insertBooking(booking: InsertBooking) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  return db.insert(bookings).values(booking);
}

export async function getAllBookings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(bookings).orderBy(desc(bookings.createdAt));
}

export async function getBookingById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}
