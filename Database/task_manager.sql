-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2025 at 11:10 PM
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
-- Database: `task_manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('pending','completed') DEFAULT 'pending',
  `created_at` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `status`, `created_at`) VALUES
(5, 'Facere optio rem qu', 'Sit enim sed consequ', 'completed', '2025-06-19 19:21:33'),
(6, 'Amet dolor dolores ', 'Voluptatum qui odio ', 'pending', '2025-06-19 19:21:52'),
(7, 'Qui voluptatem quib', 'Ullam velit similiqu', 'completed', '2025-06-19 19:41:37'),
(8, 'Illo et quia elit s', 'Aliqua Optio sit ', 'completed', '2025-06-20 11:33:17'),
(9, 'Eum doloremque delec', 'Error exercitationem', 'completed', '2025-06-20 11:49:51'),
(10, 'Expedita sed cupidit', 'Consectetur amet qu', 'pending', '2025-06-20 12:10:31'),
(11, 'Perferendis veniam ', 'Doloribus dolore est', 'pending', '2025-06-20 12:11:07'),
(12, 'Autem commodi except', 'Dolores et maiores i', 'pending', '2025-06-20 12:20:12'),
(13, 'Qui exercitationem q', 'Illum assumenda rep', 'completed', '2025-06-20 12:31:19'),
(14, 'Consequatur Ratione 6666', 'Veritatis in qui qui', 'completed', '2025-06-20 12:50:26'),
(15, 'Dolor dignissimos ve', 'Ut fuga Voluptas al', 'completed', '2025-06-20 13:02:14'),
(16, 'Eligendi velit exer', 'Labore nulla ut aspe', 'pending', '2025-06-20 15:45:59'),
(17, 'Quia dolores sit err', 'Quo eiusmod fugiat ', 'pending', '2025-06-20 15:46:37'),
(18, 'Nihil molestiae anim', 'Cupiditate quis irur', 'pending', '2025-06-20 16:13:46'),
(19, 'sss', 'dkf freler ', 'completed', '2025-06-20 22:30:50'),
(20, 'swwq', 'edwda', 'pending', '2025-06-20 23:30:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
