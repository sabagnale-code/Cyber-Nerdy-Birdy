// HudExtras — overlay scene launched after login.
// Contains all my additions; Chris's files are untouched.
//
//   - Admin pill in top-right (always visible when logged in)
//   - Slim bottom nav with HOME / PLAY / BADGES / LEADERBOARD
//     (hidden on Title page — Title has its own buttons)
//   - Leaderboard rows drawn over LeaderboardScene
//   - Badge grid drawn over BadgesScene
//
// Visibility is computed every frame in update() — no event subscriptions
// (those were unreliable in Phaser 4 RC).

const MAIN_SCENES = [
	"TitleScene",
	"JourneyMapScene",
	"Level1",
	"Level",
	"Scene_Level_1_a",
	"Scene_Level_2_a",
	"feedback_correct",
	"feedback_incorrect",
	"LeaderboardScene",
	"BadgesScene"
];

export default class HudExtras extends Phaser.Scene {

	constructor() {
		super("HudExtras");
	}

	create() {

		// Track every object we create so we can show/hide cleanly.
		this.adminObjs   = [];
		this.navObjs     = [];
		this.lbObjs      = [];
		this.badgeObjs   = [];

		// Order matters — later = drawn on top. Build full-screen
		// overlays first so the admin pill and nav sit ABOVE them.
		this.buildLeaderboardLayer();
		this.buildBadgesLayer();
		this.buildAdminPill();
		this.buildBottomNav();

		this.refreshVisibility();
	}

	update() {
		// Called every frame — cheap visibility refresh.
		this.refreshVisibility();
	}

	// =================================================================
	// ADMIN PILL (top-right)
	// =================================================================

	buildAdminPill() {

		const username = this.registry.get("username") || "Guest";

		const pillW = 300;
		const pillH = 38;
		const pillX = 1536 - pillW / 2 - 16;
		const pillY = 110;

		const bg = this.add.graphics();
		bg.fillStyle(0x071c3d, 0.92);
		bg.lineStyle(2, 0x00ffff, 1);
		bg.fillRoundedRect(pillX - pillW / 2, pillY - pillH / 2, pillW, pillH, 18);
		bg.strokeRoundedRect(pillX - pillW / 2, pillY - pillH / 2, pillW, pillH, 18);

		const dot = this.add.circle(pillX - pillW / 2 + 18, pillY, 5, 0x00ff66);
		this.tweens.add({
			targets: dot,
			alpha: { from: 1, to: 0.35 },
			duration: 900,
			yoyo: true,
			repeat: -1
		});

		const lockIcon = this.add.text(pillX - pillW / 2 + 30, pillY, "🔒", {
			fontSize: "16px"
		}).setOrigin(0, 0.5);

		this.adminName = this.add.text(pillX - pillW / 2 + 52, pillY, username, {
			fontFamily: "Arial Black",
			fontSize: "16px",
			color: "#a8ff3c"
		}).setOrigin(0, 0.5);

		const logoutText = this.add.text(pillX + pillW / 2 - 14, pillY, "LOGOUT", {
			fontFamily: "Arial",
			fontSize: "13px",
			color: "#ff6b6b",
			fontStyle: "bold"
		}).setOrigin(1, 0.5);

		logoutText.setInteractive({ useHandCursor: true });
		logoutText.on("pointerover", () => logoutText.setColor("#ff9b9b"));
		logoutText.on("pointerout",  () => logoutText.setColor("#ff6b6b"));
		logoutText.on("pointerdown", () => this.logout());

		this.adminObjs.push(bg, dot, lockIcon, this.adminName, logoutText);
	}

	// =================================================================
	// SLIM BOTTOM NAV
	// =================================================================

	buildBottomNav() {

		const y = 1006;
		const barH = 32;

		const bg = this.add.graphics();
		bg.fillStyle(0x000000, 0.78);
		bg.lineStyle(1, 0x00ffff, 0.7);
		bg.fillRect(0, y - barH / 2, 1536, barH);
		bg.strokeRect(0, y - barH / 2, 1536, barH);

		const home = this.makeNavLabel(80,  y, "HOME",        "#ffffff", () => this.navigateTo("TitleScene"));
		const play = this.makeNavLabel(200, y, "PLAY",        "#a8ff3c", () => this.navigateTo("JourneyMapScene"));
		const bad  = this.makeNavLabel(320, y, "BADGES",      "#ffd166", () => this.navigateTo("BadgesScene"));
		const lb   = this.makeNavLabel(470, y, "LEADERBOARD", "#00ffff", () => this.navigateTo("LeaderboardScene"));

		this.navObjs.push(bg, home, play, bad, lb);
	}

	makeNavLabel(x, y, label, color, callback) {

		const t = this.add.text(x, y, label, {
			fontFamily: "Arial Black",
			fontSize: "16px",
			color,
			fontStyle: "bold"
		}).setOrigin(0, 0.5);

		t.setInteractive({ useHandCursor: true });
		t.on("pointerover", () => t.setScale(1.1));
		t.on("pointerout",  () => t.setScale(1.0));
		t.on("pointerdown", callback);

		return t;
	}

	// =================================================================
	// LEADERBOARD CONTENT
	// =================================================================

	buildLeaderboardLayer() {

		const dim = this.add.rectangle(768, 512, 1536, 1024, 0x000b28, 0.92);
		this.lbObjs.push(dim);

		this.lbObjs.push(this.add.text(768, 100, "LEADERBOARD", {
			fontFamily: "Arial Black",
			fontSize: "56px",
			color: "#00ffff"
		}).setOrigin(0.5));

		// CLOSE button — top-right of the leaderboard
		const closeBtn = this.add.text(1480, 60, "✕  CLOSE", {
			fontFamily: "Arial Black",
			fontSize: "26px",
			color: "#ff6b6b",
			fontStyle: "bold",
			backgroundColor: "#1a0808",
			padding: { left: 14, right: 14, top: 6, bottom: 6 }
		}).setOrigin(1, 0.5);

		closeBtn.setInteractive({ useHandCursor: true });
		closeBtn.on("pointerover", () => closeBtn.setColor("#ff9b9b"));
		closeBtn.on("pointerout",  () => closeBtn.setColor("#ff6b6b"));
		closeBtn.on("pointerdown", () => this.navigateTo("TitleScene"));

		this.lbObjs.push(closeBtn);

		this.lbObjs.push(this.add.text(360, 230, "RANK",  { fontSize: "22px", color: "#7fd8ff", fontStyle: "bold" }));
		this.lbObjs.push(this.add.text(480, 230, "AGENT", { fontSize: "22px", color: "#7fd8ff", fontStyle: "bold" }));
		this.lbObjs.push(this.add.text(1080, 230, "SCORE", { fontSize: "22px", color: "#7fd8ff", fontStyle: "bold" }));

		// Separate array for rows — these get destroyed and rebuilt
		// every time the leaderboard becomes visible, so the player's
		// live score (and rank) update as they play.
		this.lbRowObjs = [];
		this.lbVisibleLast = false;

		this.lbObjs.forEach(o => o.setVisible(false));
	}

	rebuildLeaderboardRows() {

		// destroy previously-drawn rows
		this.lbRowObjs.forEach(o => o.destroy());
		this.lbRowObjs = [];

		const base = [
			{ name: "Shammie", score: 300 },
			{ name: "Teme",    score: 250 },
			{ name: "Markus",  score: 200 },
			{ name: "Chris",   score: 150 },
			{ name: "Birdy",   score: 100 }
		];

		const username = this.registry.get("username") || "Guest";
		// Chris's gameplay scenes update registry.score — read live value.
		const liveScore = this.registry.get("score") ?? 0;

		const rows = base
			.concat([{ name: username, score: liveScore, you: true }])
			.sort((a, b) => b.score - a.score);

		const rowH = 64;
		rows.forEach((player, index) => {
			const y = 290 + index * rowH;
			const isYou = player.you === true;

			const g = this.add.graphics();
			if (isYou) {
				g.fillStyle(0x143a1a, 1);
				g.lineStyle(2, 0xa8ff3c, 1);
			} else {
				g.fillStyle(0x071c3d, 0.85);
				g.lineStyle(1, 0x00ffff, 0.4);
			}
			g.fillRoundedRect(340, y - 4, 880, rowH - 12, 10);
			g.strokeRoundedRect(340, y - 4, 880, rowH - 12, 10);
			this.lbRowObjs.push(g);

			const color = isYou ? "#a8ff3c" : "#ffffff";
			const weight = isYou ? "bold" : "normal";

			this.lbRowObjs.push(this.add.text(376, y + 6, `${index + 1}`, { fontSize: "28px", color, fontStyle: weight }));
			this.lbRowObjs.push(this.add.text(480, y + 6, `${player.name}${isYou ? "  (you)" : ""}`, { fontSize: "28px", color, fontStyle: weight }));
			this.lbRowObjs.push(this.add.text(1090, y + 6, `${player.score}`, { fontSize: "28px", color, fontStyle: weight }));
		});
	}

	// =================================================================
	// BADGES — Chris's background image already has the full badge
	// layout, so we deliberately add nothing here. The admin pill and
	// the bottom nav still render over the page so the user can
	// navigate away.
	// =================================================================

	buildBadgesLayer() {
		// intentionally empty
	}

	// =================================================================
	// VISIBILITY (recomputed every frame in update())
	// =================================================================

	refreshVisibility() {

		const sm = this.scene.manager;
		const onTitle       = sm.isActive("TitleScene");
		const onLeaderboard = sm.isActive("LeaderboardScene");
		const onBadges      = sm.isActive("BadgesScene");
		const onLogin       = sm.isActive("LoginScene");
		const loggedIn      = !!this.registry.get("username");

		// SCORE BUMP — Chris's correct-answer handler doesn't update
		// the score, so detect when the "feedback_correct" scene goes
		// from inactive to active and add 50 to registry.score.
		const correctActive = sm.isActive("feedback_correct");
		if (correctActive && !this.correctScenePrev) {
			const cur = this.registry.get("score") ?? 0;
			this.registry.set("score", cur + 50);
		}
		this.correctScenePrev = correctActive;

		// Hide everything while login popup is up OR before login.
		const visible = !onLogin && loggedIn;

		this.adminObjs.forEach(o => o.setVisible(visible));
		this.navObjs  .forEach(o => o.setVisible(visible && !onTitle));
		this.lbObjs   .forEach(o => o.setVisible(visible && onLeaderboard));
		this.badgeObjs.forEach(o => o.setVisible(visible && onBadges));

		// Rebuild leaderboard rows each time it opens so the live score
		// is reflected and your rank moves up as you play.
		const showingLb = visible && onLeaderboard;
		if (showingLb && !this.lbVisibleLast) {
			this.rebuildLeaderboardRows();
		} else if (!showingLb && this.lbVisibleLast) {
			// hide rows when leaderboard closes
			this.lbRowObjs.forEach(o => o.destroy());
			this.lbRowObjs = [];
		}
		this.lbVisibleLast = showingLb;

		// keep admin pill text in sync with whoever is logged in
		if (loggedIn && this.adminName.text !== this.registry.get("username")) {
			this.adminName.setText(this.registry.get("username"));
		}

		// keep ourselves above the main scenes (but below LoginScene popup)
		sm.bringToTop("HudExtras");
		if (onLogin) sm.bringToTop("LoginScene");
	}

	// =================================================================
	// NAVIGATION
	// =================================================================

	navigateTo(targetKey) {
		const sm = this.scene.manager;

		MAIN_SCENES.forEach((k) => {
			if (k !== targetKey && sm.isActive(k)) sm.stop(k);
		});

		// HOME: also stop Chris's HUD bar.
		if (targetKey === "TitleScene" && sm.isActive("HudScene")) {
			sm.stop("HudScene");
		}

		if (!sm.isActive(targetKey)) sm.start(targetKey);
		sm.bringToTop("HudExtras");
	}

	logout() {
		const sm = this.scene.manager;

		this.registry.remove("username");
		this.registry.remove("sessionStart");
		this.registry.remove("sessionScore");

		MAIN_SCENES.forEach((k) => {
			if (sm.isActive(k)) sm.stop(k);
		});
		if (sm.isActive("HudScene")) sm.stop("HudScene");

		sm.start("TitleScene");
		sm.launch("LoginScene");
		sm.bringToTop("LoginScene");

		this.scene.stop();
	}
}
