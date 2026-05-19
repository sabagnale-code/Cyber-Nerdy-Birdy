// LoginScene — small popup that launches over the title screen.
// Dim backdrop eats clicks behind it. Centered panel with name + password
// fields. On valid submit, stores the agent name in registry and stops self.

export default class LoginScene extends Phaser.Scene {

	constructor() {
		super("LoginScene");
	}

	create() {

		// Force this scene to render on top of every other scene.
		this.scene.bringToTop();

		// dim full-screen backdrop (blocks clicks behind the popup)
		const backdrop = this.add.rectangle(768, 512, 1536, 1024, 0x000000, 0.65);
		backdrop.setInteractive(); // swallow pointer events

		// panel
		const panelW = 600;
		const panelH = 460;
		const panelX = 768;
		const panelY = 512;

		const panel = this.add.graphics();
		panel.fillStyle(0x071c3d, 0.98);
		panel.lineStyle(3, 0x00ffff, 1);
		panel.fillRoundedRect(panelX - panelW / 2, panelY - panelH / 2, panelW, panelH, 18);
		panel.strokeRoundedRect(panelX - panelW / 2, panelY - panelH / 2, panelW, panelH, 18);

		// small padlock
		this.drawPadlock(panelX, panelY - 170);

		// title
		this.add.text(panelX, panelY - 100, "SECURE LOGIN", {
			fontFamily: "Arial Black", fontSize: "32px", color: "#00ffff"
		}).setOrigin(0.5);

		this.add.text(panelX, panelY - 70, "Sign in to continue your training session", {
			fontFamily: "Arial", fontSize: "14px", color: "#7fd8ff"
		}).setOrigin(0.5);

		// state
		this.state = { name: "", password: "", active: "name" };

		// fields
		this.nameField = this.makeField({
			label: "AGENT NAME",
			x: panelX, y: panelY - 10, w: 500, h: 46,
			placeholder: "Click here and type",
			key: "name",
			masked: false
		});

		this.pwField = this.makeField({
			label: "PASSWORD",
			x: panelX, y: panelY + 70, w: 500, h: 46,
			placeholder: "Click and type",
			key: "password",
			masked: true
		});

		// status line
		this.status = this.add.text(panelX, panelY + 130, "Tab to switch  ·  Enter to login", {
			fontFamily: "Arial", fontSize: "12px", color: "#7fd8ff"
		}).setOrigin(0.5);

		// LOGIN button
		this.makeButton("LOGIN", panelX, panelY + 175, 220, 52, () => this.submit());

		// default focus
		this.setActive("name");

		// keyboard
		this.input.keyboard.on("keydown", (event) => this.handleKey(event));
	}

	makeField({ label, x, y, w, h, placeholder, key, masked }) {

		this.add.text(x - w / 2, y - h / 2 - 18, label, {
			fontFamily: "Arial", fontSize: "13px", color: "#a8ff3c", fontStyle: "bold"
		});

		const bg = this.add.graphics();
		bg.setInteractive(
			new Phaser.Geom.Rectangle(x - w / 2, y - h / 2, w, h),
			Phaser.Geom.Rectangle.Contains
		);

		const display = this.add.text(x - w / 2 + 12, y, placeholder, {
			fontFamily: "Consolas, monospace",
			fontSize: "18px",
			color: "#5c8aa0"
		}).setOrigin(0, 0.5);

		const cursor = this.add.text(x - w / 2 + 12, y, "|", {
			fontFamily: "Consolas, monospace",
			fontSize: "22px",
			color: "#a8ff3c"
		}).setOrigin(0, 0.5).setVisible(false);

		this.tweens.add({
			targets: cursor,
			alpha: { from: 1, to: 0 },
			duration: 500,
			yoyo: true,
			repeat: -1
		});

		const field = { bg, display, cursor, x, y, w, h, placeholder, key, masked };

		bg.on("pointerdown", () => this.setActive(key));

		this.drawField(field, false);
		return field;
	}

	drawField(field, active) {
		const { bg, x, y, w, h } = field;
		bg.clear();
		bg.fillStyle(0x000b28, 1);
		bg.lineStyle(active ? 3 : 2, active ? 0xa8ff3c : 0x00ffff, 1);
		bg.fillRoundedRect(x - w / 2, y - h / 2, w, h, 6);
		bg.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 6);
	}

	setActive(key) {
		this.state.active = key;
		this.drawField(this.nameField, key === "name");
		this.drawField(this.pwField,   key === "password");
		this.refreshDisplay(this.nameField, this.state.name);
		this.refreshDisplay(this.pwField,   this.state.password);
	}

	refreshDisplay(field, value) {
		const isActive = this.state.active === field.key;
		const rendered = field.masked ? "•".repeat(value.length) : value;

		if (value.length === 0) {
			field.display.setText(field.placeholder);
			field.display.setColor("#5c8aa0");
		} else {
			field.display.setText(rendered);
			field.display.setColor("#a8ff3c");
		}

		if (isActive) {
			field.cursor.setVisible(true);
			const textW = value.length === 0 ? 0 : field.display.width;
			field.cursor.setX(field.x - field.w / 2 + 12 + textW + 2);
		} else {
			field.cursor.setVisible(false);
		}
	}

	handleKey(event) {
		const key = event.key;

		if (key === "Tab") {
			event.preventDefault?.();
			this.setActive(this.state.active === "name" ? "password" : "name");
			return;
		}
		if (key === "Enter") {
			this.submit();
			return;
		}

		const target = this.state.active;
		const max = target === "name" ? 20 : 32;

		if (key === "Backspace") {
			this.state[target] = this.state[target].slice(0, -1);
		} else if (key.length === 1 && this.state[target].length < max) {
			this.state[target] += key;
		}

		const field = target === "name" ? this.nameField : this.pwField;
		this.refreshDisplay(field, this.state[target]);
	}

	submit() {
		const name = this.state.name.trim();
		const pw = this.state.password;

		if (name.length < 2) {
			this.status.setText("⚠  Agent name must be at least 2 characters.");
			this.status.setColor("#ff8080");
			this.setActive("name");
			return;
		}
		if (pw.length < 4) {
			this.status.setText("⚠  Password must be at least 4 characters.");
			this.status.setColor("#ff8080");
			this.setActive("password");
			return;
		}

		this.registry.set("username", name);
		this.registry.set("sessionStart", Date.now());
		this.registry.set("sessionScore", 0);

		this.status.setText("✔  Authenticated.");
		this.status.setColor("#a8ff3c");

		this.time.delayedCall(300, () => {
			// launch the overlay (admin pill + slim nav + leaderboard/badges content)
			if (!this.scene.manager.isActive("HudExtras")) {
				this.scene.launch("HudExtras");
			}
			this.scene.stop();
		});
	}

	drawPadlock(cx, cy) {
		const g = this.add.graphics();
		g.lineStyle(5, 0x00ffff, 1);
		g.beginPath();
		g.arc(cx, cy - 4, 16, Phaser.Math.DegToRad(200), Phaser.Math.DegToRad(340), false);
		g.strokePath();
		g.fillStyle(0x00ffff, 1);
		g.fillRoundedRect(cx - 22, cy + 6, 44, 32, 5);
		g.fillStyle(0x071c3d, 1);
		g.fillCircle(cx, cy + 18, 4);
		g.fillRect(cx - 1.5, cy + 18, 3, 10);
	}

	makeButton(label, x, y, width, height, callback) {
		const bg = this.add.graphics();

		const draw = (fill, w = width, h = height) => {
			bg.clear();
			bg.fillStyle(fill, 1);
			bg.lineStyle(2, 0xa8ff3c, 1);
			bg.fillRoundedRect(x - w / 2, y - h / 2, w, h, 14);
			bg.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 14);
		};

		draw(0x2f9b16);
		bg.setInteractive(
			new Phaser.Geom.Rectangle(x - width / 2, y - height / 2, width, height),
			Phaser.Geom.Rectangle.Contains
		);

		const text = this.add.text(x, y, label, {
			fontFamily: "Arial Black", fontSize: "24px", color: "#ffffff"
		}).setOrigin(0.5);

		bg.on("pointerover", () => { draw(0x46b91f, width * 1.04, height * 1.04); text.setScale(1.04); });
		bg.on("pointerout",  () => { draw(0x2f9b16, width, height); text.setScale(1); });
		bg.on("pointerdown", callback);

		return { bg, text };
	}
}
