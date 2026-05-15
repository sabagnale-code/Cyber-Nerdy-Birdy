
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
		this.add.image(768, 512, "journey_map_bg_no_islands");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

create() {
	this.editorCreate();

	this.createJourneySections();
	/* this.createBottomLevelBox("Phishing Emails", "Phish are sneaky! Learn to spot\nsuspicious emails and avoid the hook.", "Level"); */
}

createJourneySections() {
	const sections = [
		{
			key: "journey_section_1",
			x: 200,
			y: 590,
			scene: "PasswordPowerScene"
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
		const island = this.add.image(section.x, section.y, section.key)
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


/* 

createBottomLevelBox() {

	// Bottom panel
	const panel = this.add.rectangle(
		768,
		875,
		1360,
		190,
		0x06182b,
		0.92
	)
	.setStrokeStyle(3, 0x0b79b7);

	// Left title
	this.add.text(160, 810, "LEVEL 3: PHISHING EMAILS", {
		fontFamily: "Arial Black",
		fontSize: "40px",
		color: "#ffffff"
	})
	.setShadow(3, 3, "#000000", 4);

	// Make LEVEL 3 purple overlay
	this.add.text(160, 810, "LEVEL 3:", {
		fontFamily: "Arial Black",
		fontSize: "40px",
		color: "#c040ff"
	})
	.setShadow(3, 3, "#000000", 4);

	// Description
	this.add.text(160, 865, "Phish are sneaky! Learn to spot\nsuspicious emails and avoid the hook.", {
		fontFamily: "Arial",
		fontSize: "30px",
		lineSpacing: 8,
		color: "#ffffff"
	})
	.setShadow(2, 2, "#000000", 3);

	// Divider line
	this.add.rectangle(810, 900, 3, 120, 0x1c5f8f, 0.8);

	// Score prompt
	this.add.text(955, 830, "CAN YOU GET THE\nBEST SCORE?", {
		fontFamily: "Arial Black",
		fontSize: "22px",
		align: "center",
		color: "#19d9ff"
	})
	.setOrigin(0.5, 0)
	.setShadow(2, 2, "#000000", 3);

	this.add.text(960, 915, "🏆", {
		fontSize: "42px"
	}).setOrigin(0.5);

	// Play button
	this.makeButton(
		"PLAY ▶",
		1260,
		875,
		300,
		115,
		0x5ab51b,
		0x7ce82a,
		0xb6ff3e,
		"#ffffff",
		() => {
			this.scene.start("Level");
		}
	);
}

makeButton(label, x, y, width, height, fillColor, hoverColor, strokeColor, textColor, callback) {

	const bg = this.add.rectangle(x, y, width, height, fillColor)
		.setStrokeStyle(5, strokeColor)
		.setInteractive({ useHandCursor: true });

	const text = this.add.text(x, y, label, {
		fontFamily: "Arial Black",
		fontSize: "48px",
		color: textColor,
		align: "center"
	})
	.setOrigin(0.5)
	.setShadow(3, 3, "#000000", 4);

	bg.on("pointerover", () => {
		bg.setScale(1.05);
		text.setScale(1.05);
		bg.setFillStyle(hoverColor);
	});

	bg.on("pointerout", () => {
		bg.setScale(1);
		text.setScale(1);
		bg.setFillStyle(fillColor);
	});

	bg.on("pointerdown", callback);

	return { bg, text };
}

 */

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
