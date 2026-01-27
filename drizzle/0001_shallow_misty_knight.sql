CREATE TABLE `bookings` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerPhone` varchar(20) NOT NULL,
	`customerEmail` varchar(320),
	`busId` int,
	`routeId` int,
	`pickupLocation` varchar(255) NOT NULL,
	`destination` varchar(255) NOT NULL,
	`tripDate` timestamp NOT NULL,
	`tripTime` varchar(10) NOT NULL,
	`passengerCount` int NOT NULL,
	`estimatedPrice` int,
	`specialRequests` text,
	`status` enum('pending','confirmed','cancelled','completed') NOT NULL DEFAULT 'pending',
	`whatsappSent` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bookings_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `buses` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`type` enum('medium','hiace','big','luxury') NOT NULL,
	`capacity` int NOT NULL,
	`seatConfig` varchar(50) NOT NULL,
	`imageUrl` text,
	`yearManufactured` int NOT NULL,
	`hasAudio` int NOT NULL DEFAULT 0,
	`hasTV` int NOT NULL DEFAULT 0,
	`hasKaraoke` int NOT NULL DEFAULT 0,
	`hasUSBCharger` int NOT NULL DEFAULT 0,
	`hasWiFi` int NOT NULL DEFAULT 0,
	`hasToilet` int NOT NULL DEFAULT 0,
	`hasAC` int NOT NULL DEFAULT 1,
	`hasLegrest` int NOT NULL DEFAULT 0,
	`hasSeatBelts` int NOT NULL DEFAULT 1,
	`hasEmergencyHammer` int NOT NULL DEFAULT 1,
	`hasFireExtinguisher` int NOT NULL DEFAULT 1,
	`stnkExpiry` timestamp,
	`kirExpiry` timestamp,
	`trayekLicense` varchar(255),
	`description` text,
	`pricePerDay` int NOT NULL,
	`isAvailable` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `buses_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `promos` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`discountType` enum('percentage','fixed') NOT NULL,
	`discountValue` int NOT NULL,
	`imageUrl` text,
	`validFrom` timestamp NOT NULL,
	`validUntil` timestamp NOT NULL,
	`termsConditions` text,
	`isActive` int NOT NULL DEFAULT 1,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `promos_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `routes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`origin` varchar(255) NOT NULL,
	`destination` varchar(255) NOT NULL,
	`distanceKm` int NOT NULL,
	`estimatedDuration` varchar(100) NOT NULL,
	`baseFare` int NOT NULL,
	`fuelCost` int NOT NULL,
	`tollCost` int NOT NULL,
	`parkingCost` int NOT NULL,
	`driverTip` int NOT NULL,
	`totalFare` int NOT NULL,
	`isPopular` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `routes_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `testimonials` (
	`id` int AUTO_INCREMENT NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerAvatar` text,
	`rating` int NOT NULL,
	`review` text NOT NULL,
	`tripDate` timestamp,
	`route` varchar(255),
	`isVerified` int NOT NULL DEFAULT 0,
	`isFeatured` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `testimonials_id` PRIMARY KEY(`id`)
);
