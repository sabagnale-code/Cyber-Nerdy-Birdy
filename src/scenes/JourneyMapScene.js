// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class JourneyMapScene extends Phaser.Scene {

	constructor() {
		super("JourneyMapScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.add.image(768, 512, "journey_map_bg_w_path_only_half_w_path_connected");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	create() {

		this.editorCreate();

		// NEW TITLE TEXT
		this.createHeader();

		// JOURNEY ISLANDS
		this.createJourneySections();
	}

	createHeader() {

		// Header panel
		const headerBg = this.add.rectangle(
			768,
			95,
			620,
			170,

		)
		.setStrokeStyle(0, 0x19d9ff);

		// Main title
		this.add.text(768, 75, "CYBER JOURNEY", {
			fontFamily: "Arial Black",
			fontSize: "64px",
			color: "#ffffff",
			align: "center"
		})
		.setOrigin(0.5)
		.setShadow(4, 4, "#000000", 6);

		// Subtitle
		this.add.text(768, 135, "Defend. Detect. Don’t Get Duped.", {
			fontFamily: "Arial Black",
			fontSize: "26px",
			color: "#19d9ff",
			align: "center"
		})
		.setOrigin(0.5)
		.setShadow(2, 2, "#000000", 4);

		// Optional glow effect
		this.tweens.add({
			targets: headerBg,
			alpha: 0.78,
			duration: 1800,
			yoyo: true,
			repeat: -1,
			ease: "Sine.easeInOut"
		});
	}

	createJourneySections() {

		const sections = [

			{
				key: "journey_section_1",
				x: 200,
				y: 590,
				scene: "Level1"
			},

			{
				key: "journey_section_2",
				x: 560,
				y: 590,
				scene: "PhishingEmailsScene"
			},

			{
				key: "journey_section_3",
				x: 920,
				y: 590,
				scene: "SafeBrowsingScene"
			},

			{
				key: "journey_section_4",
				x: 1280,
				y: 590,
				scene: "DataProtectionScene"
			}
		];

		sections.forEach(section => {

			const island = this.add.image(
				section.x,
				section.y,
				section.key
			)
			.setOrigin(0.5)
			.setScale(1)
			.setInteractive({ useHandCursor: true });

			island.on("pointerover", () => {

				this.tweens.add({
					targets: island,
					scale: 1.06,
					duration: 160,
					ease: "Back.Out"
				});

				island.setTint(0xbfffff);
			});

			island.on("pointerout", () => {

				this.tweens.add({
					targets: island,
					scale: 1,
					duration: 160,
					ease: "Back.Out"
				});

				island.clearTint();
			});

			island.on("pointerdown", () => {

				this.tweens.add({
					targets: island,
					scale: 0.94,
					duration: 80,
					yoyo: true,

					onComplete: () => {
						this.scene.start(section.scene);
					}
				});
			});
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here