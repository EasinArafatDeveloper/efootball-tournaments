import {
  INITIAL_CLUBS,
  INITIAL_PLAYERS,
  INITIAL_REFEREES,
  INITIAL_TOURNAMENTS,
  INITIAL_FIXTURES,
  INITIAL_ACTIVITY_EVENTS,
  INITIAL_NEWS_ARTICLES,
  INITIAL_EVENTS,
  INITIAL_LEADERSHIP,
  INITIAL_PARTNERS,
  INITIAL_SPONSORS
} from "./mock-data";
import { calculateNewRating, updateFormHistory } from "../ranking/engine";
import { calculatePlayerMarketValue } from "../valuation/engine";

// In-Memory Global Store Singleton
class DatabaseStore {
  private clubs: any[] = [...INITIAL_CLUBS];
  private players: any[] = [...INITIAL_PLAYERS];
  private referees: any[] = [...INITIAL_REFEREES];
  private tournaments: any[] = [...INITIAL_TOURNAMENTS];
  private fixtures: any[] = [...INITIAL_FIXTURES];
  private activityEvents: any[] = [...INITIAL_ACTIVITY_EVENTS];
  private newsArticles: any[] = [...INITIAL_NEWS_ARTICLES];
  private events: any[] = [...INITIAL_EVENTS];
  private leadership: any[] = [...INITIAL_LEADERSHIP];
  private partners: any[] = [...INITIAL_PARTNERS];
  private sponsors: any[] = [...INITIAL_SPONSORS];
  private transferListings: any[] = [
    {
      id: "trans-list-1",
      playerId: "player-9",
      player: INITIAL_PLAYERS.find((p) => p.id === "player-9"),
      askingPrice: 105.0,
      status: "LISTED",
      listedDate: "2026-09-16T12:00:00Z",
    },
    {
      id: "trans-list-2",
      playerId: "player-17",
      player: INITIAL_PLAYERS.find((p) => p.id === "player-17"),
      askingPrice: 56.0,
      status: "LISTED",
      listedDate: "2026-09-17T15:00:00Z",
    },
    {
      id: "trans-list-3",
      playerId: "player-12",
      player: INITIAL_PLAYERS.find((p) => p.id === "player-12"),
      askingPrice: 82.0,
      status: "AVAILABLE",
      listedDate: "2026-09-18T10:00:00Z",
    }
  ];
  private transferRequests: any[] = [];
  private transferHistory: any[] = [
    {
      id: "th-1",
      playerId: "player-8",
      playerName: "Arifuzzaman Khan",
      previousClubName: "Sylhet Strikers Esports",
      newClubName: "Dhaka Dominators Esports",
      fee: 115.0,
      transferDate: "2026-09-17T14:30:00Z",
      approvedBy: "Admin Secretariat"
    }
  ];
  private disciplinaryRecords: any[] = [
    {
      id: "disc-1",
      targetType: "PLAYER",
      targetId: "player-23",
      targetName: "Anowar Hossain",
      reason: "Aggressive unsportsmanlike match chat during Division 1 fixture",
      penalty: "SUSPENSION_1W",
      status: "ACTIVE",
      startDate: "2026-09-16T00:00:00Z",
      endDate: "2026-09-23T23:59:59Z",
      issuedBy: "Tanzid Hasan Joy (Head of Match Officials)"
    }
  ];
  private auditLogs: any[] = [
    {
      id: "audit-1",
      adminId: "admin-1",
      adminName: "Super Admin",
      action: "APPROVED_MATCH_RESULT",
      target: "Fixture #fix-fin-1 (DDE 3 - 1 RRF)",
      ipAddress: "127.0.0.1",
      createdAt: "2026-09-17T19:00:00Z"
    }
  ];
  private users: any[] = [
    {
      id: "admin-1",
      email: "admin@necob.com",
      username: "superadmin",
      fullName: "Super Admin Director",
      passwordHash: "$2a$10$w0u2G9c4.WwK9Kk4o/3OReN9K67rNl0YlRslZkXhUqG27vSgKqZ8m", // "Admin@Password2026!"
      role: "SUPER_ADMIN",
      status: "ACTIVE",
    },
    {
      id: "user-p-1",
      email: "mahim@efcobbd.com",
      username: "mahim_striker",
      fullName: "Mahim Haider",
      passwordHash: "$2a$10$w0u2G9c4.WwK9Kk4o/3OReN9K67rNl0YlRslZkXhUqG27vSgKqZ8m",
      role: "PLAYER",
      status: "ACTIVE",
    },
    {
      id: "user-mgr-1",
      email: "manager.dhaka@efcobbd.com",
      username: "rahim_manager",
      fullName: "Rahim Chowdhury",
      passwordHash: "$2a$10$w0u2G9c4.WwK9Kk4o/3OReN9K67rNl0YlRslZkXhUqG27vSgKqZ8m",
      role: "CLUB_MANAGER",
      status: "ACTIVE",
      clubId: "club-1"
    }
  ];

  // Helper to populate club on player
  private enrichPlayer(player: any) {
    const club = player.clubId ? this.clubs.find((c) => c.id === player.clubId) : undefined;
    return {
      ...player,
      form: player.formHistory ? player.formHistory.split(",").filter(Boolean) : [],
      club: club ? { id: club.id, name: club.name, shortName: club.shortName, slug: club.slug, logo: club.logo } : undefined
    };
  }

  // --- Players ---
  getPlayers(filter?: { position?: string; clubId?: string; search?: string; status?: string }) {
    let list = this.players.map((p) => this.enrichPlayer(p));
    if (filter?.position && filter.position !== "ALL") {
      list = list.filter((p) => p.preferredPosition === filter.position);
    }
    if (filter?.clubId && filter.clubId !== "ALL") {
      list = list.filter((p) => p.clubId === filter.clubId);
    }
    if (filter?.status && filter.status !== "ALL") {
      list = list.filter((p) => p.status === filter.status);
    }
    if (filter?.search) {
      const q = filter.search.toLowerCase();
      list = list.filter(
        (p) =>
          p.fullName.toLowerCase().includes(q) ||
          p.username.toLowerCase().includes(q) ||
          p.konamiId.toLowerCase().includes(q)
      );
    }
    return list;
  }

  getPlayerByUsername(username: string) {
    const player = this.players.find((p) => p.username.toLowerCase() === username.toLowerCase());
    return player ? this.enrichPlayer(player) : null;
  }

  getPlayerById(id: string) {
    const player = this.players.find((p) => p.id === id);
    return player ? this.enrichPlayer(player) : null;
  }

  createPlayer(data: any) {
    const newPlayer = {
      id: `player-${this.players.length + 1}`,
      userId: data.userId || `user-p-${this.players.length + 1}`,
      username: data.username,
      fullName: data.fullName,
      avatar: data.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
      konamiId: data.konamiId,
      deviceModel: data.deviceModel,
      facebookProfile: data.facebookProfile || "",
      preferredPosition: data.preferredPosition || "CF",
      playStyle: data.playStyle || "Possession Game",
      bio: data.bio || "",
      rating: 750,
      marketValue: 35.0,
      status: "ACTIVE",
      formHistory: "W,D,W",
      motmCount: 0,
      clubId: data.clubId || undefined,
      stats: { matchesPlayed: 0, wins: 0, draws: 0, losses: 0, winRate: 0, goalsScored: 0, assists: 0, cleanSheets: 0, points: 0 },
      contract: { status: "FREE_AGENT", durationMonths: 0, daysRemaining: 0 }
    };
    this.players.push(newPlayer);
    this.addActivityEvent({
      type: "PLAYER_REGISTER",
      category: "Players",
      title: `New Athlete Registered: ${newPlayer.fullName} (@${newPlayer.username})`,
      description: `Konami UID ${newPlayer.konamiId} joined the eFCOB national player database.`,
      avatar: newPlayer.avatar,
      targetUrl: `/players/${newPlayer.username}`
    });
    return this.enrichPlayer(newPlayer);
  }

  updatePlayer(id: string, updates: Partial<any>) {
    const idx = this.players.findIndex((p) => p.id === id);
    if (idx !== -1) {
      this.players[idx] = { ...this.players[idx], ...updates };
      return this.enrichPlayer(this.players[idx]);
    }
    return null;
  }

  // --- Clubs ---
  getClubs() {
    return this.clubs.map((c) => ({
      ...c,
      form: c.formHistory ? c.formHistory.split(",") : [],
      squadCount: this.players.filter((p) => p.clubId === c.id).length
    }));
  }

  getClubBySlug(slug: string) {
    const club = this.clubs.find((c) => c.slug === slug);
    if (!club) return null;
    const squad = this.players.filter((p) => p.clubId === club.id).map((p) => this.enrichPlayer(p));
    return {
      ...club,
      form: club.formHistory ? club.formHistory.split(",") : [],
      squad,
      squadCount: squad.length
    };
  }

  getClubById(id: string) {
    const club = this.clubs.find((c) => c.id === id);
    if (!club) return null;
    const squad = this.players.filter((p) => p.clubId === club.id).map((p) => this.enrichPlayer(p));
    return {
      ...club,
      form: club.formHistory ? club.formHistory.split(",") : [],
      squad,
      squadCount: squad.length
    };
  }

  createClub(data: any) {
    const newClub = {
      id: `club-${this.clubs.length + 1}`,
      name: data.name,
      shortName: data.shortName,
      slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      logo: data.logo || "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=80",
      banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80",
      managerId: data.managerId || "mgr-temp",
      managerName: data.managerName || "Official Club Manager",
      location: data.location || "Dhaka, Bangladesh",
      facebookPage: data.facebookPage || "",
      description: data.description || "",
      foundedDate: new Date().toISOString(),
      status: "ACTIVE",
      marketValue: 150.0,
      points: 0,
      formHistory: "W,D,L",
      trophiesCount: 0,
      stats: { matches: 0, wins: 0, draws: 0, losses: 0, winRate: 0, goalsScored: 0, goalsConceded: 0 }
    };
    this.clubs.push(newClub);
    return newClub;
  }

  // --- Fixtures & Matches ---
  getFixtures(filter?: { status?: string; tournamentId?: string; clubId?: string; onStream?: boolean }) {
    let list = [...this.fixtures];
    if (filter?.status && filter.status !== "ALL") {
      list = list.filter((f) => f.status === filter.status);
    }
    if (filter?.tournamentId && filter.tournamentId !== "ALL") {
      list = list.filter((f) => f.tournamentId === filter.tournamentId);
    }
    if (filter?.clubId && filter.clubId !== "ALL") {
      list = list.filter((f) => f.homeClub?.id === filter.clubId || f.awayClub?.id === filter.clubId);
    }
    if (filter?.onStream) {
      list = list.filter((f) => f.isOnStream);
    }
    return list;
  }

  getFixtureById(id: string) {
    return this.fixtures.find((f) => f.id === id) || null;
  }

  createFixture(data: any) {
    const homePlayer = data.homePlayerId ? this.getPlayerById(data.homePlayerId) : undefined;
    const awayPlayer = data.awayPlayerId ? this.getPlayerById(data.awayPlayerId) : undefined;
    const homeClub = data.homeClubId ? this.getClubById(data.homeClubId) : undefined;
    const awayClub = data.awayClubId ? this.getClubById(data.awayClubId) : undefined;
    const ref = data.refereeId ? this.referees.find((r) => r.id === data.refereeId) : this.referees[0];

    const newFixture = {
      id: `fix-${Date.now()}`,
      tournamentId: data.tournamentId || "tourn-1",
      tournamentName: data.tournamentName || "National Championship 2026",
      round: data.round || "Regular Season",
      scheduledDate: data.scheduledDate || new Date().toISOString(),
      venue: data.venue || "Online / Konami Server 01",
      status: "SCHEDULED" as const,
      isOnStream: !!data.isOnStream,
      streamPlatform: data.streamPlatform || "YouTube",
      streamUrl: data.streamUrl || "",
      homePlayer: homePlayer ? { id: homePlayer.id, username: homePlayer.username, fullName: homePlayer.fullName, rating: homePlayer.rating, avatar: homePlayer.avatar } : undefined,
      awayPlayer: awayPlayer ? { id: awayPlayer.id, username: awayPlayer.username, fullName: awayPlayer.fullName, rating: awayPlayer.rating, avatar: awayPlayer.avatar } : undefined,
      homeClub: homeClub ? { id: homeClub.id, name: homeClub.name, shortName: homeClub.shortName, logo: homeClub.logo } : undefined,
      awayClub: awayClub ? { id: awayClub.id, name: awayClub.name, shortName: awayClub.shortName, logo: awayClub.logo } : undefined,
      referee: ref ? { id: ref.id, name: ref.name, tier: ref.tier, rating: ref.rating } : undefined,
    };
    this.fixtures.unshift(newFixture);
    return newFixture;
  }

  submitMatchResult(fixtureId: string, resultData: any) {
    const fixIdx = this.fixtures.findIndex((f) => f.id === fixtureId);
    if (fixIdx === -1) return null;

    const fixture = this.fixtures[fixIdx];
    fixture.result = {
      homeScore: resultData.homeScore,
      awayScore: resultData.awayScore,
      homePenalties: resultData.homePenalties,
      awayPenalties: resultData.awayPenalties,
      motmPlayerName: resultData.motmPlayerName,
      motmPlayerAvatar: resultData.motmPlayerAvatar,
      motmReason: resultData.motmReason,
      status: "APPROVED" as const,
    };
    fixture.status = "FINISHED" as const;

    // Update Player Ratings & Stats
    if (fixture.homePlayer && fixture.awayPlayer) {
      const homeP = this.players.find((p) => p.id === fixture.homePlayer?.id);
      const awayP = this.players.find((p) => p.id === fixture.awayPlayer?.id);

      if (homeP && awayP) {
        const homeWon = resultData.homeScore > resultData.awayScore;
        const awayWon = resultData.awayScore > resultData.homeScore;
        const isDraw = resultData.homeScore === resultData.awayScore;

        // Ratings
        homeP.rating = calculateNewRating(homeP.rating, awayP.rating, {
          isWin: homeWon,
          isDraw,
          goalsScored: resultData.homeScore,
          goalsConceded: resultData.awayScore,
          isMotm: resultData.motmPlayerId === homeP.id
        });
        awayP.rating = calculateNewRating(awayP.rating, homeP.rating, {
          isWin: awayWon,
          isDraw,
          goalsScored: resultData.awayScore,
          goalsConceded: resultData.homeScore,
          isMotm: resultData.motmPlayerId === awayP.id
        });

        // Form
        homeP.formHistory = updateFormHistory(homeP.formHistory, homeWon ? 'W' : isDraw ? 'D' : 'L');
        awayP.formHistory = updateFormHistory(awayP.formHistory, awayWon ? 'W' : isDraw ? 'D' : 'L');

        // Stats
        homeP.stats.matchesPlayed += 1;
        awayP.stats.matchesPlayed += 1;
        homeP.stats.goalsScored += resultData.homeScore;
        awayP.stats.goalsScored += resultData.awayScore;
        if (homeWon) {
          homeP.stats.wins += 1;
          awayP.stats.losses += 1;
          homeP.stats.points += 3;
        } else if (awayWon) {
          awayP.stats.wins += 1;
          homeP.stats.losses += 1;
          awayP.stats.points += 3;
        } else {
          homeP.stats.draws += 1;
          awayP.stats.draws += 1;
          homeP.stats.points += 1;
          awayP.stats.points += 1;
        }
        if (resultData.awayScore === 0) homeP.stats.cleanSheets += 1;
        if (resultData.homeScore === 0) awayP.stats.cleanSheets += 1;

        if (resultData.motmPlayerId === homeP.id) homeP.motmCount += 1;
        if (resultData.motmPlayerId === awayP.id) awayP.motmCount += 1;

        // Recalculate market values
        homeP.marketValue = calculatePlayerMarketValue({
          rating: homeP.rating,
          matchesPlayed: homeP.stats.matchesPlayed,
          winRate: (homeP.stats.wins / homeP.stats.matchesPlayed) * 100,
          goalsScored: homeP.stats.goalsScored,
          motmCount: homeP.motmCount,
          cleanSheets: homeP.stats.cleanSheets,
          recentForm: homeP.formHistory
        });
        awayP.marketValue = calculatePlayerMarketValue({
          rating: awayP.rating,
          matchesPlayed: awayP.stats.matchesPlayed,
          winRate: (awayP.stats.wins / awayP.stats.matchesPlayed) * 100,
          goalsScored: awayP.stats.goalsScored,
          motmCount: awayP.motmCount,
          cleanSheets: awayP.stats.cleanSheets,
          recentForm: awayP.formHistory
        });
      }
    }

    // Activity Feed Entry
    const winnerName = resultData.homeScore > resultData.awayScore
      ? (fixture.homePlayer?.fullName || fixture.homeClub?.name)
      : (fixture.awayPlayer?.fullName || fixture.awayClub?.name);

    this.addActivityEvent({
      type: "MATCH_WIN",
      category: "Matches",
      title: `${winnerName} won the match ${resultData.homeScore} - ${resultData.awayScore}`,
      description: `${fixture.round} completed at ${fixture.venue}`,
      targetUrl: `/matches/${fixture.id}`
    });

    return fixture;
  }

  // --- Tournaments ---
  getTournaments() {
    return [...this.tournaments];
  }

  getTournamentBySlug(slug: string) {
    const tourn = this.tournaments.find((t) => t.slug === slug);
    if (!tourn) return null;
    const tournFixtures = this.fixtures.filter((f) => f.tournamentId === tourn.id);
    return {
      ...tourn,
      fixtures: tournFixtures
    };
  }

  createTournament(data: any) {
    const newTourn = {
      id: `tourn-${Date.now()}`,
      name: data.name,
      slug: data.name.toLowerCase().replace(/\s+/g, "-"),
      banner: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1200&auto=format&fit=crop&q=80",
      logo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=200&auto=format&fit=crop&q=80",
      description: data.description || "",
      format: data.format || "SINGLE_ELIMINATION",
      gameCategory: data.gameCategory || "eFootball Mobile",
      platform: data.platform || "Mobile",
      startDate: data.startDate,
      endDate: data.endDate,
      registrationDeadline: data.registrationDeadline,
      maxParticipants: data.maxParticipants || 32,
      currentParticipants: 0,
      prizePool: data.prizePool || "50,000 BDT",
      status: "REGISTRATION_OPEN" as const,
      progressPercent: 0,
      completedMatches: 0,
      totalMatches: data.maxParticipants - 1
    };
    this.tournaments.unshift(newTourn);
    return newTourn;
  }

  // --- Referees ---
  getReferees() {
    return [...this.referees];
  }

  getRefereeById(id: string) {
    return this.referees.find((r) => r.id === id) || null;
  }

  createReferee(data: any) {
    const newRef = {
      id: `ref-${Date.now()}`,
      name: data.name,
      avatar: data.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      tier: data.tier || "TIER_2",
      matchesOfficiated: data.matchesOfficiated || 0,
      rating: data.rating || 4.5,
      fairPlayScore: data.fairPlayScore || 95,
      bio: data.bio || "Certified eFCOB Tournament Official",
      status: "ACTIVE"
    };
    this.referees.push(newRef);
    this.addAuditLog({
      adminId: "admin-1",
      adminName: "Super Admin",
      action: "REGISTERED_MATCH_OFFICIAL",
      target: newRef.name,
      details: `Accredited at ${newRef.tier}`
    });
    return newRef;
  }

  updateReferee(id: string, updates: any) {
    const idx = this.referees.findIndex((r) => r.id === id);
    if (idx !== -1) {
      this.referees[idx] = { ...this.referees[idx], ...updates };
      this.addAuditLog({
        adminId: "admin-1",
        adminName: "Super Admin",
        action: "UPDATED_MATCH_OFFICIAL",
        target: this.referees[idx].name,
        details: `Updated details: ${JSON.stringify(updates)}`
      });
      return this.referees[idx];
    }
    return null;
  }

  // --- Transfer Market ---
  getTransferListings() {
    return this.transferListings.map((tl) => ({
      ...tl,
      player: this.getPlayerById(tl.playerId)
    }));
  }

  createTransferListing(data: any) {
    const player = this.getPlayerById(data.playerId);
    const listing = {
      id: `trans-list-${Date.now()}`,
      playerId: data.playerId,
      player,
      askingPrice: data.askingPrice,
      status: "LISTED",
      listedDate: new Date().toISOString()
    };
    this.transferListings.unshift(listing);
    return listing;
  }

  createTransferRequest(data: any) {
    const req = {
      id: `tr-${Date.now()}`,
      playerId: data.playerId,
      targetClubId: data.targetClubId,
      offeredFee: data.offeredFee,
      proposedSalary: data.proposedSalary,
      status: "PENDING",
      message: data.message,
      createdAt: new Date().toISOString()
    };
    this.transferRequests.push(req);
    return req;
  }

  approveTransfer(listingId: string, buyerClubId: string) {
    const listingIdx = this.transferListings.findIndex((tl) => tl.id === listingId);
    if (listingIdx === -1) return null;

    const listing = this.transferListings[listingIdx];
    const player = this.players.find((p) => p.id === listing.playerId);
    const buyerClub = this.clubs.find((c) => c.id === buyerClubId);
    const oldClub = player?.clubId ? this.clubs.find((c) => c.id === player.clubId) : null;

    if (player && buyerClub) {
      player.clubId = buyerClub.id;
      player.contract = {
        status: "ACTIVE",
        durationMonths: 12,
        daysRemaining: 365,
      };

      const histItem = {
        id: `th-${Date.now()}`,
        playerId: player.id,
        playerName: player.fullName,
        previousClubName: oldClub?.name || "Free Agent",
        newClubName: buyerClub.name,
        fee: listing.askingPrice,
        transferDate: new Date().toISOString(),
        approvedBy: "Admin Secretariat"
      };
      this.transferHistory.unshift(histItem);
      this.transferListings.splice(listingIdx, 1);

      this.addActivityEvent({
        type: "TRANSFER",
        category: "Transfers",
        title: `Official Transfer: ${player.fullName} signed by ${buyerClub.name}!`,
        description: `Transfer fee agreed at $${listing.askingPrice}M`,
        avatar: player.avatar,
        targetUrl: `/players/${player.username}`
      });

      this.addAuditLog({
        adminId: "admin-1",
        adminName: "Super Admin",
        action: "APPROVED_TRANSFER",
        target: `${player.fullName} -> ${buyerClub.name}`,
        details: `Fee: $${listing.askingPrice}M`
      });

      return histItem;
    }
    return null;
  }

  getTransferHistory() {
    return [...this.transferHistory];
  }

  // --- Disciplinary ---
  getDisciplinaryRecords() {
    return [...this.disciplinaryRecords];
  }

  issueDisciplinaryAction(data: any) {
    const targetPlayer = data.targetType === "PLAYER" ? this.getPlayerById(data.targetId) : null;
    const targetClub = data.targetType === "CLUB" ? this.getClubById(data.targetId) : null;
    const newRecord = {
      id: `disc-${Date.now()}`,
      targetType: data.targetType,
      targetId: data.targetId,
      targetName: targetPlayer?.fullName || targetClub?.name || "Official Target",
      reason: data.reason,
      penalty: data.penalty,
      status: "ACTIVE",
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 7 * 86400000).toISOString(),
      issuedBy: data.issuedBy || "Super Admin"
    };
    this.disciplinaryRecords.unshift(newRecord);

    if (targetPlayer) {
      targetPlayer.status = "SUSPENDED";
    }

    this.addAuditLog({
      adminId: "admin-1",
      adminName: "Super Admin",
      action: `ISSUED_${data.penalty}`,
      target: newRecord.targetName,
      details: data.reason
    });

    return newRecord;
  }

  // --- Activity Feed ---
  getActivityEvents(category?: string) {
    if (category && category !== "All") {
      return this.activityEvents.filter((a) => a.category === category);
    }
    return [...this.activityEvents];
  }

  addActivityEvent(event: Partial<any>) {
    const item = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(7)}`,
      type: event.type || "GENERAL",
      category: event.category || "Matches",
      title: event.title || "",
      description: event.description || "",
      createdAt: new Date().toISOString(),
      avatar: event.avatar,
      targetUrl: event.targetUrl
    };
    this.activityEvents.unshift(item);
    return item;
  }

  // --- CMS ---
  getNews(category?: string) {
    if (category && category !== "ALL") {
      return this.newsArticles.filter((n) => n.category === category);
    }
    return [...this.newsArticles];
  }

  getNewsBySlug(slug: string) {
    return this.newsArticles.find((n) => n.slug === slug) || null;
  }

  getEvents() {
    return [...this.events];
  }

  getLeadership() {
    return [...this.leadership];
  }

  getPartners() {
    return [...this.partners];
  }

  getSponsors() {
    return [...this.sponsors];
  }

  // --- Audit Logs ---
  getAuditLogs() {
    return [...this.auditLogs];
  }

  addAuditLog(log: any) {
    const item = {
      id: `audit-${Date.now()}`,
      adminId: log.adminId || "admin-1",
      adminName: log.adminName || "Super Admin",
      action: log.action,
      target: log.target,
      details: log.details || "",
      ipAddress: log.ipAddress || "127.0.0.1",
      createdAt: new Date().toISOString()
    };
    this.auditLogs.unshift(item);
    return item;
  }

  // --- Platform Statistics ---
  getPlatformStats() {
    return {
      registeredPlayers: this.players.length,
      activeClubs: this.clubs.length,
      completedMatches: this.fixtures.filter((f) => f.status === "FINISHED").length,
      liveMatches: this.fixtures.filter((f) => f.status === "LIVE").length,
      activeTournaments: this.tournaments.filter((t) => t.status === "ONGOING" || t.status === "REGISTRATION_OPEN").length,
      registeredOfficials: this.referees.length,
      totalTransfers: this.transferHistory.length + this.transferListings.length,
      totalGoalsScored: this.players.reduce((acc, p) => acc + (p.stats?.goalsScored || 0), 0)
    };
  }

  // --- Users & Auth ---
  getUserByEmailOrUsername(emailOrUsername: string) {
    const lower = emailOrUsername.toLowerCase();
    return this.users.find(
      (u) => u.email.toLowerCase() === lower || u.username.toLowerCase() === lower
    ) || null;
  }

  createUser(userData: any) {
    const user = {
      id: `user-${Date.now()}`,
      email: userData.email,
      username: userData.username,
      fullName: userData.fullName,
      passwordHash: userData.passwordHash,
      role: userData.role || "PLAYER",
      status: "ACTIVE",
    };
    this.users.push(user);
    return user;
  }
}

// Global Singleton
const globalForDb = globalThis as unknown as { dbStore: DatabaseStore };
export const db = globalForDb.dbStore || new DatabaseStore();
if (process.env.NODE_ENV !== "production") globalForDb.dbStore = db;
