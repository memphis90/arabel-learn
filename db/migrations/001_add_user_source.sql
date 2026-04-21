-- Add source field to users table
-- Tracks which product the user registered from: app | site | learn
ALTER TABLE users
  ADD COLUMN source ENUM('app','site','learn') NOT NULL DEFAULT 'site'
  AFTER email;
