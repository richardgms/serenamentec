// schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

// Enums
enum DiagnosisType {
  TEA
  TDAH
  BOTH
  EXPLORING
}

enum CrisisType {
  SENSORY
  EMOTIONAL
  EXECUTIVE
  OTHER
}

enum CrisisDuration {
  LESS_5MIN
  MIN_5_30
  MIN_30_60
  MORE_60MIN
}

enum ResonateAnswer {
  YES
  NO
  MAYBE
}

enum MoodType {
  HAPPY
  NEUTRAL
  ANXIOUS
  SAD
  ANGRY
}

enum BreathingPattern {
  ANXIETY_478
  BALANCE_4444
  SLEEP_466
  CUSTOM
}

enum VideoCategory {
  FAVORITES
  VISUAL_CALMING
  NATURE_SOUNDS
  WHITE_NOISE
  ASMR
  RECENT
}

enum JourneyType {
  AM_I_AUTISTIC
  UNDERSTANDING_ADHD
  SENSORY_PROCESSING
}

enum TopicType {
  SENSORY_SENSITIVITY
  SOCIAL_COMMUNICATION
  ROUTINES_RITUALS
  HYPERFOCUS
  STIMMING
  MASKING
  SENSORY_OVERLOAD
  EXECUTIVE_FUNCTION
}

enum AchievementType {
  FIRST_BREATHING
  EXPLORER_5_VIDEOS
  SELF_KNOWLEDGE
  SEVEN_DAYS_JOURNEY
  REFLECTIVE_10
  THIRTY_DAYS_CARE
}

// Models
model User {
  id              String    @id @default(cuid())
  clerkUserId     String    @unique @map("clerk_user_id")
  email           String    @unique
  firstName       String    @map("first_name")
  lastName        String    @map("last_name")
  age             Int
  diagnosisType   DiagnosisType? @map("diagnosis_type")
  profilePicture  String?   @map("profile_picture_url")
  onboardingCompleted Boolean @default(false) @map("onboarding_completed")
  createdAt       DateTime  @default(now()) @map("created_at")
  updatedAt       DateTime  @updatedAt @map("updated_at")
  
  // Relations
  breathingSessions  BreathingSession[]
  videoFavorites     VideoFavorite[]
  videoHistory       VideoHistory[]
  dailyReflections   DailyReflection[]
  journeyProgress    JourneyProgress[]
  topicExplorations  TopicExploration[]
  crisisLogs         CrisisLog[]
  moodCheckIns       MoodCheckIn[]
  achievements       Achievement[]
  preferences        UserPreferences?
  customBreathing    CustomBreathing?
  userStreaks        UserStreak?
  
  @@index([clerkUserId])
  @@index([email])
  @@map("users")
}

model UserPreferences {
  id                String   @id @default(cuid())
  userId            String   @unique @map("user_id")
  vibrationEnabled  Boolean  @default(true) @map("vibration_enabled")
  soundEnabled      Boolean  @default(true) @map("sound_enabled")
  darkMode          Boolean  @default(false) @map("dark_mode")
  dailyReflectionTime String? @map("daily_reflection_time") // HH:mm format
  reminderEnabled   Boolean  @default(false) @map("reminder_enabled")
  createdAt         DateTime @default(now()) @map("created_at")
  updatedAt         DateTime @updatedAt @map("updated_at")
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@map("user_preferences")
}

model BreathingSession {
  id              String   @id @default(cuid())
  userId          String   @map("user_id")
  patternType     BreathingPattern @map("pattern_type")
  cyclesTarget    Int      @default(5) @map("cycles_target")
  cyclesCompleted Int      @map("cycles_completed")
  totalDuration   Int      @map("total_duration") // in seconds
  completed       Boolean  @default(false)
  interruptedAt   DateTime? @map("interrupted_at")
  createdAt       DateTime @default(now()) @map("created_at")
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([createdAt])
  @@map("breathing_sessions")
}

model CustomBreathing {
  id          String   @id @default(cuid())
  userId      String   @unique @map("user_id")
  inhaleTime  Int      @map("inhale_time") // seconds
  holdTime    Int      @map("hold_time")
  exhaleTime  Int      @map("exhale_time")
  pauseTime   Int?     @map("pause_time") // optional pause
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("custom_breathing_patterns")
}

model VideoFavorite {
  id          String   @id @default(cuid())
  userId      String   @map("user_id")
  videoUrl    String   @map("video_url")
  videoTitle  String   @map("video_title")
  videoId     String   @map("video_id") // YouTube video ID
  category    VideoCategory
  thumbnail   String?
  createdAt   DateTime @default(now()) @map("created_at")
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, videoId])
  @@index([userId])
  @@map("video_favorites")
}

model VideoHistory {
  id            String   @id @default(cuid())
  userId        String   @map("user_id")
  videoUrl      String   @map("video_url")
  videoTitle    String   @map("video_title")
  videoId       String   @map("video_id")
  watchDuration Int?     @map("watch_duration") // seconds watched
  completed     Boolean  @default(false)
  watchedAt     DateTime @default(now()) @map("watched_at")
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([watchedAt])
  @@map("video_history")
}

model DailyReflection {
  id        String   @id @default(cuid())
  userId    String   @map("user_id")
  question  String   @db.Text
  answer    String?  @db.Text
  skipped   Boolean  @default(false)
  createdAt DateTime @default(now()) @map("created_at")
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([createdAt])
  @@map("daily_reflections")
}

model JourneyProgress {
  id            String      @id @default(cuid())
  userId        String      @map("user_id")
  journeyType   JourneyType @map("journey_type")
  currentStep   Int         @default(1) @map("current_step")
  totalSteps    Int         @map("total_steps")
  completedSteps Int[]      @map("completed_steps")
  stepNotes     Json?       @map("step_notes") // {step: notes} format
  completed     Boolean     @default(false)
  startedAt     DateTime    @default(now()) @map("started_at")
  completedAt   DateTime?   @map("completed_at")
  lastAccessAt  DateTime    @default(now()) @map("last_access_at")
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, journeyType])
  @@index([userId])
  @@map("journey_progress")
}

model TopicExploration {
  id          String         @id @default(cuid())
  userId      String         @map("user_id")
  topicType   TopicType      @map("topic_type")
  resonates   ResonateAnswer?
  notes       String?        @db.Text
  bookmarked  Boolean        @default(false)
  exploredAt  DateTime       @default(now()) @map("explored_at")
  updatedAt   DateTime       @updatedAt @map("updated_at")
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, topicType])
  @@index([userId])
  @@map("topic_explorations")
}

model CrisisLog {
  id              String         @id @default(cuid())
  userId          String         @map("user_id")
  intensity       Int            // 1-5
  crisisTypes     CrisisType[]   @map("crisis_types")
  duration        CrisisDuration
  whatHelped      String[]       @map("what_helped")
  additionalNotes String?        @db.Text @map("additional_notes")
  location        String?        // Optional: where it happened
  triggers        String[]       // Optional: identified triggers
  createdAt       DateTime       @default(now()) @map("created_at")
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([createdAt])
  @@map("crisis_logs")
}

model MoodCheckIn {
  id        String   @id @default(cuid())
  userId    String   @map("user_id")
  mood      MoodType
  notes     String?  @db.Text
  createdAt DateTime @default(now()) @map("created_at")
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@index([createdAt])
  @@map("mood_check_ins")
}

model Achievement {
  id           String          @id @default(cuid())
  userId       String          @map("user_id")
  type         AchievementType
  unlockedAt   DateTime        @default(now()) @map("unlocked_at")
  acknowledged Boolean         @default(false) // User saw the notification
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@unique([userId, type])
  @@index([userId])
  @@map("achievements")
}

model UserStreak {
  id              String   @id @default(cuid())
  userId          String   @unique @map("user_id")
  currentStreak   Int      @default(0) @map("current_streak")
  longestStreak   Int      @default(0) @map("longest_streak")
  lastCheckIn     DateTime @map("last_check_in")
  restDayUsed     Boolean  @default(false) @map("rest_day_used")
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")
  
  // Relations
  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@index([userId])
  @@map("user_streaks")
}

// Static content tables (populated via seed)
model DailyQuestion {
  id          String   @id @default(cuid())
  question    String   @db.Text
  category    String   // sensory, social, executive, etc
  dayOfYear   Int?     @unique @map("day_of_year") // 1-366 for daily rotation
  active      Boolean  @default(true)
  createdAt   DateTime @default(now()) @map("created_at")
  
  @@index([dayOfYear])
  @@index([category])
  @@map("daily_questions")
}

model Video {
  id          String        @id @default(cuid())
  title       String
  url         String
  videoId     String        @unique @map("video_id")
  category    VideoCategory
  description String?       @db.Text
  thumbnail   String?
  duration    Int?          // in seconds
  active      Boolean       @default(true)
  order       Int           @default(0) // for sorting
  createdAt   DateTime      @default(now()) @map("created_at")
  
  @@index([category])
  @@index([order])
  @@map("videos")
}

model JourneyContent {
  id          String      @id @default(cuid())
  journeyType JourneyType @map("journey_type")
  step        Int
  title       String
  content     String      @db.Text
  reflection  String      @db.Text // reflection question
  createdAt   DateTime    @default(now()) @map("created_at")
  
  @@unique([journeyType, step])
  @@index([journeyType])
  @@map("journey_content")
}

model TopicContent {
  id          String    @id @default(cuid())
  topicType   TopicType @map("topic_type")
  title       String
  description String    @db.Text
  examples    String[]  // Array of practical examples
  createdAt   DateTime  @default(now()) @map("created_at")
  
  @@unique([topicType])
  @@map("topic_content")
}