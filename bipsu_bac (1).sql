-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 24, 2024 at 02:04 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bipsu_bac`
--

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `middlename` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `barangay` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `contact_number` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`id`, `user_id`, `lastname`, `firstname`, `middlename`, `province`, `city`, `barangay`, `email`, `contact_number`, `username`, `position`, `created_at`, `updated_at`) VALUES
(17, 18, 'Declan', 'Davis', 'India', NULL, NULL, NULL, 'lywigiwo@mailinator.com', '574', 'gewuvolu', 'Illo dolor nulla exp', '2024-07-22 09:29:43', '2024-07-22 09:29:43'),
(19, 20, 'Jayme', 'Madaline', 'Ali', NULL, NULL, NULL, 'vimeci@mailinator.com', '655', 'segyf', 'Voluptatibus fugiat', '2024-07-22 11:52:52', '2024-07-22 11:52:52');

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `department_name` varchar(255) NOT NULL,
  `department_type` varchar(50) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `department_name`, `department_type`, `logo`, `name`, `created_at`, `updated_at`) VALUES
(35, 'School of Technology and Computer Study', 'School', 'media/Fe7sy7rX6aLjPTy8QMVguD99guae6D1ELWgDLBMD.png', 'School_of_Technology_and_Computer_Study', '2024-07-22 09:29:15', '2024-07-22 09:29:15'),
(36, 'Supply Office', 'Office', 'media/VSwyF14k6yZOLyIFQK0NNsgiERdvMCXBokVgenzN.png', 'Supply_Office', '2024-07-22 11:50:55', '2024-07-22 11:50:55');

-- --------------------------------------------------------

--
-- Table structure for table `documents`
--

CREATE TABLE `documents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `department_id` int(255) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `document` text NOT NULL,
  `deadline` varchar(255) DEFAULT NULL,
  `message` text DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'for review',
  `date_complied` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `documents`
--

INSERT INTO `documents` (`id`, `user_id`, `department_id`, `title`, `description`, `document`, `deadline`, `message`, `status`, `date_complied`, `created_at`, `updated_at`) VALUES
(7, 18, 35, 'dgdfgdfg', 'gdfg', 'media/YRpyXxUqJDlfk92YHg5s8peaOFiYgAgjr7E1cqcU.pdf', NULL, NULL, 'consolidated', '2024-07-22 19:27:30', '2024-07-22 09:43:24', '2024-07-22 11:27:30');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `media`
--

CREATE TABLE `media` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `applicant_id` bigint(20) UNSIGNED NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `sanitary_permit` varchar(255) NOT NULL,
  `barangay_clearance` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `media`
--

INSERT INTO `media` (`id`, `applicant_id`, `profile_image`, `sanitary_permit`, `barangay_clearance`, `created_at`, `updated_at`) VALUES
(15, 17, 'media/14oPCQEK9XC6MDnhsyNUwTed5CpSzFN3wqrwwxFI.jpg', '', '', '2024-07-22 09:29:43', '2024-07-22 09:29:43'),
(17, 19, 'media/67zPwpwgGAKJNugW1wBERJgM9aEj7NngYyXRSyCt.jpg', '', '', '2024-07-22 11:52:52', '2024-07-22 11:52:52');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_06_26_153053_create_applicants_table', 1),
(6, '2024_06_26_153104_create_media_table', 1),
(7, '2024_06_28_235508_create_departments_table', 1),
(8, '2024_07_13_151623_create_documents_table', 2),
(9, '2024_07_21_145626_create_transaction_logs_table', 3),
(10, '2024_07_23_144301_create_purchase_documents_table', 4);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(4, 'App\\Models\\User', 1, 'main', 'fda07e1df9de49774618831d5854321d158facd7a99cf81be691cca312aefd0d', '[\"*\"]', '2024-07-01 02:43:47', NULL, '2024-06-30 19:45:36', '2024-07-01 02:43:47'),
(6, 'App\\Models\\User', 1, 'main', 'cae5c940014a058169445f97ed0c1fb3d64476b73d1b6cea008d02d5e8e7ccb9', '[\"*\"]', '2024-07-13 05:48:07', NULL, '2024-07-09 23:18:03', '2024-07-13 05:48:07'),
(10, 'App\\Models\\User', 17, 'main', '3b6c7711e030ddb6147e0e44b58bd1417f4e702ab65b2693aec18382588fc169', '[\"*\"]', '2024-07-22 04:26:39', NULL, '2024-07-20 17:25:02', '2024-07-22 04:26:39'),
(11, 'App\\Models\\User', 1, 'main', '9ca7aebc41f18349164be16a4953caf23cb47c22fc0e3224bcb9d59dbb3abf22', '[\"*\"]', '2024-07-22 04:26:30', NULL, '2024-07-21 17:57:42', '2024-07-22 04:26:30'),
(12, 'App\\Models\\User', 1, 'main', '3d459c87772157e44e6c705e8816bcd4720c50c3e31f043b28cb9fff3a271b74', '[\"*\"]', '2024-07-23 14:17:33', NULL, '2024-07-22 09:27:58', '2024-07-23 14:17:33'),
(14, 'App\\Models\\User', 20, 'main', '74ae292f312e2527abc4bd1ab1957f9b545375d8ea0eddbc01b03a2233284e65', '[\"*\"]', '2024-07-23 14:17:39', NULL, '2024-07-22 14:36:18', '2024-07-23 14:17:39');

-- --------------------------------------------------------

--
-- Table structure for table `purchase_documents`
--

CREATE TABLE `purchase_documents` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `status` varchar(255) DEFAULT 'pending',
  `pr_status` varchar(20) NOT NULL DEFAULT 'pending',
  `po_status` varchar(20) DEFAULT NULL,
  `pr_request_date` varchar(255) DEFAULT NULL,
  `purchase_request` varchar(255) DEFAULT NULL,
  `purchase_order` varchar(255) DEFAULT NULL,
  `order_description` text DEFAULT NULL,
  `request_description` text DEFAULT NULL,
  `return_status` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `po_request_date` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `purchase_documents`
--

INSERT INTO `purchase_documents` (`id`, `user_id`, `status`, `pr_status`, `po_status`, `pr_request_date`, `purchase_request`, `purchase_order`, `order_description`, `request_description`, `return_status`, `created_at`, `updated_at`, `po_request_date`) VALUES
(11, 20, 'pending', 'awarded', NULL, '2024-07-23 21:51:19', 'media/pdZey554FPuHbRgBEINMwIPzR80ojzQi3f2uur5b.pdf', NULL, NULL, 'Purchase Request 2024', NULL, '2024-07-23 13:51:19', '2024-07-23 14:17:32', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `transaction_logs`
--

CREATE TABLE `transaction_logs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `document_id` bigint(20) UNSIGNED DEFAULT NULL,
  `deadline` varchar(255) DEFAULT NULL,
  `date_submitted` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `transaction_logs`
--

INSERT INTO `transaction_logs` (`id`, `document_id`, `deadline`, `date_submitted`, `status`, `created_at`, `updated_at`) VALUES
(10, 7, NULL, '2024-07-22 17:43:24', 'for consolidation', '2024-07-22 11:26:23', '2024-07-22 11:26:23'),
(11, 7, NULL, '2024-07-22 17:43:24', 'consolidated', '2024-07-22 11:27:30', '2024-07-22 11:27:30');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `department_id` int(255) DEFAULT NULL,
  `lastname` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `middle_name` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `contact_number` varchar(12) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `department_id`, `lastname`, `firstname`, `middle_name`, `position`, `role`, `email`, `contact_number`, `username`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, NULL, 'General', 'Admin', NULL, NULL, 'general admin', 'admin@gmail.com', NULL, '', NULL, '$2y$10$jT8C2A3nQBXYN4y6/lBg5.dI39BXRNekX6u5wfwCJi9bGmEdzas1e', NULL, NULL, NULL),
(18, 35, 'Declan', 'Davis', 'dsdfsdf', 'Chairperson', 'admin', 'lywigiwo@mailinator.com', '565656', 'gewuvolu', NULL, '$2y$12$0r.xl4tCCAc1inhHEFJkqedfZk15WtkbAD6mc974byffVbtm7Busa', NULL, '2024-07-22 09:29:43', '2024-07-22 11:41:19'),
(20, 36, 'Jayme', 'Madaline', NULL, NULL, 'supply office', 'vimeci@mailinator.com', NULL, 'segyf', NULL, '$2y$12$.bI5wfzTrGSzszHlcBMqK.WmCdIRuaTh9ncLPWFZbVpmftGHWvRHm', NULL, '2024-07-22 11:52:52', '2024-07-22 11:52:52');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `applicants_user_id_foreign` (`user_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `documents`
--
ALTER TABLE `documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `documents_user_id_foreign` (`user_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `media`
--
ALTER TABLE `media`
  ADD PRIMARY KEY (`id`),
  ADD KEY `media_applicant_id_foreign` (`applicant_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `purchase_documents`
--
ALTER TABLE `purchase_documents`
  ADD PRIMARY KEY (`id`),
  ADD KEY `purchase_documents_user_id_foreign` (`user_id`);

--
-- Indexes for table `transaction_logs`
--
ALTER TABLE `transaction_logs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transaction_logs_document_id_foreign` (`document_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD UNIQUE KEY `users_username_unique` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `applicants`
--
ALTER TABLE `applicants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `documents`
--
ALTER TABLE `documents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `media`
--
ALTER TABLE `media`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `purchase_documents`
--
ALTER TABLE `purchase_documents`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `transaction_logs`
--
ALTER TABLE `transaction_logs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `applicants`
--
ALTER TABLE `applicants`
  ADD CONSTRAINT `applicants_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `documents`
--
ALTER TABLE `documents`
  ADD CONSTRAINT `documents_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `media`
--
ALTER TABLE `media`
  ADD CONSTRAINT `media_applicant_id_foreign` FOREIGN KEY (`applicant_id`) REFERENCES `applicants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `purchase_documents`
--
ALTER TABLE `purchase_documents`
  ADD CONSTRAINT `purchase_documents_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `transaction_logs`
--
ALTER TABLE `transaction_logs`
  ADD CONSTRAINT `transaction_logs_document_id_foreign` FOREIGN KEY (`document_id`) REFERENCES `documents` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
