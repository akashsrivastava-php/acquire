-- phpMyAdmin SQL Dump
-- version 4.6.6deb5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 15, 2020 at 03:09 PM
-- Server version: 5.7.30-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `acquire`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `title`, `status`, `createdAt`, `updatedAt`) VALUES
(2, 1, 'test', 0, '2020-05-14 17:02:31', '2020-05-15 05:10:56'),
(4, 15, 'First  Task Updated', 0, '2020-05-15 07:25:43', '2020-05-15 07:26:43');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` varchar(255) NOT NULL,
  `updatedAt` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'test', 'test@gmail.com', '123456', '2020-05-12 16:17:29', '2020-05-15 05:39:10'),
(3, 'test', 'test1@gmail.com', '123456', '2020-05-12 16:19:41', '2020-05-12 16:19:41'),
(4, 'test', 'test2@gmail.com', '123456', '2020-05-12 16:20:31', '2020-05-12 16:20:31'),
(5, 'test', 'test3@gmail.com', '123456', '2020-05-12 16:22:11', '2020-05-12 16:22:11'),
(6, 'test', 'test4@gmail.com', '123456', '2020-05-12 16:26:00', '2020-05-12 16:26:00'),
(7, 'test', 'test5@gmail.com', '123456', '2020-05-12 16:27:18', '2020-05-12 16:27:18'),
(8, 'test', 'test6@gmail.com', '123456', '2020-05-12 16:29:06', '2020-05-12 16:29:06'),
(10, 'test', 'test7@gmail.com', '123456', '2020-05-12 16:36:38', '2020-05-12 16:36:38'),
(11, 'test', 'test8@gmail.com', '123456', '2020-05-13 03:38:14', '2020-05-13 03:38:14'),
(14, 'jdh', 'test9@gmail.com', '123456', '2020-05-13 16:14:57', '2020-05-13 16:14:57'),
(15, 'Jay Singh', 'jay@abc.com', '1234', '2020-05-15 07:25:31', '2020-05-15 07:25:31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
