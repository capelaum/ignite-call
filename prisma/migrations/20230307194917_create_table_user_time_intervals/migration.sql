-- CreateTable
CREATE TABLE `user_time_intervals` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `week_day` INTEGER NOT NULL,
    `start_time_in_minutes` INTEGER NOT NULL,
    `end_time_in_minutes` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user_time_intervals` ADD CONSTRAINT `user_time_intervals_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
