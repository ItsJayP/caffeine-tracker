CREATE TABLE `custom_drinks` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`caffeine_mg` real NOT NULL,
	`serving_size_ml` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `drink_logs` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`timestamp` integer NOT NULL,
	`drink_type` text NOT NULL,
	`caffeine_mg` real NOT NULL,
	`custom_drink_id` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	FOREIGN KEY (`custom_drink_id`) REFERENCES `custom_drinks`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `user_settings` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`weight_kg` real,
	`sensitivity` text DEFAULT 'medium' NOT NULL,
	`cutoff_time` text DEFAULT '14:00' NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
