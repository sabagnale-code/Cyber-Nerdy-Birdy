
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class Level extends Phaser.Scene {

	constructor() {
		super("PhishingEmailsScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		this.add.image(768, 512, "level_2_PhishingEmailsScene");

		this.events.emit("scene-awake");
	}


/* START-USER-CODE */

create() {

	this.editorCreate();

	this.createIntroText();

	this.createStartButton();

}

createIntroText() {
	this.add.text(145, 385, "OBJECTIVE:", {
		fontFamily: "Arial Black",
		fontSize: "52px",
		color: "#ffd51f"
	}).setShadow(3, 3, "#000000", 5);

	this.add.text(
		145,
		465,
		"Identify phishing emails\nand avoid clicking on\nsuspicious links.",
		{
			fontFamily: "Arial",
			fontSize: "40px",
			lineSpacing: 18,
			color: "#ffffff"
		}
	).setShadow(3, 3, "#000000", 4);

	this.add.rectangle(395, 665, 505, 3, 0x7b2cff, 0.9);

	this.add.text(145, 705, "You have 3 lives", {
		fontFamily: "Arial Black",
		fontSize: "32px",
		color: "#ffffff"
	}).setShadow(3, 3, "#000000", 4);

	this.add.text(450, 700, "❤️ ❤️ ❤️", {
		fontFamily: "Arial",
		fontSize: "42px",
		color: "#ffffff"
	});
}

createStartButton() {
	const x = 768;
	const y = 910;
	const width = 585;
	const height = 105;
	const radius = 25;

	const bg = this.add.graphics();

	const drawButton = (fillColor, w = width, h = height) => {
		bg.clear();

		bg.fillStyle(fillColor, 1);
		bg.lineStyle(5, 0xb6ff3e, 1);

		bg.fillRoundedRect(
			x - w / 2,
			y - h / 2,
			w,
			h,
			radius
		);

		bg.strokeRoundedRect(
			x - w / 2,
			y - h / 2,
			w,
			h,
			radius
		);
	};

	drawButton(0x5ab51b);

	bg.setInteractive(
		new Phaser.Geom.Rectangle(
			x - width / 2,
			y - height / 2,
			width,
			height
		),
		Phaser.Geom.Rectangle.Contains
	);

	bg.input.cursor = "pointer";

	const label = this.add.text(x, y, "START LEVEL", {
		fontFamily: "Arial Black",
		fontSize: "54px",
		color: "#ffffff"
	})
	.setOrigin(0.5)
	.setShadow(4, 4, "#000000", 5);

	bg.on("pointerover", () => {
		drawButton(0x78d420, width * 1.05, height * 1.05);
		label.setScale(1.05);
	});

	bg.on("pointerout", () => {
		drawButton(0x5ab51b, width, height);
		label.setScale(1);
	});

	bg.on("pointerdown", () => {
		this.scene.start("Scene_Level_2_a");
	});
}

/* END-USER-CODE */

}

/* END OF COMPILED CODE */

// You can write more code here
