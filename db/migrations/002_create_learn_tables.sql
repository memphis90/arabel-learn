-- Learn progress: one row per completed lesson/quiz per user
CREATE TABLE IF NOT EXISTS user_learn_progress (
  id           INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id      INT          NOT NULL,
  item_id      VARCHAR(100) NOT NULL,
  item_type    ENUM('lesson','quiz') NOT NULL,
  xp_earned    INT          NOT NULL DEFAULT 0,
  score        INT          NULL,
  score_total  INT          NULL,
  completed_at DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_user_item (user_id, item_id),
  CONSTRAINT fk_ulp_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Learn stats: aggregate XP, level, streak, badges per user
CREATE TABLE IF NOT EXISTS user_learn_stats (
  id                  INT  NOT NULL AUTO_INCREMENT PRIMARY KEY,
  user_id             INT  NOT NULL UNIQUE,
  xp                  INT  NOT NULL DEFAULT 0,
  level               INT  NOT NULL DEFAULT 1,
  streak              INT  NOT NULL DEFAULT 0,
  last_activity_date  DATE NULL,
  badges              JSON NOT NULL DEFAULT (JSON_ARRAY()),
  created_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at          DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_uls_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
