import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Bus fleet table - stores all available buses with specifications
 */
export const buses = mysqlTable("buses", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  type: mysqlEnum("type", ["medium", "hiace", "big", "luxury"]).notNull(),
  capacity: int("capacity").notNull(),
  seatConfig: varchar("seatConfig", { length: 50 }).notNull(), // e.g., "2-2 Executive", "2-3 Economy"
  imageUrl: text("imageUrl"),
  yearManufactured: int("yearManufactured").notNull(),
  
  // Entertainment & Facilities (0 = false, 1 = true)
  hasAudio: int("hasAudio").default(0).notNull(),
  hasTV: int("hasTV").default(0).notNull(),
  hasKaraoke: int("hasKaraoke").default(0).notNull(),
  hasUSBCharger: int("hasUSBCharger").default(0).notNull(),
  hasWiFi: int("hasWiFi").default(0).notNull(),
  hasToilet: int("hasToilet").default(0).notNull(),
  hasAC: int("hasAC").default(1).notNull(),
  hasLegrest: int("hasLegrest").default(0).notNull(),
  
  // Safety Features (0 = false, 1 = true)
  hasSeatBelts: int("hasSeatBelts").default(1).notNull(),
  hasEmergencyHammer: int("hasEmergencyHammer").default(1).notNull(),
  hasFireExtinguisher: int("hasFireExtinguisher").default(1).notNull(),
  
  // Legal Documents
  stnkExpiry: timestamp("stnkExpiry"),
  kirExpiry: timestamp("kirExpiry"),
  trayekLicense: varchar("trayekLicense", { length: 255 }),
  
  // Additional Info
  description: text("description"),
  pricePerDay: int("pricePerDay").notNull(), // Base price in IDR
  isAvailable: int("isAvailable").default(1).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Bus = typeof buses.$inferSelect;
export type InsertBus = typeof buses.$inferInsert;

/**
 * Routes table - stores popular routes with distance-based pricing
 */
export const routes = mysqlTable("routes", {
  id: int("id").autoincrement().primaryKey(),
  origin: varchar("origin", { length: 255 }).notNull(),
  destination: varchar("destination", { length: 255 }).notNull(),
  distanceKm: int("distanceKm").notNull(),
  estimatedDuration: varchar("estimatedDuration", { length: 100 }).notNull(), // e.g., "2-3 hours"
  
  // Pricing breakdown
  baseFare: int("baseFare").notNull(),
  fuelCost: int("fuelCost").notNull(),
  tollCost: int("tollCost").notNull(),
  parkingCost: int("parkingCost").notNull(),
  driverTip: int("driverTip").notNull(),
  totalFare: int("totalFare").notNull(),
  
  isPopular: int("isPopular").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Route = typeof routes.$inferSelect;
export type InsertRoute = typeof routes.$inferInsert;

/**
 * Testimonials table - stores customer reviews and ratings
 */
export const testimonials = mysqlTable("testimonials", {
  id: int("id").autoincrement().primaryKey(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerAvatar: text("customerAvatar"),
  rating: int("rating").notNull(), // 1-5 stars
  review: text("review").notNull(),
  tripDate: timestamp("tripDate"),
  route: varchar("route", { length: 255 }),
  isVerified: int("isVerified").default(0).notNull(),
  isFeatured: int("isFeatured").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

/**
 * Promos table - stores active deals and discounts
 */
export const promos = mysqlTable("promos", {
  id: int("id").autoincrement().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  discountType: mysqlEnum("discountType", ["percentage", "fixed"]).notNull(),
  discountValue: int("discountValue").notNull(),
  imageUrl: text("imageUrl"),
  validFrom: timestamp("validFrom").notNull(),
  validUntil: timestamp("validUntil").notNull(),
  termsConditions: text("termsConditions"),
  isActive: int("isActive").default(1).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Promo = typeof promos.$inferSelect;
export type InsertPromo = typeof promos.$inferInsert;

/**
 * Bookings table - stores customer booking requests
 */
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  customerName: varchar("customerName", { length: 255 }).notNull(),
  customerPhone: varchar("customerPhone", { length: 20 }).notNull(),
  customerEmail: varchar("customerEmail", { length: 320 }),
  
  busId: int("busId"),
  routeId: int("routeId"),
  
  pickupLocation: varchar("pickupLocation", { length: 255 }).notNull(),
  destination: varchar("destination", { length: 255 }).notNull(),
  tripDate: timestamp("tripDate").notNull(),
  tripTime: varchar("tripTime", { length: 10 }).notNull(),
  passengerCount: int("passengerCount").notNull(),
  
  estimatedPrice: int("estimatedPrice"),
  specialRequests: text("specialRequests"),
  
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled", "completed"]).default("pending").notNull(),
  whatsappSent: int("whatsappSent").default(0).notNull(),
  
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;