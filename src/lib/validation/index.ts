import { z } from "zod";

export const RegisterSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters").max(60),
  username: z.string().min(3, "Username must be at least 3 characters").max(30).regex(/^[a-zA-Z0-9_-]+$/, "Username can only contain letters, numbers, underscores and hyphens"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  konamiId: z.string().min(5, "Konami ID / In-game UID is required"),
  deviceModel: z.string().min(2, "Device model is required"),
  facebookProfile: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  preferredPosition: z.string().default("CF"),
  playStyle: z.string().default("Possession Game"),
  phone: z.string().optional(),
  bio: z.string().max(300).optional(),
});

export const LoginSchema = z.object({
  emailOrUsername: z.string().min(1, "Email or username is required"),
  password: z.string().min(1, "Password is required"),
});

export const PlayerUpdateSchema = z.object({
  fullName: z.string().min(2).max(60).optional(),
  deviceModel: z.string().min(2).optional(),
  facebookProfile: z.string().url().optional().or(z.literal("")),
  preferredPosition: z.string().optional(),
  playStyle: z.string().optional(),
  bio: z.string().max(300).optional(),
  phone: z.string().optional(),
});

export const ClubCreateSchema = z.object({
  name: z.string().min(3, "Club name is required").max(60),
  shortName: z.string().min(2, "Short name is required").max(10),
  location: z.string().default("Dhaka, Bangladesh"),
  facebookPage: z.string().url().optional().or(z.literal("")),
  description: z.string().max(500).optional(),
  logo: z.string().optional(),
});

export const FixtureCreateSchema = z.object({
  tournamentId: z.string().optional(),
  homeClubId: z.string().optional(),
  awayClubId: z.string().optional(),
  homePlayerId: z.string().optional(),
  awayPlayerId: z.string().optional(),
  scheduledDate: z.string().min(1, "Date and time required"),
  venue: z.string().default("Online / Konami Server 01"),
  round: z.string().default("Regular Season"),
  refereeId: z.string().optional(),
  isOnStream: z.boolean().default(false),
  streamUrl: z.string().url().optional().or(z.literal("")),
  streamPlatform: z.string().optional(),
});

export const MatchResultSubmitSchema = z.object({
  fixtureId: z.string().min(1, "Fixture ID is required"),
  homeScore: z.number().int().min(0),
  awayScore: z.number().int().min(0),
  homePenalties: z.number().int().min(0).optional(),
  awayPenalties: z.number().int().min(0).optional(),
  motmPlayerId: z.string().optional(),
  motmReason: z.string().max(250).optional(),
  proofScreenshot: z.string().optional(),
  refereeNotes: z.string().max(500).optional(),
});

export const TournamentCreateSchema = z.object({
  name: z.string().min(3, "Tournament name is required"),
  format: z.string().default("SINGLE_ELIMINATION"),
  gameCategory: z.string().default("eFootball Mobile"),
  platform: z.string().default("Mobile"),
  startDate: z.string(),
  endDate: z.string(),
  registrationDeadline: z.string(),
  maxParticipants: z.number().int().min(4).max(256).default(32),
  prizePool: z.string().default("50,000 BDT"),
  description: z.string().optional(),
  rules: z.string().optional(),
});

export const TransferRequestSchema = z.object({
  playerId: z.string().min(1, "Player ID is required"),
  targetClubId: z.string().min(1, "Target Club ID is required"),
  offeredFee: z.number().min(0).default(50),
  proposedSalary: z.number().min(0).optional(),
  message: z.string().max(300).optional(),
});

export const DisciplinaryActionSchema = z.object({
  targetType: z.enum(["PLAYER", "CLUB"]),
  targetId: z.string().min(1),
  reason: z.string().min(5, "Reason is required"),
  penalty: z.enum(["WARNING", "SUSPENSION_1W", "SUSPENSION_1M", "BAN_SEASON", "PERMANENT_BAN"]),
  evidence: z.string().optional(),
  notes: z.string().optional(),
});
